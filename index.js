const url = 'http://localhost:3000/expenses';

const expenseAmount = document.getElementById('ExpenseAmount');
const description = document.getElementById('Description');
const category = document.getElementById('category');
const ul = document.getElementById('ul');
const form = document.querySelector('form');

const btn = document.getElementById('btn');
btn.style.backgroundColor = "green"

window.addEventListener("DOMContentLoaded", showExpenseOnScreen);


btn.addEventListener('click', (e) => btnHandle(e))

async function btnHandle(e) {
    e.preventDefault();

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

async function deleteHandler(data) {
    const id = data.id ;
    const response = await axios.delete(url + '/deleteExpense/'+ id);
    showExpenseOnScreen();
}

async function editHandler(data) {
    expenseAmount.value = data.expenseAmount
    description.value = data.description
    category.value = data.category
    btn.style.display = 'none';
    const editMainBtn = document.createElement('button')
    editMainBtn.textContent = 'EDIT CHANGES'
    editMainBtn.addEventListener('click' , (e)=> editChangesHandler(e, data.id ,editMainBtn))
    form.appendChild(editMainBtn);

    
}


async function showExpenseOnScreen() {
    ul.textContent = ""
    const response = await axios.get(url + '/getAllExpenses')
    response.data.map((data) => {
        const li = document.createElement('li');
        li.id = data.id;
        li.textContent = `${data.expenseAmount} ${data.description} ${data.category}      ---------> `;
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Delete'
        deleteBtn.addEventListener('click', () => deleteHandler(data))
        const editBtn = document.createElement('button')
        editBtn.addEventListener('click', () => editHandler(data))
        editBtn.textContent = 'Edit'
        li.appendChild(editBtn)
        li.appendChild(deleteBtn)
        ul.appendChild(li)
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
    btn.style.display = 'block'
    expenseAmount.value = ''
    description.value = ''
    
}