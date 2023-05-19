const mongoose= require('mongoose')
const connectDB= async()=>{
    try {
        mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('database connected')
    } catch (error) {
        console.log('database failed to connect')
    }
}
module.exports= connectDB