import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import { FIREBASE_AUTH } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const sand = "#e3c088";
const blue = "#3a899b";
const black = "#000000";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const passwordMatch = password === confirmPassword;

  const handleSignUp = (e) => {
    // Handle login logic here TEST VERSION
    e.preventDefault();
    if (!passwordMatch) {
      setErrorMessage("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password).then((userCredential) => {
      console.log(userCredential);
    }).catch((error) => {
      console.log(error);
      if (error.code === "auth/weak-password") {
        setErrorMessage("Password is too weak must be at least 8 characters");
      }
    });
  };
  return (
    <>
      <div className>
        <Navbar />
      </div>
      <form className="login bg-white p-4" onSubmit={handleSignUp}>
        <h3 className="text-center">Join the conservation efforts of Laguna Beach!</h3>
        <div className="mb-2">
          <label htmlFor="email">First Name</label>
          <input
            type="name"
            placeholder="Jane"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="name">Last Name</label>
          <input
            type="name"
            placeholder="Doe"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="jane.doe@gmail.com"
            className="form-control"
            onChange={(e) => { setEmail(e.target.value) }} // Update password state
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Must be at least 8 characters"
            className="form-control"
            onChange={(e) => { setPassword(e.target.value) }} // Update password state
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            placeholder="Re-type Password"
            className="form-control"
            onChange={(e) => { setConfirmPassword(e.target.value) }} // Update confirm password state
          />
        </div>
        {errorMessage != '' && <p style={{ color: 'red', textAlign: 'center'  }}>{errorMessage}</p>}
        <div className="d-grid">
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: blue }}
          >
            Sign Up
          </button>
        </div>
        <p className="text-center mt-2">
          Have an Account? Login <a href="./login">Here</a>
        </p>
      </form>
    </>
  );
}
