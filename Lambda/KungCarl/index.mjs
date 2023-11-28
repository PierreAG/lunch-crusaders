import { weekNumber, yearNumber } from './TimeUtil.mjs';
import { getKarlKungObject, getPdfContent, groupMenuItems, transformArray, transformArrayWeekMenu } from './KungCarlUtil.mjs';


export const handler = async (event, context) => {
  try {
    const pdfUrl = 'https://www.kungcarl.se/assets/local/Kung-Carl-lunch-meny-' + yearNumber() + '-vecka-' + weekNumber() + '.pdf';
    const text = await getPdfContent(pdfUrl);
    const groupItems = groupMenuItems(text);

    const mondayThursday = transformArray(groupItems['MÅNDAG-TORSDAG']);
    const thursday = transformArray(groupItems['ALLTID PÅ TORSDAGAR']);
    const friday = transformArray(groupItems['ALLTID PÅ FREDAGAR']);
    const weekDishes = transformArrayWeekMenu(groupItems['VECKANS RÄTTER']);

    const lunchData = getKarlKungObject(mondayThursday, thursday, friday, weekDishes);

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
      body: JSON.stringify({ error: 'Failed to fetch lunch data from Kung Carl' }),
    };
  }
};