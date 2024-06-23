const express = require('express');
const app = express();
const port = 3004;

const routes = require('./routes/favoriteRoutes')


app.use(express.json())


app.use('/favorite-api/manage', routes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
