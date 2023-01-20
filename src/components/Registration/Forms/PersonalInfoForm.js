import React  from 'react';
import { Formik, Form, Field } from 'formik';
import { Grid,Button , Typography} from '@mui/material';
import { TextField } from 'material-ui-formik-components';
import { object, string, number } from 'yup';

import { Stack, Box} from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/user-slice';
import { counterActions } from '../../../store/stepperCounter-slice';
import { uiActions } from '../../../store/ui-slice';

const FORM_VALIDATION = object().shape({
  name: string().required(),
  email: string().email().required(),
  mobile: string().min(10).max(10).required(),
  address1: string().required(),
  address2: string().required(),
  address3: string().required()
});

const PersonalInfoForm = ({
  values,
  errors
}) => {


  const dispatch = useDispatch();

  const steps =  useSelector(state => state.counter.steps); 
  const activeStep = useSelector(state => state.counter.counter);
  const user = useSelector(state => state.user);
   
  const userId = user.id;

  const sendUserData = async (userData) => {
    
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending user data'
    }));

    if(userId === ''){
       const response = await fetch(
        `https://react-http-d77c9-default-rtdb.firebaseio.com/User.json`, 
        {
          method: 'POST',
          body: JSON.stringify({
              personalInfo: userData
            }
          )
        }
      )
    .then(response => response.json())
    .then(res => dispatch(userActions.setId(res.name)));

    if(!response.ok){
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending user data failed'
      }));
    }
    }
    else{
       const response = await fetch(
        `https://react-http-d77c9-default-rtdb.firebaseio.com/User/${userId}.json`, 
        {
          method: 'PUT',
          body: JSON.stringify({
              personalInfo: userData,
              officeInfo: user.officeInfo,
              profile: user.profile,
              signature: user.signature
            }
          )
        }
      );
      if(!response.ok){
        dispatch(uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending user data failed'
        }));
      }
    }
      
    dispatch(uiActions.showNotification({
      status: 'success',
      title: 'Success!',
      message: 'Sent user data successfully!'
    }));
    
  }


  return (
    <Stack>
      <Box 
            component="div"
            sx={{display: "block", border: "2px dashed grey",borderRadius: "25px",height: "auto" }}
          >
          
        <Formik

          initialValues={user.personalInfo}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { setSubmitting }) => {
            if (setSubmitting){

              dispatch(userActions.addUserPersonalInfo(values));

           sendUserData(values)
           .then(() => {
            dispatch(counterActions.increment());
            if(activeStep === steps.length-1) {
             dispatch(counterActions.finish());
            }
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
              <Grid textAlign="center"  container >
                
                <Grid container xs={12} sm={8} spacing={1}  >
                  <Grid item xs={6}  textAlign="right">
                    
                    <Typography variant="body" component="p" md={6}  sx={{ pt:2, mr: 10, fontWeight: 'bold' }}>Name</Typography>
                    
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3} >
                    <Field
                      type="text"
                      variant="outlined"
                      name="name"
                      component={TextField}
                      size="small"
                      InputLabel ="Name"
                     
                    />
                  </Grid>

                  <Grid item xs={6}  textAlign="right">
                  <Typography variant="body" component="p" md={6} sx={{pt:2, mr: 10, fontWeight: 'bold' }}>Email</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                    <Field
                      type="email"
                      variant="outlined"
                      name="email"
                      component={TextField}
                      size="small"
                 
                    />
                  </Grid>

                  <Grid item xs={6} sm={6} textAlign="right">
                  
                  <Typography variant="body" component="p" md={6}  sx={{pt:2, mr: 10, fontWeight: 'bold' }}>Mobile Number</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3} >
                    <Field
                      type="text"
                      variant="outlined"
                      name="mobile"
                      component={TextField}
                      size="small"
                     
                    />
                  </Grid>

                  <Grid item xs={6} sm={6} textAlign="right">
                 
                  <Typography variant="body" component="p" md={6}  sx={{ pt:2,  mr: 10, fontWeight: 'bold' }}>Address 1</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3} >
                    <Field
                      type="text"
                      variant="outlined"
                      name="address1"
                      component={TextField}
                      size="small"
                      
                    />
                  </Grid>

                  <Grid item xs={6} sm={6} textAlign="right">
                 
                  <Typography variant="body" component="p" md={6}  sx={{pt:2,mr: 10, fontWeight: 'bold' }}>Address 2</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                    <Field 
                      type="text"
                      variant="outlined"
                      name="address2"
                      component={TextField}
                      size="small"
                      
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}   textAlign="right">
                  <Typography variant="body"  component="p"  sx={{ pt:2, mr: 10, fontWeight: 'bold' }}>Address 3</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3} >
                    <Field 
                      type="text"
                      variant="outlined"
                      name="address3"
                      component={TextField} 
                      size="small"
                      
                    />
                  </Grid>
                </Grid>

                <Grid container xs={12} sm={4} spacing={1}   >
                  <Grid item xs={12}   sx={{height:"100%" , flexDirection:"column",display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Button color="error" variant="contained" type="submit"  >
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