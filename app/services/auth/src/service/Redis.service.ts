import redis from 'redis'

export const client = redis.createClient({
  port: 6379,
  host: process.env.REDIS
})

client.on('connect', () => {
  console.log('Client connected to Redis ...')
})

client.on('error', err => {
  console.log(err.message)
})

client.on('ready', () => {
  console.log('Client connected and ready to use')
})

client.on('end', () => {
  console.log('client Disconnected from redis')
})

process.on('SIGINT', () => {
  client.quit()
})
