// import { Button, ButtonGroup, Typography } from '@mui/material';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import { useDispatch, useSelector } from 'react-redux';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import { increaseQuantity } from './slices/product/productsSlice';

// const Cartlist = (props) => {
//     const { open, toggleDrawer } = props;

//     // Access items from the Redux store
//     const { items } = useSelector((state) => state.products);

//     const dispatch = useDispatch ()

//     return (
//         <div>
//             <Drawer open={open} onClose={toggleDrawer(false)}>
//                 <Box sx={{ width: 300, padding: 2 }} role="presentation">
//                     {/* Header */}
//                     <Typography variant="h5" gutterBottom>
//                         Cart Items
//                     </Typography>

//                     {/* Display Cart Items */}
//                     {items?.length > 0 ? (
//                         items.map((item) => (
//                             <Box
//                                 key={item.id}
//                                 sx={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'space-between',
//                                     marginBottom: 2
//                                 }}
//                             >
//                                 <img
//                                     width="70px"
//                                     src={item?.image}
//                                     alt={item?.title || "Product image"}
//                                     style={{ borderRadius: '4px' }}
//                                 />
//                                 <Box sx={{ flex: 1, marginLeft: 2 }}>
//                                     <Typography variant="body1">{item?.title.length > 15 ? `${item?.title.slice(0, 15)}...` : item?.title}</Typography>
//                                     <ButtonGroup variant="text" aria-label="Basic button group">
//                                         <Button><RemoveIcon /></Button>
//                                         <Button>{item?.quantity}</Button>
//                                         <Button><AddIcon onclick={()=> dispatch(increaseQuantity (item))} /></Button>
//                                     </ButtonGroup>
//                                     <Typography variant="body2" color="textSecondary">
//                                         ${item?.price.toFixed(2)}
//                                     </Typography>
//                                 </Box>
//                             </Box>
//                         ))
//                     ) : (
//                         <Typography variant="body2" color="textSecondary">
//                             Your cart is empty.
//                         </Typography>
//                     )}
//                 </Box>
//             </Drawer>
//         </div>
//     );
// };

// export default Cartlist;
import { Button, ButtonGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decreaseQuantity, increaseQuantity } from './slices/product/productsSlice';

const Cartlist = (props) => {
    const { open, toggleDrawer } = props;

    // Access items from the Redux store
    const { items } = useSelector((state) => state.products);

    const dispatch = useDispatch();

    return (
        <div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 300, padding: 2 }} role="presentation">
                    {/* Header */}
                    <Typography variant="h5" gutterBottom>
                        Cart Items
                    </Typography>

                    {/* Display Cart Items */}
                    {items?.length > 0 ? (
                        items.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: 2
                                }}
                            >
                                <img
                                    width="70px"
                                    src={item?.image}
                                    alt={item?.title || "Product image"}
                                    style={{ borderRadius: '4px' }}
                                />
                                <Box sx={{ flex: 1, marginLeft: 2 }}>
                                    <Typography variant="body1">
                                        {item?.title.length > 15
                                            ? `${item?.title.slice(0, 15)}...`
                                            : item?.title}
                                    </Typography>
                                    <ButtonGroup variant="text" aria-label="Basic button group">
                                        <Button onClick={() => dispatch(decreaseQuantity(item))}><RemoveIcon /></Button>
                                        <Button>{item?.quantity}</Button>
                                        <Button onClick={() => dispatch(increaseQuantity(item))}>
                                            <AddIcon />
                                        </Button>
                                    </ButtonGroup>
                                    <Typography variant="body2" color="textSecondary">
                                        ${item?.price.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            Your cart is empty.
                        </Typography>
                    )}
                </Box>
            </Drawer>
        </div>
    );
};

export default Cartlist;
