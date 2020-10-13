const express = require('express');
const cookieparser = require('cookie-parser')
const route = require('./Routes/route');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json())
app.use(cookieParser())

app.use('/api', route)

app.get('/',(req, res) => {
	res.send('welcome to node');
});

app.get('/test',(req, res) => {
	var token = req.cookies['token']
	if (token) { res.send('cookie are', token) }
	else {
		res.send('cookie not set')
	}
});


app.listen(5000,() => {
	console.log('app running on port 5000')
});

