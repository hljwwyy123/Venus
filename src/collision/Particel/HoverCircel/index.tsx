import React, { PureComponent } from "react";
import { Stage, CanvasGridLayer, CanvasGridCircle as Circle } from "@alife/aseat-core";
import { seatFactory } from "./utils";
import { startFPS, stopFPS } from '@/utils/fps';

class HoverSeat extends PureComponent {
  stageWidth: number;
  stageHeight: number;
  seatLayer: CanvasGridLayer;
  stage: Stage;
  hoverSeat: Circle;

  componentDidMount = () => {
    startFPS()
    this.initComponent();
  };

  initComponent = () => {
    this.stageWidth = 0;
    this.stageHeight = 0;
    this.stage = new Stage({
      container: this.refs.aseat,
      contentWidth: 1200,
      contentHeight: 800,
      maxZoom: 4,
      dimensionWidth: 20000,
      dimensionHeight: 20000,
    });
    this.seatLayer = new CanvasGridLayer({ name: "seatLayer", size: 200 });
    this.stage.addLayer(this.seatLayer);
    seatFactory(this.seatLayer, 0, 0, 100, 100);
    this.attachEvent();
  };

  attachEvent = () => {
    this.seatLayer.on("item:mouseenter", this.onMouseEnter);
    this.seatLayer.on("item:mouseleave", this.onMouseLeave);
  };

  onMouseEnter = e => {
    this.hoverSeat = e.item;
    // 备份mouseEnter 时座位原来的样式，mouseLeave的时候还原
    this.hoverSeat.setAttrs({
      fill: "green",
      strokeWidth: 3,
    });
    this.seatLayer.updateItem(this.hoverSeat);
    this.seatLayer.render();
  };

  onMouseLeave = () => {
    if (this.hoverSeat) {
      this.hoverSeat.setAttrs({
        fill: "red",
        strokeWidth: 1,
      });
      this.seatLayer.updateItem(this.hoverSeat);
      this.seatLayer.render();
      this.hoverSeat = null;
    }
  };

  render() {
    return <div ref="aseat" id="aseat" style={{width: 1000, height: 1000}}/>;
  }
}

export default function HugeCircleHover() {
  return <HoverSeat />
}