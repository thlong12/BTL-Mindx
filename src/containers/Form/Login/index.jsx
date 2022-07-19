import React, { useEffect } from 'react';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
//import { login } from '../img/login.svg'
//import { register } from '../img/register.svg'
import './login.css'

const SIGN_IN = gql`
  mutation SignIn($data: SignInInput!) {
    signIn(data: $data) {
      account {
        id
        identityNumber
        accountName
        firstName
        lastName
        email
        birthday
        phoneNumber
        role
        isActive
        createdAt
        updatedAt
        deletedAt
      }
    }
  }
`;

export const FormLogin = () => {
  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  })

  const [handleLogin] = useMutation(SIGN_IN, {
    onCompleted(data) {
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
  });

  const [data, setData] = useState({
    usename: {
      value: '',
      isError: false,
      msg: '',
    },
    password: {
      value: '',
      isError: false,
      msg: '',
    },
  });


  const [checkPassword, setCheckPassword] = useState(false)
  const [checkUsername, setCheckUsername] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    handleLogin({
      variables: {
        data: data
      }
    })
  };

  const changeValue = (field) => (event) => {
    setData({
      ...data,
      [field]: {
        ...data[field],
        value: event.target.value,
      },
    });
  };

  useEffect(() => {
    const username = document.getElementById('username-input');
    const password = document.getElementById('password-input');

    const autoCheck = () => {
      setCheckUsername(username.value.length < 8 || username.value.length > 20);
      setCheckPassword(password.value.length < 8 || password.value.length > 20)
    };

    username.addEventListener('input', autoCheck);
    password.addEventListener('input', autoCheck);

    return () => {
      username.removeEventListener('input', autoCheck);
      password.removeEventListener('input', autoCheck);
    }
  }, [])

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                id='username'
                name={'username'}
                placeholder={'Username'}
                data={data.username}
                onChange={changeValue('username')}
              />
              {checkUsername && <span className='error'>Your username is incorrect</span>}
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                id='password'
                name={'password'}
                placeholder={'Password'}
                type={'password'}
                data={data.password}
                onChange={changeValue('password')}

              />
              {checkPassword && <span className='error'>Your password is incorrect.</span>}
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" id="username2" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" id="email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" id="password2" />
            </div>
            <input type="submit" className="btn" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h1>XEM PHIM</h1>
            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src='./img/login.svg' className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h1>XEM PHIM</h1>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src='./img/register.svg' className="image" alt="" />
        </div>
      </div>
    </div>
  )
}
