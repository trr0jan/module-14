import React from 'react';
import { Card, CardMedia, Box, Button } from '@mui/material';

const SingleCard = ({ id, name, time, image, handleClick }) => {
    const handleButtonClick = (e) => {
        e.stopPropagation();
        console.log(`Film ID: ${id}`);
    };

    return (
        <Card sx={{ width: 395, height: 222, position: 'relative', margin: 4, }} onClick={() => handleClick(id)}>
        <CardMedia
            component="img"
            height="222"
            image={image}
        />
        <Box
            sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.80) 0%, rgba(20, 20, 20, 0.40) 50%, rgba(83, 100, 141, 0.00) 100%)',
            }}
        >
            <Box sx={{ position: 'absolute', bottom: 40, left: 20, color: 'white', textAlign: 'left', }}>
            <p style={{fontSize: '1.15rem'}}>{name}</p>
            <p>{time}</p>
            <Button onClick={handleButtonClick} style={{border: '1px solid #E50914', borderRadius: '0', background: '#E50914', width: '100px', height: '30px', color: '#fff', textTransform: 'none'}}>
                Show more
            </Button>
            </Box>
        </Box>
        </Card>
    );
};

export default SingleCard;
