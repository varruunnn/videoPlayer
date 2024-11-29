const express = require('express');
const app = express();
const cors = require('cors');
const { dbConnection } = require('./db/dbConect');
const {readdirSync} = require('fs');
const path = require('path');

require('dotenv').config()

const PORT = process.env.PORT || 8000


app.use(cors())
app.use(express.json())


readdirSync('./routes').map((route) => app.use('/api', require('./routes/' + route)))

app.use('/public', express.static(path.join(__dirname, 'public')))

const server = () => {
    dbConnection()
    app.listen(PORT, () => {
        console.log(`Server is listening to ${PORT}`)
    })
}

server()
