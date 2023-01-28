import React from "react";
import { 
  Stack, Box, Card, Typography, Paper, Toolbar, IconButton, AppBar
 } from '@mui/material';
import HorizontalLinearStepper from "./HorizontalStepper";
import PersonalInfoForm from "../Registration/Forms/PersonalInfoForm";
import OfficeDetailsForm from "../Registration/Forms/OfficeDetailsForm";
import ConfirmationForm from "../Registration/Forms/ConfirmationForm";
import Success from "../Registration/Success";
import Loading from "./Loading";

import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import globalUseStyles from "../Registration/Forms/stylesHooks";

const InnerCard = (props) => {

  const globalClasses  = globalUseStyles();

  const stepperCounter = useSelector(state => state.counter.counter);
  const finished = useSelector(state => state.counter.isFinished);
  const user = useSelector(state => state.user);

  const notification = useSelector(state => state.ui.notification);


    return(
      <Stack>
        <Box className={globalClasses.innerCard}
            >
          <Card  sx={{mb:10, width: '90%', height: '70%'  }}>

          {(stepperCounter !== 3) && <Box className={globalClasses.stepperBox}>
            <Box flexGrow={0} >
            <AppBar className={globalClasses.appBar} sx={{ position:"relative" }}>
          <Toolbar variant="dense" >
          
          <Typography variant="body" component="div" sx={{ flexGrow: 1 }}>
                USER  {user ? user.name : 'user'} 
          </Typography>
          <IconButton
            size="small"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 15 }}
          >
            <MenuIcon />
          </IconButton>
          </Toolbar>
          </AppBar>
            </Box>
          </Box> }
         
         
          
              <Box className={globalClasses.textLeft} sx={{ml:5, mb:2}}>
                {(stepperCounter === 0) && <Typography variant="h6">Personal Info</Typography>}
                {(stepperCounter === 1) && <Typography variant="h6">Office Details</Typography>}
                {(stepperCounter === 2) && (!finished) && <Typography variant="h6">Confirmation Page</Typography>}
               
              </Box>
          
              {(!finished) && (stepperCounter < 3 ) &&<HorizontalLinearStepper />}
              <Box textAlign='center'  >
              {
                notification && (notification.status === 'pending') ?
                
                <Loading />
              
                :
            <Paper sx={{bgcolor: "secondary.light"}} >
                {(stepperCounter === 0) && <PersonalInfoForm />}
                {(stepperCounter === 1) && <OfficeDetailsForm />}
                {(stepperCounter === 2) && (!finished) &&  <ConfirmationForm />}
                {(stepperCounter === 3) &&   <Success />}
               
            </Paper>
}
               
              </Box>
            
          </Card>
        </Box>
        </Stack>
    )
};

export default InnerCard;