const config = {
  redis: {
    host: '',
    port: 0,
  },
  db: {
    username: '',
    password: '',
    database: '',
    options: {
      host: '',
      port: 4005,
      dialect: 'mysql',
      dialectOptions: {
        charset: 'utf8mb4',
        supportBigNumbers: true,
      },
      define: {
        charset: 'utf8mb4',
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      timezone: '+08:00',
    },
  },
};

export default config;
