var jwt = require('jsonwebtoken');
// const cookieparser = require('cookie-parser')

const secret_key = 'DSFDJGKDFNGJDF';
const timeout = '1h';

var user = {
    username : 'arifmaniyar0',
    password : '123456'
}

exports.login = function (req, res) {
    const payload = req.body;
    // console.log([user,payload])
    try {
        if(user.username === payload.username && user.password === payload.password) {
            // console.log('token')
            const token = jwt.sign({
                data: payload.username
              }, secret_key, { expiresIn: '1h' });

            if(token) {
                res.cookie('token',token,{maxAge:86400, httpOnly: true});
                res.status(200).json({ token : token, userid : payload.username, expired : '1h' })
            }            
        }
        else {
            res.status(500).send('Invalid credential')
        }
    }
    catch(err) {
        console.log('err',err)

        res.status(400).send();
    }
}

exports.verify = function (req, res, next) {
    // var token = req.headers.token;
    var token = req.cookies['token'];
    try {
        var payload = jwt.verify(token, secret_key);
        next();
    }
    catch(err) {
        res.status(400).send('you are not authorized')
    }

} 