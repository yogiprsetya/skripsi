import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Grid, Box, Button, Container, Snackbar, Modal, TextField, Card, CardActionArea, CardMedia, Link, Typography, CardContent } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { AddPhotoAlternate, Add, AddAPhoto } from '@material-ui/icons';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  contained: {
    marginRight: theme.spacing(2),
    width: '100%',
    minHeight: '200px',
    border: '1px solid #fff'
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
  }
});

class ExploreProject extends Component {
  state = {
    content: {},
    roomName: '',
    roomTexture: [],
    urlParams: new URLSearchParams(this.props.location.search),
    showToast: false,
    showModal: false
  };

  componentDidMount() {
    Axios.get(`${process.env.REACT_APP_API_SERVER}project/${this.state.urlParams.get('id')}`)
      .then(res => {
          const countRoom = res.data.roomList.length;

          this.setState({
            content: res.data,
            showToast: countRoom === 0 ? true : false
          })
        }
      );
  }

  onChange = obj => e => {
    this.setState({ [obj]: e.target.value });
  };

  createRoom(e) {
    e.preventDefault();

    const formData = new FormData();
    const { roomName, roomTexture, urlParams } = this.state;

    formData.append('roomTexture', roomTexture[0]);
    formData.append('roomName', roomName);

    Axios.put(`${process.env.REACT_APP_API_SERVER}project/room/${urlParams.get('id')}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data'}
    })
      .then(res => window.location.reload());
  }

  addRoomButton() {
    const { classes } = this.props;

    return (
      <Grid item xs={ 3 }>
        <Button
          variant="contained"
          className={`p-2 ${classes.contained}`}
          onClick={() => this.setState({ showModal: true })}
        >
          <AddPhotoAlternate fontSize="large" />
        </Button>
      </Grid>
    )
  }

  isEmptyToast() {
    return (
      <Snackbar open={this.state.showToast} autoHideDuration={6000} onClose={() => this.setState({showToast: false})}>
        <Alert severity="warning" onClose={() => this.setState({showToast: false})}>
          Belum ada ruangan, yuk bikin!
        </Alert>
      </Snackbar>
    )
  }

  renderRoomThumbnail() {
    const { roomList } = this.state.content;

    return roomList && roomList.map((content, i) => (
      <Grid item xs={ 3 } key={ i }>
        <Link href={`/room-editor/${this.state.urlParams.get('id')}/${i}`} underline="none">
          <Card>
            <CardActionArea>
              <CardMedia
                style={{ height: 138 }}
                image={ content.roomTexture }
                title={ content.roomName }
              />

              <CardContent>
                <Typography gutterBottom variant="subtitle1" className="mb-0" component="p">
                { content.roomName }
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Grid>
    ))
  }

  copyURL() {
    const el = document.createElement('textarea');
    el.style.opacity = 0;
    el.value = `${process.env.REACT_APP_PLAYER}?id=${this.state.urlParams.get('id')}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  modalAddRoom() {
    const { classes } = this.props;

    return (
      <Modal
        open={this.state.showModal}
        onClose={() => this.setState({showModal: false})}
      >
        <div className={classes.paper}>
          <h2>Add New Room</h2>

          <form onSubmit={ this.createRoom.bind(this) }>
            <TextField
              fullWidth
              required
              className="mb-3"
              label="Room Name"
              onChange={ this.onChange('roomName') }
            />

            <input
              accept=".jpg, .jpeg"
              className="display-none"
              id="contained-button-file"
              type="file"
              onChange={ e => this.setState({ roomTexture: e.target.files }) }
            />

            <label htmlFor="contained-button-file">
              <Button variant="contained" color="secondary" component="span" startIcon={ <AddAPhoto /> }>
                Upload 360
              </Button>
            </label>

            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={ <Add /> }
              >
                Save
              </Button>
            </Box>
          </form>
        </div>
      </Modal>
    )
  }

  render() {
    return (
      <Container className="mt-navbar">
        <h1 className="mb-2">Room list of: { this.state.content.title }</h1>

        <p className="mb-4">
          <a
            className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-containedSizeSmall MuiButton-sizeSmal"
            href={`${process.env.REACT_APP_PLAYER}?id=${this.state.urlParams.get('id')}`}
            target="_target"
            style={{ marginRight: 10 }}
          >
            View Tour
          </a>

          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<FileCopyIcon />}
          >
            Copy URL
          </Button>
        </p>

        <Grid container spacing={2}>
          { this.renderRoomThumbnail() }
          { this.addRoomButton() }
        </Grid>

        { this.isEmptyToast() }
        { this.modalAddRoom() }
      </Container>
    );
  }
}

ExploreProject.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => state;

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(ExploreProject);
