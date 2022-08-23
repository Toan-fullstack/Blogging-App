import React from "react";
import styled from "styled-components";
// const HeadingStyles = styled.h2`
//   font-size: 28px;
//   position: relative;
//   margin-bottom: 30px;
//   font-weight: 600;
//   @media screen and (max-width: 1023.98px) {
//     font-size: 22px;
//     margin-bottom: 20px;
//   }
// `;
const HeadingStyles = styled.h2`
  font-size: 28px;
  font-weight: 600;
  position: relative;
  display: inline-block;
  line-height: 2;
  color: ${(props) => props.theme.tertiary};
  margin-bottom: 30px;
  transition: all 0.2s linear;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 35px;
    border: 2px solid ${(props) => props.theme.accent};
    transition: all 0.4s linear;
  }
  &:hover:before {
    width: 100%;
  }
`;
const Heading = ({ className = "", children }) => {
  return <HeadingStyles className={className}>{children}</HeadingStyles>;
  //   return <HeadingStyles className={className}>{children}</HeadingStyles>;
};

export default Heading;
