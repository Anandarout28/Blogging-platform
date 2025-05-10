import { app } from './app.js';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
 // Correct file name // Use import instead of require

dotenv.config({
    path: './.env',
});

app.get('/', (req, res) => {
    res.send('Hello from server');
});

connectDB()
    .then(() => {
      
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT || 8000}`);
        });
    })
    .catch((err) => {
        console.log('MONGO db connection failed !!! ', err);
    });