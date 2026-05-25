import 'dotenv/config';
import { app } from './app.js';
import { connectDB } from './src/DB/Database.js';

const PORT = process.env.PORT || 3000;

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})