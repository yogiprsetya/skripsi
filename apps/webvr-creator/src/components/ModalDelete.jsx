import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { openDeleteProject } from 'store/actions/ModalControl';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Box, Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
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
}));

const ModalDelete = ({ dispatch, showDeleteProject }) => {
  const classes = useStyles();

  const handleClose = () => dispatch(openDeleteProject(null));

  const deleteProject = () => {
    Axios.delete(`${process.env.REACT_APP_API_SERVER}project/${showDeleteProject.id}`)
    .then(() => window.location.reload())
    .catch(err => console.log(err));
  }

  return (
    <Modal
      open={ !!showDeleteProject }
      onClose={ handleClose }
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <h2>Delete Project</h2>

        <p>Apakah anda yain akan menghappus project <b>{ showDeleteProject?.title }</b> ?</p>

        <Box display="flex" justifyContent="flex-end" className="mt-4">
          <Button
            variant="contained"
            color="inherit"
            className="mr-2"
            onClick={ handleClose }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="secondary"
            endIcon={ <Delete /> }
            onClick={ deleteProject }
          >
            Delete
          </Button>
        </Box>
      </div>
    </Modal>
  );
}

const mapStateToProps = state => ({
  ...state.modal,
})

export default connect(mapStateToProps)(ModalDelete);
