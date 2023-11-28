import React, { useEffect, useState } from 'react';
import logo from '../images/KungCarl.png';
import { Card, MultipleMeals, Image } from './CustomComponents';

const KungCarlFetcher = () => {
    const [lunchData, setLunchData] = useState({
        mondayThursday: { name: '', description: '' },
        thursday: { name: '', description: '' },
        friday: { name: '', description: '' },
        weekDishes: { name: '', description: '' },
    });

    useEffect(() => {
        fetch('https://76motiip32.execute-api.eu-north-1.amazonaws.com/Prod/kung-carl')
            .then(response => response.json())
            .then(data => setLunchData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Card>
            <Image
                name="KungCarl"
                link="https://www.kungcarl.se/frukost-lunch-brunch"
                image={logo}
            />

            <MultipleMeals
                description={"Måndag till Torsdag"}
                listOfMeals={lunchData.mondayThursday}
            />
            <MultipleMeals
                description={"Torsdag"}
                listOfMeals={lunchData.thursday}
            />
            <MultipleMeals
                description={"Fredag"}
                listOfMeals={lunchData.friday}
            />
            <MultipleMeals
                description={"Meny för veckan"}
                listOfMeals={lunchData.weekDishes}
            />
        </Card>
    );
};

export default KungCarlFetcher;