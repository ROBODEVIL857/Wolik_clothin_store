import { Box, Grid, Pagination, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, getMe, searchByFilter, getRecommendations, trendingProducts } from '../../../Redux/actions';
import Footer from '../../shared/Footer';
import Loading from '../Loading/Loading';

import { FavoriteBorder, ShoppingCart } from '@mui/icons-material';
import Slider from 'react-slick';


import AllProducts from '../Shop/AllProducts';
import Api from '../../../Axios/Api';


const Recomendations = () => {

    const products = useSelector(state => state.allProducts.recommendedProducts)
    const user = useSelector(state => state.allUsers.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedPage, setSelectedPage] = useState(1);

    const handleChange = (event, value) => {
        setSelectedPage(value);
        dispatch(getRecommendations())

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    useEffect(() => {
        dispatch(getRecommendations())
    }, [dispatch])

    let newCart = user?.cart?.product;
    const handleAddToCart = (id) => {
        if (user?.length !== 0) {
            dispatch(getMe())
            const selectedProduct = products?.find(p => p._id === id)
            const exists = newCart?.find(c => c._id === selectedProduct._id)
            if (!exists) {
                selectedProduct.qty = 1;
                newCart = [...newCart, selectedProduct];
            }
            else {
                exists.qty = exists.qty + 1;
                const rest = newCart.filter(c => c._id !== exists._id)
                newCart = [...rest, exists];
            }
            const cartData = {
                cart: {
                    product: newCart
                },
            }
            dispatch(addToCart(user._id, cartData, id));
            dispatch(getMe())
        }
        else {
            navigate('/login')
        }

    }
    // -----------------------------------------------------------------------------------------
    const trending = useSelector(state => state.allProducts.trending);

    useEffect(() => {
        dispatch(trendingProducts())
    }, [dispatch])

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch])


    const cart = {
        backgroundColor: '#FF8E78',
        color: 'white',
        padding: '5px 10px',
        borderRadius: 0,
        border: 0,
        textTransform: 'capitalize',
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
        textTransform: 'capitalize',
        color: '#4b38b3',
        '&:hover': {
            backgroundColor: '#4b38b3',
            color: 'white',
        }
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: false,
        mobileFirst: true
    }





    if (products.length == 0) {
        return (
            <>
                <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={2}
                    sx={{ mt: 2, px: { md: 16, xs: 4 }, }}
                >

                    <Grid item xs={12} md={9} >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                        </Box>

                        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 2 }} sx={{
                            mt: 2,
                        }}>
                            {
                                trending?.length > 0 ?
                                    trending?.map((product, i) =>
                                        <Grid item xs={12} sm={4} md={3} key={product._id}>
                                            <AllProducts
                                                product={product}
                                                handleAddToCart={handleAddToCart}
                                                user={user}
                                            />
                                        </Grid>
                                    )
                                    :
                                    <Loading />
                            }
                        </Grid>
                    </Grid>

                </Grid>
                <Footer></Footer>
            </>
        )
    }

    return (
        <>
            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={2}
                sx={{ mt: 2, px: { md: 16, xs: 4 }, }}
            >

                <Grid item xs={12} md={9} >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                    </Box>

                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 2 }} sx={{
                        mt: 2,
                    }}>
                        {
                            products?.length > 0 ?
                                products?.map((product, i) =>
                                    <Grid item xs={12} sm={4} md={3} key={product._id}>
                                        <AllProducts
                                            product={product}
                                            handleAddToCart={handleAddToCart}
                                            user={user}
                                        />
                                    </Grid>
                                )
                                :
                                <Loading />
                        }
                    </Grid>
                </Grid>

            </Grid>
            <Footer></Footer>
        </>
    );
};

export default Recomendations;