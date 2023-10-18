const express = require('express')
const cors = require('cors')
const axios = require('axios')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express()
const http = require('http')
const https = require('https')
app.use(cors())
const port = 3001

app.get('/api/leagues', async (req, result) => {
	//	fetch('https://api.pathofexile.com/leagues')
        //.then(res => res.json())
        //.then((data) => {
        //    res.send(data)
        //})
        //.catch(res.send(res)http://54.90.246.11/)
	//try {
	//	const settings = { method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json', } };
	//	console.log(await fetch('https://api.pathofexile.com/leagues'))
	//	const apiResponse = await fetch('https://api.pathofexile.com/leagues', settings)
	//	console.log(apiResponse)
	//	const apiResponseJson = await apiResponse.json()
	//	res.send()
	//} catch (err) {
	//	console.log(err)
	//	res.status(500).send('something happened :(')
	//}
	//axios.get('https://api.pathofexile.com/leagues')
	//	.then(data => res.json(data))
	//	.catch(err => console.log(err))
	const options = {host: 'api.pathofexile.com', path: '/leagues'}
	var body = []
	var req = await http.get(options, (res) => {
		var bodyChunks = []
		res.on('data', (chunk) => {
			bodyChunks.push(chunk)
		}).on('end', () => {
			body = Buffer.concat(bodyChunks)
			console.log('BODY: ' + body)
			result.send(body)
		})
	})
})

app.get('/api/character-window', async (req, result) => {
    	accountName = req.query.accountName
    	characterName = req.query.character
    	console.log(accountName)
    	console.log(characterName)
//    fetch(`https://www.pathofexile.com/character-window/get-items?accountName=${accountName}&character=${characterName}`, { headers: { 'Accept': 'application/json' } })
//        .then(res => res.json())
 //       .then((data) => {
//            res.send(data)
//        })
//        .catch(console.log)
	const options = {host: 'pathofexile.com', path: `/character-window/get-items?accountName=${accountName}&character=${characterName}`}
	var body = []
	var req = await http.get(options, (res) => {
		var bodyChunks = []
		res.on('data', (chunk) => {
			bodyChunks.push(chunk)
		}).on('end', () => {
			body = Buffer.concat(bodyChunks)
			console.log('BODY: ' + body)
			result.send(body)
		})
	})
})

app.get('/api/ladders/:id', async (req, result) => {
    	ladder = req.params.id
    	type = 'league'
    	limit = '200'
    //fetch(`https://api.pathofexile.com/ladders/${ladder}?type=${type}&limit=${limit}`)
    //    .then(res => res.json())
    //    .then((data) => {
    //        res.send(data)
     //   })
      //  .catch(console.log)
	const options = {host: 'api.pathofexile.com', path: `/ladders/${ladder}?type=${type}&limit=${limit}`}
	var body = []
	var req = await http.get(options, (res) => {
		var bodyChunks = []
		res.on('data', (chunk) => {
			bodyChunks.push(chunk)
		}).on('end', () => {
			body = Buffer.concat(bodyChunks)
			console.log('BODY: ' + body)
			result.send(body)
		})
	})
})

app.listen(port, () => {
    console.log(`listening on port${port}`)
})
