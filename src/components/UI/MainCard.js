import React from "react";
import {Stack,Grid, Box, Typography } from '@mui/material';
import '../../App.css';
import { useSelector } from 'react-redux';
import globalUseStyles from "../Registration/Forms/stylesHooks";

const MainCard = (props) => {

    const globalClasses = globalUseStyles();

    const stepperCounter = useSelector(state => state.counter.counter);

    return(
        <Grid className={globalClasses.mainCard}  >
            <header className={globalClasses.textLeft} sx={{m:0}}>
            <Grid textAlign='left' sx={{ml: 20, mb:2}} >
              {(stepperCounter === 0) && <Typography  variant="h3" sx={{fontFamily: ['Poppins', 'sans-serif'], pt: 10, mb:0}} component="h3" >Personal Info Page</Typography>}
              {(stepperCounter === 1) && <Typography sx={{  pt: 10, mb:0}} variant="h3">Office Info Page</Typography>}
              {(stepperCounter === 2) && <Typography sx={{ pt: 10, mb:0}} variant="h3" >Confirmation Page</Typography>}
              {(stepperCounter === 3) && <Typography sx={{  pt: 10, my:0}} variant="h3">Registration Success</Typography>}
            </Grid>
            </header>
             {props.children}
        </Grid>
       
    );
};

export default MainCard;