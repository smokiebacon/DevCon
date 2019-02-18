const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/API/auth')
const profile = require('./routes/API/profile')
const posts = require('./routes/API/posts')



const app = express();
//Database Configuration
const db = require('./config/keys').mongoURI;

//Coonect to DB
mongoose.connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log('Mongoose connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('goobye world'))
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`))