import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import { Email, KeyboardArrowUp, LocationOn, NavigateNext, Phone } from '@mui/icons-material';

const Footer = () => {

    const footerBtn = {
        textTransform: 'capitalize',
        fontSize: '14px',
        color: '#e2e2e2',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '10px',
        '&:hover': {
            color: '#FF8E78'
        }
    }
    const style = {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        paddingTop: '15px'
    }

    const [goTopBtn, setGoTopBtn] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setGoTopBtn(true);
            } else {
                setGoTopBtn(false);
            }
        });
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
           

            <Grid container sx={{ py: 2, borderTop: 1, borderColor: '#444444', backgroundColor: '#555555', px:{ md: 16 , xs: 4 } , color: 'white' }}>
                <Grid item xs={12} lg={6}>
                    <Typography sx={{ textAlign: { xs: 'center', lg:'initial'}}}>&copy; 2023 Шаргало Дмитро</Typography>
                </Grid>
            </Grid>
        </>

    );
};

export default Footer;