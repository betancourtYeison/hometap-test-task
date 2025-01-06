import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

interface ToastContainerProps {
  type: "success" | "error";
  duration: number;
}

const ToastContainer = styled.div<ToastContainerProps>`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${({ type }) =>
    type === "error" ? " #f44336" : " #20a277"};
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  animation: ${slideIn} 0.3s ease-out, ${fadeOut} 0.5s ease-in forwards;
  animation-delay: 0s, ${({ duration }) => `${duration - 0.5}s`};
  z-index: 9999;
`;

interface LoaderProps extends ToastContainerProps {
  message: string;
  onClose: () => void;
}

export const Toast = ({ type, duration, message, onClose }: LoaderProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), duration * 1000);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <ToastContainer type={type} duration={duration}>
      {message}
    </ToastContainer>
  );
};
