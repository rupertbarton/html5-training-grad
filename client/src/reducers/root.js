import { combineReducers } from 'redux';
import AggregatedOrderBook from '../components/AggregatedOrderBook/reducer';
import Accounts from '../components/AccountAdd/reducer';
import AccountSelector from '../components/AccountAdd/reducer';


const rootReducer = combineReducers({
    AggregatedOrderBook,
    Accounts,
    AccountSelector
});
export default rootReducer;