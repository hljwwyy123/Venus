import { CanvasCircle as Circle, Layer } from "venus-render-core";

export function seatFactory(seatLayer: Layer, xOffset = 300, yOffset = 100, rowCount:number = 20, cellCount: number = 20) {
  let tmpData: Array<Circle> = [];
  let blockId = Date.now();
  for (let r = 0; r < rowCount; r++) {
    let cx: number = xOffset + 10 + 28 * r;
    for (let c = 0; c < cellCount; c++) {
      let cy: number = yOffset + 10 + 28 * c;
      let circle = new Circle({ cx, cy, r: 12, ...SEAT_SELECT_STYLE.DEFAULT });
      circle._class = "Seat"
      circle._children = [{ cx, cy }]
      circle.rowId = `${blockId}_${c}`;
      circle.blockId = blockId;
      tmpData.push(circle);
    }
  }
  seatLayer.addItems(tmpData);
  seatLayer.render();
  return tmpData;
}

const SEAT_SELECT_STYLE = {
  SELECTED: {
    fill: "green",
    stroke: "#CCCCCC"
  },
  DEFAULT: {
    fill: "red",
    stroke: "#CCCCCC"
  }
}