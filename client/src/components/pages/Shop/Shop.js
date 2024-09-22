import { Box, Grid, Pagination, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, getMe, searchByFilter } from '../../../Redux/actions';
import Footer from '../../shared/Footer';
import Loading from '../Loading/Loading';
import AllProducts from './AllProducts';

const Shop = () => {
    const products = useSelector(state => state.allProducts.products)
    // const loading = useSelector(state => state.allProducts.loading)
    const user = useSelector(state => state.allUsers.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedPage, setSelectedPage] = useState(1);

    const handleChange = (event, value) => {
        setSelectedPage(value);
        dispatch(searchByFilter(`/products?page=${value}&limit=12`))

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    const page = (Math.ceil(products?.count / 12));
    const skip = (selectedPage - 1) * 12;

    useEffect(() => {
        dispatch(searchByFilter(`/products?page=${selectedPage}&limit=12`))
    }, [dispatch])

    let newCart = user?.cart?.product;
    const handleAddToCart = (id) => {
        if (user?.length !== 0) {
            dispatch(getMe())
            const selectedProduct = products?.result?.find(p => p._id === id)
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


    return (
        <>
            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={2}
                sx={{ mt: 2, px: { md: 16, xs: 4 }, }}
            >

                <Grid item xs={12} md={9} >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Typography sx={{ color: '#00000066', py: 1 }}> Показано <span style={{ color: 'black' }}>
                            {skip + 1} -
                            {skip + products?.result?.length} з {products?.count} </span> Товарів
                        </Typography>
                    </Box>

                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 2 }} sx={{
                        mt: 2,
                    }}>
                        {
                            products?.result?.length > 0 ?
                                products?.result?.map((product, i) =>
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
                    <Pagination count={page} color="primary" defaultPage={1}
                        page={selectedPage} onChange={handleChange}
                        sx={{
                            py: 6,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center'
                        }} />
                </Grid>

            </Grid>
            <Footer></Footer>
        </>
    );
};

export default Shop;