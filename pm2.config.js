module.exports = {
  apps: [
    {
      name: 'server',
      script: './dist/index.js',
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
      // to calculate the max memory per process
      // max_memory_restart: '100M',
      // 4 instances
      instances: 4,
      // cluster mode to load balance between each instances
      exec_mode: 'cluster',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,
    },
  ],
};
