import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    padding: '0 10px',
    background: '#fff'
  },
  drawerContainer: {
    overflow: 'auto',
    marginTop: '5.5rem'
  }
}));

export default function SideBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <List>
            <Button
              variant="contained"
              size="large"
              color="primary"
              startIcon={<AddIcon />}
            >
              Add Info Room
            </Button>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
