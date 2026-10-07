// 1. Находим элементы на странице
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// 2. Переменные для хранения состояния калькулятора
let currentInput = '0';      // То, что сейчас на экране
let previousInput = '';      // Предыдущее число
let operator = null;         // Текущая операция (+, -, *, /)
let shouldResetDisplay = false; // Нужно ли очистить экран перед вводом нового числа

// 3. Функция обновления экрана
function updateDisplay() {
    display.textContent = currentInput;
}

// 4. Функция вычисления результата
function calculate() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;

    let result = 0;
    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': 
            if (current === 0) {
                result = 'Ошибка'; // Деление на ноль
            } else {
                result = prev / current;
            }
            break;
        default: return;
    }

    // Округляем до 10 знаков после запятой, чтобы избежать багов с плавающей точкой
    currentInput = String(Math.round(result * 10000000000) / 10000000000);
    operator = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

// 5. Обработка нажатий на кнопки
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;   // Цифры и точка
        const action = button.dataset.action; // Действия (clear, delete, calculate, операторы)

        // Если нажата цифра или точка
        if (value !== undefined) {
            if (currentInput === '0' || shouldResetDisplay) {
                currentInput = value;
                shouldResetDisplay = false;
            } else {
                currentInput += value;
            }
            updateDisplay();
        }

        // Если нажато действие
        if (action !== undefined) {
            switch (action) {
                case 'clear':
                    currentInput = '0';
                    previousInput = '';
                    operator = null;
                    shouldResetDisplay = false;
                    updateDisplay();
                    break;
                    
                case 'delete':
                    if (currentInput.length === 1) {
                        currentInput = '0';
                    } else {
                        currentInput = currentInput.slice(0, -1);
                    }
                    updateDisplay();
                    break;
                    
                case 'calculate':
                    calculate();
                    break;
                    
                // Операторы: +, -, *, /
                case '+':
                case '-':
                case '*':
                case '/':
                    if (operator !== null && !shouldResetDisplay) {
                        calculate(); // Если уже была операция, считаем её
                    }
                    previousInput = currentInput;
                    operator = action;
                    shouldResetDisplay = true;
                    break;
            }
        }
    });
});

// 6. Инициализация
updateDisplay();
