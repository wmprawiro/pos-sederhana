"use client";

import * as React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

type Props = {
  onFile: (file: File) => void;
};

export default function UploadDropzone({ onFile }: Props) {
  const [dragging, setDragging] = React.useState(false);
  const [preview, setPreview] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const openPicker = () => inputRef.current?.click();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleFile = (file: File) => {
    onFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handlePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragging(false);
      }}
      onClick={() => {
        if (!preview) openPicker();
      }}
      sx={{
        width: "100%",
        minHeight: 180,
        border: preview ? "none" : "2px dashed",
        borderColor: preview ? "transparent" : "primary.main",
        bgcolor: preview ? "grey.100" : dragging ? "primary.50" : "grey.50",
        borderRadius: 2,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {preview ? (
        <Box
          component="img"
          src={preview}
          alt="preview"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
      ) : (
        <Stack alignItems="center">
          <AddPhotoAlternateIcon sx={{ fontSize: 32, color: "grey.500" }} />
          <Box height={4} />
          <Typography sx={{ fontSize: 12, color: "grey.500" }}>
            Drag and Drop your file here or
          </Typography>
          <Box height={10} />
          <Button
            variant="contained"
            sx={{ height: 38, px: 3 }}
            onClick={(e) => {
              e.stopPropagation();
              openPicker();
            }}
          >
            Choose File
          </Button>
        </Stack>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handlePick}
        hidden
      />
    </Box>
  );
}
