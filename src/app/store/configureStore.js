import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

// reducers
import App from '../appReducers';
import PartyMaster from '../modules/PartyMaster/reducers';
import deliveryChallan from '../store/DeliveryChallan/reducer';

export default function configureStore(initialState){
    const reducers = {
        App,
        PartyMaster,
        deliveryChallan
    };

    const middleware = [
        thunk
      ];

    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) 
    {
        enhancers.push(window.devToolsExtension());
    }

    const rootReducer = combineReducers({
         ...reducers
    });

    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}