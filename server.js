
import app from './src/app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[Main App Server] Running on http://localhost:${PORT}`);
  console.log('--------------------------------------------------');
  console.log('Send a GET request to http://localhost:3000/api/user-profile/{userId}');
  console.log('Example for a successful call: curl http://localhost:3000/api/user-profile/1');
  console.log('Example for a user not found: curl http://localhost:3000/api/user-profile/3');
  console.log('--------------------------------------------------');
});
