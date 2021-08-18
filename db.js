import mongoose from 'mongoose'
import config from './config'

mongoose.connect(config.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection.on('error', console.error);
mongoose.connection.on('open', () => {
    console.log('Connected to mongodb server');
});