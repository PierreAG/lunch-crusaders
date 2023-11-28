import React, { useEffect, useState } from 'react';
import logo from '../images/kunt.svg';
import { Card, Image, MultipleMeals } from './CustomComponents';

function weekNumber() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;

    return Math.floor(diff / oneWeek) + 1;
}

const KnutFetcher = () => {
    const [listOfLunchData, setListOfLunchData] = useState([]);

    useEffect(() => {
        fetch('https://76motiip32.execute-api.eu-north-1.amazonaws.com/Prod/knut')
        .then(response => response.json())
        .then(data => setListOfLunchData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Card>
            <Image
                name="Knut"
                link="https://restaurangknut.se/regeringsgatan/"
                image={logo}
            />

            <MultipleMeals
                description={`Meny för vecka ${weekNumber()}`}
                listOfMeals={listOfLunchData}
            />
        </Card>
    );
};

export default KnutFetcher;
