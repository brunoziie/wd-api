import express from 'express';
import router from 'wd-express-fs-router';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

router('app/routes', app);

app.listen(port, () => {
  console.log(`running at http://0.0.0.0:${port}`);
});
