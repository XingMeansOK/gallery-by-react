import React, {Component} from 'react';

export class ImgFigure extends Component { // 单张图片节点类,类名首字母一定要大写！！！（不大写出不来）
  static get propTypes() {
    return {
      data: React.PropTypes.object, // 验证参数：要求传进来的data是个对象。详细搜索props验证
      refRoom: React.PropTypes.object
    };
  }
  render() {
    const refRoom = this.props.refRoom;
    const index = this.props.data.index;
    return (// className双引号
      <figure
        className="img-figure"
        ref={
          function (_ref) {
            refRoom.imgFigure[index] = _ref;
          }}
        >
        <img src={this.props.data.imageUrl} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}
