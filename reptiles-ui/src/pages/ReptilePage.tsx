import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { useParams } from 'react-router-dom';

interface Reptile {
    id: number;
    name: string;
    species: string;
    sex: string;
}

export const ReptilePage = () => {
    const api = useApi();
    const params = useParams();
    const [reptile, setReptile] = useState<Reptile>();

    useEffect(() => {
        loadReptile();
        loadHusbandry();
    }, []);

    const loadReptile = () => {
        const getRep = api.get("/reptiles/");
        getRep.then(res => res.reptiles)
        .then(reptiles => {
            const myReptile = reptiles.find((rep: Reptile) => Number(params.id) == rep.id);
            console.log(myReptile);
            setReptile(myReptile);
        });
    }

    const loadHusbandry = () => {
        const getHusbandry = api.get("/husbandry/" + params.id);
        getHusbandry.then(res => res.husbandry)
        .then(husbandries => {
            console.log(husbandries);
        });
    };

    return(
        <div className="reptile-page">
            <h1>Reptile Page: {reptile?.id}</h1>
            <h3>Name: {reptile?.name}</h3>
            <h3>Species: {reptile?.species}</h3>
            <h3>Sex: {reptile?.sex}</h3>
        </div>
    )
   
};

export default ReptilePage;