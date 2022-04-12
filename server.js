const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 5000;
const path = require('path')
const { Client } = require('pg')
const client = new Client({
    host: process.env.HOST || "localhost",
    user: process.env.USER || "floodmapping",
    port: 5432,
    password: process.env.PASSWORD || "floodmapping",
    database: process.env.DATABASE || "floodmapping"
})
client.connect()
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/new_need', (req, res) => {
    const need = req.body;
    console.log(need)
    let insertQuery = `insert into public."needs"(phone_number, full_name, lat, long, type, description ) 
    values('${need.phone_number}', '${need.full_name}', '${need.location[0]}', '${need.location[1]}', '${need.type}', '${need.description}')`
    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful')
        }
        else {
            console.log(err.message)
        }
    })
    client.end;
})

app.post('/new_resource', (req, res) => {
    const need = req.body;
    console.log(need)
    let insertQuery = `insert into public."resources"(phone_number, full_name, lat, long, type, description ) 
                       values('${need.phone_number}', '${need.full_name}', '${need.location[0]}', '${need.location[1]}', '${need.type}', '${need.description}')`
    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful')
        }
        else {
            console.log(err.message)
        }
    })
    client.end;
})

app.get('/resources', (req, res) => {
    client.query(`Select * from public."resources"`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/needs', (req, res) => {
    client.query(`Select * from public."needs"`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

if (process.env.NODE_ENV !== "production") {
    app.use(express.static('build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}
app.listen(port, () => `Server running on port ${port}`);