"use client";

import Link from "next/link";
import { Stack, Typography, TextField, Button, Box } from "@mui/material";

export default function LoginPage() {
  return (
    <Stack spacing={3}>
      <Box>
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
          type="password"
          fullWidth
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

        {/* sementara: buat navigasi jalan */}
        <Button component={Link} href="/admin" variant="contained" size="large">
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
