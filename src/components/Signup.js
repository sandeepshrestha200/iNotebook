import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let history = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentialsJson = JSON.stringify({
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    });
  

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: credentialsJson,
    });

    const responseJSON = await response.json();
    console.log(responseJSON);
    if (responseJSON.success) {
      //save the accessToken and redirect
      localStorage.setItem("accessToken", responseJSON.accessToken);
      history("/");

      // alert("message: " + responseJSON.message);
    } else {
      alert("Error: " + responseJSON.message);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="name" className="form-control w-50" id="name" onChange={onChange} value={credentials.name} name="name" minLength={5} requried/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control w-50" id="email" onChange={onChange} value={credentials.email} name="email" minLength={5} requried/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control w-50" id="password" onChange={onChange} value={credentials.password} name="password" minLength={5} requried/>
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input type="password" className="form-control w-50" id="cpassword" onChange={onChange} value={credentials.cpassword} name="cpassword" minLength={5} requried/>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
