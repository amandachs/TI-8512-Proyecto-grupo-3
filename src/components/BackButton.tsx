import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Button: React.FC = () => {
  const navigate = useNavigate();
  return (
    <StyledWrapper>
      <button onClick={() => navigate(-1)}>
        <svg height={16} width={16} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z" /></svg>
        <span>Back</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  margin-bottom: 1.5rem;
  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f5f5f5;
    border: none;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    svg {
      fill: #222;
    }
    &:hover {
      background: #e0e0e0;
    }
  }
`;

export default Button;
