import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const body = { username, password };

    // transform into turnery to test things out:
    // axios
    //   .post(register ? `/register` : `/login`, body)
    //   .then(({ data }) => {
    //     console.log("AFTER AUTH", data);
    //     authCtx.login(data.token, data.exp, data.userId);
    //   })
    //   .catch((err) => {
    //     setPassword("");
    //     setUsername("");
    //   });

    if (register === true) {
      axios
        .post(`${baseURL}/register`, body)
        .then(({ data }) => {
          console.log(data);
          authCtx.login(data.token, data.exp, data.userId);
        })
        .catch((err) => console.log("register error", err));
    } else {
      axios
        .post(`${baseURL}/login`, body)
        .then(({ data }) => {
          ///found it - all it does is console.log the data. it needs to sign in with the info sent back from the auth.js file -- maybe not. says "error on the register try Error "
          console.log(data);
          authCtx.login(data.token, data.exp, data.userId);
        })

        .catch((err) => console.log("login error", err));
    }
    console.log("submitHandler called");
  };

  const baseURL = `http://localhost:3000`;

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className="form-input"
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="form-btn" type="submit">
          {register ? "Sign Up" : "Login"}
        </button>
      </form>
      <button
        className="form-btn"
        onClick={(e) => {
          setRegister((current) => !current);
          console.log(register);
        }}
      >
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
