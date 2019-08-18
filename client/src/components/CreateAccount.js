import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContainer: {
    width: '100%',
    maxWidth: 500,
    margin: '40px 0px',
  },
  header2: {
    margin: '65px 0px',
    fontWeight: 250
  },
  formContainer1: {
    backgroundColor: 'white'
  },
  formContainer2: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%'
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    textAlign: 'right',
    marginTop: '41px',
    marginLeft: '70%',
    fontSize: '19px',
    marginLeft: '69%',
    padding: '20px 40px'
  },
}));


const CreateAccount = ({ history }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    error: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.headerContainer}>
        <Typography variant="h2" align="left">Welcome to Sebra!</Typography>
        <Typography variant="h5" align="left" className={classes.header2}>Create your account.</Typography>
      </div>
      <div className={classes.formContainer1}>
        <form className={classes.formContainer2} noValidate autoComplete="off">
          <TextField
            required
            autoFocus
            fullWidth
            id="username"
            label="Username"
            className={classes.textField}
            value={values.username}
            onChange={handleChange('username')}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            id="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange('password')}
            margin="normal"
          />
          <Button onClick={ () => history.push('/account/123')} variant="contained" color="primary" className={classes.button}>Create</Button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;