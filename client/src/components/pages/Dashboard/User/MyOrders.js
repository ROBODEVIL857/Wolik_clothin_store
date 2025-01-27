import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMe, getOrdersByEmail, updateorder } from '../../../../Redux/actions';
import { Box, Card, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material';
import OrderTable from './OrderTable';
import { useEffect } from 'react';
import Loading from '../../Loading/Loading';

const MyOrders = () => {

    const user = useSelector(state => state.allUsers.user);
    const orders = useSelector(state => state.orders.orders)
    const loading = useSelector(state => state.allProducts.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        dispatch(getOrdersByEmail(user?.email))
    }, [dispatch, user?.email])

    const handleOrder = (id) => {
        dispatch(getMe())
        dispatch(updateorder(id, {
            orderStatus: 'Cancelled'
        }))
        dispatch(getMe())
    }

    return (
        <>
            <Box
                mb={4}>
                <Toolbar sx={{
                    boxShadow: '0 3px 3px rgba(56,65,74,0.1)',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: '#495057',
                }}>
                    Мої замовлення
                </Toolbar>
                <Box p={3}>
                    <Grid container spacing={2}>
                        <Grid item md={12}>
                            <Card variant="outlined" sx={{ p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)' }}>
                                <Divider />
                                {
                                    loading ? <Loading /> :
                                        <TableContainer>
                                            <Table aria-label="simple table">
                                                <TableHead sx={{ bgcolor: '#f3f6f9' }}>
                                                    <TableRow
                                                        sx={{
                                                            '.MuiTableCell-root': {
                                                                color: '#878a99',
                                                                fontWeight: 'bold'
                                                            }
                                                        }}>
                                                        <TableCell> # </TableCell>
                                                        <TableCell> ID замовлення </TableCell>
                                                        <TableCell> Замовник </TableCell>
                                                        <TableCell> Продукт </TableCell>
                                                        <TableCell> Дата замовлення </TableCell>
                                                        <TableCell> Сума </TableCell>
                                                        <TableCell> Спосіб оплати </TableCell>
                                                        <TableCell> Статус платежу </TableCell>
                                                        <TableCell> Статус доставки  </TableCell>
                                                        <TableCell> Статус замовлення  </TableCell>
                                                        <TableCell> Дія </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody sx={{
                                                    '.MuiTableCell-body': {
                                                        color: '#212529'
                                                    }
                                                }}>
                                                    {
                                                        orders?.map((order, index) =>
                                                            <OrderTable
                                                                order={order} index={index} handleOrder={handleOrder}
                                                            ></OrderTable>
                                                        )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                }
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default MyOrders;