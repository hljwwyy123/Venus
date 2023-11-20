import { StyleMap, dataMap } from "./constants";
import wanlongData from "./wanlong.json"

export function getFormatData() {
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

export function getRopeWayData() {
  const data = wanlongData.filter((el: any) => el.type == 1);
  const result: any = []
  data.forEach((el: any) => {
    result.push({
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
  return result;
}