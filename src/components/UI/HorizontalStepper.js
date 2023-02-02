import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { counterActions } from '../../store/stepperCounter-slice';
import { useDispatch, useSelector } from 'react-redux';
import CustomStepIcon from './CustomStepIcon';

export default function HorizontalLinearStepper() {


  const dispatch = useDispatch();

 const steps = useSelector(state => state.counter.steps);
  const activeStep = useSelector(state => state.counter.counter);
  const completedSteps = useSelector(state => state.counter.completedSteps);


   return (
    <Box sx={{ width: '100%', mb: 2 }}  >
      <Stepper alternativeLabel={true} activeStep={activeStep} 
      sx={{
        ".MuiStepConnector-root": {
          top: 12,
          color: 'primary'
        },
        ".MuiStepConnector-root span": {
          justifyContent: "center",
       
        },
        ".MuiStepConnector-root span::before": {
          textAlign: "center", 
          display: "flex",
          justifyContent: "center",
                  
        },
        ".MuiStepLabel-iconContainer" : { 
          transform: 'scale(1.5)',
        },
        ".MuiStepConnector-line" : {
          borderColor: 'red',
          borderWidth: '25%',
          borderRadius: 1,
          borderLeft: -1,
        },
        ".MuiStepConnector-horizontal" : {
            width: "50%" ,
            marginLeft: "20%",
            float: "right",
            display: "block",
            justifyContent: "center",
        },
        ".MuiSvgIcon-root": {
          borderRadius: "50%",
          border: "1px solid red"
        },
        ".MuiSvgIcon-root:not(.Mui-completed)": {
          color: "white",
         
        },
        ".MuiSvgIcon-root.MuiStepIcon-text.Mui-completed": {
          textTransform: "none",
          label: "none",
          clipPath: "none"
        },
        
        ".MuiStepIcon-text": {
          fill: "red",
          fontWeight: 500
        },
        ".MuiSvgIcon-root.Mui-active": {
          color: "red",
          padding: "3px",
          borderRadius: "50%",
          border: "1px solid red",
          marginY: "-3px",
          
        },
        ".Mui-active .MuiStepIcon-text": {
          fill: "white"
        }
      }}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={index} disabled {...stepProps} onClick={() => {
    
             const completedSet = [...completedSteps];
             if(completedSet.includes(index) || completedSet.includes(index-1))
             {
              dispatch(counterActions.setCounter(index));
              labelProps[index].completed = true;
        
             }
             
            }
             } >
          
              <StepLabel {...labelProps} StepIconComponent={CustomStepIcon}> {label} </StepLabel>                          
            </Step>
          );
        })}
      </Stepper>
    
    </Box>
  );
}