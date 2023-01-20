import React from "react";
import {Stack, Box, Card, CardContent, Typography } from '@mui/material';

import { useSelector } from 'react-redux';

const MainCard = (props) => {

    const stepperCounter = useSelector(state => state.counter.counter);
    const finished = useSelector(state => state.counter.isFinished);

    return(
        <Stack textAlign="center" backgroundColor= 'skyBlue' display='block' height="100%">
            <header style={{textAlign:'left',  margin: '0'}}>
            {/* <Box textAlign='left' > */}
              {(stepperCounter === 0) && <Typography sx={{ color:'#FFF', pt: 10, mb:0}} variant="h3" >Personal Info Page</Typography>}
              {(stepperCounter === 1) && <Typography sx={{ color:'#FFF', pt: 10, mb:0}} variant="h3">Office Info Page</Typography>}
              {(stepperCounter === 2) && <Typography sx={{ color:'#FFF', pt: 10, mb:0}} variant="h3" >Confirmation Page</Typography>}
              {(stepperCounter === 3) && (!finished) &&  <Typography sx={{ color:'#FFF', px: 10, my:5}} variant="h3">Registration Success</Typography>}
            {/* </Box> */}
            </header>
             {props.children}
        </Stack>
        // <Box
        //   minWidth="500px"
        //   sx={{ my: 10, display: 'flex', justifyContent: 'center' }}
        // >
        //   <Card sx={{ width: 400, height: 300,background: 'primary' }}>
        //     <CardContent>
        //       <h1>{props.heading}</h1>
        //       {props.children}
        //     </CardContent>
        //   </Card>
        // </Box>
    );
};

export default MainCard;