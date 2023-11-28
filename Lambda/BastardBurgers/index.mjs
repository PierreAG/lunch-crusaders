import cheerio from 'cheerio';
import fetch from 'node-fetch';

export const handler = async (event, context) => {
    try {
        const response = await fetch('https://bastardburgers.com/se/meny/');
        const html = await response.text();

        const $ = cheerio.load(html);
        const lunchContainer = $('.bg-yellowLight .flex.flex-col');
        const matchedDayElement = lunchContainer.find('h3:contains("' + getSwedishDay() + '")').first().parent();

        const name = matchedDayElement.find('h4').text().trim();
        const description = matchedDayElement.find('p').text().trim();
        const lunchData = {
            name: name,
            description: description
        };
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key',
            },
            body: JSON.stringify(lunchData),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key',
            },
            body: JSON.stringify({ error: 'Failed to fetch lunch data from Gute' }),
        };
    }
}

function getSwedishDay() {
    const daysOfWeekSwedish = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
    const dayOfWeek = new Date().getDay();

    return daysOfWeekSwedish[dayOfWeek];
}