import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchStarForm from './SearchStarForm';
import { connect } from 'react-redux';
import axios from 'axios';
import SolarRenderer from './SolarRenderer';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import SolarGrid from './StarGrid';
import { setSystem } from '../store/systemInfo';
import { Button } from '@material-ui/core';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerBackground: {
    backgroundColor: '#9E9E9E',
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  tooler: {
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    width: '50%'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

class LeftDrawer extends Component {
  constructor() {
    super();
    this.state = {
      renderSystem: false,
      planets: [],
      system: {}
    };
  }
  handleClick = async name => {
    try {
      history.push('/');
      const { data } = await axios.get(
        `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exomultpars&select=distinct%20mpl_name,hip_name,ra,dec,mpl_pnum,mst_lum,mst_dens,mst_logg,mst_age&where=mpl_hostname%20like%20%27${name}%27&format=JSON`
      );
      let starData = {};
      let names = [];
      data.forEach(star => (starData = { ...star }));
      for (let i = 1; i <= starData.mpl_pnum; i++) {
        names.push(`${starData.mpl_name} - ${i}`);
      }
      starData.names = names;
      this.props.setSystem(starData);
      history.push('/system');
      // console.log(starData);
    } catch (err) {
      console.error(err);
    }
  };
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.tooler}>
            <Typography
              className={classes.button}
              onClick={() => history.push('/')}
              variant="h6"
              color="inherit"
              noWrap
            >
              Star Search
            </Typography>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => history.push('/view')}
            >
              View
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerBackground
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <SearchStarForm />
          </List>
          <Divider />
          <List>
            {this.props.stars.map((star, index) => (
              <ListItem
                button
                key={index}
                onClick={() => this.handleClick(star.mpl_hostname)}
              >
                <ListItemText
                  primary={`${star.mpl_hostname}(${star.mpl_pnum})`}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <Router history={history}>
            <Switch>
              <Route exact path="/system" component={SolarRenderer} />
              <Route exact path="/view" component={SolarGrid} />
            </Switch>
          </Router>
        </main>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    stars: state.stars
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSystem: system => dispatch(setSystem(system))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LeftDrawer));
