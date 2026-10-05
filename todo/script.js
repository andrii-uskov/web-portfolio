// 1. Находим элементы на странице
const input = document.querySelector('input[type="text"]'); // Поле ввода
const addButton = document.querySelector('button'); // Кнопка Add
const taskList = document.getElementById('taskList'); // Список задач

// 2. Загружаем сохраненные задачи из памяти браузера
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// 3. Функция для отрисовки одной задачи
function renderTask(taskText, isCompleted) {
    const li = document.createElement('li');
    li.textContent = taskText;

    // Если задача выполнена, добавляем класс
    if (isCompleted) {
        li.classList.add('completed');
    }

    // Клик по задаче = отметить выполненной
    li.addEventListener('click', function() {
        li.classList.toggle('completed');
        saveTasks(); // Сохраняем изменения
    });

    // Кнопка удаления
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Чтобы клик по кнопке не отмечал задачу выполненной
        li.remove();
        saveTasks(); // Сохраняем изменения
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// 4. Функция сохранения всех задач в localStorage
function saveTasks() {
    const allTasks = [];
    // Проходимся по всем задачам в списке
    document.querySelectorAll('#taskList li').forEach(li => {
        // Берем текст задачи (игнорируем текст кнопки Delete)
        const taskText = li.childNodes[0].textContent.trim();
        const isCompleted = li.classList.contains('completed');
        allTasks.push({ text: taskText, completed: isCompleted });
    });
    // Сохраняем в память браузера
    localStorage.setItem('myTasks', JSON.stringify(allTasks));
}

// 5. Функция добавления новой задачи
function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return; // Если пусто — ничего не делаем

    renderTask(taskText, false); // Рисуем задачу
    input.value = ''; // Очищаем поле ввода
    saveTasks(); // Сохраняем
}

// 6. Запуск при загрузке страницы
function init() {
    // Восстанавливаем задачи, которые были сохранены ранее
    tasks.forEach(task => {
        renderTask(task.text, task.completed);
    });
}

// Навешиваем события
addButton.addEventListener('click', addTask);
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask(); // Добавление по нажатию Enter
});

// Запускаем
init();
