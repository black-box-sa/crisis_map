const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 5000;
const path = require('path')
const { Client } = require('pg')
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
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

app.post('/new_assist', (req, res) => {
    const need = req.body;
    console.log(need)
    let insertQuery = `insert into public."assists"(need_id, phone_number, full_name ) 
    values('${need.need_id}', '${need.phone_number}', '${need.full_name}')`
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

app.get('/assists/:id', (req, res)=>{
    client.query(`Select * from public."assists" where need_id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
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

app.get('/assists', (req, res) => {
    client.query(`SELECT DISTINCT need_id FROM public."assists"`, (err, result) => {
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

if (process.env.NODE_ENV === "production") {
    app.use(express.static('build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}
app.listen(port, () => `Server running on port ${port}`);