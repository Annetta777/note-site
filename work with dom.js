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
  errorBlock.className = 'error-message-block'
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
  if (errorMessageBlockFromDOM) {
    errorMessageBlockFromDOM.remove()
  }
})

const contentList = document.querySelector('.tasks-list')
tasks.forEach((task) => {
  const taskItem = createTaskItem(task.id, task.text)
  contentList.append(taskItem)
})

// удаление задач

const createDeleteModal = (text) => {
  const modalOverlay = document.createElement('div')
  modalOverlay.className = 'modal-overlay modal-overlay_hidden'

  const deleteModal = document.createElement('div')
  deleteModal.className = 'delete-modal'

  modalOverlay.append(deleteModal)

  const deleteModalQuestion = document.createElement('h3')
  deleteModalQuestion.className = 'delete-modal__question'
  deleteModalQuestion.innerText = text

  const deleteModalButtons = document.createElement('div')
  deleteModalButtons.className = 'delete-modal__buttons'

  deleteModal.append(deleteModalQuestion, deleteModalButtons)

  const buttonCancel = document.createElement('button')
  buttonCancel.className = 'delete-modal__button delete-modal__cancel-button'
  buttonCancel.innerText = 'Отмена'

  const buttonConfirm = document.createElement('button')
  buttonConfirm.className = 'delete-modal__button delete-modal__confirm-button'
  buttonConfirm.innerText = 'Удалить'

  deleteModalButtons.append(buttonCancel, buttonConfirm)

  return {
    deleteModal,
    buttonCancel,
    buttonConfirm,
    modalOverlay,
  }
}

let targetTaskIdToDelete = null

const {deleteModal, buttonCancel, buttonConfirm, modalOverlay,} = createDeleteModal('Вы действительно хотите удалить эту задачу?')
document.body.prepend(modalOverlay)
buttonCancel.addEventListener('click', () => {
  modalOverlay.classList.add('modal-overlay_hidden')
})
buttonConfirm.addEventListener('click', () => {
   const deleteIndex = tasks.findIndex((task) => task.id === targetTaskIdToDelete)
  if (deleteIndex >= 0) {
    tasks.splice(deleteIndex, 1)
    const taskItemHTML = document.querySelector(`[data-task-id="${targetTaskIdToDelete}"]`)
    taskItemHTML.remove()
    modalOverlay.classList.add('modal-overlay_hidden')
  }
})

const tasksList = document.querySelector('.tasks-list')
tasksList.addEventListener('click', (event) => {
  const { target } = event
  const closestTarget = target.closest('.task-item__delete-button')
  if (closestTarget) {
    const closestTask = closestTarget.closest('.task-item')
    if (closestTask) {
    const taskId = closestTask.dataset.taskId
    targetTaskIdToDelete = taskId
    modalOverlay.classList.remove('modal-overlay_hidden')
  }
}
})
