import React, { useState , useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode'


const AddressPopup = ({props} :any) => {
    const address = props.address;
    const setAddress = props.setAddress;
  
    const onCompletePost = (data:any) => {
      console.log(data.address);
      setAddress(data.address);
    };
  
    const postCodeStyle = {
     
      display: "block",
      position: "absolute",
      top: "20%",
      width: "400px",
      height: "400px",
      padding: "7px",
      zIndex: 100, 
    };
  
    return (
      <>
      
          <DaumPostcode
            style={{
            width: "400px",
            height: "400px",
            padding: "7px",
            zIndex: 100, }}
            autoClose={false}
            onComplete={onCompletePost}
  
          />
       
      </>
    );
  };
  
  export default AddressPopup;