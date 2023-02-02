import React  from 'react';
import { Formik, Form, Field } from 'formik';
import { Grid,Button , Typography} from '@mui/material';
import { TextField } from 'material-ui-formik-components';
import { object, string } from 'yup';
import apiRequest from '../../../apiRequest';
import { Stack, Box} from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/user-slice';
import { counterActions } from '../../../store/stepperCounter-slice';
import { uiActions } from '../../../store/ui-slice';
import globalUseStyles from './stylesHooks';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const FORM_VALIDATION = object().shape({
  name: string().required(''),
  email: string().email().required(''),
  mobile: string().matches(phoneRegExp, 'Phone number is not valid').min(10).max(10).required(''),
  address1: string().required(''),
  address2: string().required(''),
  address3: string().required('')
});


const PersonalInfoForm = ({
  values,
  dirty,
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

    if(userId === ''){
      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                personalInfo: userData,
                officeInfo: user.officeInfo,
                profile: user.profile,
                signature: user.signature
        })
      }
   
      const {id, errMsg} = await apiRequest(API_URL, postOptions);
      if(id > 0){
        dispatch(userActions.setId(id));
        dispatch(uiActions.showNotification({status: 'success',title: 'Success!',message: 'Sent user data successfully!'}));
      }
      if(errMsg)  dispatch(uiActions.showNotification({ status: 'error',title: 'Error!',message: 'Sending user data failed'}));
    }
    else{
      const updateOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalInfo: userData
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
            sx={{ m:5}}
          >
        <Formik

          initialValues={user.personalInfo}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { setSubmitting }) => {
           
            if (setSubmitting){
         
              dispatch(userActions.addUserPersonalInfo(values));

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
            
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid container className={globalClasses.root}   >   {/*sx={{p:10}} */}
                
                <Grid container xs={12} md={8} xl={9} >
                     
                  <Grid item xs={12}  md={6}    className={globalClasses.inputLabel} >   
                    <Grid  lg={8}  md={10}    sx={{ justifyContent:"right"}} className={globalClasses.inputLabel} >
                    <Typography variant="body2" component="p"  className={globalClasses.typography}  >Name</Typography>  
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3} >
                    <Field className={globalClasses.input} 
                      type="text"
                      variant="outlined"
                      name="name"
                      component={TextField}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} md={6} className={globalClasses.inputLabel}>
                  <Grid lg={8}  md={10} sx={{ justifyContent:"right"}} className={globalClasses.inputLabel} >
                  <Typography variant="body2" component="p"  className={globalClasses.typography} >Email</Typography>
                    </Grid>
                  
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <Field className={globalClasses.input} 
                      type="email"
                      variant="outlined"
                      name="email"
                      component={TextField}
                      size="small"
                 
                    />
                  </Grid>

                  <Grid item xs={12} md={6} className={globalClasses.inputLabel}>
                  <Grid lg={8}  md={10}  sx={{ justifyContent:"right"}}  className={globalClasses.inputLabel} >
                  <Typography variant="body2" component="p"  className={globalClasses.typography}>Mobile Number</Typography>
                    </Grid>
                  
                  </Grid>
                  <Grid item xs={12} md={6}  lg={4} xl={3} >
                    <Field className={globalClasses.input} 
                      type="text"
                      variant="outlined"
                      name="mobile"
                      component={TextField}
                      size="small"
                     
                    />
                  </Grid>

                  <Grid item xs={12} md={6} className={globalClasses.inputLabel}  >
                  <Grid lg={8}  md={10}  sx={{ justifyContent:"right"}}   className={globalClasses.inputLabel} >
                  <Typography variant="body2" component="p"   className={globalClasses.typography} >Address Line 1</Typography>
                  </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3} >
                    <Field className={globalClasses.input} 
                      type="text"
                      variant="outlined"
                      name="address1"
                      component={TextField}
                      size="small"
                      
                    />
                  </Grid>

                  <Grid item xs={12} md={6} className={globalClasses.inputLabel}>
                  <Grid lg={8}  md={10}  sx={{ justifyContent:"right"}}  className={globalClasses.inputLabel} >
                  <Typography variant="body2" component="p"  className={globalClasses.typography} >Address Line 2</Typography>
                  </Grid>
                  </Grid>
                  <Grid item xs={12}  md={6} lg={4} xl={3}>
                    <Field className={globalClasses.input} 
                      type="text"
                      variant="outlined"
                      name="address2"
                      component={TextField}
                      size="small"
                    
                    />
                  </Grid>
                  

                  <Grid item xs={12} md={6}   className={globalClasses.inputLabel}>
                  <Grid lg={8}  md={10} sx={{ justifyContent:"right"}}  className={globalClasses.inputLabel} >
                  <Typography variant="body2"  component="p"  className={globalClasses.typography} >Address Line 3</Typography>
                  </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3} >
                    <Field className={globalClasses.input} 
                      type="text"
                      variant="outlined"
                      name="address3"
                      component={TextField} 
                      size="small"
                      
                    />
                  </Grid>
                </Grid>

                <Grid container xs={12} md={4} xl={1} spacing={1}   >
                  <Grid item xs={12}   className={globalClasses.button}>
                    <Button color="primary" variant="contained" type="submit"  >
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
  export default PersonalInfoForm;