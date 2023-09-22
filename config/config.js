const mongoose = require("mongoose");

const secret_key = "asdfghjklqwertyuiop";

var smtp = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'sunilchoudhary729795@gmail.com',
        pass: 'bavnsdfpedidsxhd'
    }
};


const connectDB = async () => {
    try {
        const uri = 'mongodb://127.0.0.1:27017/myServer'
        return mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.log("Database not connected Error:", error);
    }
};


module.exports = { secret_key, connectDB, smtp };