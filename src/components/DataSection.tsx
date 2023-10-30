import React, { useEffect, useState } from 'react'
import '../styles/DataSection/DataSection.css';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { AiTwotoneEdit } from 'react-icons/ai';
import { GrFormView } from 'react-icons/gr';
import axios from 'axios';
import { months, dates, years, errorMessage, successMessage, logo, messageConatiner, successConatiner } from '../constants/data';
import { useNavigate, useParams } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";

type DataSectionProps = {
    
}

interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    birthday: string,
    password: string;
    confirmPassword: string;
    isSubscribed: boolean;
    id: number;
}

const DataSection = (props: DataSectionProps) => {

    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User | null>();

    const navigate = useNavigate();

    const { id } = useParams();

    const getUsers = () => {
        try {
            axios.get('http://localhost:5000/users')
                .then( (res) => {
                    console.log(res.data);
                    setUsers(res.data);
                })
                .catch( (error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log('Server error: ' + error);
        }
    }

    const getUser = (userId: number) => {
        axios.get(`http://localhost:5000/users/${userId}`)
            .then((res) => {
                setUser(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteUser = (userId: number) => {
        axios.delete(`http://localhost:5000/users/${userId}`)
            .then((res) => {
                setUsers(users.filter(user => user.id !== userId));
                console.log('User deleted');
                navigate('/dashboard');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect( () => {
        getUsers();
    }, []);

    console.log(id);

    return (
        <div className='data-outer'>
            <div className="data-inner">

                <div className="header">
                    <h5 className='sub-header'>#</h5>
                    <h5 className='sub-header'>Name</h5>
                    <h5 className='sub-header'>Email Address</h5>
                    <h5 className='sub-header'>Phone No</h5>
                    <h5 className='sub-header'>Gender</h5>
                    <h5 className='sub-header'>Birth day</h5>
                    <h5 className='sub-header'>Actions</h5>
                </div>

                <div className="data">
                    {
                        users.map( (user, index) => {
                            const isOdd = index % 2 === 1;
                            const rowClass = isOdd ? 'odd' : 'even';
                            return (
                                <div className={`user ${rowClass}`} key={index}>
                                    <h5 className='sub-header-bold'>{user.id}</h5>
                                    <h5 className='sub-header'>{user.firstName + " " + user.lastName}</h5>
                                    <h5 className='sub-header'>{user.email}</h5>
                                    <h5 className='sub-header'>{user.phone}</h5>
                                    <h5 className='sub-header'>{user.gender}</h5>
                                    <h5 className='sub-header'>{user.birthday}</h5>
                                    <h5 className='sub-header'>
                                        <Link onClick={() => getUser(user.id)} className='btn' to={`/dashboard/users/${user.id}`}><GrFormView className='img' /></Link>
                                        <Link className='btn' to=''><AiTwotoneEdit className='img' /></Link>
                                        <Link onClick={() => deleteUser(user.id)} className='btn' to={`/users/${user.id}`}><MdDelete className='imgTwo' /></Link>
                                    </h5>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            {
                user ? (
                    <div className='user-section'>
                        <div className="user-inner">
                            <div className="box1">
                                <h1 className="header">Details</h1>
                                <RxCross2 onClick={ () => {
                                    setUser(null);
                                }}/>
                            </div>
                            <div className="box2">
                                <h4 className='sub-header'>Id : { user.id }</h4>
                                <h4 className='sub-header'>First Name : { user.firstName }</h4>
                                <h4 className='sub-header'>Last Name : { user.lastName }</h4>
                                <h4 className='sub-header'>Mobile : { user.phone }</h4>
                                <h4 className='sub-header'>Email : { user.email }</h4>
                                <h4 className='sub-header'>Gender : { user.gender }</h4>
                                <h4 className='sub-header'>Birthday : { user.birthday }</h4>
                            </div>
                            <button onClick={ () => {
                                setUser(null);
                            }}>Ok</button>
                        </div>
                    </div>
                ) : null
            }
        </div>
    );

}

export default DataSection