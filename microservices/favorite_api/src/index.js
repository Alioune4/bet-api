const express = require('express');
const app = express();
const port = 3000;

const routes = require('./routes/favoriteRoutes')


app.use(express.json())


app.use('/favorite_api/manage', routes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
