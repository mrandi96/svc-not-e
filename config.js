module.exports = {
  PORT: 3000,
  DB: 'postgres://mrtbzvxlifmxbm:ee9c34b394263b8796f580f11237954223874e8ebc505f0b1245e59c198536f5@ec2-52-2-127-5.compute-1.amazonaws.com:5432/db5l22nc94sp2',
  DB_LOCAL: 'postgres://postgres:P@ssw0rd123@localhost:5432/tritama',
  SALT_ROUND: 10,
  JWT_SECRET_KEY: 'my#1jwTSup3rS3cr3tK3y()',
  JWT_EXPIRE_TIME: '3h',
  DEBUG_MODE: false,
  PRODUCTION: false
};
