const addButton = document.querySelector('.add')
const list = document.querySelector('.list')
const input = document.querySelector('.field')
const filter = document.querySelector('.filter')

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
  status.classList.add('status')
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

  saveTasks()
}

function deleteTask(event) {
  event.target.parentElement.remove()
  saveTasks()
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

  saveTasks()
}

function filterTasks() {
  const tasks = document.querySelectorAll('.task')
  
  tasks.forEach(task => {
    if (task.classList.contains(filter.value)) {
      task.style.display = 'flex'
    } else {
      task.style.display = 'none'
    }
  })  
}

function saveTasks() {
  const tasks = document.querySelectorAll('.task')

  const savedTasks = [...tasks].map((task, index) => ({ id: index, content: task.textContent, isDone: task.querySelector('.status').checked }))

  localStorage.setItem('tasks', JSON.stringify(savedTasks))
}

function loadTasks() {
  const data = JSON.parse(localStorage.getItem('tasks'))

  data.forEach(task => { 
    const newTask = createTask(task.content)

    if (task.isDone) {
      newTask.classList.add('success')
      newTask.classList.remove('unsuccess')
      newTask.querySelector('.status').checked = true
    }

    list.appendChild(newTask)
  })
}

addButton.addEventListener('click', addTask)

input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTask()
  }
})

filter.addEventListener('change', filterTasks)

document.addEventListener('DOMContentLoaded', loadTasks)

// const data = [{ id: 1, content: 'zhopa', isDone: false }, { id: 2, content: 'zhossspa', isDone: true }]