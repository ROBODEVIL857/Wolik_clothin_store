import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import { Done, Loop } from '@mui/icons-material';
import Footer from '../../shared/Footer';
import Loading from '../Loading/Loading';


const Cart = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.allUsers.user)
    const loading = useSelector(state => state.allProducts.loading)

    const cart = user?.cart?.product

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        cart?.forEach(item => {
            if (item?.discount) {
                const discount = +item.price * +item.discount / 100
                const discountedPrice = parseFloat(+item.price - discount).toFixed(0);
                total = parseFloat(total) + discountedPrice * +item.qty;
                total = total.toFixed(0);
            }
            else {
                total = parseFloat(total) + parseFloat(item.price) * parseFloat(item.qty);
                total = total.toFixed(0);
            }

        })
        setTotal(total);
    }, [cart, total])

    const handleCheckout = () => {
        navigate('/checkout', { state: { total } });
    }
    const handleContinue = () => {
        navigate('/shop');
    }
    const continueButton = {
        color: 'white',
        backgroundColor: '#FF8E78',
        marginRight: '20px',
        borderRadius: 0,
        '&:hover': {
            color: 'white',
            backgroundColor: '#df6750',
        },
        mt: { xs: 2, md: 0 }
    }
    const checkout = {
        color: 'white',
        backgroundColor: '#4b38b3',
        marginRight: '20px',
        borderRadius: 0,
        '&:hover': {
            color: 'white',
            backgroundColor: '#4b38b3',
        },
        mt: { xs: 2, md: 0 }
    }
    if (loading) {
        return <Loading />
    }

    return (
        <>
            <Box sx={{
                position: 'relative',
                pb: 10,
                mb: 10,
                px: { md: 16, xs: 4 }
            }}>
                {
                    cart?.length !== 0 ?
                        <TableContainer >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Зображення</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Назва товару</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align="center">В наявності</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Кількість</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Ціна одного товару</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Всього</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Видалити</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        cart?.map(c =>
                                            <CartItem key={c._id}
                                                cartItem={c}
                                            ></CartItem>
                                        )
                                    }
                                    <TableRow>
                                        <TableCell colSpan={5} align='center'
                                            sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                                            Сума
                                        </TableCell>
                                        <TableCell colSpan={0} align='center' sx={{ fontWeight: 'bold' }}>
                                            грн. {total}
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        :
                        <Typography variant='h4' sx={{ textAlign: 'center', mt: 4 }}> Корзина пуста </Typography>

                }
                {
                    cart?.length === 0 ||
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'right', flexWrap: 'wrap' }}>
                        <Button variant='contained' sx={continueButton} onClick={handleContinue} startIcon={<Loop />}>
                            Продовжити покупки
                        </Button>
                        <Button variant='contained' sx={checkout} onClick={handleCheckout} startIcon={<Done />}>
                            Перейти до оплати
                        </Button>
                    </div>
                }
            </Box>
            <Footer></Footer>
        </>
    );
};

export default Cart;