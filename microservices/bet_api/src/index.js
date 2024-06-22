const express = require('express');
const routes = require('./routes/betRoutes');
const app = express();
const port = 3000;


app.use(express.json())


app.use('/bet-api', routes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
