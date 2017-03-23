import React, {Component} from 'react';
import {ImgFigure} from './imgFigure.js';// 除了export default，其他import的时候必须加上大括号
import imageDataWithUrl from './imageDataWithUrl.js';

export class Hello extends Component {
  constructor() {
    super();
    this.refArr = {};// 存放所有的ref
    this.imgFigures = [];// 所有imgFigure的集合
    this.refArr.imgFigure = [];// imgFigure(转换成实例是figure)的ref集合
    // 初始化各个图片的座位
    const initState = [];
    for (let i = 0; i < imageDataWithUrl.length; i++) {
      initState[i] = {
        pos: { // 座位的位置
          left: 0,
          top: 0
        },
        rotate: 0, // 旋转角度
        isInverse: false, // 正反面
        isCenter: false // 是否是中央的那个图片
      };
    }
    // React在ES6的实现中去掉了getInitialState这个hook函数，规定state在constructor中实现
    this.state = {imgsStateArr: initState};
    this.Constant = {
      centerPos: null, // 中心位置
      leftPosRange: {// 左侧区域的位置取值范围
        leftMin: null, // left的最小值
        leftMax: null, // left的最大值
        topMin: null, // top的最小值
        topMax: null // top的最大值
      },
      rightPosRange: {// 右侧区域的位置取值范围
        leftMin: null,
        leftMax: null,
        topMin: null,
        topMax: null
      },
      centerPosRange: {// 中心区域的位置取值范围（中间上半部分）
        leftMin: null,
        leftMax: null,
        topMin: null,
        topMax: null
      }
    };
  }
  /*
   * 重新布局所有的图片（获得新的座位排列）
   * @param centerIndex 中心位置图片的序号
   */
  arrangePicInRandom(centerIndex) {
    // 左侧部分取值范围赋值
    const lLMin = this.Constant.leftPosRange.leftMin;
    const lLMax = this.Constant.leftPosRange.leftMax;
    const lTMin = this.Constant.leftPosRange.topMin;
    const lTMax = this.Constant.leftPosRange.topMax;
    // 右侧部分取值范围赋值
    const rLMin = this.Constant.rightPosRange.leftMin;
    const rLMax = this.Constant.rightPosRange.leftMax;
    const rTMin = this.Constant.rightPosRange.topMin;
    const rTMax = this.Constant.rightPosRange.topMax;
    // 中心部分取值范围赋值（中间上半部分）
    const cLMin = this.Constant.centerPosRange.leftMin;
    const cLMax = this.Constant.centerPosRange.leftMax;
    const cTMin = this.Constant.centerPosRange.topMin;
    const cTMax = this.Constant.centerPosRange.topMax;
    const imgsStateArr = this.state.imgsStateArr;

    /* 图片布局的整体思路：
      imgsStateArr相当于一个座位排列名单(包含座位的位置，旋转等信息)，每个元素代表了一个座位，
      而每张图片都有自己的索引，每个图片根据自己的索引
      在imgsStateArr中找到自己的座位信息。
      下面的一大段代码，就是产生新的座位排列的过程
    */
    // 产生新的中心座位，并将中心座位的信息暂时拿出来（方便设置剩下的座位）
    const centerImgStateArr = imgsStateArr.splice(centerIndex, 1); // 获取新的中心座位
    centerImgStateArr[0].pos = this.Constant.centerPos;// 将这个座位的位置放到到中心
    centerImgStateArr[0].rotate = 0;// 中心的图片座位不需要旋转
    centerImgStateArr[0].isCenter = true;// 是否在中心的属性设置为是
    // 此时imgsStateArr中已经不包含中心座位
    // 上侧区域座位的个数
    const topImgNum = Math.floor(Math.random() * 2);// random返回一个0-1随机数,floor向下取整之后得到0或者1
    const topImgSpliceNum = Math.floor(Math.random() * (imgsStateArr.length - topImgNum));// 随机选取中心上部的座位索引
    const topImgsStateArr = imgsStateArr.splice(topImgSpliceNum, topImgNum);// 将上部座位取出来

    // 设置上部座位的位置
    topImgsStateArr.forEach((value, index) => {
      topImgsStateArr[index] = {
        pos: {
          top: this.getRandomInRange(cTMin, cTMax),
          left: this.getRandomInRange(cLMin, cLMax)
        },
        rotate: this.getRandomDegIn30(),
        isCenter: false,
        isInverse: false
      };
    });

    // 布局两侧座位的位置
    for (let i = 0, j = imgsStateArr.length, k = j / 2; i < j; i++) {
      if (i < k) {
        imgsStateArr[i] = {
          pos: {
            top: this.getRandomInRange(lTMin, lTMax),
            left: this.getRandomInRange(lLMin, lLMax)
          },
          rotate: this.getRandomDegIn30(),
          isCenter: false,
          isInverse: false
        };
      } else {
        imgsStateArr[i] = {
          pos: {
            top: this.getRandomInRange(rTMin, rTMax),
            left: this.getRandomInRange(rLMin, rLMax)
          },
          rotate: this.getRandomDegIn30(),
          isCenter: false,
          isInverse: false
        };
      }
    }
    // 将设置好的中心座位和上部座位放回去
    if (topImgsStateArr && topImgsStateArr[0]) {
      imgsStateArr.splice(topImgSpliceNum, 0, topImgsStateArr[0]);// 将重新设置好的中心上部图片状态放回去
    }
    imgsStateArr.splice(centerIndex, 0, centerImgStateArr[0]);// 将中心图片的状态放回去
    // 新的座位排好了
    this.setState({imgsStateArr});// state改变之后会调用render方法
  }
  /*
  * 获取区间内的随机值
  * @param min 区间的最小值
  * @param max 区间的最大值
  */
  getRandomInRange(min, max) {
    return Math.ceil((Math.random() * (max - min)) + min);
  }
  /*
  * 获取一个-30~30度以内的随机旋转角度
  */
  getRandomDegIn30() {
    return (Math.random() > 0.5 ? '' : '-') + (Math.random() * 30);
  }
  componentDidMount() {
    // 组件加载之后，为每个图片计算安排座位
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

      // 中心图片的位置赋值
      this.Constant.centerPos = {
        left: halfStageW - halfFigureW,
        top: halfStageH - halfFigureH
      };
      // 左侧部分取值范围赋值
      this.Constant.leftPosRange.leftMin = -halfFigureW;
      this.Constant.leftPosRange.leftMax = halfStageW - (halfFigureW * 3);
      this.Constant.leftPosRange.topMin = -halfFigureH;
      this.Constant.leftPosRange.topMax = stageHeight - halfFigureH;
      // 右侧部分取值范围赋值
      this.Constant.rightPosRange.leftMin = halfStageW + halfFigureW;
      this.Constant.rightPosRange.leftMax = stageWidth - halfFigureW;
      this.Constant.rightPosRange.topMin = -halfFigureH;
      this.Constant.rightPosRange.topMax = stageHeight - halfFigureH;
      // 中心部分取值范围赋值（中间上半部分）
      this.Constant.centerPosRange.leftMin = halfStageW - figureWidth;
      this.Constant.centerPosRange.leftMax = halfStageW;
      this.Constant.centerPosRange.topMin = -halfFigureH;
      this.Constant.centerPosRange.topMax = halfStageH - (halfFigureH * 3); // 好烦，强制要求加上括号，4不4洒
      // 安排座位
      this.arrangePicInRandom(0);
    }
  }
  /*
  * 将返回一个闭包函数
  * @param index 返回一个闭包函数，每个imgFigure都将有一个这个闭包函数
  * 闭包函数内的index索引与其所有者imgFigure的index是对应的
  * 同时这个闭包函数还持有指向当前对象实例的this
  */
  inverse(index) {
    const fun = () => {
      const imgsStateArr = this.state.imgsStateArr; // es6箭头函数的特性，this将绑定到当前这个对象实例
      imgsStateArr[index].isInverse = !imgsStateArr[index].isInverse; // 修改该函数所有者ImgFigure的座位信息信息
      this.setState({
        imgsStateArr
      });
    };
    return fun;
  }
  render() {
    const refArr = this.refArr;// ref的回调函数中不能直接用this（估计this在回调函数中的指向有问题）
    const controllerUnits = [];// 导航条控制节点的集合
    const imgFigures = this.imgFigures;// 图片节点的集合
    const stateInfo = this.state.imgsStateArr;
    // imgFigures[index]的属性state因为是引用imgsStateArr[index]的值，所以当imgsStateArr[index]修改的时候，
    // imgFigures[index]的属性state也会跟着动态修改！！
    /* 注意：当首次render执行之后，再次执行render的时候，会出现问题：
    Warning: `figure` was passed a style object that has previously been mutated.
     Mutating `style` is deprecated.
     Consider cloning it beforehand. Check the `render` of `ImgFigure`.
     Previous style: {pos: {left: 0, top: 0}}. Mutated style: {pos: {left: 199, top: 195}}.

     解释：
     The props object is now frozen, so mutating props after
     creating a component element is no longer supported.
      In most cases, React.cloneElement should be used instead.
       This change makes your components easier to reason about
       and enables the compiler optimizations mentioned above.

       目前的理解，挂载完的react组件重新渲染的时候不允许修改原来的props，
       （ImgFigure的props：state被动态修改了）
       （需要看看原理，可能和虚拟DOM有关）

       推荐使用React.cloneElement 但是没弄出来。。。。。回头再说吧，弄了一天好烦
       或者通过ref修改？这种方法可行的。一开始以为直接操作了dom会影响性能？
       后来一想，就算改的是虚拟dom，无论如何最后还是要修改真实的dom节点。
    */
    if (imgFigures.length > 0) { // 说明已经挂载过了
      // 通过ref来修改style
      imgFigures.forEach((value, index) => {
        refArr.imgFigure[index].style.left = stateInfo[index].pos.left + 'px';
        refArr.imgFigure[index].style.top = stateInfo[index].pos.top + 'px';
        (['-moz-', '-ms-', '-webkit', '']).forEach(value => {
          // 旋转一定角度
          refArr.imgFigure[index].style[value + 'transform'] = 'rotate(' + stateInfo[index].rotate + 'deg)';
        });
        // 如果座位信息的isInverse为true，则为imgfigure添加一个类名，否则移除is-inverse
        if (stateInfo[index].isInverse) {
          refArr.imgFigure[index].classList.add('is-inverse');
        } else {
          refArr.imgFigure[index].classList.remove('is-inverse');
        }
        // ??????还有一个问题就是，这里修改了已经挂载的组件的样式，但是下面又return了一个（而且要求必须return）
        // 还是要看看运行机理在回来回答一下
      });
    } else { // 第一次挂载，但是没有布局图片
      imageDataWithUrl.forEach((value, index) => {// 创建图片节点，添加到集合中
        imgFigures.push(<ImgFigure
          data={value}
          key={value.index}
          refRoom={refArr}
          inverse={this.inverse(index)}
          />);
          /* 组件的ref将添加到refRoom中
          不直接在这里给ref赋值的原因：在这里直接赋值，得到的是imgFigure节点，而不是真实的figure节点。
          将空的ref交给imgFigure
          由该对象为ref添上值 */
      });
    } // else end
    /* 当 state 发生改变时，React 提供的 render 方法并不会直接把你定义的 HTML 结构重新写进 DOM 中，
    而是在内部的 Virtual DOM 中进行 diff，再计算出需要更新的 DOM，
    最后再把这部分需要更新的 DOM 写入真正的 DOM 中。 */
    return (
      <section
        className="stage"
        ref={function (stage) {
          refArr.stage = stage;
        /*  es6中react添加ref采用回调函数的方式(官方文档中用this都没问题，但是这里不行，不知道为什么)
          执行该回调函数的时机是组件挂载完成后者组件卸载之后，这时该函数的调用者不是该实例对象，
          但是该回调函数的可以读到其包含环境的变量 */
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
  } // render end
}
