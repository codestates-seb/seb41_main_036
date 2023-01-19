import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';


const GoogleLogIn = () => {
   


    return (
        <GoogleOAuthProvider clientId='278892647104-rk68e1k0ottrp84ivm85gjsbdlnnqvve.apps.googleusercontent.com'>
          <GoogleLogin
            buttonText="google login"
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
    )
  }
   
  export default GoogleLogIn



//   import React, { useEffect } from 'react'
// import { GoogleLogin, GoogleLogout } from 'react-google-login'
 
// const GoogleLogIn = () => {
 
//   // 로그인 성공했을 때 처리 함수
//   const successGoogle = (response) => {
//     console.log(response);
//   }
 
//   //로그인 실패했을 때 처리 함수
//   const failGoogle = (response) => {
//     console.log(response);
//   }
 
//   // 로그아웃 성공했을 때 처리 함수
//   const onLogoutSuccess = () => {
//     console.log('SUCESS LOG OUT');
//   };
 
//   return (
//     <React.Fragment>
//       <GoogleLogin
//         clientId='278892647104-rk68e1k0ottrp84ivm85gjsbdlnnqvve.apps.googleusercontent.com'
//         buttonText="로그인"
//         onSuccess={successGoogle}
//         onFailure={failGoogle}n
//         coockiePolicy = {'single_host_origin'}
//       />
//       <GoogleLogout
//         clientId='278892647104-rk68e1k0ottrp84ivm85gjsbdlnnqvve.apps.googleusercontent.com'
//         onLogoutSuccess={onLogoutSuccess}
//       />
//     </React.Fragment>
//   )
// }
 
// export default GoogleLogIn