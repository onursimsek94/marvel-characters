import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'

const loggerMiddleware = createLogger()
const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
)

export { store }
