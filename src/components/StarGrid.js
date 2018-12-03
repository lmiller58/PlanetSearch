import React, { Component } from 'react';
import { fabric } from 'fabric';
import { convertStarsToGrid } from '../util';
import { connect } from 'react-redux';
import zIndex from '@material-ui/core/styles/zIndex';

const mapStateToProps = state => {
  return {
    stars: state.stars,
    grid: state.grid
  };
};
class StarGrid extends Component {
  constructor() {
    super();
    this.state = {
      starMap: {}
    };
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.stars !== prevProps.stars ||
      this.props.grid !== prevProps.grid
    ) {
      const { minX, maxX, minY, maxY } = this.props.grid;
      const starMap = convertStarsToGrid(
        this.props.stars,
        minX,
        maxX,
        minY,
        maxY
      );
      // this.setState({
      //   starMap
      // });
      // console.log(this.state.starMap);
      (function(starMap) {
        let canvas = new fabric.Canvas('grid', {
          hoverCursor: 'pointer',
          selection: false,
          perPixelTargetFind: true,
          targetFindTolerance: 5
        });
        canvas.clear();
        let grid = new fabric.Rect({
          height: 600,
          width: 600,
          stroke: 'black',
          strokeWidth: 2,
          fill: 'black',
          zIndex: 1
        });
        canvas.add(grid);
        let minX_Y = new fabric.IText(`${minX}, ${minY}`, {
          left: 60,
          top: 540,
          fill: 'green'
        });
        let maxXText = new fabric.IText(`${maxX}`, {
          left: 540,
          top: 540,
          fill: 'green'
        });
        let maxYText = new fabric.IText(`${maxY}`, {
          left: 40,
          top: 60,
          fill: 'green'
        });
        for (let star in starMap) {
          let newStar = new fabric.Circle({
            radius: 7,
            left: starMap[star][0],
            top: starMap[star][1],
            fill: 'skyblue',
            zIndex: 2
          });

          canvas.add(newStar);
        }

        canvas.add(minX_Y, maxXText, maxYText);
        canvas.renderAll();
      })(starMap);
    }
  }
  componentDidMount() {
    const { minX, maxX, minY, maxY } = this.props.grid;
    const starMap = convertStarsToGrid(
      this.props.stars,
      minX,
      maxX,
      minY,
      maxY
    );
    // this.setState({
    //   starMap
    // });
    // console.log(this.state.starMap);
    (function(starMap) {
      let canvas = new fabric.Canvas('grid', {
        hoverCursor: 'pointer',
        selection: false,
        perPixelTargetFind: true,
        targetFindTolerance: 5
      });
      canvas.clear();
      let grid = new fabric.Rect({
        height: 600,
        width: 600,
        stroke: 'black',
        strokeWidth: 2,
        fill: 'black',
        zIndex: 1
      });
      canvas.add(grid);
      let minX_Y = new fabric.IText(`${minX}, ${minY}`, {
        left: 60,
        top: 540,
        fill: 'green'
      });
      let maxXText = new fabric.IText(`${maxX}`, {
        left: 540,
        top: 540,
        fill: 'green'
      });
      let maxYText = new fabric.IText(`${maxY}`, {
        left: 40,
        top: 60,
        fill: 'green'
      });
      for (let star in starMap) {
        let newStar = new fabric.Circle({
          radius: 7,
          left: starMap[star][0],
          top: starMap[star][1],
          fill: 'skyblue',
          zIndex: 2
        });

        canvas.add(newStar);
      }

      canvas.add(minX_Y, maxXText, maxYText);
      canvas.renderAll();
    })(starMap);
  }
  componentWillUnmount() {
    let canvas = new fabric.Canvas('grid');
    canvas.clear();
  }
  render() {
    return (
      <div>
        <canvas id="grid" width="600" height="600" />
      </div>
    );
  }
}

export default connect(mapStateToProps)(StarGrid);
