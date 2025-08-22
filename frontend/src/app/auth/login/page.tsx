"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Stack,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Stack spacing={3}>
      <Box sx={{ textAlign: "center" }}>
        <Box
          component="img"
          src="/images/padipos.svg"
          alt="Padipos Logo"
          sx={{ height: 50, mb: 2 }}
        />
        <Typography variant="h4" fontWeight={800}>
          Welcome Back!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please enter your username and password here!
        </Typography>
      </Box>

      <Stack spacing={2}>
        <TextField label="Username" placeholder="Username" fullWidth />

        <TextField
          label="Password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ textAlign: "right" }}>
          <Button
            component={Link}
            href="/forgot-password"
            variant="text"
            size="small"
          >
            Forgot Password?
          </Button>
        </Box>

        <Button component={Link} href="/" variant="contained" size="large">
          Login
        </Button>

        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Don’t have an account?{" "}
          <Button component={Link} href="/register" size="small">
            Register
          </Button>
        </Typography>
      </Stack>
    </Stack>
  );
}
