import React, { useEffect, useRef } from "react"
// import maptilersdk from '@maptiler/sdk';
import maptilerclient from '@maptiler/client/dist/maptiler-client.min.mjs'
// const maptilersdk = require('@maptiler/sdk')
import "@maptiler/sdk/dist/maptiler-sdk.css";
import API_KEY from "./token"

maptilerclient.config.apiKey = API_KEY;
maptilerclient.geocoding.forward("beijing")

export default function Maptiler3d() {
  const ref = useRef(null);
  let map = null;
  useEffect(() => {
    if (ref.current) return;
    init()
  });

  const init = () => {
    map = new maptilerclient.Map({
      container: ref.current, // container's id or the HTML element to render the map
      style: maptilerclient.MapStyle.OUTDOOR,
      center: [115.398531, 40.963541], // starting position [lng, lat]
      zoom: 14, // starting zoom
      terrain: true,
      terrainControl: true,
    });
  }
  
  return <div ref={ref}>

  </div>
}