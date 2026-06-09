#!/usr/bin/env node

import app from './server/server.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`ROYMEN Backend Server running on port ${PORT}`);
});
