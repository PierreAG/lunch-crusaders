import cheerio from 'cheerio';
import fetch from 'node-fetch';

export const handler = async (event, context) => {
    try {
        const response = await fetch('https://restaurangknut.se/regeringsgatan/');
        const html = await response.text();
        const $ = cheerio.load(html);

        const luchItems = $('.inner-menyer').first().find('.matratt');
        const lunchData = [];

        luchItems.each((_, lunchItem) => {
            const name = $(lunchItem).find('.name').text().trim();
            const description = $(lunchItem).find('.description').text().trim();

            const menuItem = {
                name: name,
                description: description
            };
            lunchData.push(menuItem);
        });

        lunchData.shift()

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
            body: JSON.stringify({ error: 'Failed to fetch lunch data from Knut' }),
        };
    }
};