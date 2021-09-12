import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Grid, Button, TextField, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import ModalAddRoomButton from './ModalAddRoomButton';
import { Delete, ArrowBack } from '@material-ui/icons';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    padding: '30px',
    background: '#fff'
  },
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const RoomTourEditor = () => {
  const classes = useStyles();
  const history = useHistory();
  const { roomIndex, tour } = useParams();
  const [modal, setModal] = useState(false);
  const [listRoom, setListRoom] = useState([]);
  const [listButton, setListButton] = useState([]);

  useEffect(() => {
    const fetchApi = () => {
      axios.get(`${process.env.REACT_APP_API_SERVER}project/${tour}`)
        .then(res => {
          setListButton(res.data.roomList[roomIndex].roomButton)
          setListRoom(res.data.roomList)
        });
    }

    fetchApi();
  }, [tour, roomIndex]);

  const deleteRoom = () => {
    const makeSure = window.confirm(`Apakah Anda Yakin ?`);

    if (makeSure) {
      axios.delete(`${process.env.REACT_APP_API_SERVER}project/room/${tour}/${roomIndex}`)
        .then(() => history.push(`/explore?id=${tour}`));
    }
  }

  const deleteRoomButton = button => {
    const makeSure = window.confirm(`Apakah Anda Yakin ?`);

    if (makeSure) {
      axios.delete(`${process.env.REACT_APP_API_SERVER}project/room/${tour}/${roomIndex}/${button}`)
        .then(() => window.location.reload());
    }
  }

  return (
    <Fragment>
      <Grid container style={{marginTop: '4rem', overflow: 'hidden'}}>
        <Grid item xs={3} className={classes.drawerPaper}>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteRoom()}
              style={{ minWidth: '50px' }}
            >
              <Delete />
            </Button>

            <Button
              variant="contained"
              onClick={() => history.push(`/explore?id=${tour}`)}
              style={{ minWidth: '50px' }}
            >
              <ArrowBack />
            </Button>

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setModal(!modal)}
            >
              Add Room Button
            </Button>
          </div>

          <h2 style={{ marginTop: '50px' }}>List Room Button</h2>
          <div>
            { listRoom?.length && listButton?.map((item, i) => (
              <div key={i}>
                <TextField
                  defaultValue={ listRoom[item.roomTargetIndex].roomName }
                  InputProps={{ readOnly: true }}
                />

                <IconButton
                  style={{ marginLeft: '20px'}}
                  onClick={() => deleteRoomButton(i)}
                >
                  <Delete />
                </IconButton>
              </div>
            )) }
          </div>
        </Grid>

        <Grid item xs={9} style={{minHeight: 'calc(100vh - 65px)'}}>
          <iframe
            src={`${process.env.REACT_APP_PREVIEW}?host=${process.env.REACT_APP_API_SERVER}360-view/${tour}&i=${roomIndex}`}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Preview"
          />
        </Grid>
      </Grid>

      <ModalAddRoomButton
        isOpen={modal}
        onClose={() => setModal(!modal)}
        classes={classes}
        listRoom={listRoom}
      />
    </Fragment>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(RoomTourEditor);
