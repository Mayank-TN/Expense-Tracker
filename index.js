const url = 'http://localhost:3000/expenses';

const expenseAmount = document.getElementById('ExpenseAmount');
const description = document.getElementById('Description');
const category = document.getElementById('category');
const form = document.querySelector('form');

const btn = document.getElementById('btn');
const tbody = document.getElementById('tbody')
btn.style.backgroundColor = "green"

window.addEventListener("DOMContentLoaded", showExpenseOnScreen);


btn.addEventListener('click', (e) => btnHandle(e))

async function btnHandle(e) {
    e.preventDefault();
    if(expenseAmount.value.trim() === '' || description.value.trim() === '' || category.value === '--Select--'){
        const span = document.createElement('h2')
        span.textContent = 'Enter Mandatory Details'
        form.appendChild(span)

        setTimeout(()=>{
            span.remove()
        },3000)
    }
    else{
        const data = {
            expenseAmount: expenseAmount.value,
            description: description.value,
            category: category.value,
        }
        const response = await axios.post(url +'/postNewExpense', data)
        
        showExpenseOnScreen()
        expenseAmount.value = ""
        description.value = ""
    }

}

async function deleteHandler(data) {
    const id = data.id ;
    const response = await axios.delete(url + '/deleteExpense/'+ id);
    showExpenseOnScreen();
}

async function editHandler(data) {
    expenseAmount.value = data.expenseAmount
    description.value = data.description
    category.value = data.category
    btn.style.visibility = "hidden"
    const editMainBtn = document.createElement('button')
    editMainBtn.textContent = 'EDIT CHANGES'
    editMainBtn.id = 'edit-btn'
    editMainBtn.addEventListener('click' , (e)=> editChangesHandler(e, data.id ,editMainBtn))
    form.appendChild(editMainBtn);

}

async function showExpenseOnScreen() {
    tbody.textContent = ''
    const response = await axios.get(url + '/getAllExpenses')
    // response.data.map((data) => {
    //     const li = document.createElement('li');
    //     li.id = data.id;
    //     li.textContent = `${data.expenseAmount} ${data.description} ${data.category}      ---------> `;
    //     const deleteBtn = document.createElement('button')
    //     deleteBtn.textContent = 'Delete'
    //     deleteBtn.addEventListener('click', () => deleteHandler(data))
    //     const editBtn = document.createElement('button')
    //     editBtn.addEventListener('click', () => editHandler(data))
    //     editBtn.textContent = 'Edit'
    //     li.appendChild(editBtn)
    //     li.appendChild(deleteBtn)
    //     ul.appendChild(li)
    // })
    const responseTable = await axios.get(url + '/getAllExpenses')
    responseTable.data.map((data) => {
        const tr = document.createElement('tr');
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Delete'
        deleteBtn.addEventListener('click', () => deleteHandler(data))
        const editBtn = document.createElement('button')
        editBtn.addEventListener('click', () => editHandler(data))
        editBtn.textContent = 'Edit'

        tr.innerHTML = `<td>${data.expenseAmount}</td><td>${data.description}</td><td>${data.category}</td>`
        tr.appendChild(deleteBtn)
        tr.appendChild(editBtn)
        
        
        tbody.appendChild(tr)
    })
}


async function editChangesHandler(e,id , editMainBtn){
    e.preventDefault();
    const data = {
        expenseAmount : expenseAmount.value ,
        description : description.value ,
        category : category.value
    }
    const response = await axios.put(url+'/editExpense/' + id , data).then(()=>{
        showExpenseOnScreen()
    })
    editMainBtn.removeEventListener('click' , (e)=> editChangesHandler(e, data.id))
    editMainBtn.style.display = 'none'
    btn.style.visibility = "visible"
    expenseAmount.value = ''
    description.value = ''
    
}