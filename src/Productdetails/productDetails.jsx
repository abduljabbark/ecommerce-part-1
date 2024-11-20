import { Box, CircularProgress, Grid, Typography, Button, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const param = useParams();

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        setIsLoading(true);
        const productsData = await axios.get(
          `https://fakestoreapi.com/products/${param?.product_id}`
        );

        if (productsData.status === 200) {
          setProductDetail(productsData?.data);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchproducts();
  }, [param?.product_id]);

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {isLoading ? (
        <Box className={ "text-center mt-5"}>
          <CircularProgress color="success" />
        </Box>
      ) : (
        <Paper
          elevation={3}
          sx={{ padding: 4, borderRadius: 2, maxWidth: '900px', margin: 'auto' }}
        >
          <Grid container spacing={4} alignItems="center">
            {/* Product Image Section */}
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center">
                <img
                  src={productDetail?.image}
                  alt={productDetail?.title}
                  style={{
                    width: '80%',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </Box>
            </Grid>

            {/* Product Details Section */}
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                  sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                >
                  {productDetail?.category}
                </Typography>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {productDetail?.title}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  ${productDetail?.price}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ lineHeight: 1.8, textAlign: 'justify', marginBottom: 3 }}
                >
                  {productDetail?.description}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default ProductDetails;
