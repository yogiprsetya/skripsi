import React, { Component } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "store/actions/authActions";
import { Grid, Box, TextField, Button, Link } from '@material-ui/core';
import { Send } from '@material-ui/icons';

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentDidMount() {
    this.props.auth.isAuthenticated && this.props.history.push("/");
  }

  componentWillReceiveProps(nextProps) {
    nextProps.errors && this.setState({ errors: nextProps.errors });
  }

  onChange = obj => e => {
    this.setState({ [obj]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    return (
      <Grid container justify="center" className="mt-5">
        <Grid item xs={5}>
          <div className="my-5">
            <h4><b>Register</b> below</h4>

            <p className="text-muted">
              Already have an account? <Link to="/login" component={RouterLink}>Log in</Link>
            </p>
          </div>

          <form onSubmit={this.onSubmit}>
            <TextField
              fullWidth
              required
              className="mb-2"
              label="Full Name"
              onChange={ this.onChange('name') }
            />

            <TextField
              fullWidth
              required
              className="mb-2"
              label="Email address"
              onChange={ this.onChange('email') }
            />

            <TextField
              fullWidth
              required
              className="mb-2"
              type="password"
              label="Password"
              onChange={ this.onChange('password') }
            />

            <TextField
              fullWidth
              required
              className="mb-5"
              type="password"
              label="Confirm Password"
              onChange={ this.onChange('password2') }
            />

            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                endIcon={ <Send /> }
              >
                Signup
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
