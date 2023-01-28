import classes from './Notification.module.css';
import RefreshIcon from '@mui/icons-material/Refresh';

import {Typography, Grid} from '@mui/material';

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
   
  );
};

export default Notification;