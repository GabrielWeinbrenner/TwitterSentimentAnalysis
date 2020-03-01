import React from 'react';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import darkgreen from './images/darkgreen.png';
import green from './images/green.png';
import orange from './images/orange.png';
import red from './images/red.png';
import yellow from './images/yellow.png';


const MapComponent = withScriptjs(withGoogleMap((props) =>{
    const getColor = (sentimentValue) => {
        let green = new window.google.maps.MarkerImage(
            darkgreen,
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(32, 32))
        let lightgreen = new window.google.maps.MarkerImage(
            green,
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(32, 32))
        let yellow = new window.google.maps.MarkerImage(
            yellow,
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(32, 32))
        let orange = new window.google.maps.MarkerImage(
            orange,
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(32, 32))
        let red = new window.google.maps.MarkerImage(
            red,
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(32, 32))
        
        if(sentimentValue > 0.5){
            return (green);
        }else if(sentimentValue < 0.5 && sentimentValue > 0.3){
            return (lightgreen);
        }else if(sentimentValue < 0.3 && sentimentValue > 0){
            return (yellow);
        }else if(sentimentValue < 0 && sentimentValue > -0.3){
            return (orange);
        }else if(sentimentValue < -0.3 && sentimentValue > -0.5){
            return (red);
        }else if(sentimentValue < -1){
            return (red);
        }
    }
    return(
        <GoogleMap
        defaultZoom={2}
        defaultCenter={{ lat: 0, lng: 0 }}
        >
        {props.tweets.map(tweet => {
            try {
                return(
                    <Marker 
                        position={{ lat: tweet.location[0], lng: tweet.location[1] }} 
                        color="Red"
                    />    
                )
            } catch (error) {
                console.log(error);
            }
        })}
        </GoogleMap>
    );
}
))

export default MapComponent;
