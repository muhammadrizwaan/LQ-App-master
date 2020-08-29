import React from 'react'
import Navigation from './src/Navigation/Navigation'
import configureStore from './src/store/configureStore'
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux'

import NetInfo from "@react-native-community/netinfo";

import { showMessage, hideMessage } from "react-native-flash-message";


const store = configureStore()


class App extends React.Component {
  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      // console.warn("Connection type", state.type);
      // console.warn("Is connected?", state.isConnected);

      if (!state.isConnected) {
        showMessage({
          message: "No Internet Connection!",
          type: "danger",
          position: 'top',
          icon: 'auto',
          autoHide: false,
          hideOnPress: false
        });
      } else {
        hideMessage()
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    return (
      <Provider store={store}>
        <Navigation />
        <FlashMessage position="top" />
      </Provider>
    )
  }
}

export default App