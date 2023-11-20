import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import SKI_TOKEN from './token';
import wanlongData from "./wanlong.json"
import "./map.css"
import { getFormatData, getRopeWayData} from './utils';
import { DataSetStyle } from './constants';

mapboxgl.accessToken = SKI_TOKEN;

const mapData = getFormatData();
const ropeData = getRopeWayData()

const dashArraySequence = [
  [0, 4, 3],
  [0.5, 4, 2.5],
  [1, 4, 2],
  [1.5, 4, 1.5],
  [2, 4, 1],
  [2.5, 4, 0.5],
  [3, 4, 0],
  [0, 0.5, 3, 3.5],
  [0, 1, 3, 3],
  [0, 1.5, 3, 2.5],
  [0, 2, 3, 2],
  [0, 2.5, 3, 1.5],
  [0, 3, 3, 1],
  [0, 3.5, 3, 0.5]
];
   
let step = 0;

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
      // style: 'mapbox://mapbox.mapbox-terrain-dem-v1',
      style: 'mapbox://styles/traveler/ckks4hgye0ozn17phx56fabas',
      // style: DataSetStyle.OUTDOORS,
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("load", () => {
      map.current.addSource('ropeline', {
        type: 'geojson',
        data: {
          type: "FeatureCollection",
          features: ropeData
        }
      });
      map.current.addLayer({
        'id': 'ropelineLayer',
        'type': 'line',
        'source': 'ropeline',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': 'red',
          'line-width': 2,
          'line-dasharray': [0, 4, 3]
        }
      });

      // mapData.forEach((el: any) => {
      //   map.current.addLayer({
      //     'id': el.properties.wayid,
      //     'type': 'line',
      //     'source': {
      //       type: "geojson",
      //       data: el
      //     },
      //     'layout': {
      //       'line-join': 'round',
      //       'line-cap': 'round'
      //     },
      //     'paint': el.properties.style.paint
      //   });
      // if (el.properties.type == 1) {
      //   map.current.addLayer({
      //     type: 'line',
      //     source: 'ropeline',
      //     id: 'line-dashed',
      //     paint: {
      //       'line-color': 'yellow',
      //       'line-width': 2,
      //       'line-dasharray': [0, 4, 3]
      //     }
      //   });
      // }
      // });
      
      animateDashArray(0);
      addCounter()
    })
  });
  const animateDashArray = (timestamp: any) => {
    // Update line-dasharray using the next value in dashArraySequence. The
    // divisor in the expression `timestamp / 50` controls the animation speed.
    const newStep = parseInt(''+(timestamp / 50) % dashArraySequence.length);
    if (newStep !== step) {
      map.current.setPaintProperty(
        'ropelineLayer',
        'line-dasharray',
        dashArraySequence[step]
      );
      step = newStep;
    }
    requestAnimationFrame(animateDashArray);
  }

  const addCounter = () => {
    map.current.addLayer({
      "id": "countours",
      "type": "line",
      "source": {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-terrain-v2'
      },
      "source-layer": "contour",
      'layout': {
        'visibility': 'visible',
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#877b59',
        'line-width': 1,
        'line-opacity': 0.5
      }
    });
  }

  

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

