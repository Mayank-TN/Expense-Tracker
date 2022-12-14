


const url = 'http://localhost:3000/user';
const main = document.querySelector('#signup-main');

const signup = async (e) =>{
    e.preventDefault();
    const signupValue = {
        name : e.target.name.value ,
        email : e.target.email.value ,
        password : e.target.password.value
    }
    
    axios.post(url+ '/signup' , signupValue).then((result) => { 
        alert(result.data.success)
        window.location.href = "./login.html" 
    }).catch((err) => {
        console.log(err)
        const span = document.createElement('span');
        span.style.color = 'red' ;
        span.textContent = err.response.data.error;
        main.appendChild(span)
    });
    }