const { Domain } = require ('domain');
let express = require('express');
const fs = require ('fs');
const path = require ('path'); 
let app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()); 
app.use(express.raw());


app.get('/api/profiles', (req, res) => {
    fs.readFile("models/profiles.json", 'utf-8', function (err, data){
        res.send(data);

    });
   
})

app.get ('/api/profiles/:id', (req, res) => {
    fs.readFile("models/profiles.json", 'utf-8', function (err, data){
        res.setHeader('Content-Type', 'application/json');
        let profiles = JSON.parse(data);
        let profile = profiles["profile" + req.params.id];
        if (profile) {
            console.log(profile);
            res.end(JSON.stringify(profile));
        }
        else {
            res.status(404).send('Profile Not Found')
        };

    });
});
 



app.put('/api/profiles', (req, res) =>{

    let text = JSON.stringify(req.body);
    fs.appendFile("file.txt", text, (err, data) => {
        if(err) {return "Cannot write " + data};
    })
    res.send("Well done, you did it!")
    });




const server = app.listen(3000, function () {
 console.log('Node server is running http://localhost:3000 ...');
});
