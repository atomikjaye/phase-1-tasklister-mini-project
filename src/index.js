document.addEventListener("DOMContentLoaded", () => {
  // Select form
  let form = document.querySelector('form')

  // Add event listener for form's submit
  form.addEventListener('submit', (e) => {
    // prevent refresh
    e.preventDefault()
    // call createToDo function on event that's submitted
    createToDo(e.target)
    // reset inputs
    form.reset()
  })


  function createToDo(todo) {
    // Select tabel in DOM
    const listTbl = document.getElementById('tasks')
    //Create tr, th, td elements cause we always do too much
    const tr = document.createElement('tr')
    const th = document.createElement('th')
    const td = document.createElement('td')
    // create span for only editing the tasks' text
    const span = document.createElement('span')
    // create spans for button mainly for positioning and css
    const buttonSpan = document.createElement('span')
    // make priority a number not a string for sort function (when that gets created)
    const priority = parseInt(todo.querySelector('#priority').value)

    // add delete and completed/done button
    const deleteBtn = document.createElement('button')
    const doneBtn = document.createElement('button')

    //add text to elements add class for targeting
    // add priority to table row header
    th.textContent = priority
    // add text to  tasks' span
    span.textContent = todo.querySelector('#new-task-description').value
    // add text class for selecting later
    span.classList = "text"


    // Make span editable to edit tasks
    span.contentEditable = true

    // Check Priority assign css background class
    if (priority === 1) {
      tr.classList.add('has-background-danger')
    } else if (priority === 2) {
      tr.classList.add('has-background-warning')
    } else if (priority === 3) {
      tr.classList.add('has-background-success')
    }

    // ADD classlist for Table Row for progressBar later
    tr.classList.add('task')

    // add buttonSpan for CSS
    buttonSpan.classList = 'buttonSpan'

    // Add event Listeners for completed/done and delete buttons
    // Also add CSS classes which we could have done with css first and last child properties too
    deleteBtn.addEventListener('click', deleteToDo)
    deleteBtn.classList = 'deleteBtn'
    doneBtn.addEventListener('click', doneToDo)
    doneBtn.classList = 'doneBtn'

    // append delete button to buttonSpan
    buttonSpan.appendChild(deleteBtn)
    // append done button buttonSpan
    buttonSpan.appendChild(doneBtn)
    // add button Span in table element
    td.appendChild(buttonSpan)
    // add text in table element
    td.appendChild(span)
    // add table header in table row
    tr.appendChild(th)
    // add table element in table row
    tr.appendChild(td)
    // append li item to list 
    // add table row to TABLE
    listTbl.appendChild(tr)

    // Update Progress Bar
    progressBarNum()
  }


  function deleteToDo(e) {
    // targetting the delete buttons parent's parent to get inside and search for the task text with the class .text
    //TODO: Find better way of doing this.
    let task = e.target.parentNode.parentNode.querySelector('.text').textContent
    // Ask user if they are sure they want to delete task. Returns true if "OK" is clicked
    let choice = confirm(`Are you sure you want to delete: "${task}"? \nClick "Ok" to Delete and "Cancel" to keep.`)
    // if true, delete item
    if (choice) {
      e.target.parentNode.parentNode.parentNode.remove()
      // then update progress bar
      progressBarNum()
    }
  }

  function doneToDo(e) {
    // add done css to button's parent's parent's parents.. this is the entire TR
    //TODO: Find a better way of doing this.
    e.target.parentNode.parentNode.parentNode.classList.add('done')
    // Also Remove Buttons
    e.target.parentNode.remove()

    //then update progress Bar
    progressBarNum()

  }

  function progressBarNum() {
    // Find total tasks labeled with .task class as stated above
    let totalTasks = document.querySelectorAll('.task').length
    // Find all tasks labeled with .done class
    let doneTasks = document.querySelectorAll('.done').length
    // Find percentage by dividing sdone Tasks with totalTasks * 100
    let percentage = (doneTasks / totalTasks) * 100
    //Select ProgressBar (.value aparently doesn't work so change it later)
    let progressBar = document.querySelector('#progressBar')

    //Debugging because it didnt work initally with progressBar selecting the .value
    // console.log("progressBar", progressBar, "totalTasks", totalTasks, "doneTasks", doneTasks, "percentage", percentage);
    //Set progressBar's value property to the percentage formula

    progressBar.value = percentage

    //Add color depending on how much has been completed
    const progressColors = ["is-warning", "is-danger", "is-sucess"]
    if (percentage >= 66) {
      // premptively removing classes that might have been there before
      progressBar.classList.remove(...progressColors)
      // Adding is-success to show bar as green
      progressBar.classList.add('is-success')
    } else if (percentage >= 33) {
      // premptively removing classes that might have been there before
      progressBar.classList.remove(...progressColors)
      // Adding is-success to show bar as green
      progressBar.classList.add('is-warning')
    } else {
      // premptively removing classes that might have been there before
      progressBar.classList.remove(...progressColors)
      // Adding is-success to show bar as green
      progressBar.classList.add('is-danger')
    }
  }
}



);
