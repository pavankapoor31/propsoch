// src/components/Header/Header.jsx
import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  font-size: 1.5rem;
  font-weight: bold;
  color: orange;
  text-align: center;
  padding: 16px;
  position: sticky;
  top: 0;
  background-color: rgba(255,255,255,0.5);
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = () => {
  return (
    <HeaderContainer>
      propsoch
    </HeaderContainer>
  );
};

export default Header;