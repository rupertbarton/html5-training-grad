import { combineReducers } from 'redux';
import AggregatedOrderBook from '../components/AggregatedOrderBook/reducer';
import AccountAdd from '../components/AccountAdd/reducer';


const rootReducer = combineReducers({
    AggregatedOrderBook,
    AccountAdd
});
export default rootReducer;