import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate instead of useHistory
import DataController from "../controllers/DataController";

const LoginAuth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent default form submission behavior
    const loginAuthData = { "email": username, password };
    try {
      const response = await DataController.LoginAuth(loginAuthData);
      // if loginAuth is successful, navigate to dashboard page
      if (response.status === 200) {
        const responseData = await response.data;
        sessionStorage.setItem('token', responseData.token);
        sessionStorage.setItem('refreshToken', responseData.refresh_token);
        sessionStorage.setItem('userId', responseData.userid);
        const now = new Date();
        const expirationTime = now.getTime() + (responseData.expires_in * 1000);
        sessionStorage.setItem('expirationTime', expirationTime.toString());
        console.log('success');
        navigate("/dashboard"); // use navigate instead of history.push
      } else {
        console.log("LoginAuth failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">LoginAuth</button>
      </form>
    </div>
  );
};

export default LoginAuth;
