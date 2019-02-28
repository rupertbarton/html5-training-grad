import { combineReducers } from 'redux';
import { reducer as example } from './ducks/example';
import AggregatedOrderBook from '../components/AggregatedOrderBook/reducer';

const rootReducer = combineReducers({
    AggregatedOrderBook,
     example
});
export default rootReducer;