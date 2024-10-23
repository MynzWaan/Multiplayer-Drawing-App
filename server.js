const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

// Serve the public folder where your HTML and assets are stored
app.use(express.static('public'));

app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/public/index.html'); // Ensure this points to your index.html file

  // try this instead
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for drawing events from clients
  socket.on('drawing', (data) => {
    // Broadcast the drawing data to all other connected clients
    socket.broadcast.emit('drawing', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server on port 3000
http.listen(3000, () => {
  console.log('Server is running on port 3000');
});

