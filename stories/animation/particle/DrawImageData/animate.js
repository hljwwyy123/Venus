import { measureDivBinary} from "@/utils/mesureText"

const GlobalOption = {
    gridSize: { // 一共有多少个格子, 根据 canvas宽、高 和 delta 动态计算
        x: 0,
        y: 0
    },
    xDelta: 8,  // 每个格子的大小
    yDelta: 8, // 每个格子的大小
    fontSize: 400,
    stageWidth: 0,
    stageHeight: 0,
}
export default class DrawText {
    canvasDom = null;
    ctx = null;
    coloredGridPos = {};

    init(options) {
        const { paintDom, stageSize = {}, text = '', pixelSize = {w: 2, h: 2} } = options;
        this.canvasDom = typeof paintDom === 'string' ? document.getElementById(paintDom) : paintDom; 
        const style = this.canvasDom.getBoundingClientRect();
        this.ctx = this.canvasDom.getContext('2d');
        GlobalOption.stageWidth = stageSize.width || ~~style.width;
        GlobalOption.stageHeight = stageSize.height || ~~style.height;
        this.canvasDom.width = GlobalOption.stageWidth;
        this.canvasDom.height = GlobalOption.stageHeight;
        GlobalOption.text = text;
        GlobalOption.xDelta = pixelSize.w || 8
        GlobalOption.yDelta = pixelSize.h || 8
        GlobalOption.gridSize = {
            x: GlobalOption.stageWidth / GlobalOption.xDelta,
            y: GlobalOption.stageHeight / GlobalOption.yDelta,
        }
        console.log(GlobalOption)
        return GlobalOption
    }

    drawPixelText(text){
        Utils.gridHelper(this.ctx)
        const offscreenHelper = new OffScreenHelper()
        GlobalOption.text = text;
        offscreenHelper.drawText(text);
        this.coloredGridPos = offscreenHelper.computedColoredGrid();
        this.ctx.fillStyle = 'red';
        const posList = Object.values(this.coloredGridPos);
        let pos = { x: 0, y: 0 }
        for(let i = 0; i < posList.length; i++) {
            pos = posList[i];
            this.ctx.fillRect(
                pos.x * GlobalOption.xDelta, 
                pos.y * GlobalOption.yDelta, 
                GlobalOption.xDelta-1,
                GlobalOption.yDelta-1
            )
        }
        console.log({coloredGridPos: this.coloredGridPos})
        return this.coloredGridPos;
    }
}

class OffScreenHelper {
    ctx = null;
    offscreenCanvasDom = null;
    coloredGridPos = {};
    constructor() {
        this.offscreenCanvasDom = document.createElement("canvas");
        this.offscreenCanvasDom.width = GlobalOption.stageWidth;
        this.offscreenCanvasDom.height = GlobalOption.stageHeight;
        this.ctx = this.offscreenCanvasDom.getContext('2d');
    }

    drawText(text){
        GlobalOption.fontSize = measureDivBinary(text, 0, GlobalOption.fontSize, GlobalOption.stageWidth, GlobalOption.stageHeight)
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = `bold ${GlobalOption.fontSize}px PingFang-SC`;
        this.ctx.fillText(text, GlobalOption.stageWidth / 2, GlobalOption.stageHeight / 2);
    }

    computedColoredGrid() {
        for (let x = 0; x < GlobalOption.gridSize.x; x++) {
            for (let y = 0; y < GlobalOption.gridSize.y; y++) {
                this.isColoredGrid(x, y)
            }
        }
        return this.coloredGridPos;
        // console.log('coloredGrid: ', Object.values(this.coloredGridPos))
    }

    isColoredGrid(x, y) {
        var imageData = this.ctx.getImageData(x * GlobalOption.xDelta, y * GlobalOption.yDelta, GlobalOption.xDelta, GlobalOption.yDelta).data;
        // console.log('imageData.length', imageData.length)
        let i = 4;
        let pixelCount = 0;
        const percentage = (GlobalOption.xDelta * GlobalOption.yDelta / 3)
        while(!this.coloredGridPos[`${x}_${y}`] && i <= imageData.length ) {
            if (imageData[i-1] !== 0 ) {
                pixelCount++
                // this.coloredGridPos[`${x}_${y}`] = {x, y}; // 减少计算量，grid内有像素就算
            }
            if (pixelCount >= percentage) { // 像素点做一个阈值，计算量变很大
                pixelCount = 0;
                this.coloredGridPos[`${x}_${y}`] = {x, y};
            }
            i += 4;
        }
    }


}

class Utils {
    static gridHelper(ctx) {
        ctx.strokeStyle =  'rgba(0,0,0,0.1)';
        for (let i = 0; i < GlobalOption.gridSize.y + 1; i++) {
            this.drawLine({x: 0, y: i * GlobalOption.yDelta},{ x: GlobalOption.stageWidth, y: i * GlobalOption.yDelta}, ctx)
        }
        for (let i = 0; i < GlobalOption.gridSize.x + 1; i++) {
            this.drawLine({x: i * GlobalOption.xDelta, y: 0},{ x: i * GlobalOption.xDelta, y: GlobalOption.stageHeight}, ctx)
        }
    }

    static drawLine(P1, P2, ctx) {
        ctx.beginPath();
        ctx.moveTo(P1.x, P1.y);
        ctx.lineTo(P2.x, P2.y);
        ctx.stroke();
    }
}


