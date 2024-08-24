import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <Box 
            sx={{height: '100vh'}} 
            display={'flex'} 
            flexDirection={'column'}
            gap={5}
            justifyContent={'center'} 
            alignItems={'center'}
        >
            <Typography>This page bot found</Typography>
            <Link to='/home'>Back to Home</Link>
        </Box>
    );
};

export default NotFound;