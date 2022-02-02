import { observer } from "mobx-react-lite";
import React from "react";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import { useStore } from "../../app/stores/store";

export default observer(function MapPage(){
    return(
        <YMaps>
            <div>
                My awesome application with maps!
                <Map defaultState={{ center: [43.249700, 76.903074], zoom: 15 }} width={1000} height={800}>
                    <Placemark
                        geometry={[43.249700, 76.903074]}
                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                    />    
                </Map>
            </div>
        </YMaps>
    )
})
 