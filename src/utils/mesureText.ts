interface TextBBox {
  width: number;
  height: number;
}

export function mesureTextForDOM (textItem): TextBBox {
  const textDom = document.createElement("span");
  document.body.appendChild(textDom);
  textDom.innerHTML = textItem.text;
  textDom.style.fontFamily = textItem.fontFamily || 'normal';
  textDom.style.fontSize = `${textItem.fontSize}px`;
  textDom.style.lineHeight = textItem.lineHeight || textItem.fontSize;
  const domRect = textDom.getBoundingClientRect();
  const textBBox = { width: domRect.width, height: domRect.height };
  document.body.removeChild(textDom);
  return textBBox;
}

/**
 * @description: 二分法计算合适的字体尺寸
 * @param {number} size 初始字体大小
 * @param {number} max 预览图最大宽 / 高
 * @param {function} culcalate 获取当前文本实际 宽 / 高 的计算函数
 */
export function measureDivBinary(text, min, max, width, height) {
  if (max - min < 1) {
    return Math.floor(min)
  }
  var cur = min + (max - min) / 2; // 一次加 delta的一半
  const textBox = mesureTextForDOM({
    text,
    fontFamily: "PingFang-SC,arial,sans-serif",
    fontSize: cur
  });
  if (textBox.width >= width || textBox.height >= height) {
    return measureDivBinary(text, min, cur, width, height)
  } else {
    return measureDivBinary(text, cur, max, width, height)
  }
}