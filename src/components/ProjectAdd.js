import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Back from './common/Back'
import TextField from '@material-ui/core/TextField';
import Zones from './Zones';

import { setActiveApp } from '../redux/modules/user';


const qs = require('query-string');
const backgroundShape = require('../assets/img/shape.svg');

const numeral = require('numeral');
numeral.defaultFormat('0,000');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary['A100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: 10,
    padding: 20,
    paddingBottom: 200
  },
  grid: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  smallContainer: {
    width: '60%'
  },
  bigContainer: {
    width: '80%'
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stepGrid: {
    width: '80%'
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  stepper: {
    backgroundColor: 'transparent'
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  topInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 42
  },
  formControl: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  borderColumn: {
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    paddingBottom: 24,
    marginBottom: 24
  },
  flexBar: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center'
  }
})

const getSteps = () => {
  return [
    'Project',
    'Gates',
    'Confirm',
    'Terms',
    'Done'
  ];
}

class ProjectAdd extends Component {

  state = {
    activeStep: 0,
    receivingAccount: 'Home Account',
    repaimentAccount: 'Saving Account',
    termsChecked: false,
    labelWidth: 0,
    name: null
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTerms = event => {
    this.setState({ termsChecked: event.target.checked });
  };

  stepActions() {
    if(this.state.activeStep === 3) {
      return 'Accept';
    }
    if(this.state.activeStep === 4) {
      return 'Install';
    }
    if(this.state.activeStep === 5) {
      return 'Done';
    }
    return 'Next';
  }

  generateUUID()
    {
        var d = new Date().getTime();
        
        if( window.performance && typeof window.performance.now === "function" )
        {
            d += performance.now();
        }
        
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
        {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });

    return uuid;
    }


  goToDashboard = event => {
    const queryString = this.props.location.search

    this.props.history.push({
      pathname: '/',
      search: queryString
    })
  }

