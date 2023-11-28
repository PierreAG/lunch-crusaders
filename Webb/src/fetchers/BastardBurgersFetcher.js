import React, { useEffect, useState } from 'react';
import logo from '../images/BastardBurgers.jpeg';
import { Card, Image, Meal, RestaurantDescription } from './CustomComponents';

const BastardBurgersFetcher = () => {
    const [lunchData, setLunchData] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        fetch('https://76motiip32.execute-api.eu-north-1.amazonaws.com/Prod/bastard-burgers')
            .then(response => response.json())
            .then(data => setLunchData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Card>
            <Image
                name="bastard-burgers"
                link="https://bastardburgers.com/se/meny/"
                image={logo}
            />
            <RestaurantDescription text='Ingår shack fries och läsk.' />

            <Meal
                name={lunchData.name}
                text={lunchData.description}
            />
        </Card>
    );
};

export default BastardBurgersFetcher;
