// 1. Находим элементы
const input = document.querySelector('input[type="text"]');
const addButton = document.querySelector('button');
const taskList = document.getElementById('taskList');

// 2. Загружаем задачи из localStorage
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// 3. Функция отрисовки задачи
function renderTask(taskText, isCompleted) {
    const li = document.createElement('li');
    li.textContent = taskText;

    if (isCompleted) {
        li.classList.add('completed');
    }

    // Клик по задаче - отметить выполненной
    li.addEventListener('click', function() {
        li.classList.toggle('completed');
        saveTasks();
    });

    // Кнопка удаления
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation();
        li.remove();
        saveTasks();
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// 4. Сохранение в localStorage
function saveTasks() {
    const allTasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        const taskText = li.childNodes[0].textContent.trim();
        const isCompleted = li.classList.contains('completed');
        allTasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('myTasks', JSON.stringify(allTasks));
}

// 5. Добавление задачи
function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return;

    renderTask(taskText, false);
    input.value = '';
    saveTasks();
}

// 6. Запуск при загрузке
function init() {
    tasks.forEach(task => {
        renderTask(task.text, task.completed);
    });
}

addButton.addEventListener('click', addTask);
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});

init();
