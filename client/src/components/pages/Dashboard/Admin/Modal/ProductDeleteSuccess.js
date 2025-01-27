import { CheckCircleOutline } from '@mui/icons-material';
import { Button, IconButton, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../../../Redux/actions';

const ProductDeleteSuccess = ({ product, close }) => {
    const dispatch = useDispatch();

    // Delete Success Modal 
    const [deleteModal, setDeleteModal] = useState(false);
    const handleOpenModal = () => setDeleteModal(true);
    const handleCloseModal = () => setDeleteModal(false);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        textAlign: 'center'
    };

    const handleDeleteproduct = async (id) => {
        dispatch(deleteProduct(id))
        handleOpenModal();
    }

    const yes = {
        bgcolor: '#45cb85',
        color: 'white',
        '&:hover': {
            bgcolor: '#45cb85',
            color: 'white'
        }
    }
    return (
        <>
            <Button sx={yes}
                onClick={() => handleDeleteproduct(product?._id)}
            >
                Так
            </Button>
            <Modal
                hideBackdrop
                open={deleteModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <IconButton sx={{ color: 'green' }}>
                        <CheckCircleOutline fontSize='large' />
                    </IconButton>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Product has been deleted.
                    </Typography>
                    <Typography variant="caption" fontSize='14px'>
                        Record deleted Successfully
                    </Typography>
                    <br />
                    <Button variant='contained' sx={{ display: 'inline-block', mt: 2 }}
                        onClick={() => { handleCloseModal(); close() }}> OK </Button>
                </Box>
            </Modal>


        </>
    );
};

export default ProductDeleteSuccess;