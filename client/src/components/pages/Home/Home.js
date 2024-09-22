import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../Redux/actions';
import Footer from '../../shared/Footer';
import Banner from './Banner';
import Brand from './Brand';
import Trending from './Trending';

const Home = () => {
    const products = useSelector(state => state.allProducts.allProducts)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <>
            <Banner></Banner>
            <Trending products={products}/>
            <Brand></Brand>
            <Footer/>
        </>
    );
};

export default Home;