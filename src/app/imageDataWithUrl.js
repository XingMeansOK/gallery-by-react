import imageData from '../data/imageData.json';

// 通过自执行函数将图片的url路径信息添加到图片信息数组中
const imageDataWithUrl = (function (imageDataArr) {
  for (let i = 0, j = imageDataArr.length; i < j; i++) {
    const singleImageData = imageDataArr[i];
    // require的文件是‘.jpg’文件，这个文件会被url-loader处理，得到图片的url地址
    singleImageData.imageUrl = require('../images/' + singleImageData.filename);
    singleImageData.index = i;
    imageDataArr[i] = singleImageData;
  }
  return imageDataArr;
})(imageData);

export default imageDataWithUrl;
