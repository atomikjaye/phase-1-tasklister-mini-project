document.addEventListener("DOMContentLoaded", () => {
  // your code here
  // Select form and add submit action 
  let form = document.querySelector('form')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target[0].value)

    // const list = document.getElementById('tasks')
    // const li = document.createElement('li') // create list
    // li.textContent = e.target[0].value; // set text Content to value
    // // make delete button

    // const deleteBtn = document.createElement('button')
    // deleteBtn.textContent = "x"
    // li.appendChild(deleteBtn);

    // list.appendChild(li)
    createToDo(e.target[0].value)
    form.reset()
  })
});

function createToDo(todo) {
  // Select list in DOM
  const list = document.getElementById('tasks')
  //Create li element
  const li = document.createElement('li')
  // add delete button
  const deleteBtn = document.createElement('button')
  //add text to elements
  li.textContent = todo
  deleteBtn.textContent = 'x'
  // add event listener to delete
  deleteBtn.addEventListener('click', deleteToDo)
  // append delete button
  li.appendChild(deleteBtn)
  // append li item to list 
  list.appendChild(li)
}

function deleteToDo(e) {
  e.target.parentNode.remove()
}