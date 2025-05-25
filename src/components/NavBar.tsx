import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';
import spoon from '../images/spoon.svg';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Header>
      <Container>
        <LeftContainer>
          <LogoSection to="/">
            <Logo src={spoon} alt="Logo Black Spoon" />
            <BrandName>Black Spoon</BrandName>
          </LogoSection>
        </LeftContainer>

        <RightContainer>
          <BurgerIcon>
            <Burger htmlFor="burger">
              <BurgerCheckbox
                type="checkbox"
                id="burger"
                checked={isOpen}
                onChange={() => setIsOpen(!isOpen)}
              />
            </Burger>
          </BurgerIcon>
          <NavButtons $isOpen={isOpen}>
            <NavButton to="/x1">Sección 1</NavButton>
            <NavButton to="/x2">Sección 2</NavButton>
            <NavButton to="/x3">Sección 3</NavButton>
          </NavButtons>
        </RightContainer>
      </Container>
    </Header>
  );
};

export default Navbar;

const logoBounce = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(3deg);
  }
  75% {
    transform: rotate(-3deg);
  }
`;

const Header = styled.header`
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e5e5;
`;

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  position: relative;
`;

const LogoSection = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  animation: ${logoBounce} 2.5s ease-in-out infinite;
  transform-origin: center center;
`;

const BrandName = styled.h1`
  font-size: 29px;
  font-weight: 600;
  color: #000000;
  margin: 0;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const NavButtons = styled.div<{ $isOpen: boolean }>`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 3rem;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    z-index: 100;
  }
`;

const NavButton = styled(NavLink)`
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 17px;
  font-weight: 500;
  padding: 6px 14px;
  text-decoration: none;
  transition: all 200ms ease;
  line-height: 1.4;
  display: flex;
  align-items: center;

  &.active {
    border-bottom: 3px solid #000000;
    font-weight: 600;
    background-color: #f5faff;
  }

  &:hover,
  &:focus {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.1) 0 3px 10px;
    color: rgba(0, 0, 0, 0.65);
    transform: translateY(-1px);
  }
`;

const BurgerIcon = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
  }
`;

const Burger = styled.label`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  transition: 300ms;
  border-radius: 10px;
  position: relative;

  &::before,
  &::after {
    content: "";
    transition: 300ms;
    transform-origin: center center;
    width: 25px;
    height: 2.1px;
    background-color: black;
    border-radius: 5px;
    position: absolute;
  }

  &::before {
    transform: translateY(8px);
  }

  &::after {
    transform: translateY(-8px);
  }

  &:hover {
    background: #aeaeae;
    border-radius: 50%;
  }

  &:hover .line,
  &:hover::before,
  &:hover::after {
    background: #e8e8e8;
  }
`;

const BurgerCheckbox = styled.input`
  appearance: none;
  width: 25px;
  height: 2.1px;
  background-color: black;
  border-radius: 5px;
  position: absolute;
  transition: 300ms;

  &:checked {
    width: 0;
    transition-delay: 100ms;
  }

  &:checked + ${Burger}::before {
    animation: animation1 400ms ease-out 0s 1 both;
  }

  &:checked + ${Burger}::after {
    animation: animation2 400ms ease-out 0s 1 both;
  }

  @keyframes animation1 {
    0% {
      transform: translateY(8px) rotate(0deg);
    }
    50% {
      transform: translateY(0px) rotate(0deg);
    }
    100% {
      transform: translateY(0px) rotate(45deg);
    }
  }

  @keyframes animation2 {
    0% {
      transform: translateY(-8px) rotate(0deg);
    }
    50% {
      transform: translateY(0px) rotate(0deg);
    }
    100% {
      transform: translateY(0px) rotate(-45deg);
    }
  }
`;
