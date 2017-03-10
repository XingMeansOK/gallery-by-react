import React, {Component} from 'react';
import imageData from '../data/imageData.json';

// 通过自执行函数将图片的url路径信息添加到图片信息数组中
const imageDataWithUrl = (function (imageDataArr) {
  for (let i = 0, j = imageDataArr.length; i < j; i++) {
    const singleImageData = imageDataArr[i];
    // require的文件是‘.jpg’文件，这个文件会被url-loader处理，得到图片的url地址
    singleImageData.imageUrl = require('../images/' + singleImageData.filename);
    imageDataArr[i] = singleImageData;
  }
  return imageDataArr;
})(imageData);

console.log(imageDataWithUrl);

export class Hello extends Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">图片部分</section>
        <nav className="controller-nav">导航条</nav>
      </section>
    );
  }
}
