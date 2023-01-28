import React from "react";
import {Stack, Box, Typography } from '@mui/material';
import '../../App.css';
import { useSelector } from 'react-redux';
import globalUseStyles from "../Registration/Forms/stylesHooks";

const MainCard = (props) => {

    const globalClasses = globalUseStyles();

    const stepperCounter = useSelector(state => state.counter.counter);

    return(
        <Stack className={globalClasses.mainCard} sx={{ height: '100%',backgroundColor: 'info.light', display:'block',}} >
            <header className={globalClasses.textLeft} sx={{m:0}}>
            <Box textAlign='left' sx={{ml: 20, mb:2}} >
              {(stepperCounter === 0) && <Typography  variant="h3" sx={{ pt: 10, mb:0}} component="h3" >Personal Info Page</Typography>}
              {(stepperCounter === 1) && <Typography sx={{  pt: 10, mb:0}} variant="h3">Office Info Page</Typography>}
              {(stepperCounter === 2) && <Typography sx={{ pt: 10, mb:0}} variant="h3" >Confirmation Page</Typography>}
              {(stepperCounter === 3) && <Typography sx={{  pt: 10, my:0}} variant="h3">Registration Success</Typography>}
            </Box>
            </header>
             {props.children}
        </Stack>
       
    );
};

export default MainCard;