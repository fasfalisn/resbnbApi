const express = require('express');
// const bodyParser = require('body-parser');
// const con = require('./db/db-connection');
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();
dotenv.config();
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());
// app.use(compression());


const usersRoutes = require('./routes/users.route');
// const guestsRoutes = require('./routes/guests.route');
const hostsRoutes = require('./routes/hosts.route');
const housesRoutes = require('./routes/houses.route');
const itemsRoutes = require('./routes/items.route');
const offersRoutes = require('./routes/offers.route');
const ordersRoutes = require('./routes/orders.route');
const reservationsRoutes = require('./routes/reservations.route');
const househasoffersRoutes = require('./routes/househasoffers.route');
const userhasoffersRoutes = require('./routes/userhasoffers.route');
const usermessagesRoutes = require('./routes/usermessages.route');
const userrateshouseRoutes = require('./routes/userrateshouse.route');


// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
// app.use(bodyParser.json()); // application/json

app.use('/api/users', usersRoutes);
// app.use('/api/guests', guestsRoutes);
app.use('/api/hosts', hostsRoutes);
app.use('/api/houses', housesRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/house-has-offers', househasoffersRoutes);
app.use('/api/user-has-offers', userhasoffersRoutes);
app.use('/api/user-messages', usermessagesRoutes);
app.use('/api/user-rates-house', userrateshouseRoutes);

app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => 
    console.log(`Server running on port 3000`));

module.exports = app;