const express = require('express');
const mongodb = require('mongodb');
const fetch = require('node-fetch');
const URI = require('urijs');
const path = require('path');

const app = express();
const mongo = mongodb.MongoClient;
var dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-tht63.gcp.mongodb.net/data?retryWrites=true://localhost:27017/data`

mongo.connect(dbUrl, {
        useUnifiedTopology: true
    })
    .then(client => {
        const db = client.db('')
        const charactersCollection = db.collection('characters')

        // Serve static files from the React app
        app.use(express.static(path.join(__dirname, 'client/build')));



        app.get('/api/import', async (req, res) => {
            try {
                const response = await fetch(`https://api.pathofexile.com/ladders/SSF Delirium`)
                const data = await response.json()
                for (i in data.entries) {
                    var characterName = data.entries[i].character.name;
                    var accountName = data.entries[i].account.name;
                    let windowUri = new URI(`https://www.pathofexile.com/character-window/get-items?character=${characterName}&accountName=${accountName}`)
                    console.log(encodeURI(windowUri.toString()))
                    const response = await fetch(encodeURI(windowUri.toString()))
                    const items = await response.json()
                    if (items.items)
                        data.entries[i].items = items.items
                    data.entries[i]._id = data.entries[i].character.id;
                }
                charactersCollection.insertMany(data.entries)
                res.json("Success");
            } catch (error) {
                console.log(error);
            }
        });

        // api endpoint for league list
        app.get('/api/ladders', async (req, res) => {
            try {
                const response = await fetch('https://api.pathofexile.com/leagues')
                const data = await response.json()
                res.json(data);
            } catch (error) {
                console.log(error);
            }
        });

        // endpoint for ladder of a league
        app.get('/api/ladders/:ladder', async (req, res) => {
            try {
                let ladder = req.params.ladder.trim()
                const response = await fetch(`https://api.pathofexile.com/ladders/${ladder}`)
                const data = await response.json()
                res.json(data);
            } catch (error) {
                console.log(error);
            }

        })

        // endpoint for specific character information
        app.get('/api/get-items/:account/:character', async (req, res) => {
            try {
                let account = req.params.account.trim()
                let character = req.params.character.trim()
                const response = await fetch(`https://www.pathofexile.com/character-window/get-items?character=${character}&accountName=${account}`)
                const data = await response.json()
                res.json(data);
            } catch (error) {
                console.log(error);
            }
        })

        // The "catchall" handler: for any request that doesn't
        // match one above, send back React's index.html file.
        app.get('*', (req, res) => {
            console.log(req);
            res.sendFile(path.join(__dirname + '/client/build/index.html'));
        });

    })
    .catch(console.error);

const port = process.env.PORT || 6000;
app.listen(port);

console.log(`Listening on ${port}`);