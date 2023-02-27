export default class Demo {
    ctx = null;
    canvasDom = null;
    stageWidth = 400;
    stageHeight = 400;
    fontSize = 400;
    xDelta = 0;
    yDelta = 0;
    text = '';
    gridSize = {
        x: 80,
        y: 80
    };
    coloredGridPos = {};

    init(dom, text) {
        this.canvasDom = typeof dom === 'string' ? document.getElementById(dom) : dom;
        this.ctx = this.canvasDom.getContext('2d');
        const style = this.canvasDom.getBoundingClientRect();
        this.stageWidth = style.width;
        this.stageHeight = style.height;
        const xDelta = this.stageWidth / this.gridSize.x;
        const yDelta = this.stageHeight / this.gridSize.y; // 400 / 100 = 4 lines; per line 4px offset
        this.xDelta = xDelta;
        this.yDelta = yDelta;
        // this.gridHelper()
        this.drawText(text);
        this.computedColoredGrid();
        this.paintTest();
        Util.ctx = this.ctx;
    }

    drawText(text){
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'top';
        this.ctx.font = `bold ${this.fontSize}px PingFang-SC`;
        this.ctx.fillText(text, 0, 0);
    }

    computedColoredGrid() {
        for (let x = 0; x < this.gridSize.x; x++) {
            for (let y = 0; y < this.gridSize.y; y++) {
                this.isColoredGrid(x, y)
            }
        }
        // console.log('coloredGrid: ', Object.values(this.coloredGridPos))
    }


    isColoredGrid(x, y) {
        var imageData = this.ctx.getImageData(x * this.xDelta, y * this.yDelta, this.xDelta, this.yDelta).data;
        let i = 4;
        while(!this.coloredGridPos[`${x}_${y}`] && i <= imageData.length ) {
            if (imageData[i-1] !== 0 ) {
                this.coloredGridPos[`${x}_${y}`] = {x, y};
            }
            i += 4;
        }
    }

    gridHelper() {
        this.ctx.strokeStyle = 'rgba(0,0,0,0.1)'
        for (let i = 0; i < this.gridSize.y + 1; i++) {
            Util.drawLine({x: 0, y: i * this.yDelta},{ x: this.stageWidth, y: i * this.yDelta})
        }
        for (let i = 0; i < this.gridSize.x + 1; i++) {
            Util.drawLine({x: i * this.xDelta, y: 0},{ x: i * this.xDelta, y: this.stageHeight})
        }
    }

    paintTest(){
        const panitCanvas = document.querySelector("#dot_canvas");
        const ctx = panitCanvas.getContext('2d');
        ctx.fillStyle = '#000000';
        const posList = Object.values(this.coloredGridPos);
        let pos = { x:0, y:0}
        for(let i = 0; i < posList.length; i++) {
            pos = posList[i];
            ctx.fillRect(
                pos.x * this.xDelta, 
                pos.y * this.yDelta, 
                this.xDelta-1,
                this.yDelta-1
            )
        }
    }
    
}


class Util {
    static ctx = null;
    static drawLine(P1, P2) {
        this.ctx.beginPath();
        this.ctx.moveTo(P1.x, P1.y);
        this.ctx.lineTo(P2.x, P2.y);
        this.ctx.stroke();
    }
}
