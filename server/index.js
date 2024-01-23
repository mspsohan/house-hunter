// External Import
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

// Internal Imports
const connectDB = require('./src/config/db');
const { notFound, errorHandler } = require('./src/middleware/errorMiddleware');


const app = express()
app.use(express.json())
app.use(morgan('dev'));
dotenv.config()
app.use(cors({
   origin: ["http://localhost:5173"],
   optionsSuccessStatus: 200,
}))

app.get("/", (req, res) => {
   res.send("Api is Running")
})

// app.use('/api/user', userRoutes)
// app.use('/api/chat', chatRoutes)
// app.use("/api/message", messageRoutes);


// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);



const main = () => {
   connectDB()
   app.listen(process.env.PORT, () => {
      console.log(`Server running on port: ${process.env.PORT}`)
   })
}

main()