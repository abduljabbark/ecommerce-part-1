import { Button, ButtonGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { decreaseQuantity, increaseQuantity, removeItem } from './slices/product/productsSlice';

const Cartlist = (props) => {
    const { open, toggleDrawer } = props;

    // Access items from the Redux store
    const { items } = useSelector((state) => state.products);

    const dispatch = useDispatch();

    const totalPrice = items?.length
        ? items.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2)
        : 0;

    return (
        <Drawer open={open} onClose={toggleDrawer(false)}>
            <Box
                sx={{
                    width: 300,
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#f9f9f9',
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        padding: '16px',
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Cart Items
                    </Typography>
                </Box>

                {/* Cart Items */}
                <Box sx={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
                    {items?.length > 0 ? (
                        items.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '16px',
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                    padding: '8px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title || 'Product image'}
                                    width="60"
                                    height="60"
                                    style={{ borderRadius: '4px', objectFit: 'cover' }}
                                />
                                <Box sx={{ flex: 1, marginLeft: '12px' }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                        {item.title.length > 15
                                            ? `${item.title.slice(0, 15)}...`
                                            : item.title}
                                    </Typography>
                                    <ButtonGroup variant="outlined" sx={{ marginTop: '8px' }}>
                                        <Button
                                            size="small"
                                            onClick={() => dispatch(decreaseQuantity(item))}
                                        >
                                            <RemoveIcon />
                                        </Button>
                                        <Button size="small" disabled className="text-success fw-bold">
                                            {item.quantity}
                                        </Button>
                                        <Button
                                            size="small"
                                            onClick={() => dispatch(increaseQuantity(item))}
                                        >
                                            <AddIcon />
                                        </Button>
                                    </ButtonGroup>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        sx={{ marginTop: '8px' }}
                                    >
                                        ${item.price.toFixed(2)}
                                    </Typography>
                                </Box>
                                <Button
                                    onClick={() => dispatch(removeItem(item))}
                                    sx={{ color: '#ff5252' }}
                                >
                                    <DeleteIcon />
                                </Button>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary" textAlign="center">
                            Your cart is empty.
                        </Typography>
                    )}
                </Box>

                {/* Footer */}
                <Box
                    sx={{
                        padding: '16px',
                        backgroundColor: '#fff',
                        borderTop: '1px solid #ddd',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Total Price:
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        ${totalPrice}
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    );
};

export default Cartlist;
