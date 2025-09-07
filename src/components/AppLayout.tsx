"use client";

import React, { useState } from "react";
import { Box, Drawer, IconButton, List, ListItem, ListItemText, AppBar, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => setOpen(!open);

  const menuItems = [
    { text: "Partidas", path: "/matches" },
    { text: "Times", path: "/" },
    { text: "Ligas", path: "/leagues" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Meu Painel
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        <List sx={{ pt: "5rem" }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} onClick={() => router.push(item.path)}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}
