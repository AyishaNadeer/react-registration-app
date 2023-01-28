import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../store/user-slice";
import { uiActions } from "../../../store/ui-slice";
import { counterActions } from '../../../store/stepperCounter-slice';
import { Formik, Form } from 'formik';
import React, { useState, useRef, useCallback } from "react";
import { Stack, Button, ButtonGroup, Box, Typography, Grid } from '@mui/material';
import SignatureCanvas from 'react-signature-canvas'
import Webcam from 'react-webcam';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { object, string } from 'yup';
import profilePicIcon from '../../../profilePicIcon.png';
import cameraIcon from '../../../cameraIcon.png';
import fileIcon from '../../../fileIcon.png';
import apiRequest from '../../../apiRequest';
import globalUseStyles from './stylesHooks';

const FORM_VALIDATION = object().shape({
  profile: string().required(),
  signature: string().required(),
 });

const videoConstraints = {
  width: 100,
  height: 100,
  facingMode: "user",
};


const ConfirmationForm = ({ values }) => {

  const API_URL = 'http://localhost:3500/users';

  const globalClasses = globalUseStyles();

  const steps = useSelector(state => state.counter.steps);
  const activeStep = useSelector(state => state.counter.counter);
  const user = useSelector(state => state.user);

  const userId = user.id;

  const dispatch = useDispatch();
  const [showCamera, setShowCamera] = useState(false);
  const [sigpad, setSigpad] = useState(null);

  const [imageURL, setImageURL] = useState('')

  const webcamRef = useRef(null)
  const sigRef = useRef();
  const inputRef = useRef();


  const handleUploadClick = () => {

    inputRef.current?.click();
  };

  const handleFileChange = (e, setFieldValue) => {
    if (!e.target.files) {
      return;
    }

    File.prototype.convertToBase64 = function (callback) {
      var reader = new FileReader();
      reader.onloadend = function (e) {
        callback(e.target.result, e.target.error);
      };
      reader.readAsDataURL(this);
    };

    var selectedFile = e.target.files[0];
    selectedFile.convertToBase64(function (base64) {
      setImageURL(base64);
      setFieldValue("profile", base64);

    })

  };

  const capture = useCallback((setFieldValue) => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImageURL(imageSrc);
    setShowCamera(false);
    setFieldValue("profile", imageSrc);
  }, [webcamRef, setImageURL, setShowCamera]);

  const saveUserData = async ({ profile, signature }) => {

    dispatch(uiActions.showNotification({status: 'pending',title: 'Sending...',message: 'Sending user data'}));

    if(userId !== ''){
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        profile,
        signature
      })
    };
  
    const { errMsg}  = await apiRequest(`${API_URL}/${userId}`, updateOptions)
    if(errMsg)  dispatch(uiActions.showNotification({ status: 'error',title: 'Error!',message: 'Sending user data failed'}));
    else  dispatch(uiActions.showNotification({status: 'success',title: 'Success!',message: 'Sent user data successfully!'}));
  }
  }


  const backButtonClickHandler = (event) => {
    console.log('Hi - back button handler');
    dispatch(counterActions.decrement());

  }

  return (
    <Stack>
      {user && (
        <Box className={globalClasses.formBox}
          component="div"
          sx={{  m: 5 }}

        >
          <Formik
            initialValues={{ profile: null, signature: '' }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {

              dispatch(userActions.addUserProfile(values));

              saveUserData(values)
                .then(() => {
                  dispatch(counterActions.increment());
                  if (activeStep === steps.length - 1) {
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

            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <Grid sx={{ mt: 5, ml: 0 }}
                  textAlign="center"
                  container
                  spacing={5}
                  width="100%"
                >
                  <Grid container sx={{textAlign: 'left', pl:10}} xs={12} sm={8} md={4} padding="2%">
                    <Grid item xs={12} >
                      <Typography
                        variant="body2"
                        component="p"
                       
                      >
                        {user.personalInfo.name}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body2"
                        component="p"
                        
                      >
                        {user.personalInfo.email}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body2"
                        component="p"
                     
                      >
                        {user.personalInfo.mobile}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body2"
                        component="p"
                      
                      >
                        {user.personalInfo.address1}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body2"
                        component="p"
                      
                      >
                        {user.personalInfo.address2}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body2"
                        component="p"
                        
                      >
                        {user.personalInfo.address3}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container sx={{textAlign:'left', pl:10}} xs={12} sm={8} md={4} padding="2%" >
                    <Grid item xs={12} >
                      <Typography
                        variant="body2"
                        component="p"
                      
                      >
                        {user.officeInfo.building}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body2"
                        component="p"
                       
                      >
                        {user.officeInfo.city}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body2"
                        component="p"
                       
                      >
                        {user.officeInfo.landline}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body2"
                        component="p"
                       
                      >
                        {user.officeInfo.address1}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body2"
                        component="p"
                        
                      >
                        {user.officeInfo.address2}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body2"
                        component="p"
                       
                      >
                        {user.officeInfo.poBox}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container sx={{textAlign:"left",padding:"2%",display:"flex" }} xs={12} sm={8} md={4}  spacing={1}  >
                   
                    <Grid  container  xs={10} sx={{height:"45%",justifyItems:"center",alignSelf:'flex-start',border:"2px dashed grey", borderRadius:"15%", m:0 }} 
                       >

                      <Grid item xs={12} md={6} sx={{ width:"80%", display: "block", justifyContent: "center", alignItems: "center" }}>
                       
                        {showCamera ?

                          <><Webcam 
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            minScreenshotWidth={100}
                            minScreenshotHeight={100}
                          />

                            <ButtonGroup >
                              <Button color="secondary" type='button' variant="text" startIcon={<CheckCircleIcon />} onClick={() => capture(setFieldValue)} />
                              <Button  color="secondary" type='button' variant="text" startIcon={<CancelIcon />} onClick={() => setShowCamera(prevValue => !prevValue)} />
                            </ButtonGroup>

                          </>
                          :
                          imageURL ?
                          <Box component="img" src={imageURL} alt='test' sx={{ height: "100px", width: "auto" }} />
                          :  <Box component="img" src={profilePicIcon} alt='test' sx={{ml:3,mt:2, height: "80px", width: "auto" }} />

                        } 
                      </Grid>
                      <Grid item xs={12} md={6} spacing={3} sx={{ height: "80%", justifyContent: "right", textAlign: "right" }}>
                        <Grid item  md={4} sx={{ height: "40%", justifyContent: "right", ml: "25%" }} >
                          <Button type='button' onClick={() => setShowCamera(prevValue => !prevValue)}>
                          <img src={cameraIcon}  fontSize="large" alt="Camera Icon" />
                          </Button>
                         
                        </Grid>
                        <Grid item md={4} sx={{ height: "40%", justifyContent: "right", ml: "25%", mt: "5%" }}>

                          <Button type='button' onClick={handleUploadClick}>
                            <img src={fileIcon} alt="File Icon" />
                          </Button>
                          <input
                            type="file"
                            ref={inputRef}
                            onChange={(e) => handleFileChange(e, setFieldValue)}
                            style={{ display: 'none' }}
                            accept="image/*"
                          />
                        </Grid>
                      </Grid>
                     
                    </Grid>
                   
                    <Grid item xs={10} className={globalClasses.canvasContainer} >

                      <SignatureCanvas  name="sigpad" Tooltip="Signature" className={globalClasses.canvas} 
                        canvasProps={{ width: 'inherit', height: '100%', className: 'sigCanvas' }} ref={sigRef} onEnd={() => {
                          setSigpad(sigRef.current.toDataURL());
                          setFieldValue("signature", sigRef.current.toDataURL());
                          console.log(sigRef.current.toDataURL());
                        }} />
                      <Button color="secondary" variant="text" startIcon={<CancelIcon />} type="button" onClick={() => { console.log('Cleared'); sigRef.current.clear(); }} />

                    </Grid>

                  </Grid>
                </Grid>
                <Grid container xs={12} spacing={3} sx={{ m: 0, width: "100%" }}>
                  <Grid item xs={6} sx={{justifyContent:"right"}}>
                    <Button color="secondary"
                      variant="contained"
                      type="button"
                      onClick={backButtonClickHandler}
                    >
                      Back
                    </Button>
                  </Grid>
                  <Grid item xs={6} sx={{justifyContent:"left"}}>
                    <Button color="primary" variant="contained" type="submit">
                      Submit
                    </Button>

                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      )}
    </Stack>
  );
};

export default ConfirmationForm;
