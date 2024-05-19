// файл ./frontend/script.js

// Пример запроса задач текущего пользователя на клиенте
const fetchTasks = async () => {
try {
const response = await fetch('http://localhost:3000/getTasks', {
method: 'GET',
headers: {
Authorization: `Bearer ${localStorage.getItem('token')}` // Передача токена авторизации
}
});
const data = await response.json();
console.log('Задачи текущего пользователя:', data);
// Далее обрабатываем полученные задачи на клиенте
} catch (error) {
console.error('Ошибка при получении задач:', error);
}
};

// Функция для добавления задачи на сервер
function addTask(taskName) {
fetch('http://localhost:3000/addTask', {
method: 'POST', headers: {
Authorization: `Bearer ${localStorage.getItem('token')}`
'Content-Type': 'application/json'
}, body: JSON.stringify({name: taskName})
})
.then(response => response.text())
.then(message => {
console.log(message);
loadTasks(); // После добавления задачи перезагружаем список задач
})
.catch(error => console.error('Error adding task:', error));
}

// Обработчик события отправки формы
document.getElementById('taskForm').addEventListener('submit', function (event) {
event.preventDefault(); // Предотвращаем перезагрузку страницы
const taskInput = document.getElementById('taskInput');
const taskName = taskInput.value.trim();
if (taskName !== '') {
addTask(taskName); // Вызываем функцию добавления задачи
taskInput.value = ''; // Очищаем поле ввода
}
});

// Функция для удаления задачи с сервера
function deleteTask(id) {
fetch(`http://localhost:3000/deleteTask/:${id}`, {
method: 'DELETE', headers: {
'Content-Type': 'application/json'
}, body: JSON.stringify({name: id})
})
.then(response => response.text())
.then(message => {
console.log(message);
loadTasks(); // После удаления задачи перезагружаем список задач
})
.catch(error => console.error('Error deleting task:', error));
}

// Обработчик события удаления формы
document.getElementById('deleteForm').addEventListener('submit', function (event) {
event.preventDefault(); // Предотвращаем перезагрузку страницы
const name = document.getElementById('name');
const id = name.value.trim();
if (id !== '') {
deleteTask(id); // Вызываем функцию добавления задачи
name.value = ''; // Очищаем поле ввода
}
});

// После загрузки страницы сразу загружаем задачи
fetchTasks();

// Функция для обновления задачи
function updateTask(oldName, newName) {
fetch(`http://localhost:3000/updateTask`, {
method: 'PUT', headers: {
'Content-Type': 'application/json'
}, body: JSON.stringify({ oldname: oldName, newname: newName })
})
.then(response => response.text())
.then(message => {
console.log(message);
loadTasks(); // После удаления задачи перезагружаем список задач
})
.catch(error => console.error('Error updating task:', error));
}

// Обработчик события обновления формы
document.getElementById('updateForm').addEventListener('submit', function (event) {
event.preventDefault(); // Предотвращаем перезагрузку страницы
const oldName = document.getElementById('oldName').value;

const newName = document.getElementById('newName').value;

if (oldName !== '') {
updateTask(oldName, newName); // Вызываем функцию добавления задачи
oldName.value = ''; // Очищаем поле ввода
newName.value = ''; // Очищаем поле ввода
}
});

// Функция для добавления папки на сервер
function createFolder(id) {
fetch(`http://localhost:3000/createFolder/:${id}`, {
method: 'POST', headers: {
'Content-Type': 'application/json'
}, body: JSON.stringify({name: id})
})
.then(response => response.text())
.then(message => {
console.log(message);
loadTasks(); // После удаления задачи перезагружаем список задач
})
.catch(error => console.error('Error deleting task:', error));
}

// Обработчик события добавления папки
document.getElementById('createFolderForm').addEventListener('submit', function (event) {
event.preventDefault(); // Предотвращаем перезагрузку страницы
const nameFolder = document.getElementById('nameFolder');
const id = nameFolder.value.trim();
if (id !== '') {
createFolder(id); // Вызываем функцию добавления задачи
nameFolder.value = ''; // Очищаем поле ввода
}
});

// Функция для удаления папки с сервера
function deleteFolder(id) {
fetch(`http://localhost:3000/deleteFolder/:${id}`, {
method: 'DELETE', headers: {
'Content-Type': 'application/json'
}, body: JSON.stringify({name: id})
})
.then(response => response.text())
.then(message => {
console.log(message);
loadTasks(); // После удаления задачи перезагружаем список задач
})
.catch(error => console.error('Error deleting task:', error));
}

