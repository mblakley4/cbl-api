module.exports = {
  PORT: process.env.PORT || 4050,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://michaelblakley@localhost/craft-brew-locker',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000/',
}
