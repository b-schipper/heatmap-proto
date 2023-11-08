import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat'; // Heatmap plugin for Leaflet
import earthquakeData from './earthquake-data.json';



function HeatmapPageComponent() {

    let maxMag = 0;
    earthquakeData.features.forEach(feature => {
      if (feature.properties.mag > maxMag) {
        maxMag = feature.properties.mag;
      }
    })

    const changedDataFormat = {
      max: maxMag,
      data: earthquakeData.features.map(feature => {
        return {
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
          mag: feature.properties.mag,
          count: 1
        }
      })
    }

  useEffect(() => {
    var map = L.map("map").setView([-37.87, 175.475], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.heatLayer(changedDataFormat).addTo(map);
  });
 
  return <div id="map" style={{ height: "100vh" }}></div>;
}

export default HeatmapPageComponent;
