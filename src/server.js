import dotenv from 'dotenv'
import server from './app'

dotenv.config({})

server.listen(process.env.PORT || 3030)
