import { combineReducers } from 'redux';
import AggregatedOrderBook from './components/AggregatedOrderBook/reducer';
import AccountOrderBook from './components/AccountOrderBook/reducer';
import Accounts from './components/AccountAdd/reducer';
import AccountSelector from './components/AccountSelector/reducer';
import NewOrderForm from './components/NewOrderForm/reducer';


const rootReducer = combineReducers({
    AggregatedOrderBook,
    Accounts,
    AccountSelector,
    AccountOrderBook,
    NewOrderForm
});
export default rootReducer;