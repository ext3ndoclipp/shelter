// файл ./config/index.js
const fs = require('fs');

const config = {
	db: {
    mysql : {
      host: 'db-mysql-fra1-51752-do-user-9208055-0.c.db.ondigitalocean.com',
      user: 'user28', // замените на своего пользователя
      database: 'db28', // можете заменить 'appdb' на свое название базы данных
      password: 'AVNS_uqN9nza1dP6NpHIUSk6', // замените это на пароль от своего пользователя
      port: 25060, // порт базы данных
			ssl: {
			  ca: fs.readFileSync('C:\\Users\\nikit\\OneDrive\\Рабочий стол\\Новая папка\\shelter\\backend\\config\\ca-certificate-test.crt'), // Путь к файлу ca.crt
			}
    },
  }, 
  port: 3000 // порт на котором будет запущен сервер приложения
 
};

module.exports =  config;