// Обработчик события удаления папки формы
document.getElementById('deleteFolderForm').addEventListener('submit', function (event) {
event.preventDefault(); // Предотвращаем перезагрузку страницы
const deleteNameFolder = document.getElementById('deleteNameFolder');
const id = deleteNameFolder.value.trim();
if (id !== '') {
deleteFolder(id); // Вызываем функцию добавления задачи
deleteNameFolder.value = ''; // Очищаем поле ввода
}
});

// Функция для обновления папки
function updateFolder(updateFolderOldName, updateFolderNewName) {
fetch(`http://localhost:3000/updateFolder`, {
method: 'PUT', headers: {
'Content-Type': 'application/json'
}, body: JSON.stringify({ oldfoldername: updateFolderOldName, newfoldername: updateFolderNewName })
})
.then(response => response.text())
.then(message => {
console.log(message);
loadTasks(); // После удаления задачи перезагружаем список задач
})
.catch(error => console.error('Error updating task:', error));
}

// Обработчик события обновления папки формы
document.getElementById('updateFolderForm').addEventListener('submit', function (event) {
event.preventDefault(); // Предотвращаем перезагрузку страницы
const updateFolderOldName = document.getElementById('updateFolderOldName').value;

const updateFolderNewName = document.getElementById('updateFolderNewName').value;

if (updateFolderOldName !== '') {
updateFolder(updateFolderOldName, updateFolderNewName); // Вызываем функцию добавления задачи
updateFolderOldName.value = ''; // Очищаем поле ввода
updateFolderNewName.value = ''; // Очищаем поле ввода
}
});

// Функция для группировки задач по папкам
function groupingFolder(folderName, taskName) {
fetch(`http://localhost:3000/groupingFolder`, {
method: 'PUT', headers: {
'Content-Type': 'application/json'
}, body: JSON.stringify({ foldername: folderName, taskname: taskName })
})
.then(response => response.text())
.then(message => {
console.log(message);
loadTasks(); // После удаления задачи перезагружаем список задач
})
.catch(error => console.error('Error updating task:', error));
}

// Обработчик события групировки задач формы
document.getElementById('groupingFolderForm').addEventListener('submit', function (event) {
event.preventDefault(); // Предотвращаем перезагрузку страницы
const folderName = document.getElementById('folderName').value;

const taskName = document.getElementById('taskName').value;

if (taskName !== '') {
groupingFolder(folderName, taskName); // Вызываем функцию добавления задачи
folderName.value = ''; // Очищаем поле ввода
taskName.value = ''; // Очищаем поле ввода
}
});

document.addEventListener('DOMContentLoaded', () => {
// Обработка формы входа
document.getElementById('loginForm').addEventListener('submit', async (event) => {
event.preventDefault();
const username = document.getElementById('username').value;
const password = document.getElementById('password').value;
try {
const response = await fetch('http://localhost:3000/login', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({ username, password })
});
const data = await response.json();
localStorage.setItem('token', data.token); // Сохранение токена в localStorage
alert('Вы успешно вошли');
} catch (error) {
console.error('Ошибка при входе:', error);
alert('Ошибка при входе');
}
});

// Обработка формы регистрации
document.getElementById('registerForm').addEventListener('submit', async (event) => {
event.preventDefault();
const newUsername = document.getElementById('newUsername').value;
const newEmail = document.getElementById('newEmail').value;
const newPassword = document.getElementById('newPassword').value;
try {
const response = await fetch('http://localhost:3000/register', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({ username: newUsername, password: newPassword, email:newEmail })
});
alert('Пользователь успешно зарегистрирован');
} catch (error) {
console.error('Ошибка при регистрации:', error);
alert('Ошибка при регистрации');
}
});
});

document.addEventListener('DOMContentLoaded', () => {
const token = localStorage.getItem('token');
if (token) {
// Пользователь аутентифицирован, делаем что-то...
// Например, получаем данные пользователя или показываем защищенные части приложения
// Вы можете отправить запрос на /profile маршрут для получения данных о пользователе
// Или просто показать определенные элементы интерфейса, доступные только аутентифицированным пользователям
} else {
// Пользователь не аутентифицирован, показываем форму входа и/или регистрации
// Например:
document.getElementById('loginForm').style.display = 'block';
document.getElementById('registerForm').style.display = 'block';
}
});