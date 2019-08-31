import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
    progress: { 
        position: 'absolute',
        left: '50%',
        top: '50%'
    }
}))

const Loading = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <CircularProgress className={classes.progress} />
    </Fragment>
  );
}


export default Loading;