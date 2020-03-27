const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/ladders', (req, res) =>  { 
    fetch('https://api.pathofexile.com/leagues')
    .then(response => {
      response.json().then(json => {
        res.json(json)
      })
    })
    .catch(error => {
      console.log(error)
    })
});

app.get('/api/ladders/:ladder', (req, res) => {
    let ladder = req.params.ladder.trim()
    console.log(ladder);
    fetch(`https://api.pathofexile.com/ladders/${ladder}`)
    .then(response => {
        response.json().then(json => {
            res.json(json)
        })
    })
    .catch(error => {
        console.log(error)
    })
})

app.get('/api/get-items/:account/:character', (req, res) => {
    let account = req.params.account.trim()
    let character = req.params.character.trim()
    fetch(`https://www.pathofexile.com/character-window/get-items?character=${character}&accountName=${account}`)
    .then(response => {
        response.json().then(json => {
            res.json(json)
        })
    })
    .catch(error => {
        console.log(error)
    })
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 6000;
app.listen(port);

console.log(`Listening on ${port}`);
