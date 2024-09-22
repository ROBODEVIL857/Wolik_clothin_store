import { Celebration } from '@mui/icons-material';
import { Box, Button, Card, Typography } from '@mui/material';
import React from 'react';
import {  useNavigate } from 'react-router-dom';

const OrderComplete = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/dashboard')
    }

    return (
        <Box>
            <Card variant="outlined" sx={{ m: 16, p: 4, boxShadow: '0 3px 3px rgba(56,65,74,0.1)', textAlign: 'center' }}>
                <Celebration sx={{ fontSize: '50px', color: '#45cb85' }} />
                <Typography sx={{ fontWeight:'bold', mt: 2, fontSize:'20px' }}> Дякую ! Ваше замовлення виконано ! </Typography>
                <Typography mt={1}> Ви отримаєте свій товар найближчим часом... </Typography>
                <Button variant='contained' sx={{ mt: 4 }} onClick={handleClick}>
                   Переглянути свої замовлення
                </Button>
            </Card>
        </Box>
    );
};

export default OrderComplete;