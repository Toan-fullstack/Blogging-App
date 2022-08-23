import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
const PostCategoryStyles = styled.div`
  display: inline-block;
  color: #6b6b6b;

  border-radius: 8px;
  padding: 4px 10px;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;

  a {
    display: block;
  }
  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: #f3edff;
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: white;
    `};
`;

const PostCatergory = ({
  children,
  type = "primary",
  className = "",
  to = "/",
}) => {
  return (
    <PostCategoryStyles type={type} className={className}>
      <NavLink to={to}> {children}</NavLink>
    </PostCategoryStyles>
  );
};

export default PostCatergory;
