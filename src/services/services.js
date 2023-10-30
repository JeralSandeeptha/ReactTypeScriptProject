import axios from 'axios';

export const registerNewUser = (user) => {
    axios.post('http://localhost:5000/users', user)
        .then( (res) => {
            if (res.status === 201) {
                alert('User registration successfull');
            }                
        })
        .catch( (error) => {
            console.log(error);
        })
}