import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles(theme => ({
  openButton: {
      margin: theme.spacing(1),
      fontSize: '30px',
      padding: '20px 40px',
      backgrounColor: '#3f51b5',
      color: 'white'
  },
  divider: { margin: '20px 0px' },
  code: { color: 'rgba(0, 0, 0, 1)' }
}))

const DialogTitle = withStyles(styles)(({ children, classes, onClose }) => (
  <MuiDialogTitle disableTypography className={classes.root}>
    <Typography variant="h6">{children}</Typography>
    {
      onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null
    }
  </MuiDialogTitle>
));

const DialogContent = withStyles(theme => ({ 
  root: { padding: theme.spacing(2) } 
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({ 
  root: { margin: 0, padding: theme.spacing(1) } 
}))(MuiDialogActions);

const Snippet = ({ auth, amount, error }) => {
  amount = amount * 100;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleClickOpen} 
        disabled={error !== ''} 
        className={classes.openButton}
      >
        Generate JS Snippet
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Your JS Snippet
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Include this in your page and create a container that will be used for the paymentRequestButton Element:
          </Typography>
          <Divider className={classes.divider} />
          <Typography gutterBottom className={classes.code}>
            { '<button>' } <br/> 
            &thinsp; { `<a href=https://vast-plains-55545.herokuapp.com/#/login/${auth.address}/${amount}>` } <br/>
            &emsp; { 'Sebra'} <br/>
            &thinsp; { '</a>' } <br/>
            { '</button>' }
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default Snippet;