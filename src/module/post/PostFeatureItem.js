import { async } from "@firebase/util";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { db } from "../../firebase-app/firebase-config";
import PostCatergory from "./PostCatergory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import slugify from "slugify";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 272px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background-color: rgba(0, 0, 0, 0.75);
      mix-blend-mode: multiply;
      opacity: 0.6;
    }

    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
`;

const PostFeatureItem = ({ data }) => {
  const [category, setCategory] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    async function fetch() {
      const docRef = doc(db, "categories", data.CategoryId);
      const docSnap = await getDoc(docRef);
      setCategory(docSnap.data());
    }
    fetch();
  }, [data.CategoryId]);
  useEffect(() => {
    async function fetchUser() {
      if (data.userId) {
        const docRef = doc(db, "users", data.userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.data) {
          setUser(docSnap.data());
        }
      }
    }
    fetchUser();
  }, [data.userId]);
  if (!data || !data.id) return null;
  const date = new Date(data?.createdAt?.seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString("vi-VI");

  return (
    <PostFeatureItemStyles>
      <PostImage alt="unsplash" url={data.image}></PostImage>

      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {category?.name && (
            <PostCatergory to={category.slug}>{category.name}</PostCatergory>
          )}

          <PostMeta
            to={slugify(user?.fullname || "", { lower: true })}
            authorName={user?.fullname}
            date={formatDate}
          ></PostMeta>
        </div>
        <PostTitle to={data.slug} size="big">
          {data.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
