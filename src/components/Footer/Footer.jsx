// src/components/Footer/Footer.jsx
import React from 'react';
import styled from 'styled-components';
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { FavoriteBorder, LocationOn, Search } from "@mui/icons-material";

const StickyBottomNavigation = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
`;

const Footer = ({ value, onChange }) => {
  return (
    <StickyBottomNavigation
      showLabels
      value={value}
      onChange={onChange}
      sx={{
        "& .Mui-selected": {
          "& .MuiBottomNavigationAction-label": {
            color: "orange",
          },
          "& .MuiSvgIcon-root": {
            color: "orange",
          }
        }
      }}
    >
      <BottomNavigationAction value="Explore" label="Explore" icon={<Search />} />
      <BottomNavigationAction value="Wishlists" label="Wishlists" icon={<FavoriteBorder />} />
      <BottomNavigationAction value="Show map" label="Show map" icon={<LocationOn />} />
      <BottomNavigationAction value="Log in" label="Log in" icon={<LocationOn />} />
    </StickyBottomNavigation>
  );
};

export default Footer;