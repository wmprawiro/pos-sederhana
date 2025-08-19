import { Box, Container, Paper, Stack } from "@mui/material";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
      }}
    >
      {/* Kiri: Card untuk form */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
            <Stack spacing={3}>{children}</Stack>
          </Paper>
        </Container>
      </Box>

      {/* Kanan: Background image (yang sudah kamu pasang) */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          backgroundImage: 'url("/images/auth-bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Box>
  );
}
