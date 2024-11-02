const express = require('express'); // imp Express
const app = express();
const http = require('http').Server(app); // Brings in HTTP  -> set up server to help with express
const io = require('socket.io')(http);
const path = require('path'); //specifies location of html file (preventing cross-platforms problems)

// Serve the 'public' folder 
app.use(express.static('public'));

// When user visits URL, respond
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Check if someone joins the app
io.on('connection', (socket) => {
  console.log('A user has connected');

  // Listen for drawing events 
  socket.on('drawing', (data) => {
    // Broadcast the drawing data to all other connected players
    socket.broadcast.emit('drawing', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user has disconnected');
  });
});

// Start the server on port 3000
http.listen(3000, () => {
  console.log('Server is running on port 3000');
});

