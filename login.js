const url = 'http://localhost:3000/user';
const main = document.querySelector('#login-main');

const login = async (e) =>{
    e.preventDefault();
    const loginValue = {
        email : e.target.email.value ,
        password : e.target.password.value
    }
    
    axios.post(url+ '/login' , loginValue).then((result) => {
        console.log(result.data)
        window.location.href = "./index.html"
        
    }).catch((err) => {
        console.log(err.response.data)
        const span = document.createElement('span');
        span.style.color = 'red' ;
        span.textContent = err.response.data.error;
        main.appendChild(span)
    });
    }