/**
 * 高斯模糊
 */
const gaussBlur = function (imgData, radius) {

    radius *= 3;

    //Copy图片内容
    let pixes = new Uint8ClampedArray(imgData.data);
    const width = imgData.width;
    const height = imgData.height;
    let gaussMatrix = [],
        gaussSum,
        x, y,
        r, g, b, a,
        i, j, k,
        w;

    radius = Math.floor(radius);
    const sigma = radius / 3;

    a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
    b = -1 / (2 * sigma * sigma);

    //生成高斯矩阵
    for (i = -radius; i <= radius; i++) {
        gaussMatrix.push(a * Math.exp(b * i * i));
    }

    //x 方向一维高斯运算
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            r = g = b = a = gaussSum = 0;
            for (j = -radius; j <= radius; j++) {
                k = x + j;
                if (k >= 0 && k < width) {
                    i = (y * width + k) * 4;
                    w = gaussMatrix[j + radius];

                    r += pixes[i] * w;
                    g += pixes[i + 1] * w;
                    b += pixes[i + 2] * w;
                    a += pixes[i + 3] * w;

                    gaussSum += w;
                }
            }

            i = (y * width + x) * 4;
            //计算加权均值
            imgData.data.set([r, g, b, a].map(v=>v / gaussSum), i);
        }
    }

    pixes.set(imgData.data);
    
    //y 方向一维高斯运算
    for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
            r = g = b = a = gaussSum = 0;
            for (j = -radius; j <= radius; j++) {
                k = y + j;

                if (k >= 0 && k < height) {
                    i = (k * width + x) * 4;
                    w = gaussMatrix[j + radius];

                    r += pixes[i] * w;
                    g += pixes[i + 1] * w;
                    b += pixes[i + 2] * w;
                    a += pixes[i + 3] * w;

                    gaussSum += w;
                }
            }
            i = (y * width + x) * 4;
            imgData.data.set([r, g, b, a].map(v=>v / gaussSum), i);
        }
    }

    return imgData;
};

export default gaussBlur
