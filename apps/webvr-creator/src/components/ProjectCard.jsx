import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { openDeleteProject } from 'store/actions/ModalControl';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Link, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  focusHighlight: {
    cursor: 'auto'
  },
  spacing: {
    display: 'flex',
    justifyContent: 'space-around'
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
}));

export default function ProjectCard ({ docs }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card>
      <CardActionArea className={classes.focusHighlight}>
        <CardMedia
          style={{ height: 220 }}
          image={ docs.thumbnail }
          title={ docs.title }
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          { docs.title }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            { docs.description }
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions className={classes.spacing}>
        <Button color="secondary" onClick={() => dispatch(openDeleteProject({ id: docs._id, title: docs.title }))}>
          Delete
        </Button>
        <Link component={ Button } href={`/explore?id=${docs._id}`} underline="none" color="primary">
          Explore
        </Link>
      </CardActions>
    </Card>
  );
}
