import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import countReducer from '../reducers/countReducer'
import numberReducer from '../reducers/numberReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
	countState: countReducer,
	numberState: numberReducer,
})

let store = createStore(
	reducers,
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__(),
	),
)

export default store
