"use client";

import * as React from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
} from "@mui/material";
import ProfilePhoto from "@/components/profile/ProfilePhoto";

export default function ProfilePage() {
  const [editing, setEditing] = React.useState(false);
  const [email, setEmail] = React.useState("johndoe@gmail.com");
  const [username, setUsername] = React.useState("John Doe");
  const [role, setRole] = React.useState<"admin" | "cashier">("cashier");
  const [status, setStatus] = React.useState<"active" | "inactive">("active");
  const [photo, setPhoto] = React.useState("/images/avatar-sample.jpg");

  return (
    <Box
      sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        Account
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems={{ xs: "flex-start", md: "stretch" }}
        >
          <Stack spacing={2} alignItems="center" sx={{ minWidth: 220 }}>
            <ProfilePhoto
              src={photo}
              editing={editing}
              onChange={(url) => setPhoto(url)}
              onRemove={() => setPhoto("")}
            />
          </Stack>

          <Stack spacing={2} sx={{ flex: 1 }}>
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.75 }}
              >
                Email
              </Typography>
              <TextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!editing}
              />
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.75 }}
              >
                Username
              </Typography>
              <TextField
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!editing}
              />
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.75 }}
              >
                Role
              </Typography>
              <TextField
                select
                fullWidth
                value={role}
                onChange={(e) => setRole(e.target.value as "admin" | "cashier")}
                disabled={!editing}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="cashier">Cashier</MenuItem>
              </TextField>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.75 }}
              >
                Status
              </Typography>
              <TextField
                select
                fullWidth
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "active" | "inactive")
                }
                disabled={!editing}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Box>

            <Box>
              {editing ? (
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" onClick={() => setEditing(false)}>
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </Button>
                </Stack>
              ) : (
                <Button variant="contained" onClick={() => setEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </Box>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
