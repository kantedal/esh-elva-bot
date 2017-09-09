import * as express from 'express'
import * as bodyParser from 'body-parser'

// Create and start express app on port 5000
export const startExpressApp = (): Promise<express.Application> => {
  return new Promise<express.Application>((resolve, reject) => {
    const app = express()
      
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.listen(process.env.PORT || 5000, () => {
      console.log(`App listening on ${process.env.PORT || 5000}`)
      resolve(app)
    })

    // Routes
    app.get('/', (req, res) => {
        res.send('Hi, I am Elva.')
    })

  })
}
