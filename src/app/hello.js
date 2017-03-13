import React, {Component} from 'react';
import {ImgFigure} from './imgFigure.js';// 除了export default，其他import的时候必须加上大括号
import imageDataWithUrl from './imageDataWithUrl.js';

export class Hello extends Component {
  constructor() {
    super();
    this.refArr = {};
  }
  componentDidMount() {
    // 组件加载之后，为每个图片计算位置
    if (this.refArr.stage !== null) {
      console.log(this.refArr.stage);
      console.log(this.refArr.imgFigure);
    }
  }
  render() {
    const refArr = this.refArr;// ref的回调函数中不能直接用this（估计this在回调函数中的指向有问题）
    const controllerUnits = [];// 导航条控制节点的集合
    const imgFigures = [];// 图片节点的集合
    refArr.imgFigure = [];// 图片节点的ref集合
    imageDataWithUrl.forEach((value, index) => {// 创建图片节点，添加到集合中
      imgFigures.push(<ImgFigure
        data={value} key={value.index}
        ref={function (_img) {
          refArr.imgFigure[index] = _img;
        }}
        />);
    });
    return (
      <section
        className="stage"
        ref={function (stage) {
          refArr.stage = stage;// es6中react添加ref采用回调函数的方式(官方文档中用this都没问题，但是这里不行，不知道为什么)
        }}
        >
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}
