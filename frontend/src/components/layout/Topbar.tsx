"use client";

import * as React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Stack,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function Topbar() {
  const user = {
    name: "John Doe",
    role: "Admin",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        height: 80,
        px: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <TextField
        placeholder="Enter the keyword here..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ mr: "10px" }}>
              <SearchRoundedIcon sx={{ fontSize: 16 }} />
            </InputAdornment>
          ),
        }}
        sx={{
          width: 500,
          "& .MuiOutlinedInput-root": { height: 42, borderRadius: 3 },
          "& input": { fontSize: 12 },
        }}
      />

      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{ width: 42, height: 42 }}
        />
        <Box sx={{ lineHeight: 1.1 }}>
          <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
            {user.name}
          </Typography>
          <Typography sx={{ fontSize: 12 }} color="text.secondary">
            {user.role}
          </Typography>
        </Box>
        <IconButton sx={{ color: "error.main" }}>
          <LogoutRoundedIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
