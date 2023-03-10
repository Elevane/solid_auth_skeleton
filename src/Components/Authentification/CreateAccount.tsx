import { FaceOutlined } from "@suid/icons-material";
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Link,
  Grid,
  Button,
  Icon,
} from "@suid/material";
import { Component, createSignal } from "solid-js";
import toast from "solid-toast";
import Spinner from "solidjs-material-spinner";
import UseApi from "../../Hooks/UseApi";
import UseLocalStorage from "../../Hooks/UseLocalStorage";
import UseRoutes from "../../Hooks/UseRoutes";
import { ApiResult } from "../../Models/ApiResult";
import { AuthenticatedUser, CreateUserRequest } from "../../Models/User";
import GoogleLoginButton from "./GoogleLoginButton";

const CreateAccount: Component = () => {
  const [userCreate, setUserCreate] = createSignal<CreateUserRequest>(null);
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e: Event): Promise<void> => {
    setLoading(true);
    e.preventDefault();
    const res: ApiResult<AuthenticatedUser> = await UseApi.register(
      userCreate()
    );
    setLoading(false);
    if (!res.result) toast.error("Could not register");
    else {
      UseRoutes.move(UseRoutes.HOME);
      UseLocalStorage.saveToken(res.result.Token);
    }
  };
  return (
    <Box>
      <Avatar sx={{ m: 1, bgcolor: "primary.mainz" }}>
        <Icon>
          <FaceOutlined></FaceOutlined>
        </Icon>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box
        style={{ width: "400px" }}
        component="form"
        onSubmit={(e) => handleSubmit(e)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={(e) =>
            setUserCreate({ ...userCreate(), Username: e.target.value })
          }
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) =>
            setUserCreate({ ...userCreate(), Email: e.target.value })
          }
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={(e) =>
            setUserCreate({ ...userCreate(), Password: e.target.value })
          }
          autoComplete="current-password"
        />
        <Button
          disabled={loading()}
          type="submit"
          id="google_button"
          fullWidth
          class="button"
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
        >
          {loading() ? (
            <Spinner radius="25" stroke="3" color="#fff" />
          ) : (
            "Sign up"
          )}
        </Button>
        <GoogleLoginButton />
        <Grid container>
          <Grid item>
            <Link
              style={{ cursor: "pointer" }}
              onClick={() => UseRoutes.move(UseRoutes.LOGIN)}
              variant="body2"
            >
              {"Already have an account ? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CreateAccount;
