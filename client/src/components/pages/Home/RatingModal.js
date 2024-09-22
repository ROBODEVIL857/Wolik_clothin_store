import { Button, InputLabel, Modal, Rating, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createReview, fetchReviewbyProductId, getMe } from '../../../Redux/actions';
import { CleaningServices } from '@mui/icons-material';

const RatingModal = ({id}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const user = useSelector(state => state.allUsers.user);
    const dispatch = useDispatch();
    const { firstName, lastName, imageUrl } = user;

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState('');
    // console.log(reviews)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24
    };

    const labels = {
        0.5: 'Погано',
        1: 'Погано+',
        1.5: 'Не погано',
        2: 'Не погано+',
        2.5: 'Добре',
        3: 'Добре+',
        3.5: 'Чудово',
        4: 'Чудово+',
        4.5: 'Прекрасно',
        5: 'Прекрасно+',
    };
    // console.log(value)

    const getLabelText = (value) => {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const handleReview = () => {
        dispatch(fetchReviewbyProductId(id))
        const data = {
            rating: value,
            summary: labels[value],
            review: review,
            postedBy: firstName + ' ' + lastName,
            avatar: imageUrl,
            productId: id
        }
        dispatch(createReview(data))
        handleClose()
        setValue(0);
        setReview('');
        dispatch(fetchReviewbyProductId(id))
    }

    return (
        <>
            <Button variant='contained' fontSize='small' onClick={handleOpen}>Write a Review</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                        fontWeight: 'bold',
                        bgcolor: '#c4b6dc',
                        p: 2
                    }}>
                        Написати відгук
                    </Typography>
                    <Box sx={{ p: 2 }}>
                        <Typography id="modal-modal-description" sx={{ fontWeight: 'bold' }}>
                            Як ви оцінюєте цей товар?
                        </Typography>

                        <Typography sx={{ width: '100%', color: 'rgb(51 49 49 / 94%)', mt: 2 }}>Рейтинг*</Typography>

                        <Box sx={{ mt: 2 }}>
                            <Box sx={{
                                    width: 200,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Rating
                                    name="hover-feedback"
                                    value={value}
                                    precision={0.5}
                                    getLabelText={getLabelText}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                    emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                                />

                                {value !== null && (
                                    <Box sx={{ ml: 2 }}>
                                        {labels[hover !== -1 ? hover : value]}
                                    </Box>
                                )}
                            </Box>

                            <InputLabel sx={{ color: 'rgb(51 49 49 / 94%)', mt: 2 }}> Відгук* </InputLabel>
                            <TextField sx={{ width: '100%', mt: 1 }}
                                id="filled-multiline-static"
                                multiline
                                rows={4}
                                onChange={(e) => setReview(e.target.value)}
                            />
                            <Button variant='contained' sx={{ mt: 2, bgcolor: '#885cd3' }}
                                onClick={handleReview}> Підтвердити </Button>
                        </Box>

                    </Box>

                </Box>
            </Modal>
        </>

    );
};

export default RatingModal;