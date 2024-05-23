// файл ./frontend/script.js

// Пример запроса задач текущего пользователя на клиенте
function loadTasks() {
  fetch('https://shelter-6.onrender.com/getTasks')
    .then(response => response.json())
    .then(tasks => {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name;
        taskList.appendChild(li);
      });
    })
    .catch(error => console.error('Error fetching tasks:', error));
}

function loadFolder() {
  fetch('https://shelter-6.onrender.com/getFolder')
    .then(response => response.json())
    .then(tasks => {
      const taskList = document.getElementById('folderList');
      taskList.innerHTML = '';
      tasks.forEach(tasks => {
        const li= document.createElement('li');
        li.textContent = tasks.foldername;
        taskList.appendChild(li);
      });
    })
    .catch(error => console.error('Error fetching tasks:', error));
}
loadFolder();
// Функция для добавления задачи на сервер
function addTask(taskName) {
  fetch('https://shelter-6.onrender.com/addTask', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({name: taskName})
  })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      loadTasks(); // После добавления задачи перезагружаем список задач
	  loadFolder();
    })
    .catch(error => console.error('Error adding task:', error));
}
loadTasks();
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
  fetch(`https://shelter-6.onrender.com/deleteTask/:${id}`, {
    method: 'DELETE', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({name: id})
  })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      loadTasks(); // После удаления задачи перезагружаем список задач
	  loadFolder();
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

// Функция для обновления задачи
function updateTask(oldName, newName) {
  fetch(`https://shelter-6.onrender.com/updateTask`, {
    method: 'PUT', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({ oldname: oldName, newname: newName })
  })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      loadTasks(); // После удаления задачи перезагружаем список задач
	  loadFolder();
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
function createFolder(foldername) {
  fetch(`https://shelter-6.onrender.com/createFolder/:${foldername}`, {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({name: foldername})
  })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      loadTasks(); // После удаления задачи перезагружаем список задач
	  loadFolder();
    })
    .catch(error => console.error('Error deleting task:', error));
}

// Обработчик события добавления папки
document.getElementById('createFolderForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Предотвращаем перезагрузку страницы
  const nameFolder = document.getElementById('nameFolder');
   const foldername = nameFolder.value.trim();
  if (foldername !== '') {
    createFolder(foldername); // Вызываем функцию добавления задачи
    nameFolder.value = ''; // Очищаем поле ввода
  }
});


// Функция для удаления папки с сервера
function deleteFolder(foldername) {
  fetch(`https://shelter-6.onrender.com/deleteFolder/:${foldername}`, {
    method: 'DELETE', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({name: foldername})
  })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      loadTasks(); // После удаления задачи перезагружаем список задач
	  loadFolder();
    })
    .catch(error => console.error('Error deleting task:', error));
}

// Обработчик события удаления папки формы
document.getElementById('deleteFolderForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Предотвращаем перезагрузку страницы
  const deleteNameFolder = document.getElementById('deleteNameFolder');
   const foldername = deleteNameFolder.value.trim();
  if (foldername !== '') {
    deleteFolder(foldername); // Вызываем функцию добавления задачи
    deleteNameFolder.value = ''; // Очищаем поле ввода
  }
});

// Функция для обновления папки
function updateFolder(updateFolderOldName, updateFolderNewName) {
  fetch(`https://shelter-6.onrender.com/updateFolder`, {
    method: 'PUT', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({ oldfoldername: updateFolderOldName, newfoldername:  updateFolderNewName })
  })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      loadTasks(); // После удаления задачи перезагружаем список задач
	  loadFolder();
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
  fetch(`https://shelter-6.onrender.com/groupingFolder`, {
    method: 'PUT', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({ foldername: folderName, taskname: taskName })
  })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      loadTasks(); // После удаления задачи перезагружаем список задач
	  loadFolder();
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
      const response = await fetch('https://shelter-6.onrender.com', {
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
      const response = await fetch('https://shelter-6.onrender.com', {
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