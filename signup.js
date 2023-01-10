const url = 'http://localhost:3000/user';

const signup = async (e) =>{
    e.preventDefault();
    const signupValue = {
        name : e.target.name.value ,
        email : e.target.email.value ,
        password : e.target.password.value
    }
    
    await axios.post(url+ '/signup' , signupValue)
    }