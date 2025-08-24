"use client";

import * as React from "react";
import { Box, Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

type Props = {
  src?: string;
  size?: number;
  onChange: (url: string) => void;
  onRemove?: () => void;
  editing?: boolean;
};

export default function ProfilePhoto({
  src,
  size = 180,
  onChange,
  onRemove,
  editing = false,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const pickFile = () => {
    handleClose();
    fileRef.current?.click();
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    onChange(url);
  };

  const remove = () => {
    handleClose();
    onRemove?.();
  };

  return (
    <Box sx={{ position: "relative", width: size, height: size }}>
      <Avatar
        src={src}
        sx={{ width: size, height: size, borderRadius: "50%" }}
      />
      {editing && (
        <IconButton
          onClick={handleOpen}
          sx={{
            position: "absolute",
            right: 8,
            bottom: 8,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            "&:hover": { bgcolor: "primary.dark" },
            width: 40,
            height: 40,
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      )}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={pickFile}>Change Photo</MenuItem>
        <MenuItem onClick={remove}>Remove Photo</MenuItem>
      </Menu>
      <input
        ref={fileRef}
        hidden
        type="file"
        accept="image/*"
        onChange={onFile}
      />
    </Box>
  );
}
