const { populate } = require("./models/User");

const express = require("express"),
    app = express(),
    dotenv = require("dotenv"),
    connectDB = require("./config/db"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    session = require("express-session"),
    User = require('./models/User'),
    Employee = require("./models/Employees"),
    port = process.env.PORT || 5000;

//load config
dotenv.config({path: './config/config.env'})

//connect the database
connectDB()

//Initialize express parser (body parser) to parse our requests to the server
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Configure passport
app.use(session({
    secret: 'yum yum yum',
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//check if app is being served as a production build
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./employee-database/build'))
}

//DASHBOARD ROUTES
app.get('/dashboard', (req, res) => {
    Employee.find({}, (err, employees) => {
        if(err){
            req.json({error: 'Cannot find employees'})
        } else {
            res.json(employees)
        }
    })
})

app.post('/new', (req, res) => {
    Employee.create(req.body, (err, newEmployee) => {
        if(err) {
            res.json({error: 'Employee was not added'})
        } else {
            res.json(newEmployee)
        }
    })
})

app.put("/update/:id", (req, res) => {
  Employee.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedEmployee) => {
    if (err) {
      res.json({ error: "Employee was not updated. Please try again" });
    } else {
      res.json(updatedEmployee);
    }
  });
});

app.delete('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, removedEmployee) => {
        if(err){
            res.json({error: 'Employee was not deleted'})
        } else {
            res.json(removedEmployee)
        }
    })
})

//AUTH ROUTES

app.post('/register', (req, res) => {
    const newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            return res.json({error: err.message})
        }
        passport.authenticate('local')(req, res, () => {
            res.json(user)
        })
        
    })
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if(err) {return next(err)}
        // console.log(err)
        if(!user) {
            res.json({error: 'Email or password incorrect'})
        } else {
            req.logIn(user, (err) => {
                if(err){
                    res.json({error: err})
                }
                res.json(user)
            })
        }
    }) (req, res, next)
})

app.get('/logout', (req, res) => {
    req.logout()
    res.json({success: 'User logged out'})
})

app.listen(port, () => console.log(`App listening on port ${port}`))