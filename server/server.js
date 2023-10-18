const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const port = 3001

app.get('/leagues', (req, res) => {
    fetch('https://api.pathofexile.com/leagues')
        .then(res => res.json())
        .then((data) => {
            res.send(data)
        })
        .catch(console.log)
})

app.get('/character-window', (req, res) => {
    accountName = req.query.accountName
    characterName = req.query.character
    console.log(accountName)
    console.log(characterName)
    fetch(`https://www.pathofexile.com/character-window/get-items?accountName=${accountName}&character=${characterName}`, { headers: { 'Accept': 'application/json' } })
        .then(res => res.json())
        .then((data) => {
            res.send(data)
        })
        .catch(console.log)
})

app.get('/ladders/:id', (req, res) => {
    ladder = req.params.id
    type = 'league'
    limit = '200'
    fetch(`https://api.pathofexile.com/ladders/${ladder}?type=${type}&limit=${limit}`)
        .then(res => res.json())
        .then((data) => {
            res.send(data)
        })
        .catch(console.log)
})

app.listen(port, () => {
    console.log(`listening on port${port}`)
})