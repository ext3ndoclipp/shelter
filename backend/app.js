// файл ./app.js
const express = require('express');
const mysql = require('mysql');
const config = require('./config');

const cors = require('cors');

const app = express();
//const port = config.port;
const port = config.port;

const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend')))
app.use(express.json());

app.use(cors());
app.get('/healthcheck', (req, res) => res.sendStatus(200));

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

// Регистрация пользователя
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);
    // Сохранение пользователя в базе данных
    dbConnection.query(
      `INSERT INTO users (username, password) VALUES ('${username}', '${hashedPassword}')`,
      (err, result) => {
        if (err) {
          console.error('Ошибка выполнения запроса: ' + err.stack);
          res.status(500).send('Ошибка сервера');
          return;
        }
        console.log('Пользователь успешно зарегистрирован');
        res.status(201).send('Пользователь успешно зарегистрирован');
      }
    );
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    res.status(500).send('Ошибка сервера');
  }
});

// Вход пользователя
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Поиск пользователя в базе данных
    dbConnection.query(
      `SELECT * FROM users WHERE username = '${username}'`,
      async (err, results) => {
        if (err) {
          console.error('Ошибка выполнения запроса: ' + err.stack);
          res.status(500).send('Ошибка сервера');
          return;
        }
        if (results.length === 0) {
          res.status(401).send('Неверные учетные данные');
          return;
        }
        const user = results[0];
        // Проверка пароля
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          res.status(401).send('Неверные учетные данные');
          return;
        }
        // Генерация JWT токена
        const token = jwt.sign({ username: user.username }, config.jwtSecret);
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    console.error('Ошибка при входе пользователя:', error);
    res.status(500).send('Ошибка сервера');
  }
});

// Проверка аутентификации с использованием JWT
app.get('/profile', (req, res) => {
  // Получение токена из заголовка Authorization
  const token = req.headers.authorization.split(' ')[1];
  try {
    // Проверка токена
    const decoded = jwt.verify(token, config.jwtSecret);
    res.status(200).json({ username: decoded.username });
  } catch (error) {
    console.error('Ошибка при проверке токена:', error);
    res.status(401).send('Неверный токен');
  }
});


app.get('/createTable', (req, res) =>{
	const id = req.params.id;

pool.query(`CREATE TABLE tasks (id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL)`, id, (error, result) => {
        if (error) throw error;

        res.send(result);
   });
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

// Пример маршрута Express
app.get('/getFolder', (req, res) => {
  // Пример запроса к базе данных
  dbConnection.query('SELECT (foldername) FROM tasks', (err, results) => {
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

app.delete('/deleteTask/:id', (req, res) => {

 console.log('req.body: ', req.body);
 const id = req.body.name;

const sqlQuery = `DELETE FROM tasks WHERE name = '${id}'`;

 // Выполнение SQL-запроса к базе данных
  dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ' + err.stack);
      res.status(500).send('Ошибка сервера');
      return;
    }
    console.log('Запись успешно удалена из tasks');
    res.send('Запись успешно удалена из tasks');
  });
});

//обновление задачи    
app.put('/updateTask', (req, res) => {

 console.log('req.body: ', req.body);
 const oldname = req.body.oldname;
 const newname  = req.body.newname;

const sqlQuery = `UPDATE tasks SET name = '${newname}' WHERE name = '${oldname}'`;

 // Выполнение SQL-запроса к базе данных
  dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ' + err.stack);
      res.status(500).send('Ошибка сервера');
      return;
    }
    console.log('Запись успешно обновлена в tasks');
    res.send('Запись успешно обновлена в tasks');
  });
});
 
// добавление папки
app.post('/createFolder/:foldername', (req, res) => {
  // Получение имени задачи из тела запроса
  console.log('req.body: ', req.body);
  const folderName = req.body.name;

  // Проверка наличия имени задачи в теле запроса
  if (!folderName) {
    res.status(400).send('Не указано имя папки');
    return;
  }

  // SQL-запрос для добавления записи с указанным именем в таблицу tasks
  const sqlQuery = `INSERT INTO tasks (foldername) VALUES ('${folderName}')`;

  // Выполнение SQL-запроса к базе данных
  dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ' + err.stack);
      res.status(500).send('Ошибка сервера');
      return;
    }
    console.log('Папка успешно добавлена в таблицу tasks');
    res.send('Папка успешно добавлена в таблицу tasks');
  });
});

//удаление папки
app.delete('/deleteFolder/:foldername', (req, res) => {

 console.log('req.body: ', req.body);
 const foldername = req.body.name;

const sqlQuery = `DELETE FROM tasks WHERE foldername = '${foldername}'`;

 // Выполнение SQL-запроса к базе данных
  dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ' + err.stack);
      res.status(500).send('Ошибка сервера');
      return;
    }
    console.log('Запись успешно удалена из tasks');
    res.send('Запись успешно удалена из tasks');
  });
});


//обновление папки   
app.put('/updateFolder', (req, res) => {

 console.log('req.body: ', req.body);
 const oldfoldername = req.body.oldfoldername;
 const newfoldername  = req.body.newfoldername;

const sqlQuery = `UPDATE tasks SET foldername = '${newfoldername}' WHERE foldername = '${oldfoldername}'`;

 // Выполнение SQL-запроса к базе данных
  dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ' + err.stack);
      res.status(500).send('Ошибка сервера');
      return;
    }
    console.log('Запись успешно обновлена в tasks');
    res.send('Запись успешно обновлена в tasks');
  });
});
 
//группировка по папкам
app.put('/groupingFolder', (req, res) => {

 console.log('req.body: ', req.body);
 const folderName = req.body.foldername;
 const taskName  = req.body.taskname;

const sqlQuery = `UPDATE tasks SET foldername = '${folderName}' WHERE name = '${taskName}'`;

 // Выполнение SQL-запроса к базе данных
  dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ' + err.stack);
      res.status(500).send('Ошибка сервера');
      return;
    }
    console.log('Запись успешно сгруппирована в tasks');
    res.send('Запись успешно сгруппирована в tasks');
  });
});

app.listen(10000, () => {
  console.log('Server is running on port 10000');
});