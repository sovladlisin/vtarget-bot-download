module.exports = {
  apps : [{
    name: 'API',
    script: './app.js',
    instances: 4,
    max_memory_restart: '1G',
    env: {
      PORT : 3000,
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
