import { Box,Button,Grid,IconButton,InputAdornment,OutlinedInput,TextField,Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import SignUpImg from "../Images/signup-g.svg";
  import { Visibility, VisibilityOff } from "@mui/icons-material";
  
  const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
  
    return (
      <Box
        className="m-3 mt-5"
        sx={{
          backgroundColor: "#f9f9f9",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={12} md={6}>
            <img
              src={SignUpImg}
              alt="Sign Up Illustration"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Grid>
  
          <Grid item xs={12} sm={12} md={6}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "700", marginBottom: "15px", color: "#333" }}
            >
              Get Started Shopping
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#555", marginBottom: "25px", fontSize: "16px" }}
            >
              Welcome to FreshCart! Enter your email to get started.
            </Typography>
  
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="medium"
                  placeholder="First Name"
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Grid>
  
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="medium"
                  placeholder="Last Name"
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Grid>
  
              <Grid item xs={12}>
                <TextField
                  type="email"
                  fullWidth
                  size="medium"
                  placeholder="Email"
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Grid>
  
              <Grid item xs={12}>
                <OutlinedInput
                  fullWidth
                  size="medium"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Grid>
  
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    padding: "12px",
                    fontSize: "16px",
                    fontWeight: "500",
                    textTransform: "none",
                    borderRadius: "8px",
                    "&:hover": { backgroundColor: "#0056b3" },
                  }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default SignUp;
  