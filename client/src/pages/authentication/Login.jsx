import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import { useState } from "react";
import { IconButton, InputAdornment, Button, CardHeader } from "@mui/material";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
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
              label="UserName"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <TextField
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              label="Password"
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
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
