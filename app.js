const express = require('express');
const cors = require('cors'); 
const app = express();
const bodyParser = require('body-parser');
const route=require('./route/userRoute')

app.use(cors()); 

app.use(bodyParser.json());
app.use('/',route)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
