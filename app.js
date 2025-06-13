if (process.env.NODE_ENV === 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const { login, createUser } = require('./controllers/users');
const usersRouter = require('./routes/users')
const projectsRouter = require('./routes/projects')
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/inputdb');

app.use(requestLogger);

app.use(cors());
app.options('*', cors());

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', auth, usersRouter);
app.use('/projects', auth, projectsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Server error'
      : message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
