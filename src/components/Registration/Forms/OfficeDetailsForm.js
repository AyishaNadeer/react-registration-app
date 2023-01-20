import React , {useEffect, useState} from 'react';
import { Formik, Form, Field } from 'formik';
import { Grid,  Button, Typography } from '@mui/material';
import { TextField } from 'material-ui-formik-components';
import { object, string, number } from 'yup';
import { Stack, Box} from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/user-slice';
import { counterActions } from '../../../store/stepperCounter-slice';
import { uiActions } from '../../../store/ui-slice';

const FORM_VALIDATION = object().shape({
  building: string().required(),
  city: string().required(),
  landline: string().min(9).max(9).required(),
  address1: string().required(),
  address2: string().required(),
  poBox: number().required()
});

const OfficeDetailsForm = ({
  values,
  errors
}) => {
 
  const[loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const steps =  useSelector(state => state.counter.steps); 
  const activeStep = useSelector(state => state.counter.counter);
  const user = useSelector(state => state.user);
   
  const userId = user.id;

  const fetchMethod =  async () => {
    let data1 = null;
    fetch(`https://react-http-d77c9-default-rtdb.firebaseio.com//User/${userId}.json`)
    .then((response)=> {return response.json()})
    .then((data) => {
      return data.officeInfo;    
    })
    .catch(error => console.log(error));
      return data1;
  }

  useEffect(() => {    
       setLoading(true);
       fetchMethod().then((data) => {
      });
       setLoading(false);

  }, [])

  const sendUserData = async (userData) => {

    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending user data'
    }));
    if(userId !== ''){
    
      const response = await fetch(
        `https://react-http-d77c9-default-rtdb.firebaseio.com/User/${userId}.json`, 
        {
          method: 'PUT',
          body: JSON.stringify({
              personalInfo: user.personalInfo,
              officeInfo: userData,
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

  if(loading) 
    return(<div></div>);
  return (
    <Stack>
      <Box 
            component="div"
            sx={{display: "block", border: "2px dashed grey",borderRadius: "25px",height: "auto" }}
          >
        <Formik
          initialValues={user.officeInfo}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { setSubmitting }) => {
            
            if (setSubmitting){
              dispatch(userActions.addUserOfficeInfo(values));
                       
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
           
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid   textAlign="center"  container >
              <Grid container xs={12} sm={8} spacing={1}  >
                  <Grid item xs={6}  textAlign="right" >
                    <Typography variant="body" component="p" md={6} sx={{pt:2,  mr: 10, fontWeight: 'bold' }} >Building </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3} >
                    <Field
                      type="text"
                      variant="outlined"
                      name="building"
                      component={TextField}
                      size="small"
                     
                    />
                  </Grid>

                  <Grid item xs={6}  textAlign="right"  >
                  <Typography variant="body" component="p" md={6} sx={{pt:2,  mr: 10, fontWeight: 'bold' }}>City</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                    <Field
                      type="text"
                      variant="outlined"
                      name="city"
                      component={TextField}
                      size="small"
                     
                    
                    />
                  </Grid>

                  <Grid item xs={6}  textAlign="right">
                    
                    <Typography variant="body" component="p" md={6} sx={{ pt:2, mr: 10, fontWeight: 'bold' }}>Landline Number</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                    <Field
                      type="text"
                      variant="outlined"
                      name="landline"
                      component={TextField}
                      size="small"
                    
                    />
                  </Grid>

                  <Grid item xs={6}  textAlign="right">
                  <Typography variant="body" component="p" md={6} sx={{pt:2,  mr: 10, fontWeight: 'bold' }}>Address 1</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                    <Field
                      type="text"
                      variant="outlined"
                      name="address1"
                      component={TextField}
                      size="small"
                      
                    />
                  </Grid>

                  <Grid item xs={6}  textAlign="right">
                  <Typography variant="body" component="p" md={6} sx={{pt:2,  mr: 10, fontWeight: 'bold' }}>Address 2</Typography>
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

                  <Grid item xs={6}  textAlign="right">
                  <Typography variant="body" component="p" md={6} sx={{pt:2,  mr: 10, fontWeight: 'bold' }}>PO Box Number</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                    <Field
                      type="text"
                      variant="outlined"
                      name="poBox"
                      component={TextField}
                      size="small"
                     
                    />
                  </Grid>
                </Grid>

                <Grid container xs={12} sm={4} spacing={1}   >
                <Grid item xs={12}   sx={{height:"100%" , flexDirection:"column",display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Button color="error" variant="contained" type="submit">
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