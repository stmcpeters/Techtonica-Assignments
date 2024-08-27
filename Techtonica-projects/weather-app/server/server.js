// importing and using express
import express from 'express';
const app = express();
// import body parser
import bodyParser from 'body-parser';
// import cors middleware
import cors from 'cors';
// import dotenv to hide and access .env files
import dotenv from 'dotenv';

// initialize body parser to use - makes data more readable
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// use cors middleware
app.use(cors());
// use .env variables 
dotenv.config();

// setting port to display
const PORT = process.env.DB_PORT || 8080;

// checking get connection
app.get('/', (req, res) => {
  res.send('hello from the server');
  res.end();
})

// city variable
const city = 'San Francisco';

// fetching weather API
app.get('/weather', async (req, res) => {
  try {
    // setting variable for weather API link
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
    // fetching weather data from API
    const response = await fetch(url);
    // handles http errors
    if(!response.ok) {
      console.error(`Receiving HTTP error status: ${response.status}`);
    }
    
    const data = await response.json();
    res.send(data);

  } catch (error) {
    console.error('There was an error fetching weather data: ', error);
  }
})

// server set up
app.listen(PORT, () => {
  console.log(`Server started on port: http://localhost:${PORT}`);
})