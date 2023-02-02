import React  from 'react';
import { Formik, Form, Field } from 'formik';
import { Grid,  Button, Typography } from '@mui/material';
import { TextField } from 'material-ui-formik-components';
import { object, string } from 'yup';
import { Stack, Box} from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/user-slice';
import { counterActions } from '../../../store/stepperCounter-slice';
import { uiActions } from '../../../store/ui-slice';

import apiRequest from '../../../apiRequest';
import globalUseStyles from './stylesHooks';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const FORM_VALIDATION = object().shape({
  building: string().required(''),
  city: string().required(''),
  landline: string().matches(phoneRegExp, 'Phone number is not valid').min(9).max(9).required(''),
  address1: string().required(''),
  address2: string().required(''),
  poBox: string().required('')
});

const OfficeDetailsForm = ({
  values,
  errors
}) => {

  const API_URL = 'http://localhost:3500/users';

  const globalClasses = globalUseStyles();
 
  const dispatch = useDispatch();
  const steps =  useSelector(state => state.counter.steps); 
  const activeStep = useSelector(state => state.counter.counter);
  const user = useSelector(state => state.user);
   
  const userId = user.id;

 
  const saveUserData = async (userData) => {

    dispatch(uiActions.showNotification({status: 'pending',title: 'Sending...',message: 'Sending user data'}));

    if(userId !== ''){
      const updateOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          officeInfo: userData
        })
      };

      const { errMsg}  = await apiRequest(`${API_URL}/${userId}`, updateOptions)
      if(errMsg)  dispatch(uiActions.showNotification({ status: 'error',title: 'Error!',message: 'Sending user data failed'}));
      else  dispatch(uiActions.showNotification({status: 'success',title: 'Success!',message: 'Sent user data successfully!'}));
    }
  
  }


  return (
    <Stack>
      <Box className={globalClasses.formBox}
            component="div"
            sx={{m:5}}
          >
        <Formik
          initialValues={user.officeInfo}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { setSubmitting }) => {
            
            if (setSubmitting){

              dispatch(userActions.addUserOfficeInfo(values));

  saveUserData(values)
  .then(() => {
    dispatch(counterActions.increment());
    if(activeStep === steps.length-1) {
     dispatch(counterActions.finish());
    }
    dispatch(counterActions.completeStep(activeStep));
  })
  .catch(error => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending user data failed'
      }));
    })

             }  
           
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid container className={globalClasses.root}   >
              <Grid container xs={12} md={8} xl={9}   >
                  <Grid item xs={12}  md={6}    className={globalClasses.inputLabel} >
                  <Grid  lg={8}  md={10}    sx={{ justifyContent:"right"}} className={globalClasses.inputLabel} >
                    <Typography variant="body2" component="p" className={globalClasses.typography} >Building </Typography>
                  </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <Field className={globalClasses.input} 
                      type="text"
                      variant="outlined"
                      name="building"
                      component={TextField}
                      size="small"
                     
                    />
                  </Grid>

                  <Grid item xs={12}  md={6}    className={globalClasses.inputLabel} >
                  <Grid  lg={8}  md={10}    sx={{ justifyContent:"right"}} className={globalClasses.inputLabel} >
                  <Typography variant="body2" component="p" className={globalClasses.typography} >City</Typography>
                  </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <Field className={globalClasses.input} 
                      type="text"
                      variant="outlined"
                      name="city"
                      component={TextField}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12}  md={6}    className={globalClasses.inputLabel}>
                  <Grid  lg={8}  md={10}    sx={{ justifyContent:"right"}} className={globalClasses.inputLabel} >
                    <Typography variant="body2" component="p" className={globalClasses.typography}>Landline Number</Typography>
                  </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <Field className={globalClasses.input} 
                      type="text"
                      variant="outlined"
                      name="landline"
                      component={TextField}
                      size="small"
                    
                    />
                  </Grid>

                  <Grid item xs={12}  md={6}    className={globalClasses.inputLabel}>
                  <Grid  lg={8}  md={10}    sx={{ justifyContent:"right"}} className={globalClasses.inputLabel} >
                  <Typography variant="body2" component="p" className={globalClasses.typography}>Address 1</Typography>
                  </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <Field className={globalClasses.input} 
                      type="text"
                      variant="outlined"
                      name="address1"
                      component={TextField}
                      size="small"
                      
                    />
                  </Grid>

                  <Grid item xs={12}  md={6}    className={globalClasses.inputLabel}>
                  <Grid  lg={8}  md={10}    sx={{ justifyContent:"right"}} className={globalClasses.inputLabel} >
                  <Typography variant="body2" component="p" className={globalClasses.typography}>Address 2</Typography>
                  </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <Field className={globalClasses.input} 
                      type="text"
                      variant="outlined"
                      name="address2"
                      component={TextField}
                      size="small"
                   
                    />
                  </Grid>

                  <Grid item xs={12}  md={6}    className={globalClasses.inputLabel}>
                  <Grid  lg={8}  md={10}    sx={{ justifyContent:"right"}} className={globalClasses.inputLabel} >
                  <Typography variant="body2" component="p" className={globalClasses.typography}>PO Box Number</Typography>
                  </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <Field className={globalClasses.input} 
                      type="text"
                      variant="outlined"
                      name="poBox"
                      component={TextField}
                      size="small"
                     
                    />
                  </Grid>
                </Grid>

                <Grid container xs={12} md={4} xl={1} spacing={1}  >
                  <Grid item xs={12}   className={globalClasses.button}>
                    <Button color="primary" variant="contained" type="submit">
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

            </Form>
          )}
        </Formik>
      </Box>
    </Stack>
  );
          }
  export default OfficeDetailsForm;