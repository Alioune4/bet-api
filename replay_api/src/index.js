const express = require('express');

const replayRoutes = require('./router/replayRoutes');
const app = express();
const port = 3002;

app.use(express.json());
app.use('/replay-api', replayRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
