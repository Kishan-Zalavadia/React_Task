import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  TextField,
  Card,
  CardContent,
  Box,
  IconButton,
  InputAdornment,
  Button,
  CardHeader,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();

  const validateUser = async () => {
    const result = await axios.post("http://localhost:3000/login", {
      email: email,
      password: password,
    });
    if (result.status == 200) {
      localStorage.setItem("accesstoken", result.headers.accesstoken);
      navigate("/user/card");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card>
          <CardContent alignitem="center">
            <CardHeader title="Login Page" />
            <hr />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              fullWidth
              style={{ padding: "11px 0px" }}
              onClick={validateUser}
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
