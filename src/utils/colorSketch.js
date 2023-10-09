import stackBlurCanvasRGBA from "./stackblur"
import gaussBlur from "./gaussianBlur"

// 将原始彩色照片转换为灰度图像
function grayScaleU8(imgData, canvasWidth, canvasHeight) {
  var grayData = new Uint8ClampedArray(canvasWidth * canvasHeight);
  for(var i =0; i < grayData.length; i++) {
    var r = imgData.data[i*4];
    var g = imgData.data[i*4+1];
    var b = imgData.data[i*4+2];
    grayData[i] =0.299*r +0.587*g +0.114*b;
  }
  return grayData
}

function grayscale(imgData) {
  for (var i = 0; i < imgData.data.length; i += 4) {
    var gray = parseInt(0.2989 * imgData.data[i] + 0.5870 * imgData.data[i + 1] + 0.1140 * imgData.data[i + 2]);
    imgData.data[i] = gray;
    imgData.data[i + 1] = gray;
    imgData.data[i + 2] = gray;
  }
  return imgData;
}

function gaussianBlur(imgData, radius) {
  return stackBlurCanvasRGBA(imgData, radius)
  // return gaussBlur(imgData, radius)
}

// 边缘检测
function edgeDetection(imgData) {
  // TODO: 实现边缘检测算法
  return imgData;
}

// 颜色叠加
function colorOverlay(baseImgData, overlayImgData, alpha) {
  for (var i = 0; i < baseImgData.data.length; i += 4) {
    baseImgData.data[i] = (1 - alpha) * baseImgData.data[i] + alpha * overlayImgData.data[i];
    baseImgData.data[i + 1] = (1 - alpha) * baseImgData.data[i + 1] + alpha * overlayImgData.data[i + 1];
    baseImgData.data[i + 2] = (1 - alpha) * baseImgData.data[i + 2] + alpha * overlayImgData.data[i + 2];
  }
  return baseImgData;
}

function colorSketch(src) {
  // 加载图像并进行处理
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    imgData = grayscale(imgData);
    imgData = gaussianBlur(imgData, 5);
    imgData = edgeDetection(imgData);
    var overlayImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    imgData = colorOverlay(imgData, overlayImgData, 0.5);
    ctx.putImageData(imgData, 0, 0);
    document.body.appendChild(canvas);
  };
  img.src = src;
}

colorSketch("https://img.alicdn.com/imgextra/i3/O1CN01KhDsI21YzaVEcFpxp_!!6000000003130-0-tps-1828-1706.jpg")
