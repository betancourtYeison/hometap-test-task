import styled, { keyframes } from "styled-components";

const LoaderContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.5);
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-top-color: #376ced;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Label = styled.p`
  margin-top: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #20a277;
`;

export const Loader = () => (
  <LoaderContainer>
    <Spinner />
    <Label>Loading...</Label>
  </LoaderContainer>
);
