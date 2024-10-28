const PNG = require("pngjs").PNG;
const fs = require("fs");
const path = require("path")
const sharp = require("sharp")

sharp("/Users/joy/code/Venus/node/images/moto.webp").png().toFile("./1.png")

// fs.createReadStream("/Users/joy/code/Venus/node/images/moto.webp")
//   .pipe(
//     new PNG({
//       filterType: -1,
//     })
//   )
//   .on("parsed", function () {
//     for (var y = 0; y < this.height; y++) {
//       for (var x = 0; x < this.width; x++) {
//         var idx = (this.width * y + x) << 2;

//         // invert color
//         this.data[idx] = 255 - this.data[idx];
//         this.data[idx + 1] = 255 - this.data[idx + 1];
//         this.data[idx + 2] = 255 - this.data[idx + 2];

//         // and reduce opacity
//         this.data[idx + 3] = this.data[idx + 3] >> 1;
//       }
//     }

//     this.pack().pipe(fs.createWriteStream("./out.png"));
//   })
//   .on("error", res =>  {
//     console.log('error----',res)
//   })