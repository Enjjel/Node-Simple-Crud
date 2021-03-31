const mongoose = require('mongoose')


const db_connection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('Connection Success');

    } catch (error) {
        console.log(error);
        throw new Error('There is a connection problem with the database')
    }
}

module.exports = {
    db_connection
}