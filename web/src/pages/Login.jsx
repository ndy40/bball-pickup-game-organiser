import {
  Avatar,
  Button,
  Container,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { login } from "../services/api";
import { Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    username: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await login(form);
      localStorage.setItem("token", JSON.stringify(response.data.access_token));
      window.location.reload();
    } catch (error) {
      setError(error.response.data.detail);
    }
  };

  return (
    <Grid>
      <Container elevation={10} style={{ padding: "80px" }} maxWidth="sm">
        <Grid align="center">
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
          <Typography
            variant="h3"
            style={{ margin: "20px 0", fontWeight: "300", fontSize: "2.3rem" }}
          >
            Login
          </Typography>
        </Grid>

        <form onSubmit={handleSubmit}>
          <FormGroup style={{ marginBottom: "20px" }}>
            <TextField
              label="Username"
              placeholder="Enter Username"
              error={Boolean(error)}
              helperText={error}
              fullWidth
              required
              onChange={(event) =>
                setForm({ ...form, username: event.target.value })
              }
              value={form.username}
            />
          </FormGroup>

          <FormGroup style={{ marginBottom: "20px" }}>
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </FormGroup>
        </form>

        <Typography>
          Dont Have an Account ?<Link to="/register"> Register</Link>
        </Typography>
      </Container>
    </Grid>
  );
};

export default Login;
