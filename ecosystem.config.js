module.exports = {
  apps: [{
    name: 'nhra-website',
    script: 'index.js',
    instances: 'max', // Use all available CPU cores
    exec_mode: 'cluster', // Cluster mode for production
    env: {
      NODE_ENV: 'production',
      LOG_LEVEL: 'info'
    },
    env_production: {
      NODE_ENV: 'production',
      LOG_LEVEL: 'info'
    },
    // Memory management
    max_memory_restart: '1G',
    // Restart policy
    autorestart: true,
    // Logging
    log_file: './logs/pm2-out.log',
    out_file: './logs/pm2-out.log',
    error_file: './logs/pm2-error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    // Graceful shutdown
    kill_timeout: 5000,
    // Watch for file changes (disable in production)
    watch: false,
    // Environment variables
    env_file: '.env'
  }]
};