import React from 'react';
import styled from 'styled-components';

// Styled Component para el footer
const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      APP DISEÑADA Y CREADA POR CARLOS CALLEJA SÁEZ © {new Date().getFullYear()}
    </FooterContainer>
  );
};

export default Footer;
