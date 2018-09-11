import React, { Component } from "react";
import {Provider} from 'react-redux'

import TodoAPP from './Todo'

// import store from './Store'

export default ()=> {
  return (
    <Provider store = {store}>
      <TodoAPP />
    </Provider>
  )
}
