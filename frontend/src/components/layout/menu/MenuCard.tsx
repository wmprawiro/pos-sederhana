"use client";

import * as React from "react";
import { Box, Typography, Stack } from "@mui/material";

type Props = {
  image: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  priceUnit?: string;
  onClick?: () => void;
};

export default function MenuCard({
  image,
  name,
  description,
  price,
  category,
  priceUnit = "/portion",
  onClick,
}: Props) {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: "pointer",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "background.paper",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: "10px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Box sx={{ position: "relative", mb: 1 }}>
          <Box
            component="img"
            src={image}
            alt={name}
            sx={{
              width: 1,
              height: 120,
              objectFit: "cover",
              display: "block",
              borderRadius: 2,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              fontSize: 10,
              px: 1.5,
              py: 0.5,
              borderRadius: "999px",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            {category}
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 500,
            color: "text.primary",
            lineHeight: 1.3,
          }}
        >
          {name}
        </Typography>

        {description ? (
          <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 0.5 }}>
            {description}
          </Typography>
        ) : null}

        <Stack
          direction="row"
          alignItems="baseline"
          spacing={0.5}
          sx={{ mt: 1 }}
        >
          <Typography
            sx={{ fontSize: 18, fontWeight: 600, color: "primary.main" }}
          >
            Rp {price.toLocaleString()}
          </Typography>
          <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
            {priceUnit}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
