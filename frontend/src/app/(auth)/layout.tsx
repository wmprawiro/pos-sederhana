import { Box, Container, Paper, Stack } from "@mui/material";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        backgroundImage: 'url("/images/auth-bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          py: 6,
          px: { xs: 2, md: 8 },
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
            <Stack spacing={3}>{children}</Stack>
          </Paper>
        </Container>
      </Box>
      <Box />
    </Box>
  );
}
