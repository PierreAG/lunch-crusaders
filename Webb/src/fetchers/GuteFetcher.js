import React, { useEffect, useState } from 'react';
import logo from '../images/Gute.png';
import { Card, Image, Meal, MultipleOfSameMealType, RestaurantDescription } from './CustomComponents';

const GuteFetcher = () => {
    const [lunchData, setLunchData] = useState({
        kött: [],
        fisk: '',
        vegetarisk: ''
    });

    useEffect(() => {
        fetch('https://76motiip32.execute-api.eu-north-1.amazonaws.com/Prod/gute')
            .then(response => response.json())
            .then(data => setLunchData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Card>
            <Image
                name="Gute"
                link="https://gutegrill.se/stockholm/lunch-ostermalm-stureplan/"
                image={logo}
            />
            <RestaurantDescription text='Tillbehör buffé' />

            <MultipleOfSameMealType
                name="Kött"
                texts={lunchData.kött}
            />
            <Meal
                name="Fisk"
                text={lunchData.fisk}
            />
            <Meal
                name="Vegetariskt"
                text={lunchData.vegetarisk}
            />
        </Card>
    );
};

export default GuteFetcher;
