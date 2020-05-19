import {combineReducers} from 'redux';
import ListReunionsReducer from './ListReunionsReducer';

const rootReducer = combineReducers({
    ListReunions:ListReunionsReducer
});

export default rootReducer;