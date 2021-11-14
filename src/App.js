import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import Routes from "./Routes";
import { Provider } from "react-redux";

// import { createStore, applyMiddleware, compose } from "redux";
// import createSagaMiddleware from "redux-saga";

// import reducer from './redux/rootReducer'
// import mySaga from './redux/rootSaga'

// // create the saga middleware
// const sagaMiddleware = createSagaMiddleware()
// // mount it on the Store
// const store = createStore(
//   reducer,
//   compose(applyMiddleware(sagaMiddleware))
// )

// // then run the saga
// sagaMiddleware.run(mySaga);

export const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      // </Provider>
    );
  }
}
export default App;
