import React from "react";
import { Stack, Box, Card, CardContent, Slider, Typography } from '@mui/material';
import HorizontalLinearStepper from "./HorizontalStepper";
import PersonalInfoForm from "../Registration/Forms/PersonalInfoForm";
import OfficeDetailsForm from "../Registration/Forms/OfficeDetailsForm";
import ConfirmationForm from "../Registration/Forms/ConfirmationForm";
import Success from "../Registration/Success";
import Notification from "./Notification";

import Loading from "./Loading";

import { useSelector } from 'react-redux';
import { useEffect } from "react";



const InnerCard = (props) => {

  //let stepperCounter = useSelector(state => state.counter.counter);
  const stepperCounter = useSelector(state => state.counter.counter);
  const finished = useSelector(state => state.counter.isFinished);

  const notification = useSelector(state => state.ui.notification);



    return(
        <Box 
            justifyContent='center'  display= 'flex'>
          <Card  sx={{mb:10, width: '90%', height: '70%'  }}>
            <CardContent>
              <Box textAlign='left' >
                {(stepperCounter === 0) && <Typography variant="h6">Personal Information</Typography>}
                {(stepperCounter === 1) && <Typography variant="h6">Office Details</Typography>}
                {(stepperCounter === 2) && (!finished) && <Typography variant="h6">Confirmation Page</Typography>}
               
              </Box>
              {(!finished) && (stepperCounter < 3 ) &&<HorizontalLinearStepper />}
              <Box textAlign='center' margin={5} >
              {
                notification && (notification.status === 'pending') ?
               
                <Loading />
                :
            <>
                {(stepperCounter === 0) && <PersonalInfoForm />}
                {(stepperCounter === 1) && <OfficeDetailsForm />}
                {(stepperCounter === 2) && (!finished) &&  <ConfirmationForm />}
                {(stepperCounter === 3) && (!finished) &&  <Success />}
               
            </>
}
               
              </Box>
            </CardContent>
          </Card>
        </Box>
    )
};

export default InnerCard;