  render() {

    const { classes } = this.props;
    const queryString = this.props.location.search
    const parsed = queryString ? qs.parse(queryString) : {}
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12}>
                <Back />
                <div className={classes.stepContainer}>
                  <div className={classes.bigContainer}>
                    <Stepper classes={{root: classes.stepper}} activeStep={activeStep} alternativeLabel>
                      {steps.map(label => {
                        return (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </div>
                  { activeStep === 0 && (
                  <div className={classes.smallContainer}>
                  <Paper className={classes.paper}>
                    <div>
                      <div style={{marginBottom: 32}}>
                        <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                          Project information
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Project spans across all platforms
                        </Typography>
                      </div>
                      <div style={{marginBottom: 32}}>
                        <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                          Project ID
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                          {this.state.name === null || this.state.name === '' ? '--' : `${this.state.name}-gatespace-io`}
                        </Typography>
                      </div>
                      <div>
                        <Typography style={{textTransform: 'uppercase', marginBottom: 20}} color='secondary' gutterBottom>
                          PROJECT NAME
                        </Typography>
                        <FormControl variant="outlined" className={classes.formControl}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Project Name"
                            type="text"
                            value={this.state.name}
                            onChange={(event) => this.setState({name: event.target.value})}
                            fullWidth
                          />
                        </FormControl>
                      </div>
                    </div>
                  </Paper>
                  </div>
                  )}
                  { activeStep === 1 && (
                  <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                      <div>
                        <div style={{marginBottom: 32}}>
                          <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                            Gate Selection
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Select the gates you would like to receive real-time proximity data
                          </Typography>
                        </div>
                        <div>
                          <Zones />
                        </div>
                      </div>
                    </Paper>
                    </div>
                  )}
                  { activeStep === 2 && (
                  <div className={classes.bigContainer}>
                    <Paper className={classes.paper}>
                      <div className={classes.topInfo}>
                        <div>
                          <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                            Confirm Details
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Please review the details of your project
                          </Typography>
                        </div>
                      </div>
                      <div className={classes.borderColumn}>
                        <Grid item container xs={12} style={{marginBottom: 32}}>
                          <Grid item xs={6}>
                            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                              Project Name
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                             --
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                              Project Id
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                              --
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                      <Grid item container xs={12}>
                        <Grid item container xs={12} style={{marginBottom: 32}}>
                          <Grid item xs={6}>
                            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                              Zones Selected
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                              --
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item container xs={12} style={{marginTop: 24}}>
                        <Grid item xs={6}>
                          <Typography style={{textTransform: 'uppercase', marginBottom: 20}} color='secondary' gutterBottom>
                            Billing account
                          </Typography>
                          <FormControl variant="outlined" className={classes.formControl}>
                            <Select
                              value={this.state.repaimentAccount}
                              onChange={this.handleChange}
                              input={
                                <OutlinedInput
                                  labelWidth={this.state.labelWidth}
                                  name="repaimentAccount"
                                />
                              }
                            >
                              <MenuItem value="">
                                <em></em>
                              </MenuItem>
                              <MenuItem value={'0297 00988200918'}>Account one</MenuItem>
                              <MenuItem value={'0235 00235233332'}>Account two</MenuItem>
                              <MenuItem value={'1256 00864222212'}>Other account</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Paper>
                    </div>
                  )}
                  { activeStep === 3 && (
                    <div className={classes.bigContainer}>
                      <Paper className={classes.paper}>
                        <div style={{marginBottom: 24}}>
                          <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                            Terms & Conditions
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Please read through and accept the terms & conditions
                          </Typography>
                        </div>
                        <div style={{ height: 330, padding: 16, border: '2px solid #ccc', borderRadius: '3px', overflowY: 'scroll' }}>
                          <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                            1. Your agreement
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                          By using this Site, you agree to be bound by, and to comply with, these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use this site.

PLEASE NOTE: We reserve the right, at our sole discretion, to change, modify or otherwise alter these Terms and Conditions at any time. Unless otherwise indicated, amendments will become effective immediately. Please review these Terms and Conditions periodically. Your continued use of the Site following the posting of changes and/or modifications will constitute your acceptance of the revised Terms and Conditions and the reasonableness of these standards for notice of changes. For your information, this page was last updated as of the date at the top of these terms and conditions.
                          </Typography>
                          <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                            2. Privacy
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Please review our Privacy Policy, which also governs your visit to this Site, to understand our practices.
                            By using this Site, you agree to be bound by, and to comply with, these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use this site.

PLEASE NOTE: We reserve the right, at our sole discretion, to change, modify or otherwise alter these Terms and Conditions at any time. Unless otherwise indicated, amendments will become effective immediately. Please review these Terms and Conditions periodically. Your continued use of the Site following the posting of changes and/or modifications will constitute your acceptance of the revised Terms and Conditions and the reasonableness of these standards for notice of changes. For your information, this page was last updated as of the date at the top of these terms and conditions.
                          </Typography>
                        </div>
                        <FormGroup row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={this.state.termsChecked}
                                onChange={this.handleTerms}
                                value='check'
                              />
                            }
                            label="I have read and understood the terms & conditions"
                          />
                        </FormGroup>
                      </Paper>
                    </div>
                  )}
                  { activeStep === 4 && (
                  <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                      <Grid item container xs={12}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                            Project Added
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            We have successfully created a new project for you with the following API KEY:
                          </Typography>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="apikey"
                            label="API KEY"
                            type="text"
                            value={this.generateUUID()}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                    </div>
                  )}
                  { (activeStep === 5 || activeStep === 6) && (
                  <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                      <Grid item container xs={12}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" gutterBottom>
                            Congratulations <span role="img" aria-label="conrats emoji">🎉</span>
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Your project is ready for use please download the SDK for the platforms you need using the links below
                          </Typography> 
                          <Button fullWidth variant='outlined'>
                            Download IOS SDK
                          </Button>
                          <br /> <br />
                          <Button fullWidth variant='outlined'>
                            Download Android SDK
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                    </div>
                  )}
                  <div className={classes.flexBar}>
                    { activeStep !== 5 && (
                      <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.backButton}
                      size='large'
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={activeStep !== 6 ? this.handleNext : this.props.setActiveApp('app-id','new-app-gatespace-io')}
                      size='large'
                      disabled={this.state.activeStep === 3 && !this.state.termsChecked}
                    >
                      {this.stepActions()}
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => ({
    user: state.user
  })
  
const mapDispatchToProps = (dispatch) => ({
      setActiveApp: (appid, appname) => dispatch(setActiveApp(appid, appname)),
})
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withStyles(styles),
)(ProjectAdd);
  
