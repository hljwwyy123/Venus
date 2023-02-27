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
        x: 20,
        y: 20
    };
    coloredGridPos = []

    gridHelper() {
        this.ctx.strokeStyle = 'rgba(0,0,0,0.1)'
        for (let i = 0; i < this.gridSize.y + 1; i++) {
            this.drawLine({x: 0, y: i * this.yDelta},{ x: this.stageWidth, y: i * this.yDelta})
        }
        for (let i = 0; i < this.gridSize.x + 1; i++) {
            this.drawLine({x: i * this.xDelta, y: 0},{ x: i * this.xDelta, y: this.stageHeight})
        }
    }

    computedColoredGrid() {
        for (let x = 0; x < this.xDelta; x++) {
            for (let y = 0; y < this.yDelta; y++) {
                this.isColoredGrid(x, y)
            }
        }
        console.log('coloredGridPos',this.coloredGridPos)
    }

    isColoredGrid(x, y) {
        var imageData = this.ctx.getImageData(x * this.xDelta, y * this.yDelta, this.xDelta, this.yDelta).data;
        // var imageData = this.ctx.getImageData(x, y, 1, 1).data;
        for (var i = imageData.length; i >= 0; i -= 4) {
            // If not an empty pixel
            if (imageData[i] !== 0) {
                // console.log('position: ',i , 'has pixel')
                this.coloredGridPos.push({x, y})
            }
        }
    }

    drawLine(P1, P2) {
        this.ctx.beginPath();
        this.ctx.moveTo(P1.x, P1.y);
        this.ctx.lineTo(P2.x, P2.y);
        this.ctx.stroke();
    }

    init(dom, text) {
        this.canvasDom = typeof dom === 'string' ? document.getElementById(dom) : dom;
        this.ctx = this.canvasDom.getContext('2d');
        const style = this.canvasDom.getBoundingClientRect();
        this.stageWidth = style.width;
        this.stageHeight = style.height;
        const yDelta = this.stageHeight / this.gridSize.y; // 400 / 100 = 4 lines; per line 4px offset
        const xDelta = this.stageWidth / this.gridSize.x;
        this.xDelta = xDelta;
        this.yDelta = yDelta;
        // this.gridHelper()
        this.drawText(text);
        this.computedColoredGrid()
    }
    drawText(num) {

        // Create a number on a seperate canvas
        // Use a seperate canvas thats smaller so we have less data to loop over when using getImagedata()

        //	Clear stage of previous numbers
        // this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.ctx.fillStyle = "black";
        // this.ctx.textAlign = 'center';
        // this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'top';
        this.ctx.font = `bold ${this.fontSize}px PingFang-SC`;
        // this.ctx.fillText(num, this.stageWidth/2, this.stageHeight/2);
        this.ctx.fillText(num, 0, 0);

        var ctx = this.ctx;
        var circleRadius = 10;
        // getImageData(x, y, width, height)
        // note: is an exspenisve function, so make sure canvas is small as possible for what you grab
        // Returns 1 Dimensional array of pixel color value chanels
        // Red, blue, green, alpha chanel of single pixel
        // First chanel is red
        var imageData = ctx.getImageData(0, 0, this.stageWidth, this.stageHeight).data;

        // Clear number coordinated
        var numberPixelCoordinates = [];

        // i is equal to total image data(eg: 480,000)
        // run while i is greater or equal to 0
        // every time we run it minus 4 from i. Do this because each pixel has 4 chanels & we are only interested in individual pixels 
        for (var i = imageData.length; i >= 0; i -= 4) {

            // If not an empty pixel
            if (imageData[i] !== 0) {

                // i represents the position in the array a red pixel was found

                // (i / 4 ) and percentage by width of canvas
                // Need to divide i by 4 because it has 4 values and you need its orginal position
                // Then you need to percentage it by the width(600) because each row contains 600 pixels and you need its relative position in that row
                var x = (i / 4) % this.stageWidth;

                // (i divide by width) then divide by 4
                // Divide by width(600) first so you get the rows of pixels that make up the canvas. Then divide by 4 to get its postion within the row
                var y = Math.floor(Math.floor(i / this.stageHeight) / 4);

                // If position exists and number is divisble by circle plus a pixel gap then add cordinates to array. So circles do not overlap
                if ((x && x % (circleRadius * 2 + 3) == 0) && (y && y % (circleRadius * 2 + 3) == 0)) {
                    // Push object to numberPixels array with x and y coordinates
                    numberPixelCoordinates.push({
                        x: x,
                        y: y
                    });

                }

            }
        }
        console.log({numberPixelCoordinates})
        // formNumber();

    }
}
