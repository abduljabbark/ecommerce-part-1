import { Autocomplete, Box, CircularProgress, Divider, Snackbar, SnackbarContent, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './slices/add-cart/AddCartSlice';
import { ToastContainer, toast } from 'react-toastify';
import { addproduct } from './slices/product/productsSlice';


const Product = () => {
    // const [CartList, setCartList] = useState([]);
    const [operAlert, setOperAlert] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [categoryOption, setCategoryOption] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState({});

    const navigate = useNavigate();

    const { isToast } = useSelector((state) => state.products)
    const dispatch = useDispatch();

    console.log(isToast, 'toast');



    // const cartHandler = (product) => {
    //     const isExist = CartList.find((cart) => cart.id === product.id);

    //     if (!isExist) {
    //         setCartList((prev) => [...prev, product]);
    //     } else {
    //         setOperAlert(true);
    //     }
    // };

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
                setIsLoading(true)
                const productsData = await axios.get("https://fakestoreapi.com/products");




                if (productsData.status === 200) {
                    setIsLoading(false);
                    setProducts(productsData?.data);
                    setAllProducts(productsData?.data);
                    const filterCategories = productsData?.data?.map((product) => {
                        return {
                            label: product?.category,
                            value: product?.category
                        };

                    });
                    const uniqueCaregories = filterCategories.filter((item, index, self) => index === self.findIndex((i) => i.value === item.value))

                    setCategoryOption(uniqueCaregories)



                } else (
                    setIsLoading(true)
                )




            } catch (err) {
                console.log(err);
            }
        };
        fetchproducts();
    }, []);

    useEffect(() => {
        let filteredProducts = allProducts?.filter((product) => product?.category === categoryFilter?.value)


        setProducts(filteredProducts)
        console.log(filteredProducts, 'filteredProducts');


    }, [categoryFilter])

    useEffect(() => {
        if (isToast) {
            toast("Product already added!");
        }
    }, [isToast])
    return (
        <>
            <ToastContainer />
            <Box className="container mt-3 d-flex justify-content-between">

                <TextField
                    onChange={searchHandler}
                    size="small"
                    placeholder="Search Items ..."
                    variant="outlined"
                    sx={{ width: '100%', maxWidth: 500, margin: 'auto', mb: 3 }}
                />
                <Autocomplete
                    size='small'
                    disablePortal
                    options={categoryOption}
                    onChange={(e, newValue) => {
                        setCategoryFilter(newValue);
                    }}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Categories" />}
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

            {isLoading ? (<Box className="text-center">
                <CircularProgress color="success" /> </Box>) :
                (<Box className="container d-flex flex-wrap justify-content-center gap-4 mt-4 mb-5">
                    {products.map((product, index) => (


                        <>
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
                                {<Box className="d-flex justify-content-around mt-2">
                                    <Tooltip title="View Details">
                                        <VisibilityIcon onClick={() => {
                                            navigate(`/ProductDetails/${product?.id}`);


                                        }}

                                            color="primary" sx={{ cursor: "pointer" }} />
                                    </Tooltip>
                                    <Tooltip title="Add to Favorites">
                                        <FavoriteIcon color="secondary" sx={{ cursor: "pointer" }} />
                                    </Tooltip>
                                    <Tooltip title="Add to Cart">
                                        <AddShoppingCartIcon onClick={() => dispatch(addproduct(product))}
                                            color="action"
                                            sx={{ cursor: "pointer", color: "#00c853" }}
                                        // onClick={() => cartHandler(product)}
                                        />
                                    </Tooltip>
                                </Box>}
                            </Box>

                        </>
                    ))}
                </Box>)}

        </>
    );
};

export default Product;
