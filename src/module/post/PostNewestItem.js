import React from "react";
import styled from "styled-components";
import PostCatergory from "./PostCatergory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;

  .post {
    &-image {
      width: calc(100% / 3);
      height: 130px;
      border-radius: 16px;
    }

    &-content {
      width: calc(100% - 100% / 3);
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      color: white;
      color: #232323;
    }
    &-top {
      /* display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px; */
    }
    &-title {
      padding-top: 10px;
    }

    &-type {
      max-width: fit-content;
      a {
        display: inline-block;
      }
    }
  }
`;

const PostNewestItem = () => {
  return (
    <PostFeatureItemStyles>
      <PostImage
        to="/"
        url="https://images.unsplash.com/photo-1660561898941-bcb8234588d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80"
      ></PostImage>

      <div className="post-overlay"></div>
      <div className="post-content">
        <PostCatergory type="secondary" className="post-type">
          Kiến thức
        </PostCatergory>
        <PostTitle>Hướng dẫn set up cực đẹp</PostTitle>
        <PostMeta></PostMeta>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostNewestItem;
