require('dotenv').config({ override: true });
require('dns').setServers(['8.8.8.8', '8.8.4.4']);
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
