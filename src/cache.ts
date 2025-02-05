import KeyvRedis from '@keyv/redis'
import { Keyv } from 'keyv'
import { Cacheable, CacheableMemory } from 'cacheable'

const primaryCache = new Keyv({
  store: new CacheableMemory({
    ttl: 1000 * 60 * 60 * 24 * 7,
    lruSize: 5000,
  }),
})
const secondaryCache = new Keyv({
  store: new KeyvRedis(),
})

export const cache = new Cacheable({
  primary: primaryCache,
  secondary: secondaryCache,
  ttl: 1000 * 60 * 60 * 24 * 7,
})
