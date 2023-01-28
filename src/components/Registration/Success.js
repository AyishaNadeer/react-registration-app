import React from "react";
import { Stack, Box, Button,  Typography, Grid } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../../store/stepperCounter-slice";
import { userActions } from "../../store/user-slice";

const Success = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const resetStepperCounterHandler = () => {

        dispatch(counterActions.resetCounter());
        dispatch(userActions.resetUserState());
       }
    
    return(
      <Stack>
        <Box 
          component="div"
          sx={{  py:5, display: "block", borderRadius: "15px", height: "auto", mx: 25, my: 5, background: "#FFF" }}
        >
          <Grid container spacing={5} display="block" >
            <Grid item md={12} sx={2} textAlign="center">
              <Typography variant="h1"><CheckCircleOutlineIcon fontSize="inherit" color="success" /></Typography>
            </Grid>
            <Grid item md={12} sx={12} textAlign="center">
              <Typography variant="h2">Success</Typography>
            </Grid>
            <Grid item md={12} sx={2} textAlign="center">
              <Typography variant="h4">Your application has been submitted</Typography>
              <Typography variant="body">Reference Number : {user.id} </Typography>
            </Grid>
            <Grid item md={12} sx={2} textAlign="center">
              <Button
                size="large"
                color="error"
                variant="contained"
                type="submit"
                onClick={resetStepperCounterHandler}
              >
                OK
              </Button>
            </Grid>

          </Grid>
        </Box>
      </Stack>
        
    )
};

export default Success;