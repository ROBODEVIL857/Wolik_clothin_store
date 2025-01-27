import { Box, Button, Typography } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Api from '../../../Axios/Api';
import { addToCart, clearCart, getMe, postOrders } from '../../../Redux/actions';

const Payment = ({ total, shippingDetails, setError, cart }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionID, setTransactionID] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const user = useSelector(state => state.allUsers.user)

    const amount = parseInt(total)
    const data = {
        amount
    }

    useEffect(() => {
        const payment = async () => {
            await Api.post(`/payment/create-payment-intent`, data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(data => {
                    console.log(data)
                    if (data.data.data.clientSecret) {
                        setClientSecret(data.data.data.clientSecret);
                    }
                })
                .catch(err => console.log(err));
        }
        payment();
    }, [amount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = {
            name: user?.firstName + ' ' + user?.lastName,
            email: user?.email
        }
        if (shippingDetails.phone === '') {
            setError({ phone: "Це поле є обов'язковим" })
        }
        else if (shippingDetails.address === '') {
            setError({ address: "Це поле є обов'язковим" })
        }
        else if (shippingDetails.paymentMethod === '') {
            setError({ paymentMethod: 'Please select your payment method' })
        }
        else {
            if (!stripe || !elements) {
                return;
            }
            const card = elements.getElement(CardElement);
            if (card === null) {
                return;
            }
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card,
            });

            setCardError(error?.message || '');
            setSuccess('');
            setProcessing(true);

            stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: shippingDetails.name,
                        email: shippingDetails.email
                    },
                },
            })
                .then(function (result) {
                    // Handle result.error or result.paymentIntent
                    if (result.paymentIntent) {
                        setCardError('');
                        setSuccess('Your payment is completed');
                        setTransactionID(result.paymentIntent.id);
                        const payment = {
                            transactionID: result.paymentIntent.id,
                        }
                        // console.log(payment);
                        const orderData = {
                            ...shippingDetails, ...userInfo, payment
                        }

                        //fetch(`https://winkles-server.onrender.com/payment`, {
                        fetch(`https://localhost:8080/payment`, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                authorization: `Bearer ${localStorage.getItem('accessToken')}`
                            },
                            body: JSON.stringify(payment)
                        })
                            .then(res => res.json())
                            .then(data => {
                                dispatch(postOrders(orderData))
                                setProcessing(false);
                                dispatch(clearCart())
                                const cartData = {
                                    cart: {
                                        product: []
                                    },
                                }
                                dispatch(addToCart(user._id, cartData))
                                navigate(`/orderComplete`, { state: { shippingDetails } })
                                dispatch(getMe())
                            });
                    }

                    if (result.error) {
                        setCardError(result.error.message);
                        setProcessing(false);
                    }
                });
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box sx={{ border: '2px solid #4b38b3', p: 2, borderRadius: '5px' }}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#43444a',
                                    },
                                    border: '2px solid violet'
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </Box>
                {
                    cardError && <Typography color="#f06548" mt={1}> {cardError} </Typography>
                }
                {
                    success && <Typography color="#45cb85" mt={1}> {success} <br /> Transaction ID: {transactionID} </Typography>
                }
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="submit" variant='contained' sx={{ mt: 6 }}
                        disabled={!stripe || !clientSecret || success || cart?.length === 0}
                    >
                        Оплатити та замовити
                    </Button>
                </Box>
            </form>

        </>
    );
};

export default Payment;