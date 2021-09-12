import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { logoutUser } from 'store/actions/authActions';
import compose from 'recompose/compose';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { AccountCircle } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  logoHorizontallyCenter: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  contained: {
    background: 'rgba(0,0,0,.2)',
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
  }
});

class Navbars extends React.Component {
  state = {
    elm: null
  }

  handleMenu = e => {
    e.preventDefault();
    this.setState({ elm: this.state.elm ? null : e.currentTarget });
  };

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <img src="/img/text-logo.png" alt="logo" />

          <Typography variant="h6" className={classes.title} />

          <Button component={RouterLink} to="/" color="inherit" className={classes.contained}>
            Dashboard
          </Button>

          <Button component={RouterLink} to="/create-project" color="inherit" className={classes.contained}>
            New Project
          </Button>

          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={e => this.handleMenu(e)}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={ this.state.elm }
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={ Boolean(this.state.elm) }
            onClose={ e => this.handleMenu(e) }
          >
            <MenuItem disabled>{ this.props.auth.user.name }</MenuItem>
            <MenuItem>
              <Button onClick={() => this.props.logoutUser()}>
                Logout
              </Button>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    )
  }
}

Navbars.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => state;

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { logoutUser })
)(Navbars);
