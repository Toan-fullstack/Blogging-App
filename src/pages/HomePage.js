import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase-app/firebase-config";
import styled from "styled-components";
import Header from "../components/layout/Header";
import HomeBanner from "../module/home/HomeBanner";
import Layout from "../components/layout/Layout";
import HomeFeature from "../module/home/HomeFeature";
import HomeNewest from "../module/home/HomeNewest";

const HomePageStyled = styled.div``;

const HomePage = () => {
  //
  return (
    <HomePageStyled>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
    </HomePageStyled>
  );
};

export default HomePage;
