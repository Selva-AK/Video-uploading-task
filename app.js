const express = require('express')
const app = express()
const path = require('path')
const multer = require('multer')
const mysql = require('mysql')
const alert = require('alert')
const session = require('express-session')
const { error } = require('console')
const { addAbortListener } = require('events')

app.use(session({
    secret: 'secret-message',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60543 * 1000 }
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Selva_Novalnet'
})

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage })

const userAuth = (req, res, next) => {
    if (req.session.email) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(__dirname))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    sql = "SELECT * FROM Create_table"
    con.query(sql, (err, result) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log(result);
            res.render(__dirname + '/view/home.ejs', { item: result })
        }
    })

})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/view/login.html')

})

app.post('/loginprocess', (req, res) => {
    password = req.body.password
    email = req.body.email

    con.query("SELECT * FROM Admin_login WHERE Password = ?", [password], (err, result) => {
        if (err) {
            alert("Wrong username or Password !")
            res.redirect("/login")
        }
        else {
            console.log(result[0].Email)
            console.log(result[0].Password)
            req.session.email = result[0].Email
            if (email == result[0].Email && password == result[0].Password) {
                // req.session.user = {'username' : username, 'password' : password, loggedIn : true}
                res.redirect('/dashboard')
            }
            else {
                alert("Wrong username or Password !")
                res.redirect("/login")
            }
        }

        res.end()
    })
})

app.get('/customize', userAuth, (req, res) => {
    res.render(__dirname + '/view/customize.ejs',)
})

app.post('/dbaction', (req, res) => {
    console.log(req.body)
    sql = "INSERT INTO Create_table VALUES (?,?,?,?,?)"
    con.query(sql, [[req.body.fields], [req.body.Mandatory], [req.body.name], [req.body.id], [req.body.placeholder]], (err, result) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log(result)
            alert("Row Added Sucessfully!")
            res.redirect('/customize')
        }
    })
})

app.get('/table', userAuth, (req, res) => {
    sql = "SELECT * FROM Create_table;"
    con.query(sql, (err, result) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log(result);
            res.render(__dirname + '/view/custable.ejs', { item: result })
        }
    })
})


app.post('/upload', upload.single('video'), (req, res) => {
    console.log(req.file.originalname)
    // con.query("INSERT INTO user_profile (video) VALUES (?)",req.file.originalname,(err,result) => {
    //     if(err) console.error(err);
    //     else console.log(result);
    // })
    // console.log(req.body)
    keyArray = []
    valArray = []
    Object.keys(req.body).forEach(key => {
        keyArray.push(key)
        valArray.push(req.body[key])
        console.log(key, req.body[key]);
    })
    console.log(keyArray, valArray)
    const placeholders = Array(valArray.length).fill('?').join(', ');
    const sql = `INSERT INTO user_profile (${keyArray},video) VALUES (${placeholders},?)`;

    con.query(sql, [...valArray, req.file.originalname], (err, result) => {
        if (err) console.error(err);
        else {
            console.log(result);
            alert("Sucessfully Uploaded")
            res.redirect('/')
        }
    })

})

app.use('/result', userAuth, (req, res) => {
    // res.writeHead(200,{'Content-Type':'text/html'})
    sql = "SELECT * FROM user_profile"
    con.query(sql, (err, result) => {
        if (err) console.error(err)
        else
            res.render(__dirname + '/view/view', { data: result });
    })
})

app.get('/delete', userAuth, (req, res) => {
    id = req.query.id
    sql = "DELETE FROM Create_table WHERE id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err)
        }
        else {
            res.redirect('/table')
        }
    })
})

app.get('/play', userAuth, (req, res) => {
    id = req.query.id
    sql = "SELECT video FROM user_profile WHERE ID=?"
    con.query(sql, [id], (err, result) => {
        if (err) console.error(err)
        const file = result[0].video
        console.log(file);
        res.render(__dirname + '/view/play', { file });
    })
})

app.get('/download', userAuth, (req, res) => {
    id = req.query.id
    sql = "SELECT video FROM user_profile WHERE ID=?"
    con.query(sql, [id], (err, result) => {
        if (err) console.error(err)
        const file = result[0].video
        console.log(file);
        const vidPath = path.join(__dirname + '/uploads/');
        const filePath = path.join(vidPath, file);
        res.download(filePath, file)
    })
})

app.get('/delresult', (req, res) => {
    console.log(req.query.id)
    con.query("DELETE FROM user_profile WHERE ID = ?", [req.query.id], (err, result) => {
        if (err) console.error(err)
        else {
            console.log(result)
            res.redirect('/result')
        }
    })
})

app.get('/uptresult', (req, res) => {
    sql = "SELECT * FROM Create_table"
    con.query(sql, (err, result) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log(result)
            console.log(req.query.id)
            con.query("SELECT * FROM user_profile WHERE ID = ?", [req.query.id], (err, result1) => {
                if (err) console.error(err)
                else {
                    console.log(result1);
                    res.render(__dirname + '/view/home1', { result, result1 })
                }
            })
        }
    })
})

app.post('/update', upload.single('video'), (req, res) => {
    const email = req.body.email;

    Object.keys(req.body).forEach(key => {
        if (key !== 'email') {
            console.log(key, req.body[key]);

            const sql = `UPDATE user_profile SET ${key} = ? WHERE email = ?`;

            con.query(sql, [req.body[key], email], (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(result);
                }
            });
        }
    })
    alert("Sucessfully updated")
    res.redirect('/')
})

app.get('/dashboard', userAuth, (req, res) => {
    res.render(__dirname + '/view/dashboard.ejs')
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) console.error(err);
        else {
            alert("Sucessfully logout")
            res.redirect('/')
        }
    })
})

app.listen(3000, (err) => {
    if (err) console.error(err)
    console.log("Server running on http://localhost:3000")
    // console.log(__dirname)
})