import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCatergory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 20px;
      height: 433px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 12px;
    }
    @media screen and (max-width: 1023.98px) {
      &-image {
        height: 250px;
      }
    }
    &-info {
      display: flex;

      align-items: center;
    }
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
      margin: 0 5px;
    }
  }
`;

const PostNewestLarge = () => {
  return (
    <PostNewestLargeStyles>
      <PostImage url="https://images.unsplash.com/photo-1660561898941-bcb8234588d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80"></PostImage>
      <PostCategory className="post-category">Kiến thức</PostCategory>

      <PostTitle size={"big"} className="post-title">
        {" "}
        Hướng dẫn setup phòng cực chill dành cho newbie
      </PostTitle>

      <PostMeta></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
