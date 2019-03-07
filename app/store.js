import { applyMiddleware, createStore } from "redux"
import { createLogger } from 'redux-logger'

import reducer from "./reducers"

var middleware = applyMiddleware()

export default createStore(reducer, middleware)
