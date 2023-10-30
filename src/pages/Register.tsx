import React from 'react'
import '../styles/Register/Register.css';
import { months, dates, years, errorMessage, successMessage, logo, messageConatiner, successConatiner } from '../constants/data';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerNewUser } from '../services/services';
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
import reactLogo from '../images/react.png';
import { Link } from 'react-router-dom';

type RegisterProps = {
    
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

const capitalLetterRegex = /[A-Z]/;
const lowercaseLetterRegex = /[a-z]/;
const specialCharacterRegex = /[!@#$%^&*()\-_=+[\]{}|;:'",.<>/?\\]/;
const digitRegex = /\d/;

const Register = (props: RegisterProps) => {

    const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
          phone: 'example',
          gender: 'male',
          day: 0,
          month: '',
          year: '',
          password: '',
          confirmPassword: '',
          isSubscribed: false
        },
        validationSchema: Yup.object({
            firstName: Yup.string().max(50, "First Name must be 50 characters or less").required("First Name is required"),
            lastName: Yup.string().max(50, "Last Name must be 50 characters or less").required("Last Name is required"),
            email: Yup.string().max(50, "Email must be 50 characters or less").required("Email is not valid").email("Invalid email address"),
            phone: Yup.string().max(10, "Phone number be 10 characters").required("Phone number is not valid"),
        }),
        onSubmit: (values: User) => {
            registerUser(values);
        },
    });

    const setDefaultValues = () => {
        formik.handleReset(formik.values);
    }

    const registerUser = (values: User) => {
        const user = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            gender: values.gender,
            birthday: values.day + " " + values.month + " " + values.year,
            isSubscribed: values.isSubscribed
        }

        try {
            if (values.password === values.confirmPassword) {
                registerNewUser(user);
                setDefaultValues();
            } else {
                alert('Both passwords should be match');
            }
        } catch (error) {
            console.log('Server error, Please try again later.');
        }
    }

    console.log(formik.values);

    return (
        <div className='register-outer'>
            <div className="register-inner">
                <div className="left">
                    <form className="form" onSubmit={formik.handleSubmit}>
                        <h1 className='header'>Registration Form</h1>
                        <div className="input">
                            <h5 className='subheader'>First Name<span className='start-mark'>*</span></h5>
                            <input onBlur={formik.handleBlur} name="firstName" type="text" className='input-field' placeholder='Jhone' value={formik.values.firstName} onChange={formik.handleChange}/>
                            { formik.touched.firstName && formik.errors.firstName ? <h5 className='error' style={errorMessage}>First Name is required</h5> : null }
                        </div>
                        <div className="input">
                            <h5 className='subheader'>Last Name<span className='start-mark'>*</span></h5>
                            <input onBlur={formik.handleBlur} name='lastName' type="text" className='input-field' placeholder='Piter' value={formik.values.lastName} onChange={formik.handleChange}/>
                            { formik.touched.lastName && formik.errors.lastName ? <h5 className='error-message' style={errorMessage}>Last Name is required</h5> : null }
                        </div>
                        <div className="input">
                            <h5 className='subheader'>Email <span className='start-mark'>*</span></h5>
                            <input onBlur={formik.handleBlur} name='email' type="email" className='input-field' placeholder='abcd@gmail.com' value={formik.values.email} onChange={formik.handleChange}/>
                            { formik.touched.email && formik.errors.email ? <h5 className='error-message' style={errorMessage}>Email is not valid</h5> : null }
                        </div>
                        <div className="input">
                            <h5 className='subheader'>Phone<span className='start-mark'>*</span></h5>
                            <input onBlur={formik.handleBlur} name='phone' type="number" className='input-field' placeholder='example' value={formik.values.phone} onChange={formik.handleChange}/>
                            { formik.touched.phone && formik.errors.phone ? <h5 className='error-message' style={errorMessage}>Phone number is not valid</h5> : null }
                        </div>
                        <div className="input-radio">
                            <div className="radio">
                                <input checked={formik.values.gender === 'male'} name='gender' onChange={formik.handleChange} type="radio" className='radio-btn'/>
                                <h5 className='subheader'>Male</h5>
                            </div>
                            <div className="radio">
                                <input checked={formik.values.gender === 'female'} name='gender' onChange={formik.handleChange} type="radio" className='radio-btn'/>
                                <h5 className='subheader'>Female</h5>
                            </div>
                        </div>
                        <div className="input">
                            <h5 className='subheader'>Birth Day</h5>
                            <div className='elements'>
                                <select onChangeCapture={formik.handleChange} value={formik.values.day} name="day" id="day" className='input-field-two'>
                                    {
                                        dates.map( (date, index) => {
                                            return (
                                                <option key={index} value={date.value}>{date.title}</option>
                                            )
                                        })
                                    }
                                </select>
                                <select onChangeCapture={formik.handleChange} value={formik.values.month} name="month" id="month" className='input-field-two'>
                                    {
                                        months.map( (month, index) => {
                                            return (
                                                <option key={index} value={month.value}>{month.title}</option>
                                            )
                                        })
                                    }
                                </select>
                                <select onChangeCapture={formik.handleChange} value={formik.values.year}  name="year" id="year" className='input-field-two'>
                                    {
                                        years.map( (year, index) => {
                                            return (
                                                <option key={index} value={year.value}>{year.title}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="input">
                            <h5 className='subheader'>Password<span className='start-mark'>*</span></h5>
                            <input name='password' type="password" className='input-field' placeholder='#########' value={formik.values.password} onChange={formik.handleChange}/>
                            { formik.values.password.length < 7 ? (
                                <div style={messageConatiner}><RxCross2 style={logo}/><h5 className='error-message' style={errorMessage}>Password should contain atleast 8 characters</h5></div>
                            ) : null }
                            { capitalLetterRegex.test(formik.values.password) ? null : (
                                <div style={messageConatiner}><RxCross2 style={logo}/><h5 className='error-message' style={errorMessage}>Password should contain atleast one capital letter</h5></div>
                            ) }
                            { lowercaseLetterRegex.test(formik.values.password) ? null : (
                                <div style={messageConatiner}><RxCross2 style={logo}/><h5 className='error-message' style={errorMessage}>Password should contain atleast one single letter</h5></div>
                            ) }
                            { specialCharacterRegex.test(formik.values.password) ? null : (
                                <div style={messageConatiner}><RxCross2 style={logo}/><h5 className='error-message' style={errorMessage}>Password should contain atleast one special character</h5></div>
                            ) }
                            { digitRegex.test(formik.values.password) ? null : (
                                <div style={messageConatiner}><RxCross2 style={logo}/><h5 className='error-message' style={errorMessage}>Password should contain atleast one number</h5></div>
                            ) }
                            
                            { formik.values.password.length > 7 ? (
                                <div style={successConatiner}><AiOutlineCheck style={logo}/><h5 className='error-message' style={successMessage}>Password contains atleast 8 characters</h5></div>
                            ) : null }
                            { capitalLetterRegex.test(formik.values.password) ? (
                                <div style={successConatiner}><AiOutlineCheck style={logo}/><h5 className='error-message' style={successMessage}>Password contains atleast one capital letter</h5></div>
                            ) : null}
                            { lowercaseLetterRegex.test(formik.values.password) ? (
                                <div style={successConatiner}><AiOutlineCheck style={logo}/><h5 className='error-message' style={successMessage}>Password contains atleast one single letter</h5></div>
                            ) : null }
                            { specialCharacterRegex.test(formik.values.password) ? (
                                <div style={successConatiner}><AiOutlineCheck style={logo}/><h5 className='error-message' style={successMessage}>Password contains atleast one special character</h5></div>
                            ) : null }
                            { digitRegex.test(formik.values.password) ? (
                                <div style={successConatiner}><AiOutlineCheck style={logo}/><h5 className='error-message' style={successMessage}>Password contains atleast one number</h5></div>
                            ) : null }
                        </div>
                        <div className="input">
                            <h5 className='subheader'>Confirm password<span className='start-mark'>*</span></h5>
                            <input name='confirmPassword' type="password" className='input-field' placeholder='#########' value={formik.values.confirmPassword} onChange={formik.handleChange}/>
                            { formik.values.password != formik.values.confirmPassword ? <h5 className='error-message' style={errorMessage}>Password not match</h5> : null }
                        </div>
                        <div className="input-description">
                            <input checked={formik.values.isSubscribed} onChange={formik.handleChange} name='isSubscribed' type="checkbox" className='check-box'/>
                            <h5 className='checkbox-text'>I'd like to receive marketing promotions special offers updates.</h5>
                        </div>
                        <div className="input">
                            <button type='submit' className='btn'>Sign Up</button>
                        </div>
                        <div className="input">
                            <h5 className='loginText'>Already have an account ? <Link className="loginLink" to='/login'>Log in</Link></h5>
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

export default Register