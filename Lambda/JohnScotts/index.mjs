import cheerio from 'cheerio';
import fetch from 'node-fetch';

export const handler = async (event, context) => {
    try {
        const response = await fetch('https://johnscotts.se/kungsgatan/lunch/');
        const html = await response.text();
        const $ = cheerio.load(html);

        const mealItems = $('.schedule-row').first().find('.schedule-cell.content');

        const lunchData = {
            kött: mealItems.find('p:contains("Dagens kött")').text().replace('Dagens kött', '').trim(),
            fisk: mealItems.find('p:contains("Dagens fisk")').text().replace('Dagens fisk', '').trim(),
            vegetarisk: mealItems.find('p:contains("Dagens vegetariska")').text().replace('Dagens vegetariska', '').trim(),
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
            body: JSON.stringify({ error: 'Failed to fetch lunch data from JohnScotts' }),
        };
    }
};