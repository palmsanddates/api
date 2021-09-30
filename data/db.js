const mongoose = require('mongoose')

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URI,
            err => {
                if(err) throw err;
                console.log('connected to MongoDB')
            });
    } catch (err) {
        console.log('Failed to connect to MongoDB', err)
    }
}

module.exports = connectDB