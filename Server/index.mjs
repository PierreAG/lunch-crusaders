import cheerio from 'cheerio';
import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Enable CORS for all routes
app.use(cors());

function prettyJSON(data) {
  return JSON.stringify(data, null, 2);
}

// GET route
app.get('/johnscotts', async (req, res) => {
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

    res.status(200).send(prettyJSON(lunchData))
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lunch data from JohnScotts' });
  }
});

const PORT = 3333; // Define a port (use the environment port or default to 3000)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});