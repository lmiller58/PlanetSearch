import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#BDBDBD'
  }
});

const mapStateToProps = state => ({
  system: state.systemInfo
});

function SystemDetails(props) {
  const { classes } = props;
  const system = props.system;
  const dataSanitizer = {
    'Hipparcos Name': system.hip_name,
    'Kepler Name': system.mpl_name,
    'Declination(degrees)': system.dec,
    'Right Ascension(degrees)': system.ra,
    'Planets in System': system.mpl_pnum,
    'Star Age(Billions of Years)': system.mst_age,
    'Density (g/cm^3)': system.mst_dens,
    'Surface Gravity': system.mst_logg,
    'Luminosity(suns)': system.mst_lum
  };
  // console.log(Object.keys(this.props))
  return (
    <div className={classes.root}>
      <List component="nav">
        {Object.keys(dataSanitizer).map(info => (
          <ListItem>
            <ListItemText
              inset
              color="secondary"
              primary={`
                ${info} :
                ${dataSanitizer[info] || 'not found'}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default connect(mapStateToProps)(withStyles(styles)(SystemDetails));
