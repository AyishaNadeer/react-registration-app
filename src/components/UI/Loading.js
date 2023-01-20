import RefreshIcon from '@mui/icons-material/Refresh';

import {Stack, FormGroup, TextField,InputAdornment, Button, Select, MenuItem, NativeSelect,Box, Card, CardContent, Typography,InputLabel,Input, Grid, Paper} from '@mui/material';

const Loading = () => {
    return(
        <Grid container  spacing={5}  display="block">
            <Grid item md={12} sx={2} textAlign="center">
            <Typography fontWeight="normal" variant="h1"><RefreshIcon  fontSize="inherit" color="#757575"/></Typography>
            </Grid>
            
            
        </Grid>
    );
};

export default Loading;