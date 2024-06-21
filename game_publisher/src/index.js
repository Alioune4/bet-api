const express = require('express');
const redis = require('redis');
const {Game} = require('./../../shared/models/game')

const gameRoutes = require('./router/matchRoutes');
const app = express();
const port = 3000;


app.use(express.json());
app.use('/match-api', gameRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
