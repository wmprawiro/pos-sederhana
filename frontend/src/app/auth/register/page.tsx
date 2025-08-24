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

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sign up to get started with PadiPOS
        </Typography>
      </Box>

      <Stack spacing={2}>
        <TextField label="Username" placeholder="Username" fullWidth />
        <TextField
          label="Email"
          placeholder="you@example.com"
          type="email"
          fullWidth
        />

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

        <TextField
          label="Confirm Password"
          placeholder="Confirm Password"
          type={showConfirm ? "text" : "password"}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  onClick={() => setShowConfirm((v) => !v)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button variant="contained" size="large">
          Register
        </Button>

        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Button component={Link} href="/auth/login" size="small">
            Login
          </Button>
        </Typography>
      </Stack>
    </Stack>
  );
}
