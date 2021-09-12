import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { ProjectCard } from 'components';
import { Container, Grid } from '@material-ui/core';
import { ModalDelete } from 'components';

const Dashboard = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_SERVER}project/me`)
      .then(res => setContent(res.data.docs))
      .catch(err => console.log(err));
  }, []);

  return (
    <Fragment>
      <Container className="mt-navbar">
        <Grid container spacing={4}>
          { content?.map((content, i) => (
            <Grid item xs={ 4 } key={ i }>
              <ProjectCard key={ i } docs={ content } />
            </Grid>
          )) }
        </Grid>
      </Container>

      <ModalDelete />
    </Fragment>
  );
}

export default Dashboard;
