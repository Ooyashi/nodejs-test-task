require('dotenv').config();

let express = require('express');
const bodyParser = require('body-parser');
let app = express();
const port = process.env.PORT;

const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./src/routes/userRoutes');
const roomRouter = require('./src/routes/roomRoutes');

const mongoString = process.env.CONNECTION_STRING;

mongoose.connect(mongoString);

const database = mongoose.connection;

mongoose.set('runValidators', true);

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

let corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/user', userRouter);
app.use('/room', roomRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
