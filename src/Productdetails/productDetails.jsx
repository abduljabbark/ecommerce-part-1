import { Box, CircularProgress, Grid, Typography, Paper, Rating, Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const param = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://fakestoreapi.com/products/${param?.product_id}`
        );

        if (response.status === 200) {
          setProductDetail(response.data);
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [param?.product_id]);

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isLoading ? (
        <Box sx={{ textAlign: 'center', marginTop: 8 }}>
          <CircularProgress color="success" size={60} />
        </Box>
      ) : (
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            borderRadius: 4,
            maxWidth: '900px',
            width: '100%',
            margin: 'auto',
            backgroundColor: '#ffffff',
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Grid container spacing={6} alignItems="center">
            {/* Product Image Section */}
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center">
                <img
                  src={productDetail?.image}
                  alt={productDetail?.title}
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    borderRadius: '16px',
                    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.2)',
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
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    letterSpacing: '1px',
                  }}
                >
                  {productDetail?.category}
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: '#333', marginBottom: 2 }}
                >
                  {productDetail?.title}
                </Typography>
                <Typography
                  variant="h4"
                  color="primary"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    marginBottom: 3,
                    color: '#d32f2f',
                  }}
                >
                  ${productDetail?.price}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{
                    lineHeight: 1.8,
                    textAlign: 'justify',
                    marginBottom: 3,
                    color: '#555',
                  }}
                >
                  {productDetail?.description}
                </Typography>

                {/* Rating Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                    Rating:
                  </Typography>
                  <Rating
                    value={productDetail?.rating?.rate || 0}
                    readOnly
                    precision={0.5}
                    size="large"
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#777',
                      fontSize: '0.9rem',
                    }}
                  >
                    ({productDetail?.rating?.count} reviews)
                  </Typography>
                </Box>

                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    borderRadius: '20px',
                    paddingX: 4,
                    paddingY: 1,
                    backgroundColor: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#155fa0',
                    },
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default ProductDetails;
