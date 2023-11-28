import cheerio from 'cheerio';
import fetch from 'node-fetch';

export const handler = async (event, context) => {
  try {
    const response = await fetch('https://gutegrill.se/stockholm/lunch-ostermalm-stureplan/');
    const html = await response.text();
    const $ = cheerio.load(html);

    const matchingElement = $(`p:contains("${getSwedishDay()}")`).toString();
    const cleanHtmlSting = matchingElement.replaceAll(/<\/?[^>]+(>|$)/g, '').replaceAll("&amp;", "och")

    const [_, fisk, kött, vegetarisk] = cleanHtmlSting.match(/Fisk:\n(.+?)\nKött:\n(.+?)\nVeckans vegetariska:\n(.+)/s);
    const lunchData = {
      kött: kött.split("\n"),
      fisk: fisk,
      vegetarisk: vegetarisk,
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