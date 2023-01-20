import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../store/user-slice";
import { uiActions } from "../../../store/ui-slice";
import { counterActions } from '../../../store/stepperCounter-slice';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Formik, Form } from 'formik';
import React, { useState, useRef, useCallback } from "react";
import { Stack, Button, ButtonGroup, Box, Typography, Grid } from '@mui/material';
import SignatureCanvas from 'react-signature-canvas'
import Webcam from 'react-webcam';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const videoConstraints = {
  width: 160,
  height: 120,
  facingMode: "user",
};


const ConfirmationForm = ({ values }) => {

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

  const sendUserData = async ({ profile, signature }) => {

    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending user data'
    }));
    const response = await fetch(
      `https://react-http-d77c9-default-rtdb.firebaseio.com/User/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify({
          personalInfo: user.personalInfo,
          officeDetails: user.officeInfo,
          profile,
          signature
        }
        )
      }
    );

    if (!response.ok) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending user data failed'
      }));
    }

    dispatch(uiActions.showNotification({
      status: 'success',
      title: 'Success!',
      message: 'Sent user data successfully!'
    }));

  }

  const backButtonClickHandler = (event) => {
    console.log('Hi - back button handler');
    dispatch(counterActions.decrement());

  }

  return (
    <Stack>
      {user && (
        <Box
          component="div"
          sx={{ display: "block", border: "2px dashed grey", borderRadius: "25px", height: "100%", width: "100%", m: 0 }}
        >
          <Formik
            initialValues={{ profile: null, signature: '' }}
            onSubmit={(values) => {

              //console.log(values)
              dispatch(userActions.addUserProfile(values));

              sendUserData(values)
                .then(() => {
                  dispatch(counterActions.increment());
                  if (activeStep === steps.length - 1) {
                    dispatch(counterActions.finish());
                  }
                })
                .catch((error) => {
                  dispatch(
                    uiActions.showNotification({
                      status: "error",
                      title: "Error!",
                      message: "Sending user data failed",
                    })
                  );
                });

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
                  <Grid container textAlign={"left"} xs={12} sm={8} md={4} padding="2%">
                    <Grid item xs={12} >
                      <Typography
                        variant="body"
                        component="p"
                        sx={{ fontWeight: "bold" }}
                      >
                        {user.personalInfo.name}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body"
                        component="p"
                        sx={{ fontWeight: "bold" }}
                      >
                        {user.personalInfo.email}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body"
                        component="p"
                        sx={{ fontWeight: "bold" }}
                      >
                        {user.personalInfo.mobile}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body"
                        component="p"
                        sx={{ fontWeight: "bold" }}
                      >
                        {user.personalInfo.address1}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body"
                        component="p"
                        sx={{ fontWeight: "bold" }}
                      >
                        {user.personalInfo.address2}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body"
                        component="p"
                        sx={{ fontWeight: "bold" }}
                      >
                        {user.personalInfo.address3}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container textAlign={"left"} xs={12} sm={8} md={4} padding="2%" >
                    <Grid item xs={12} >
                      <Typography
                        variant="body"
                        component="p"
                        sx={{ fontWeight: "bold" }}
                      >
                        {user.officeInfo.building}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body"
                        component="p"
                        sx={{ fontWeight: "bold" }}
                      >
                        {user.officeInfo.city}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body"
                        component="p"
                        sx={{ fontWeight: "bold" }}
                      >
                        {user.officeInfo.landline}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body"
                        component="p"
                        sx={{ fontWeight: "bold" }}
                      >
                        {user.officeInfo.address1}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body"
                        component="p"
                        sx={{ fontWeight: "bold" }}
                      >
                        {user.officeInfo.address2}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography
                        variant="body"
                        component="p"
                        sx={{ fontWeight: "bold" }}
                      >
                        {user.officeInfo.poBox}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container textAlign={"left"} xs={12} sm={8} md={4} padding="2%">
                    <Grid item xs={12} height="60%" justifyItems={"right"} container
                      border="2px dashed grey">

                      <Grid item md={6} sx={{ display: "block", border: "2px dashed grey", borderRadius: "15%", height: "80%", justifyContent: "left" }}>
                        {showCamera ?

                          <><Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            minScreenshotWidth={180}
                            minScreenshotHeight={180}
                          />
                           
                            <ButtonGroup >
                              <Button type='button' variant="outlined" startIcon={<CheckCircleIcon />} onClick={() => capture(setFieldValue)} />
                              <Button type='button' variant="outlined" startIcon={<CancelIcon />} onClick={() => setShowCamera(prevValue => !prevValue)} />
                            </ButtonGroup>

                          </>
                          :
                          imageURL &&
                          <Box component="img" src={imageURL} alt='test' sx={{ height: "120px", width: "auto" }} />
                        }
                      </Grid>
                      <Grid item md={6} spacing={2} sx={{ height: "80%", justifyContent: "right" }}>
                        <Grid item md={6} sx={{ height: "40%", justifyContent: "right" }}>
                          <CameraAltIcon onClick={() => setShowCamera(prevValue => !prevValue)} />

                        </Grid>
                        <Grid item md={6} sx={{ height: "40%", justifyContent: "right" }}>

                          <button type='button' onClick={handleUploadClick}>
                            <FileUploadIcon />
                          </button>
                          <input
                            type="file"
                            ref={inputRef}
                            onChange={(e) => handleFileChange(e, setFieldValue)}
                            style={{ display: 'none' }}
                          />
                        </Grid>
                      </Grid>
                      {/* </Box> */}
                    </Grid>
                    <Grid item xs={12} height="35%" justifyItems={"right"} container
                      border="2px dashed grey">

                      <Grid item md={6} >

                        <SignatureCanvas penColor='gray' name="sigpad"
                          canvasProps={{ width: 270, height: 100, className: 'sigCanvas' }} ref={sigRef} onEnd={() => {
                            setSigpad(sigRef.current.toDataURL());
                            setFieldValue("signature", sigRef.current.toDataURL());
                            console.log(sigRef.current.toDataURL());
                          }} />
                        <Button variant="outlined" startIcon={<CancelIcon />} type="button" onClick={() => { console.log('Cleared'); setSigpad(null); }} />

                      </Grid>

                    </Grid>
                  </Grid>
                </Grid>
                <Grid container xs={12} spacing={3} sx={{ m: 0, width: "100%" }}>
                  <Grid item xs={6} justifyContent="right">
                    <Button
                      variant="contained"
                      type="button"
                      onClick={backButtonClickHandler}
                    >
                      Back
                    </Button>
                  </Grid>
                  <Grid item xs={6} justifyContent="left">
                    <Button color="error" variant="contained" type="submit">
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
