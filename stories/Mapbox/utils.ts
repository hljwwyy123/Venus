import { StyleMap, dataMap } from "./constants";
import wanlongData from "./wanlong.json"

export function getRopeWayData() {
  const map = new Map()
  const data: any[] = [];
  wanlongData.forEach((el: any) => {
    if(map.has(el.type)) map.set(el.type, el.name)
    data.push({
      type: "Feature",
      properties: {
        name: el.name,
        wayid: el.wayid,
        type: el.type,
        style: StyleMap[dataMap[el.type+'']]
      },
      geometry: {
        type: "LineString",
        coordinates: el.nodes.map(e => [e.longitude, e.latitude])
      }
    })
  });
  
  console.log(map)
  return data
}