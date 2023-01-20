import classes from './Notification.module.css';

import RefreshIcon from '@mui/icons-material/Refresh';

import {Stack, FormGroup, TextField,InputAdornment, Button, Select, MenuItem, NativeSelect,Box, Card, CardContent, Typography,InputLabel,Input, Grid, Paper} from '@mui/material';

const Notification = (props) => {
  let specialClasses = '';

  if (props.status === 'error') {
    specialClasses = classes.error;
  }
  if (props.status === 'success') {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <Grid container  spacing={5}  display="block">
            <Grid item md={12} sx={2} textAlign="center">
            <Typography variant="h1"><RefreshIcon  fontSize="inherit" color="success"/></Typography>
            </Grid>
            
            
        </Grid>
    // <section className={cssClasses}>
    //     <RefreshIcon 
    //   <h2>{props.title}</h2>
    //   <p>{props.message}</p>
    // </section>
  );
};

export default Notification;