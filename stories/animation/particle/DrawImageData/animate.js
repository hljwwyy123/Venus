import { measureDivBinary } from "@/utils/mesureText"

const GlobalOption = {
    gridSize: {
        row: 0,
        column: 0
    },
    gridWidth: 8, 
    gridHeight: 8,
    fontSize: 400,
    stageWidth: 0,
    stageHeight: 0,
}
export default class DrawText {
    canvasDom = null;
    ctx = null;
    coloredGridPos = {};

    init(options) {
        const { container = null, paintDom, stageSize = {}, text = '', pixelSize = {w: 2, h: 2}, paint = false } = options;
        if (paintDom) {
            this.canvasDom = typeof paintDom === 'string' ? document.getElementById(paintDom) : paintDom; 
        } else {
            this.canvasDom = document.createElement("canvas")
            if (paint) {
                if (container) {
                    document.querySelector(container).appendChild(this.canvasDom)
                } else {
                    document.body.appendChild(this.canvasDom)
                }
                this.canvasDom.width = stageSize.width;
                this.canvasDom.height = stageSize.height
            }
        }
        const style = this.canvasDom.getBoundingClientRect();
        
        this.ctx = this.canvasDom.getContext('2d');
        GlobalOption.stageWidth = stageSize.width || ~~style.width;
        GlobalOption.stageHeight = stageSize.height || ~~style.height;
        this.canvasDom.width = GlobalOption.stageWidth;
        this.canvasDom.height = GlobalOption.stageHeight;
        GlobalOption.text = text;
        GlobalOption.gridWidth = pixelSize.w || 8
        GlobalOption.gridHeight = pixelSize.h || 8
        GlobalOption.gridSize = {
            row: GlobalOption.stageWidth / GlobalOption.gridWidth,
            column: GlobalOption.stageHeight / GlobalOption.gridHeight,
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
                pos.x * GlobalOption.gridWidth, 
                pos.y * GlobalOption.gridHeight, 
                GlobalOption.gridWidth-1,
                GlobalOption.gridHeight-1
            )
        }
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
        for (let x = 0; x < GlobalOption.gridSize.row; x++) {
            for (let y = 0; y < GlobalOption.gridSize.column; y++) {
                this.isColoredGrid(x, y)
            }
        }
        return this.coloredGridPos;
    }

    isColoredGrid(x, y) {
        var imageData = this.ctx.getImageData(x * GlobalOption.gridWidth, y * GlobalOption.gridHeight, GlobalOption.gridWidth, GlobalOption.gridHeight).data;
        let i = 4;
        let pixelCount = 0;
        const percentage = (GlobalOption.gridWidth * GlobalOption.gridHeight / 3)
        while(!this.coloredGridPos[`${x}_${y}`] && i <= imageData.length ) {
            if (imageData[i-1] !== 0 ) {
                pixelCount++
            }
            if (pixelCount >= percentage) {
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
        for (let i = 0; i < GlobalOption.gridSize.column + 1; i++) {
            this.drawLine({x: 0, y: i * GlobalOption.gridHeight},{ x: GlobalOption.stageWidth, y: i * GlobalOption.gridHeight}, ctx)
        }
        for (let i = 0; i < GlobalOption.gridSize.row + 1; i++) {
            this.drawLine({x: i * GlobalOption.gridWidth, y: 0},{ x: i * GlobalOption.gridWidth, y: GlobalOption.stageHeight}, ctx)
        }
    }

    static drawLine(P1, P2, ctx) {
        ctx.beginPath();
        ctx.moveTo(P1.x, P1.y);
        ctx.lineTo(P2.x, P2.y);
        ctx.stroke();
    }
}


