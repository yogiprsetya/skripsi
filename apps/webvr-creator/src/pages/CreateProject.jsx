import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Box, TextField, Button, Typography } from '@material-ui/core';
import { Send } from '@material-ui/icons';

class CreateProject extends Component {
  state = {
    title: '',
    description: '',
    thumbnail: []
  }

  onChange = obj => e => {
    this.setState({ [obj]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault()

    const formData = new FormData();
    const { title, description, thumbnail } = this.state;

    formData.append('thumbnail', thumbnail[0]);
    formData.append('title', title);
    formData.append('username', this.props.auth.user.email);
    formData.append('description', description);

    Axios.post(`${process.env.REACT_APP_API_SERVER}project`, formData, {
      headers: { 'Content-Type': 'multipart/form-data'}
    })
      .then(res => {
        this.props.history.push(`/explore?id=${res.data.content._id}`);
      });
  }

  render() {
    const { title, description } = this.state;

    return (
      <Grid container justify="center" className="mt-navbar">
        <Grid item xs={5}>
          <Typography variant="h4" component="h1" className="mb-3" align="right">
            Create Project
          </Typography>

          <form onSubmit={ this.onSubmit.bind(this) }>
            <TextField
              fullWidth
              required
              className="mb-2"
              label="Project title"
              value={ title }
              onChange={ this.onChange('title') }
            />

            <TextField
              fullWidth
              required
              multiline
              className="mb-4"
              label="Description"
              value={ description }
              onChange={ this.onChange('description') }
            />

            <input
              required
              accept="image/*"
              className="display-none"
              id="contained-button-file"
              type="file"
              onChange={ e => this.setState({ thumbnail: e.target.files }) }
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="secondary" component="span">
                Upload Thumbnail
              </Button>
            </label>

            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                endIcon={ <Send /> }
              >
                Create
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    )
  }
}

CreateProject.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => state;

export default connect(
  mapStateToProps
)(CreateProject);
