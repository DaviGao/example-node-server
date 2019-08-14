module.exports = {
  apps: [
    {
      name: 'server:dev',
      script: './dist/index.js',
      watch: false,
      env: {
        NODE_ENV: 'development',
        // Allows to display all possible debug logs
        // 'DEBUG': '*'
      },
      // one instance
      exec_mode: 'fork',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,
    },
  ],
};
