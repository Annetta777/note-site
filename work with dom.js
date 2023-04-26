//регистрация
const getLabel = (label, inputType, inputName, placeholder) => {
  const labelContainer = document.createElement('label')
  labelContainer.innerText = label

  const inputElement = document.createElement('input')
  inputElement.type = inputType
  inputElement.name = inputName
  inputElement.placeholder = placeholder

  labelContainer.append(inputElement)

  return labelContainer
}

const formContainer = document.createElement('form')
formContainer.className = 'create-user-form'

const userNameLabel = getLabel('Имя', 'text', 'userName', 'Введите ваше имя')
const passwordLabel = getLabel('Пароль', 'password', 'password', 'Придумайте пароль')
const button = document.createElement('button')
button.type = 'submit'
button.innerText ='Подтвердить'

formContainer.append(userNameLabel, passwordLabel, button)
document.body.prepend(formContainer)

// основа
const tasks = [
  {
      id: '1138465078061',
      completed: false,
      text: 'Посмотреть новый урок по JavaScript',
  },
  {
      id: '1138465078062',
      completed: false,
      text: 'Выполнить тест после урока',
  },
  {
      id: '1138465078063',
      completed: false,
      text: 'Выполнить ДЗ после урока',
  },
]

const createTaskItem = (taskId, taskText) => {
  const taskItem = document.createElement('div')
  taskItem.className = 'task-item'
  taskItem.dataset.taskId = taskId

  const taskItemMainContainer = document.createElement('div')
  taskItemMainContainer.className = 'task-item__main-container'
  taskItem.append(taskItemMainContainer)

  const taskItemMainContent = document.createElement('div')
  taskItemMainContent.className = 'task-item__main-content'
  taskItemMainContainer.append(taskItemMainContent)

  const checkboxForm = document.createElement('form')
  checkboxForm.className = 'checkbox-form'

  const inputCheckbox = document.createElement('input')
  inputCheckbox.className = 'checkbox-form__checkbox'
  inputCheckbox.type = 'checkbox'
  const inputId = `task - ${taskId}`
  inputCheckbox.id = inputId

  const labelCheckbox = document.createElement('label')
  labelCheckbox.htmlFor = inputId
  checkboxForm.append(inputCheckbox, labelCheckbox)

  const spanText = document.createElement('span')
  spanText.className = 'task-item__text'
  spanText.innerText = taskText

  taskItemMainContent.append(checkboxForm, spanText)

  const deleteButton = document.createElement('button')
  deleteButton.className = 'task-item__delete-button default-button delete-button'
  deleteButton.innerText = 'Удалить'

  taskItemMainContainer.append(deleteButton)

  return taskItem
} 
//создание блока с ошибкой
const createErrorBlock = (errorMessage) => {
  const errorBlock = document.createElement('span')
  errorBlock.className = 'c'
  errorBlock.innerText = errorMessage
  return errorBlock
}

// реализация логики создания новых задач

const createTaskForm = document.querySelector('.create-task-block')
createTaskForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const newTaskText = (event.target.taskName.value || '').trim()
  const isTaskText = tasks.some((task) => task.text === newTaskText)
  const errorMessageBlockFromDOM = createTaskForm.querySelector('.error-message-block')
  if(!newTaskText) {
    const errorBlock = createErrorBlock('Название задачи не должно быть пустым.')
    createTaskForm.append(errorBlock)
  } else if (isTaskText) {
    const errorBlock = createErrorBlock('Задача с таким названием уже существует.')
    createTaskForm.append(errorBlock)
  } else if (newTaskText && !isTaskText) {
    const newTask = {
      id: Date.now().toString(),
      text: newTaskText,
    }
    tasks.push(newTask)
    const taskItem = createTaskItem(newTask.id, newTask.text)
    contentList.append(taskItem)
  }
  else if (errorMessageBlockFromDOM) {
    errorMessageBlockFromDOM.remove()
  }
})

const contentList = document.querySelector('.tasks-list')
tasks.forEach((task) => {
  const taskItem = createTaskItem(task.id, task.text)
  contentList.append(taskItem)
})