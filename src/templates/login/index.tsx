import React, { useState } from "react";
import { navigate } from "gatsby"
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { CookieJar } from 'tough-cookie'
import AuthService from '../../services/auth.service'

function Login(props: any) {
  const [error, setError] = useState("");
  const { login, logout } = AuthService
  const jar = new CookieJar();


  interface Login {
    identifier: string,
    password: string,
  }

  const onSubmit = async (values: Login) => {
    setError("");

    try {
      const response = await login(values)
      console.log("🚀 ~ file: index.tsx:25 ~ onSubmit ~ response ", response)
      if (response.status === 200) {
        navigate("/dashboard/profile/");
      }


    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <h1>Welcome Back!</h1>
          <span>{error}</span>
          <div>
            <input
              name="identifier"
              value={formik.values.identifier}
              onChange={formik.handleChange}
              placeholder="Email"
              type="email"
            />
          </div>
          <div>
            <input
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              type="password"
            />
          </div>
          <div>
            <button type="submit" disabled={formik.isSubmitting}>
              Login
            </button>
          </div>
        </form>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default Login;
