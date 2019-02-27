import { combineReducers } from 'redux';
import { reducer as example } from './ducks/example';
import { reducer as aggregatedOrderBook } from '../components/AggregatedOrderBook/reducer';

const rootReducer = combineReducers({
    aggregatedOrderBook,
     example
});
export default rootReducer;