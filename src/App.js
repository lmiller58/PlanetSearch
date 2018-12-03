import React, { Component } from 'react';
import { fabric } from 'fabric';
import { connect } from 'react-redux';
import './App.css';
// import axios from 'axios';
// import SolarRenderer from './components/SolarRenderer';
import SearchStarForm from './components/SearchStarForm';
import StarGrid from './components/StarGrid';
import Drawer from './components/Bar';
class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  // componentDidUpdate() {
  //   this.setState({
  //     render: true
  //   });
  // }

  render() {
    return (
      <div className="App">
        <Drawer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stars: state.stars,
    grid: state.grid
  };
};
export default connect(mapStateToProps)(App);
