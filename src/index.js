const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes  = require('./routes/user')
const hourRouters = require('./routes/hours')
const projectRouters = require('./routes/project')
const phasesRouter = require('./routes/phase')

const app = express();
const port = 3000 

const dbUrl =  'mongodb://127.0.0.1:27017/siac';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexión exitosa a la base de datos');
}).catch((error) => {
  console.log('Error de conexión a la base de datos: ', error);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes)
app.use('/api', hourRouters)
app.use('/api', projectRouters)
app.use('/api', phasesRouter)

app.listen(port, () => {
  console.log('Server started on port' , port);
});