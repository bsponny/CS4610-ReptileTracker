import { useState, useEffect, FormEvent } from 'react';
import { useApi } from '../hooks/useApi';
import Modal from 'react-modal';

export const ReptileComponent = () => {
    const api = useApi();
    const [reptiles, setReptiles] = useState<string[]>([]);
    const [addReptileModalOpen, setReptileModal] = useState<boolean>(false);
    const [reptileName, setReptileName] = useState<string>("");
    const [reptileSpecies, setReptileSpecies] = useState<string>("");
    const [reptileSex, setReptileSex] = useState<string>("");

    useEffect(() => {
    const getReptiles = api.get('/reptiles');
    getReptiles.then(res => {
        console.log(res);
        setReptiles([]);
    });
    }, []);

    const addNewReptile = (event: FormEvent) => {
        event.preventDefault();
        const body = {
            name: reptileName,
            species: reptileSpecies,
            sex: reptileSex
        };
        console.log(body);
    };

    return (
        <div className="reptile-component">
            <p>Reptiles listed here: </p>
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
                        <select id="reptileSex" name="reptileSex" onChange={e => setReptileSex(e.target.value)}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Reptile" className="save-button"/>
                    </div>
                </form>
            </Modal>
            <button onClick={(e) => setReptileModal(true)} >Add Reptile</button>
        </div>
    )
}
