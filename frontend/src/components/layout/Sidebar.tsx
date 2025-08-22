"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Stack,
  Avatar,
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

type NavKey = "dashboard" | "catalog" | "sales" | "settings";
type Base = "dashboard" | "cashier";

const config: Record<
  Base,
  { key: NavKey; label: string; path: string; icon: React.ElementType }[]
> = {
  dashboard: [
    {
      key: "dashboard",
      label: "Dashboard",
      path: "",
      icon: GridViewOutlinedIcon,
    },
    {
      key: "catalog",
      label: "Catalog",
      path: "catalog",
      icon: Inventory2OutlinedIcon,
    },
    {
      key: "sales",
      label: "Sales Report",
      path: "sales-report",
      icon: ReceiptLongOutlinedIcon,
    },
    {
      key: "settings",
      label: "Settings",
      path: "settings",
      icon: SettingsOutlinedIcon,
    },
  ],
  cashier: [
    {
      key: "catalog",
      label: "Catalog",
      path: "catalog",
      icon: Inventory2OutlinedIcon,
    },
    {
      key: "sales",
      label: "Sales Report",
      path: "sales-report",
      icon: ReceiptLongOutlinedIcon,
    },
    {
      key: "settings",
      label: "Settings",
      path: "settings",
      icon: SettingsOutlinedIcon,
    },
  ],
};

export default function Sidebar({ base: baseProp }: { base?: Base }) {
  const theme = useTheme();
  const pathname = usePathname();

  const segs = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean);
  const inferredBase: Base = segs[0] === "cashier" ? "cashier" : "dashboard";
  const base = baseProp || inferredBase;
  const currentSub = segs[1] ?? "";

  const items = config[base].map((it) => ({
    ...it,
    href: `/${base}${it.path ? `/${it.path}` : ""}`,
    selected: currentSub === it.path,
  }));

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
          const Icon = it.icon;
          return (
            <Tooltip key={it.key} title={it.label} placement="right" arrow>
              <Box sx={{ position: "relative", width: 1 }}>
                {it.selected && (
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
                  selected={it.selected}
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
                      color: it.selected ? blue[500] : grey[300],
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
