import { useEffect } from 'react';

import MainCard from './components/UI/MainCard';
import InnerCard from './components/UI/InnerCard';
import Notification from './components/UI/Notification';

import PersonalInfoForm from './components/Registration/Forms/PersonalInfoForm';
import './App.css';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { userActions } from './store/user-slice';
import { uiActions } from './store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from './store/stepperCounter-slice';

let isInitial = true;

function App() {

  const notification = useSelector(state => state.ui.notification);
  const isStepsFinished = useSelector(state => state.counter.isFinished);
  const counter = useSelector(state => state.counter.counter);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    console.log(`From App.js - ${counter}`)
    if (counter !== 0)
    {
      dispatch(counterActions.setCounter(counter));
    }
    
    // if(isInitial )
    // {
    //   if(isStepsFinished && )
    //   {
    //     dispatch(counterActions.resetCounter());
    //     //console.log(" Hi ")
    //   }
      
    //   isInitial = false;
    // }
  
  }, []);



  return (
      <MainCard >
        <InnerCard >
        {notification && (notification.status === 'pending') && <Notification 
        status={notification.status} 
        title={notification.title}
        message={notification.message} />}
        </InnerCard>
      </MainCard>
  );
}

export default App;
