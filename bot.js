const WebSocket = require('ws');
const axios = require('axios');

// Replace these with your values:
const USER_TOKEN = 'ODg3NjU3NjAxOTY4NTM3NjUx.GdouPK.yVZhVlaC8N_bz0rOimfSoNg-obmS7cmwk1jgRA'; // User token
const CHANNEL_ID = '1307125289314422824'; // Target channel ID
const COOLDOWN_TIME = 5000; // Cooldown in milliseconds

let cooldowns = new Set();

// Connect to Discord Gateway
const ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');

ws.on('open', () => {
  console.log('Connecting to Discord...');
  ws.send(
    JSON.stringify({
      op: 2, // Identify opcode
      d: {
        token: USER_TOKEN,
        properties: {
          $os: 'linux',
          $browser: 'my_library',
          $device: 'my_library',
        },
      },
    })
  );
});

ws.on('message', async (data) => {
  const payload = JSON.parse(data);
  const { t, op, d } = payload;

  if (op === 10) {
    // Handle the hello event
    const heartbeatInterval = d.heartbeat_interval;
    setInterval((
