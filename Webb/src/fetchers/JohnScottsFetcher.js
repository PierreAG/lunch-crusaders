import React, { useEffect, useState } from 'react';
import logo from '../images/JohnScotts.png';
import { Card, Image, Meal, RestaurantDescription } from './CustomComponents';

const JohnScottsFetcher = () => {
  const [lunchData, setLunchData] = useState({
    kött: '',
    fisk: '',
    vegetarisk: ''
  });

  useEffect(() => {
    fetch('https://76motiip32.execute-api.eu-north-1.amazonaws.com/Prod/johnscotts')
      .then(response => response.json())
      .then(data => setLunchData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  return (
    <Card>
      <Image
        name="JohnScotts"
        link="https://johnscotts.se/kungsgatan/lunch/"
        image={logo}
      />
      <RestaurantDescription text='Lunch Buffé' />

      <Meal
        name={"Kött"}
        text={lunchData.kött}
      />
      <Meal
        name={"Fisk"}
        text={lunchData.fisk}
      />
      <Meal
        name={"Vegetarisk"}
        text={lunchData.vegetarisk}
      />
    </Card>
  );
};

export default JohnScottsFetcher;
