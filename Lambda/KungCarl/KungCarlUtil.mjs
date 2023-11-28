import { getDocument } from 'pdfjs-dist';
import { getSwedishDay } from './TimeUtil.mjs';

function transformArray(input) {
    const cleanArray = input
        .toString()
        .split(/(?<!\d)\d{3}(?!\d)(?!\s)/)
        .filter(item => item.trim() !== '')

    const transformedArray = cleanArray.map(item => {
        // Remove leading and trailing commas, split on the first comma
        const parts = item.replace(/^,|,$/g, '').split(/,(.+)/);

        const dishName = cleanString(parts[0])
        const description = cleanString(parts[1])

        return moveUppercaseToDishName(dishName, description)
    });

    // Filter out any empty strings
    return transformedArray.filter(item => item !== '');
}

function cleanString(input) {
    return input.trim()
        .replace(/,?&/, ' &')
        .replaceAll(/,(.)/g, ', $1')
        .replaceAll(",,", ",")
        .replaceAll(", ,", ", ")
        .replaceAll("  ", " ");
}

function moveUppercaseToDishName(dishName, description) {
    const words = description.split(/,\s*(?=[A-Z])/); // Split based on uppercase letters after a comma and optional space

    if (words.length > 1) {
        const firstWord = words[0];
        dishName += ' ' + firstWord; // Append the first word to the dishName
        words.shift(); // Remove the first word from the words array
    }

    const updatedDescription = words.join(', '); // Rejoin the remaining words for the description
    return {
        name: dishName,
        description: updatedDescription
    };
}


function transformArrayWeekMenu(input) {
    const cleanArray = input
        .toString()
        .split(/(?<!\d)\d{3}(?!\d)(?!\s)|(?<!\d)\d\s\d\s\d(?!\d)/)
        .filter(item => item.trim() !== '')

    const transformedArray = cleanArray.slice(0, 3).map(item => {
        // Remove leading and trailing commas, split on the first comma
        const parts = item.replace(/^,|,$/g, '').split(/,(.+)/);

        const dishName = cleanWeekMenuString(parts[0].replaceAll(" ", ""))
        const description = cleanWeekMenuString(parts[1])

        return moveUppercaseToDishName(dishName, description)
    });

    // Filter out any empty strings
    return transformedArray.filter(item => item !== '');
}

function cleanWeekMenuString(input) {
    return input.trim()
        .replace(/,?&/, ' &')
        .replaceAll(/,(.)/g, ', $1')
        .replaceAll(",,", ",")
        .replaceAll(", ,", ", ")
        .replaceAll(", .", "")
        .replaceAll(".", "")
        .replaceAll(". ", "")
        .replaceAll("  ", " ");
}

async function getPdfContent(url) {
    try {
        const pdf = await getDocument(url).promise;
        const maxPages = pdf.numPages;
        let fullText = '';

        for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            textContent.items.forEach(item => {
                fullText += item.str + '\n';
            });
        }

        return fullText;
    } catch (error) {
        console.error('Error fetching or parsing PDF:', error);
        return null;
    }
}

function groupMenuItems(text) {
    const lines = text.split('\n');

    const groupedItems = {
        'MÅNDAG-TORSDAG': [],
        'VECKANS RÄTTER': [],
        'ALLTID PÅ TORSDAGAR': [],
        'ALLTID PÅ FREDAGAR': [],
    };

    let currentCategory = '';

    lines.forEach(line => {
        const trimmedLine = line.trim();

        if (trimmedLine === 'MÅNDAG-TORSDAG' ||
            trimmedLine === 'VECKANS RÄTTER' ||
            trimmedLine === 'ALLTID PÅ TORSDAGAR' ||
            trimmedLine === 'ALLTID PÅ FREDAGAR') {
            currentCategory = trimmedLine;
        } else if (currentCategory && trimmedLine !== '' && trimmedLine !== '.') {
            groupedItems[currentCategory].push(trimmedLine);
        }
    });

    return groupedItems;
}

function getKarlKungObject(mondayThursday, thursday, friday, weekDishes) {
    switch (getSwedishDay()) {
        case 'Måndag':
        case 'Tisdag':
        case 'Onsdag':
            return {
                mondayThursday: mondayThursday,
                thursday: undefined,
                friday: undefined,
                weekDishes: weekDishes,
            };
        case 'Torsdag':
            return {
                mondayThursday: mondayThursday,
                thursday: thursday,
                friday: undefined,
                weekDishes: weekDishes,
            };
        case 'Fredag':
            return {
                mondayThursday: undefined,
                thursday: undefined,
                friday: friday,
                weekDishes: weekDishes,
            };
        default:
            return {
                mondayThursday: undefined,
                thursday: undefined,
                friday: undefined,
                weekDishes: undefined,
            };
    }
}

export { getKarlKungObject, getPdfContent, groupMenuItems, transformArray, transformArrayWeekMenu };
