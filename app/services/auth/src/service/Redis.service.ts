import Redis from 'ioredis'
import { config } from '../config'

export const RedisService = new Redis(config.REDIS)

RedisService.on('connect', () => {
  console.log('RedisService connected to Redis ...')
})

RedisService.on('error', err => {
  console.log('RedisService Error', err.message)
})

RedisService.on('end', () => {
  console.log('RedisService Disconnected from redis')
})
