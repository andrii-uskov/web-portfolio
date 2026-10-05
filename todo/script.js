// 1. Получаем элементы
const input = document.getElementById('taskInput'); // Проверь ID в HTML
const taskList = document.getElementById('taskList'); // Проверь ID в HTML
const addButton = document.getElementById('addButton'); // Если кнопка "Добавлять" имеет ID

// 2. Загружаем задачи из localStorage при старте
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// 3. Функция отрисовки одной задачи
function renderTask(taskText, isCompleted = false) {
    const li = document.createElement('li');
    li.textContent = taskText;
    
    // Если задача выполнена, добавляем класс
    if (isCompleted) {
        li.classList.add('completed');
    }

    // Обработчик клика (отметка о выполнении)
    li.addEventListener('click', function() {
        li.classList.toggle('completed');
        updateLocalStorage(); // Обновляем данные в хранилище
    });

    // Кнопка удаления
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Чтобы клик по кнопке не засчитывался как клик по задаче
        li.remove();
        updateLocalStorage(); // Обновляем данные после удаления
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// 4. Функция обновления localStorage
function updateLocalStorage() {
    // Собираем все текущие задачи из DOM
    const allTasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        // Находим текст задачи (без текста кнопки)
        const taskText = li.childNodes[0].textContent.trim(); 
        const isCompleted = li.classList.contains('completed');
        allTasks.push({ text: taskText, completed: isCompleted });
    });
    // Сохраняем массив в виде строки JSON
    localStorage.setItem('myTasks', JSON.stringify(allTasks));
}

// 5. Функция добавления новой задачи
function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return; // Не добавляем пустые задачи

    renderTask(taskText); // Рисуем задачу на странице
    input.value = ''; // Очищаем поле ввода
    updateLocalStorage(); // Сохраняем
}

// 6. Инициализация (запуск при загрузке страницы)
function init() {
    // Восстанавливаем задачи из памяти
    tasks.forEach(task => {
        renderTask(task.text, task.completed);
    });
}

// Навешиваем событие на кнопку
addButton.addEventListener('click', addTask);

// Запускаем инициализацию
init();
