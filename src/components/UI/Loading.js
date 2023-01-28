import RefreshIcon from '@mui/icons-material/Refresh';

import {Stack, Typography,CircularProgress, Box,  Grid} from '@mui/material';
import globalUseStyles from '../Registration/Forms/stylesHooks';

const Loading = () => {
    const globalClasses = globalUseStyles();
    return(
       
        <Stack>
                <Box  sx={{display: 'block'}}
              component="div"
              
            >
                <Grid container  spacing={5}  display="block">
            <Grid item md={12} sx={2} textAlign="center">
            <Typography fontWeight="normal" variant="h1"><RefreshIcon  fontSize="inherit" color="#757575"/></Typography>
        
            </Grid>
            
            
        </Grid>
            </Box>
        </Stack>
        
          
            
        
       
    );
};

export default Loading;