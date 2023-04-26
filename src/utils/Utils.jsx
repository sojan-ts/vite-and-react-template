import axios from "axios";
import configurations from "../../configurations";

const isTokenExpired = () => {
    const expirationTime = sessionStorage.getItem("expirationTime");
    if (expirationTime) {
    //   const currentTime = Date.now() * 1000;
      const now = new Date();
      const currentTime = now.getTime();
      console.log(currentTime)
      if(currentTime > parseInt(expirationTime)) {
        console.log("expired")
        return true;
      }
    }
    console.log("not expired")
    return false;

  };

  const refreshAdminToken = async () => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    const userid_send = sessionStorage.getItem("userId");
  
    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }
  
    const response = await axios.post(`${configurations.baseurl}auth/refreshadmin`, {
      refresh_token: refreshToken,
      id: userid_send,
    });
  
    const { token, expires_in, refresh_token, userid } = response.data;
  
    const expirationTime = Date.now() * 1000 + expires_in;
  
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", userid);
    sessionStorage.setItem("refreshToken", refresh_token);
    sessionStorage.setItem("expirationTime", expirationTime);
  
    console.log('new updated')
    return token;
  };


  export { isTokenExpired, refreshAdminToken };