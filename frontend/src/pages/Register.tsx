import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import { axiosInstance } from "../utils/axiosConfig";
import { registerRoute } from "../utils/APIRoutes";
import styled from "styled-components";
import Logo from '../assets/logo.svg'

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
    useEffect(() => {
      if (localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) {
        navigate("/");
      }
    }, [navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const formValidation = () => {
    const { username, password, confirmPassword, email } = values;
    if (password !== confirmPassword) {
      toast.error("password and confirm password did not match");
      return false;
    } else if (username.length < 3) {
      toast.error("username should be greater than 3 characters");
      return false;
    } else if (password.length < 8) {
      toast.error("password should be at least 8 characters");
      return false;
    } else if (email === "") {
      toast.error("email is required");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValidation()) {
      const { email, username, password } = values;
      const { data } = await axiosInstance.post(registerRoute, {
        username,
        email,
        password
      });
      if (data.status === false) {
        toast.error(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem(import.meta.env.VITE_LOCALHOST_KEY, JSON.stringify(data.user));
        navigate("/");
      }
    }
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Snappy</h1>
          </div>
          <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          />
          <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          />
          <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          />
          <input
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          onChange={handleChange}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer
       position="bottom-right"
        autoClose={8000}
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 2rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    border: none;
    width: 100%;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    padding: 1rem 2rem;
    $:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Register