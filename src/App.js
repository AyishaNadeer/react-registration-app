import { useEffect } from 'react';
import MainCard from './components/UI/MainCard';
import InnerCard from './components/UI/InnerCard';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from './store/stepperCounter-slice';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';
import { grey, red } from '@mui/material/colors';

function App() {

  const theme = createTheme({
 
    palette: {
      mode: "light",
      primary: {
        main: red[700]
      },
      secondary: {
        main: grey[400],
        light: grey[100]
      }
    },
    typography: {

      h2: {

        fontFamily: ['Open Sans', 'sans-serif']
      },
      h3: {
        fontFamily: ['Questrial', 'sans-serif', 'Poppins', 'sans-serif'],
        color: '#FFF'
      },
      h6: {
        fontSize: "1.5rem"
      },
      body2: {
        fontWeight: 550,
        fontSize: "1rem",
        fontFamily: [
          'Montserrat',
          'Titillium Web:300,400,700',
          'Anton',
          'sans-serif'
        ]

      },

    },
    button: {
      textTransform: "none"
    }
  })

  const counter = useSelector(state => state.counter.counter);

  const dispatch = useDispatch();


  useEffect(() => {
   
    if (counter !== 0) {
      dispatch(counterActions.setCounter(counter));
    }


  }, []);



  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <MainCard >
        <InnerCard />
      </MainCard>
    </ThemeProvider>

  );
}

export default App;
