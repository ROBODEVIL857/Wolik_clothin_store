import { FavoriteBorder, ShoppingCart } from '@mui/icons-material';
import { Box, Button, Grid, Rating, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

const ListView = ({ product, handleAddToCart }) => {
    
    const navigate = useNavigate();
    const [avgRating, setAvgRating] = useState(0);
    const loading = useSelector(state => state.allProducts.loading)

    const cart = {
        backgroundColor: '#FF8E78',
        color: 'white',
        padding: '5px 10px',
        borderRadius: 0,
        border: 0,
        '&:hover': {
            backgroundColor: '#df6750',
            color: 'white',
            border: 0
        }
    }

    const details = {
        padding: '5px 14px',
        borderRadius: 0,
        border: 1,
        borderColor: '#4b38b3',
        fontWeight: 600,
        color: '#4b38b3',
        '&:hover': {
            backgroundColor: '#4b38b3',
            color: 'white',
        }
    }
    useEffect(() => {
        let sum = 0;
        product?.reviews?.forEach(r =>
            sum = sum + r.rating
        )
        setAvgRating(sum / product.reviews?.length)
        // console.log(avgRating)
    }, [avgRating, product.reviews])

    if (loading) {
        return <Loading />
    }
    return (
        <Grid container columnSpacing={{ xs: 2, md: 4 }} pb={4}>
            <Grid item xs={4} >
                <img src={product?.image} alt="" width='100%' height='100%' style={{ objectFit: 'cover', cursor: 'pointer' }} 
                onClick={() => navigate(`/product/${product._id}`)} />
            </Grid>
            <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom variant="h5" sx={{ textTransform: 'capitalize', fontWeight: 'bold', color: 'black', cursor: 'pointer' }} 
                onClick={() => navigate(`/product/${product._id}`)}>
                    {product.title}
                </Typography>
                <Rating name="read-only"
                        size="medium"
                        value={avgRating}
                        precision={0.5}
                        readOnly
                       
                    />

                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FF8E78', pt: 1 }}>
                    грн. {product.price}
                </Typography>

                <Typography variant="body2" sx={{ py: 2, fontWeight: 'bold', color: 'gray', textTransform: 'capitalize' }}>
                    Brand: {product.brand}
                </Typography>

                <Typography variant="body2" gutterBottom sx={{
                    textAlign: 'justify',
                    marginBottom: '4px', display: 'inline-block', fontSize: '14px', paddingBottom: '10px'
                }}
                dangerouslySetInnerHTML={{ __html: product.description.length > 220 ? product.description.slice(0, 220) + '.........' : product.description }}>
                </Typography>
                <Box sx={{ display: 'flex', my: 2, gap: '10px' }}>
                    <Button size="small" sx={cart}
                        onClick={() => handleAddToCart(product._id)} startIcon={<ShoppingCart />}>
                        Додати в кошик</Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ListView;