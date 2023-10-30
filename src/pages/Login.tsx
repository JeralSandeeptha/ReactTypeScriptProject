import '../styles/Login/Login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerNewUser } from '../services/services';
import reactLogo from '../images/react.png';
import { Link, useNavigate } from 'react-router-dom';
import { errorMessage } from '../constants/data';
import usersData from '../api/db.json';
import { useState, useEffect } from 'react';

type LoginProps = {

}

interface LoginUser {
  email: string;
  password: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  day: number;
  month: string;
  year: string;
  password: string;
  confirmPassword: string;
  isSubscribed: boolean;
}

const Login = (props: LoginProps) => {

  const navigate = useNavigate();

  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
        email: Yup.string().max(50, "Email must be 50 characters or less").required("Email is not valid").email("Invalid email address"),
        password: Yup.string().required("Password is not valid")
    }),
    onSubmit: (values: LoginUser) => {
      loginUser(values);
    },
  });

  const loginUser = (values: LoginUser) => {
    const user = {
        email: values.email,
        password: values.password,
    }
    console.log(user);

    const isUserInArray = (userToCheck: LoginUser): boolean => {
      const foundUser = usersData.users.find(user => user.email === userToCheck.email && user.password === userToCheck.password);
      return !!foundUser; 
    };

    const exists = isUserInArray(user);
    if (exists) {
      console.log('User login successful');
      navigate('/dashboard');
    } else {
      console.log('Please enter correct login detials');
      setIsLoginFailed(true);
    }
    
  }
  
  console.log(formik.values);

  useEffect(() => {
    console.log(usersData.users);
  }, []);

  return (
    <div className='register-outer'>
      <div className="register-inner">
          <div className="left">
              <form className="form" onSubmit={formik.handleSubmit}>
                <h1 className='header'>Login Form</h1>
                <div className="input">
                    <h5 className='subheader'>Email</h5>
                    <input onBlur={formik.handleBlur} name='email' type="email" className='input-field' placeholder='abcd@gmail.com' value={formik.values.email} onChange={formik.handleChange}/>
                </div>
                <div className="input">
                  <h5 className='subheader'>Password<span className='start-mark'>*</span></h5>
                  <input name='password' type="password" className='input-field' placeholder='#########' value={formik.values.password} onChange={formik.handleChange}/>
                </div>
                { formik.touched.email && formik.errors.email ? <h5 className='error-message' style={errorMessage}>Please enter required fields.</h5> : null }
                { formik.touched.password && formik.errors.password ? <h5 className='error-message' style={errorMessage}>Password incorrect.</h5> : null }
                { isLoginFailed ? <h5 className='error-message' style={errorMessage}>Please enter valid login details.</h5> : null }
                <div className="input">
                  <button type='submit' className='btn'>Log in</button>
                </div>
                <div className="input">
                  <h5 className='loginText'>Don't have an account ? <Link className="loginLink" to='/'>Sign in</Link></h5>
                </div>
              </form>  
          </div>
          <hr />
          <div className="right">
              <img src={reactLogo} alt="react-logo" className="logo" />
              <h1 className="header">ReactJS</h1>
              <h2 className="sub-header">Training</h2>
          </div>
      </div>
    </div>
  )
}

export default Login;