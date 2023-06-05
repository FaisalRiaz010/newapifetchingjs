const app = require('./app');
require('dotenv').config();


const PORT = 3000; //  port number

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})