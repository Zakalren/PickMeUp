const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pickmeup', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection.on('error', console.error);
mongoose.connection.on('open', () => {
    console.log('Connected to mongodb server');
});