import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import SKI_TOKEN from './token';
import wanlongData from "./wanlong.json"
import "./map.css"
import { getRopeWayData } from './utils';

mapboxgl.accessToken = SKI_TOKEN;

const mapData = getRopeWayData();

export default function GeoJSONDemo() {
  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [lng, setLng] = useState(115.398531);
  const [lat, setLat] = useState(40.963541);
  const [zoom, setZoom] = useState(14);
  

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("load", () => {
      mapData.forEach((el: any) => {
        console.log(el)
        map.current.addLayer({
          'id': el.properties.wayid,
          'type': 'line',
          'source': {
            type: "geojson",
            data: el
          },
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': el.properties.style.paint
        });
      })
    })
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}