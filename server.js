const express = require('express');
var cors = require('cors');
var figlet = require('figlet');
var standard = require('figlet/importable-fonts/Standard.js');

const app = express();
const port = 8080;
app.use(cors());


figlet.parseFont("Standard", standard);


app.get('/', function (req, res) {
    res.send('Hello World')
  })

app.get('/art/:text', function (req, res) {
    const { text } = req.params;

    figlet.text(text, { font: "Standard" }, function (err, data) {
      if (err) {
        res.status(500).send('Something went wrong');
        console.dir(err);
        return;
      }
      res.send(`<pre>${data}</pre>`);
    });
  });

app.listen(port, () => {
  console.log(`Example app listeng on port ${port}`)
})

