import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "../utils/axiosinstance";
import { useNavigate } from "react-router-dom";
import FixedOnScrollUpHeader from "../components/Header/FixedOnScrollUpHeader";
import Footer from "../components/Footer";

const AdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function Admin() {
  return (
    <>
      <FixedOnScrollUpHeader />
      <AdminWrapper>
        <div>임시 관리자 페이지</div>
        <div>임시 관리자 페이지</div>
        <div>임시 관리자 페이지</div>
        <div>임시 관리자 페이지</div>
      </AdminWrapper>
      <Footer />
    </>
  );
}

export default Admin;
