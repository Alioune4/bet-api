const express = require('express');

const gameRoutes = require('./router/matchRoutes');
const app = express();
const port = 3000;


app.use(express.json());
app.use('/match-api', gameRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
