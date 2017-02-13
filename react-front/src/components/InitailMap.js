import React, {Component} from 'react';
import {withGoogleMap,GoogleMap, InfoWindow, Marker} from "react-google-maps";

const InitialMap = withGoogleMap(props => {

    return (
        <GoogleMap
            ref={props.onMapLoad}
            defaultZoom={14}
            defaultCenter={{ lat: -34.397, lng: 150.644}}
    >
    {props.markers.map((marker,index)=> (
        <Marker
        key={index}
        position={marker.position}
        onClick={() => props.onMarkerClick(marker)}
        />
    ))}
    
        </GoogleMap>
    )
})

export default InitialMap;