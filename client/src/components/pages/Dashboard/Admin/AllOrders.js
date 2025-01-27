import { SearchOutlined } from '@mui/icons-material';
import { Box, Button, Card, Divider, Grid, InputAdornment, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Toolbar, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, orderByFilter, searchOrders, updateorder } from '../../../../Redux/actions';
import Loading from '../../Loading/Loading';
import OrdersTable from './OrdersTable';

const AllOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState('')
    const orders = useSelector(state => state.orders.allOrder)
    const searched = useSelector(state => state.orders.searchOrders)
    const loading = useSelector(state => state.allProducts.loading);


    useEffect(() => {
        dispatch(getAllOrders())
    }, [dispatch])

    useEffect(() => {
        if (search !== '') {
            dispatch(searchOrders(search))
        }
    }, [dispatch, search])


    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleAllOrders = () => {
        dispatch(getAllOrders())
    }
    const handlePaid = () => {
        dispatch(orderByFilter("/orders?paymentStatus=Paid"))
    }
    const handlePending = () => {
        dispatch(orderByFilter("/orders?paymentStatus=Pending"))
    }
    const addBtn = {
        color: 'white',
        backgroundColor: '#45CB85',
        padding: '5px 10px',
        textTransform: 'capitalize',
        boxShadow: '0 3px 3px rgba(56,65,74,0.1)',
        '&:hover': {
            backgroundColor: '#3bad71',
        }
    }
    const handleDelivery = (id) => {
        dispatch(getAllOrders())
        dispatch(updateorder(id, {
            deliveryStatus: 'Shipped'
        }))
        dispatch(getAllOrders())
    }
    const handlePayment = (id) => {
        dispatch(getAllOrders())
        dispatch(updateorder(id, {
            paymentStatus: 'Paid'
        }))
        dispatch(getAllOrders())
    }

    return (
        <Box
            mb={4}>
            <Toolbar sx={{
                boxShadow: '0 3px 3px rgba(56,65,74,0.1)',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: '#495057',
            }}>
                Order Details
            </Toolbar>
            <Box p={3}>
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <Card variant="outlined" sx={{ p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                                <Button variant='contained' sx={addBtn}
                                    onClick={() => navigate('/soon')}> + Create Order </Button>
                                <TextField
                                    id="standard-search"
                                    type="search"
                                    placeholder='Search Orders by ID or customer name...'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchOutlined />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => setSearch(e.target.value)}
                                    sx={{
                                        '.css-1xp6qmi-MuiInputBase-input-MuiOutlinedInput-input': {
                                            fontSize: '14px'
                                        },
                                        width: '400px'
                                    }}
                                />
                            </Box>
                            <Divider />

                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="secondary tabs example"
                            >
                                <Tab value="one" label="All Orders" onClick={handleAllOrders} />
                                <Tab value="two" label="Paid" onClick={handlePaid} />
                                <Tab value="three" label="Pending" onClick={handlePending} />
                            </Tabs>
                            {
                                loading ? <Loading /> :
                                    <TableContainer sx={{ maxHeight: 440 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead sx={{ bgcolor: '#f3f6f9' }}>
                                                <TableRow sx={{
                                                    '.MuiTableCell-root': {
                                                        color: '#878a99',
                                                        fontWeight: 'bold'
                                                    }
                                                }}>
                                                    <TableCell> # </TableCell>
                                                    <TableCell> ID замовлення </TableCell>
                                                    <TableCell> Замовник </TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold', minWidth: '150px' }}> Продукт </TableCell>
                                                    <TableCell> Дата замовлення </TableCell>
                                                    <TableCell> Сума </TableCell>
                                                    <TableCell> Спосіб оплати </TableCell>
                                                    <TableCell> Статус платежу </TableCell>
                                                    <TableCell> Статус доставки  </TableCell>
                                                    <TableCell> Статус замовлення  </TableCell>
                                                    <TableCell> Дія </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody sx={{ fontSize: '12px' }}>

                                                {
                                                    search === '' ?
                                                        orders?.length > 0 ?
                                                            orders.map((order, index) =>
                                                                <OrdersTable order={order} index={index}
                                                                    handleDelivery={handleDelivery} handlePayment={handlePayment}
                                                                ></OrdersTable>
                                                            )
                                                            :
                                                            <Typography> No results found </Typography>
                                                        :
                                                        searched?.length > 0 ?
                                                            searched?.map((order, index) =>
                                                                <OrdersTable order={order} index={index}
                                                                    handleDelivery={handleDelivery} handlePayment={handlePayment}
                                                                ></OrdersTable>
                                                            )
                                                            :
                                                            <Typography> No results found </Typography>
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                            }
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default AllOrders;