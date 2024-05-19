// файл ./app.js
const express = require('express');
const mysql = require('mysql');
const config = require('./config');

const app = express();
const port = config.port;

app.use(express.json());

// Конфигурация подключения к базе данных
const dbConnection = mysql.createConnection(config.db.mysql);

// Подключение к базе данных
dbConnection.connect((err) => {
if (err) {
console.error('Ошибка подключения к базе данных: ' + err.stack);
return;
}
console.log('Подключение к базе данных успешно установлено');
});

// Пример маршрута Express
app.get('/getTasks', (req, res) => {
// Пример запроса к базе данных
dbConnection.query('SELECT * FROM tasks', (err, results) => {
if (err) {
console.error('Ошибка выполнения запроса: ' + err.stack);
res.status(500).send('Ошибка сервера');
return;
}
console.log('Результаты запроса:', results);
res.json(results);
});
});

// Пример маршрута Express для добавления записи в таблицу tasks с указанным именем
app.post('/addTask', (req, res) => {
// Получение имени задачи из тела запроса
console.log('req.body: ', req.body);
const taskName = req.body.name;

// Проверка наличия имени задачи в теле запроса
if (!taskName) {
res.status(400).send('Не указано имя задачи');
return;
}

// SQL-запрос для добавления записи с указанным именем в таблицу tasks
const sqlQuery = `INSERT INTO tasks (name) VALUES ('${taskName}')`;

// Выполнение SQL-запроса к базе данных
dbConnection.query(sqlQuery, (err, result) => {
if (err) {
console.error('Ошибка выполнения запроса: ' + err.stack);
res.status(500).send('Ошибка сервера');
return;
}
console.log('Запись успешно добавлена в таблицу tasks');
res.send('Запись успешно добавлена в таблицу tasks');
});
});

app.get('/createTable', (req, res) =>{
const id = req.params.id;

pool.query('CREATE TABLE tasks (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL);', id, (error, result) => {
if (error) throw error;

res.send(result);
});
});

app.get('/task/:id', (req, res) => {
const id = req.params.id;

pool.query('SELECT * FROM task WHERE id = ?', id, (error, result) => {
if (error) throw error;

res.send(result);
});
});

app.post('/tasks', (req, res) => {
pool.query('INSERT INTO task SET ?', req.body, (error, result) => {
if (error) throw error;

res.status(201).send(`TASK added with ID: ${result.insertId}`);
});
});

app.put('/users/:id', (req, res) => {
const id = req.params.id;
pool.query('UPDATE tasks SET ? WHERE id = ?', [req.body, id], (error, result) => {
if (error) throw error;
res.send('Task updated successfully.');
});
})

app.delete('/deleteTask/:id', (re=, res=) => {
const id = req.params.id;

pool.query('DELETE FROM tasks WHERE id = ?', id, (error, result) => {
if (error) throw error;

res.send('Task deleted.');
});
});

// Запуск сервера
app.listen(port, () => {
console.log(`Сервер запущен на порту ${port}`);
});