import React, {Component} from 'react';
import {ImgFigure} from './imgFigure.js';// 除了export default，其他import的时候必须加上大括号
import imageDataWithUrl from './imageDataWithUrl.js';

export class Hello extends Component {
  constructor() {
    super();
    this.refArr = {};// 存放所有的ref
    this.Constant = {
      centerPos: null
    };
  }
  componentDidMount() {
    // 组件加载之后，为每个图片计算位置
    if (this.refArr.stage !== null) {
      // 首先获取一个舞台的大小
      const stageDOM = this.refArr.stage;
      const stageWidth = stageDOM.scrollWidth;// 记得复习一下scrollWidth，offsetWidth还有clientWidth
      const stageHeight = stageDOM.scrollHeight;
      const halfStageW = Math.ceil(stageWidth / 2);
      const halfStageH = Math.ceil(stageHeight / 2);

      // 获取一个imgFigure的大小
      const figureDOM = this.refArr.imgFigure[0];
      const figureWidth = figureDOM.scrollWidth;
      const figureHeight = figureDOM.scrollHeight;
      const halfFigureW = Math.ceil(figureWidth / 2);
      const halfFigureH = Math.ceil(figureHeight / 2);

      // 中心图片的位置
      this.Constant.centerPos = {
        left: halfStageW - halfFigureW,
        top: halfStageH - halfFigureH
      };
    }
  }
  render() {
    const refArr = this.refArr;// ref的回调函数中不能直接用this（估计this在回调函数中的指向有问题）
    const controllerUnits = [];// 导航条控制节点的集合
    const imgFigures = [];// 图片节点的集合
    refArr.imgFigure = [];// 图片节点的ref集合
    imageDataWithUrl.forEach(value => {// 创建图片节点，添加到集合中
      imgFigures.push(<ImgFigure data={value} key={value.index} refRoom={refArr}/>);// 组件的ref将添加到refRoom中
    });// 不直接在这里给ref赋值的原因：在这里直接赋值，得到的是imgFigure节点，而不是真实的figure节点。将空的ref交给imgFigure
    // 由该对象为ref添上值
    return (
      <section
        className="stage"
        ref={function (stage) {
          refArr.stage = stage;// es6中react添加ref采用回调函数的方式(官方文档中用this都没问题，但是这里不行，不知道为什么)
        }}// 执行该回调函数的时机是组件挂载完成后者组件卸载之后，这时该函数的调用者不是该实例对象，但是该回调函数的可以读到其包含环境的变量
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
