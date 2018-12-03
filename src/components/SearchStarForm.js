import React, { Component } from 'react';
import { connect } from 'react-redux';
import { determineViewRange } from '../util';
import axios from 'axios';
import { setStars } from '../store/stars';
import { setAxis } from '../store/grid';

class SearchStarForm extends Component {
  constructor() {
    super();
    this.state = {
      siderealTime: '',
      latitude: ''
    };
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };
  handleSubmitAndCalc = async evt => {
    evt.preventDefault();
    const localHours = +this.state.siderealTime.slice(0, 2);
    const localMinutes = +this.state.siderealTime.slice(3, 5);
    const currentRA = localHours * 15 + (localMinutes / 60) * 15;
    const latitude = +this.state.latitude;

    const { whereString, minX, maxX } = determineViewRange(currentRA, 50);

    const starsInRangeNoDec = await axios.get(
      `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exomultpars&select=distinct%20mpl_hostname,ra,dec,mpl_pnum&${whereString}&format=JSON`
    );

    const starsInRange = starsInRangeNoDec.data.filter(
      star => star.dec > latitude - 40 && star.dec < latitude + 40
    );
    this.props.setStars(starsInRange);
    this.props.setAxis({
      minX,
      maxX,
      minY: latitude - 50,
      maxY: latitude + 50
    });
    this.setState({ siderealTime: '', latitude: '' });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmitAndCalc}>
        <label>Local Sidereal Time</label>
        <br />
        <input
          type="text"
          name="siderealTime"
          placeholder="hours:minutes:seconds"
          onChange={this.handleChange}
          value={this.state.siderealTime}
        />
        <br />
        <label>Local Latitude</label>
        <br />
        <input
          type="text"
          name="latitude"
          placeholder="degrees latitude"
          onChange={this.handleChange}
          value={this.state.latitude}
        />
        <br />
        <button>Search by coordinates</button>
      </form>

      //Conditionally render starlist and view port base on form data
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setStars: stars => dispatch(setStars(stars)),
    setAxis: axisInfo => dispatch(setAxis(axisInfo))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(SearchStarForm);
