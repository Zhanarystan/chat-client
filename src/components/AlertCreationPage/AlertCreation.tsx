import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useStore } from '../../app/stores/store';

export default observer(function AlertCreation(){

    const {messageStore} = useStore();  
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    
    useEffect(() => {
        messageStore.createHubConnection();
    }, [messageStore])

    return(
        <>
            <div className="container">
                    <input 
                        onChange = {(e) => setLongitude(e.target.value)}
                        type="text" 
                        className="form-control mt-3" 
                        placeholder="Longitude"
                    />
                    <input 
                        onChange = {(e) => setLatitude(e.target.value)}
                        type="text" 
                        className="form-control mt-3" 
                        placeholder="Latitude"
                    />
                    <button 
                        className="btn btn-success btn-sm mt-3"
                        onClick={(e) => {
                            e.preventDefault();
                            messageStore.addAlert(longitude, latitude);
                        }}
                    >Send</button>
            </div>
        </>
    )
})