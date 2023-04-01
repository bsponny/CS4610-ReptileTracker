import { useState, useEffect, FormEvent } from 'react';
import { useApi } from '../hooks/useApi';
import { Router } from '../Router';
import Modal from 'react-modal';

interface Reptile {
    id: number;
    name: string;
    species: string;
    sex: string;
}

export const ReptileComponent = () => {
    const api = useApi();
    const [reptiles, setReptiles] = useState<Reptile[]>([]);
    const [addReptileModalOpen, setReptileModal] = useState<boolean>(false);
    const [reptileName, setReptileName] = useState<string>("");
    const [reptileSpecies, setReptileSpecies] = useState<string>("");
    const [reptileSex, setReptileSex] = useState<string>("");

    useEffect(() => {
        getReptiles();
    }, []);

    const addNewReptile = (event: FormEvent) => {
        event.preventDefault();
        const body = {
            name: reptileName,
            species: reptileSpecies,
            sex: reptileSex
        };

        const postReptileReply = api.post('/reptile', body);
        postReptileReply.then(res => {
            getReptiles();
            setReptileModal(false);
        });
    };

    const getReptiles = () => {
        const get = api.get('/reptiles');
        get.then(res => {
            console.log(res.reptiles);
            setReptiles(res.reptiles);
        });
    }
    return (
        <div className="reptile-component">
            <button onClick={(e) => setReptileModal(true)}>Add Reptile</button>
            {reptiles.map(reptile => (
                <div className="reptile" key={reptile.id}>
                    {reptile.id} | {reptile.name} | {reptile.species} | {reptile.sex}
                </div>
            ))}
            <Modal isOpen={addReptileModalOpen}
                   ariaHideApp={false}
                   contentLabel="Selected Option">
                <div className="modal-header">
                    <h1>Create New Reptile</h1>
                    <button onClick={(e) => setReptileModal(false)}>x</button>
                </div>
                <form className="modal-form" onSubmit={e => addNewReptile(e)}>
                    <div className="form-group">
                        <label htmlFor="reptileName">Name: </label>
                        <input id="reptileName" name="reptileName" type="text" onChange={e => setReptileName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reptileSpecies">Species: </label>
                        <input id="reptileSpecies" name="reptileSpecies" type="text" onChange={e => setReptileSpecies(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reptileSex">Sex: </label>
                        <input id="reptileSex" name="reptileSex" onChange={e => setReptileSex(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Reptile" className="save-button"/>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
