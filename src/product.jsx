import { Box, Divider, Snackbar, SnackbarContent, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const Product = () => {
    const [CartList, setCartList] = useState([]);
    const [operAlert, setOperAlert] = useState(false);
    const [products, setProducts] = useState([]);

    const cartHandler = (product) => {
        const isExist = CartList.find((cart) => cart.id === product.id);

        if (!isExist) {
            setCartList((prev) => [...prev, product]);
        } else {
            setOperAlert(true);
        }
    };

    const handleClose = () => {
        setOperAlert(false);
    };

    const searchHandler = (event) => {
        const searchTerm = event?.target?.value.toLowerCase();
        // Implement search functionality here if needed
    };

    useEffect(() => {
        const fetchproducts = async () => {
            try {
                const products = await axios.get("https://fakestoreapi.com/products");
                setProducts(products?.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchproducts();
    }, []);

    return (
        <>
            <Box className="container mt-3">
                <TextField 
                    onChange={searchHandler} 
                    size="small" 
                    placeholder="Search Items ..." 
                    variant="outlined"
                    sx={{ width: '100%', maxWidth: 500, margin: 'auto', mb: 3 }}
                />
            </Box>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={operAlert}
                autoHideDuration={4000}
                onClose={handleClose}
            >
                <SnackbarContent
                    style={{
                        backgroundColor: "#ff4d4d",
                    }}
                    message={
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span>Product is Already in Cart</span>
                            <CloseIcon onClick={handleClose} style={{ cursor: "pointer", marginLeft: "15px" }} />
                        </Box>
                    }
                />
            </Snackbar>

            <Box className="container d-flex flex-wrap justify-content-center gap-4 mt-4 mb-5">
                {products.map((product, index) => (
                    <Box
                        key={index}
                        className="shadow p-3"
                        sx={{
                            width: 220,
                            height: 350,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            borderRadius: 3,
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                            },
                        }}
                    >
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            style={{ height: "180px", objectFit: "contain" }} 
                            className="img-fluid"
                        />
                        <Tooltip title={product.title} placement="top">
                            <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 'bold', marginTop: 1 }}>
                                {product.title.length > 20 ? `${product.title.slice(0, 17)}...` : product.title}
                            </Typography>
                        </Tooltip>
                        <Divider sx={{ my: 1, borderColor: "black" }} />
                        <Box className="d-flex justify-content-around mt-2">
                            <Tooltip title="View Details">
                                <VisibilityIcon color="primary" sx={{ cursor: "pointer" }} />
                            </Tooltip>
                            <Tooltip title="Add to Favorites">
                                <FavoriteIcon color="secondary" sx={{ cursor: "pointer" }} />
                            </Tooltip>
                            <Tooltip title="Add to Cart">
                                <AddShoppingCartIcon 
                                    color="action" 
                                    sx={{ cursor: "pointer", color: "#00c853" }}
                                    onClick={() => cartHandler(product)}
                                />
                            </Tooltip>
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default Product;
