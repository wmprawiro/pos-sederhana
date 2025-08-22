"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
  List,
  ListItemButton,
  useTheme,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

type NavKey = "dashboard" | "catalog" | "sales" | "settings";

const items: {
  key: NavKey;
  label: string;
  href: string;
  icon: React.ElementType;
}[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: GridViewOutlinedIcon,
  },
  {
    key: "catalog",
    label: "Catalog",
    href: "/catalog",
    icon: Inventory2OutlinedIcon,
  },
  {
    key: "sales",
    label: "Sales Report",
    href: "/sales-report",
    icon: ReceiptLongOutlinedIcon,
  },
  {
    key: "settings",
    label: "Settings",
    href: "/settings",
    icon: SettingsOutlinedIcon,
  },
];

export default function Sidebar() {
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        inset: 0,
        right: "auto",
        width: 72,
        borderRight: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 2,
        zIndex: theme.zIndex.drawer,
      }}
    >
      <Avatar
        sx={{
          width: 48,
          height: 48,
          mb: 2.5,
          fontWeight: 700,
          background: "linear-gradient(135deg, #6a5af9 0%, #4aa6ff 100%)",
        }}
      >
        P
      </Avatar>

      <IconButton
        size="small"
        sx={{ mb: 3, border: "1px solid", borderColor: "divider" }}
        onClick={() => {}}
      >
        <ArrowForwardIosRoundedIcon fontSize="small" />
      </IconButton>

      <List
        disablePadding
        sx={{
          width: 1,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {items.map((it) => {
          const selected = pathname === it.href;
          const Icon = it.icon;
          return (
            <Tooltip key={it.key} title={it.label} placement="right" arrow>
              <Box sx={{ position: "relative", width: 1 }}>
                {selected && (
                  <Box
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 4,
                      height: 28,
                      bgcolor: blue[500],
                      borderRadius: "6px 0 0 6px",
                    }}
                  />
                )}

                <ListItemButton
                  component={Link}
                  href={it.href}
                  selected={selected}
                  sx={{
                    justifyContent: "center",
                    minHeight: 56,
                    "&.Mui-selected": { bgcolor: "transparent" },
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <Icon
                    sx={{
                      fontSize: 24,
                      color: selected ? blue[500] : grey[300],
                    }}
                  />
                </ListItemButton>
              </Box>
            </Tooltip>
          );
        })}
      </List>

      <Stack flexGrow={1} />
    </Box>
  );
}
