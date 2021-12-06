import {
  Avatar,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { login } from "../services/AuthService";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    username: "",
    auto_login: false,
  });
  const router = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await login(form);

      localStorage.setItem("token", JSON.stringify(response.data.access_token));
      if (!form.auto_login) {
        alert("Registeration successful");
        return router.push("/login");
      }
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
            Register
          </Typography>
        </Grid>

        <form onSubmit={handleSubmit}>
          <FormGroup>
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
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Remember Me"
              onChange={(event) =>
                setForm({ ...form, auto_login: !form.auto_login })
              }
            />
          </FormGroup>

          <FormGroup style={{ marginBottom: "20px" }}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </FormGroup>
        </form>

        <Typography>
          Already Have an Account ?
          <Link to="#" onClick={(e) => e.preventDefault()}>
            {" "}
            Login
          </Link>
        </Typography>
      </Container>
    </Grid>
  );
};

export default Register;
