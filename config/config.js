module.exports = {
    jwt: {
      jwtPrivateKey: process.env.JWT_JWTPRIVATEKEY,
    },
    AWS : {
      bucket: process.env.AWS_S3_BUCKET,
    },
    database: {
      local: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        dialectOptions: { decimalNumbers: true }
      },
      development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        dialectOptions: { decimalNumbers: true }
      },
      test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        dialectOptions: { decimalNumbers: true }
      },
      production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        dialectOptions: { decimalNumbers: true }
      }
    }    
};
