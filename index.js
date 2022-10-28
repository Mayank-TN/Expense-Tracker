const expenseAmount = document.getElementById('ExpenseAmount');
const description = document.getElementById('Description');
const category = document.getElementById('category');
const ul = document.getElementById('ul');
const form = document.querySelector('form');

let id = 0;
const btn = document.getElementById('btn');
btn.style.backgroundColor ="green"


btn.addEventListener('click' , (e)=>btnHandle(e))

function btnHandle(e){
    e.preventDefault();
    if(btn.textContent == 'Edit Changes'){
        btn.textContent = "Add Expenses"
    }
    const data = {
        expenseAmount : expenseAmount.value,
        description : description.value ,
        category : category.value ,
        id : ++id
    }
    const li = document.createElement('li')
    li.id = `${data.id}`
    const deleteBtn = document.createElement('button')
    deleteBtn.id = `${data.id}.delete`
    deleteBtn.textContent = 'delete'
    deleteBtn.addEventListener('click' , ()=>deleteHandler(data))
    const editBtn = document.createElement('button')
    editBtn.addEventListener('click' , ()=> editHandler(data))
    editBtn.textContent = 'edit'
    li.textContent = `${data.expenseAmount} ${data.description} ${data.category} `
    li.appendChild(deleteBtn)
    li.appendChild(editBtn)
   ul.appendChild(li)
   
    localStorage.setItem(`${data.id}` , JSON.stringify(data))
    expenseAmount.value = ""
    description.value = ""
    
}

function deleteHandler(data){
    const li = document.getElementById(`${data.id}`)
    ul.removeChild(li)
    localStorage.removeItem(`${data.id}`)
}

function editHandler(data){

    expenseAmount.value = data.expenseAmount
    description.value = data.description
    category.value = data.category
    localStorage.removeItem(`${data.id}`)
    const li = document.getElementById(`${data.id}`)
    ul.removeChild(li)
    btn.textContent = 'Edit Changes';
}

