import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "../utils/axiosinstance";
import { useNavigate } from "react-router-dom";
import FixedOnScrollUpHeader from "../components/Header/FixedOnScrollUpHeader";



function Admin() {

    return (
      <>
    <FixedOnScrollUpHeader />  
    <div>임시 관리자 페이지</div>

      </>
    );
  }
  
  export default Admin;
  