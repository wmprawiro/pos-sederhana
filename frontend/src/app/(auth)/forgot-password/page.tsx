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

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"request" | "reset">("request");
  const [showNew, setShowNew] = useState(false);
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
          {step === "request" ? "Forgot Password" : "Reset Password"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {step === "request"
            ? "Enter your email to receive the reset link."
            : "Set your new password below."}
        </Typography>
      </Box>

      {step === "request" ? (
        <Stack spacing={2}>
          <TextField
            label="Email"
            placeholder="you@example.com"
            type="email"
            fullWidth
          />
          <Button
            variant="contained"
            size="large"
            onClick={() => setStep("reset")}
          >
            Submit
          </Button>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Remembered your password?{" "}
            <Button component={Link} href="/login" size="small">
              Login
            </Button>
          </Typography>
        </Stack>
      ) : (
        <Stack spacing={2}>
          <TextField
            label="New Password"
            type={showNew ? "text" : "password"}
            fullWidth
            placeholder="New password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showNew ? "Hide password" : "Show password"}
                    onClick={() => setShowNew((v) => !v)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showNew ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm New Password"
            type={showConfirm ? "text" : "password"}
            fullWidth
            placeholder="Confirm new password"
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

          <Button variant="contained" size="large" href="/login">
            Reset Password
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
