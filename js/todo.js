const addButton = document.querySelector('.add')
const list = document.querySelector('.list')
const input = document.querySelector('.field')

function createTask(content) {
  const newTask = document.createElement('div')
  const delButton = document.createElement('input')
  const status = document.createElement('input')

  newTask.textContent = content
  newTask.classList.add('task', 'unsuccess')

  delButton.type = 'button'
  delButton.value = 'x'
  delButton.addEventListener('click', deleteTask)

  status.type = 'checkbox'
  status.addEventListener('click', completeTask)

  newTask.appendChild(delButton)
  newTask.prepend(status)

  return newTask
}

function addTask() {
  if (input.value) {
    const newTask = createTask(input.value)

    list.appendChild(newTask)

    input.value = ''
  }
}

function deleteTask(event) {
  event.target.parentElement.remove()
}

function completeTask(event) {
  const checkbox = event.target
  const task = event.target.parentElement

  if (checkbox.checked) {
    task.classList.add('success')
    task.classList.remove('unsuccess')
  } else {
    task.classList.add('unsuccess')
    task.classList.remove('success')
  }
}

addButton.addEventListener('click', addTask)

input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTask()
  }
})
