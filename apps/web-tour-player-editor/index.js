import React from 'react';
import { AppRegistry, NativeModules } from 'react-360';
import axios from 'axios';
import SceneManager from 'App';
import { Preloader } from 'lib/modules';

const url = new URLSearchParams(NativeModules.Location.search);

export default class App extends React.Component {
  state = {
    roomList: null,
    loaded: false
  };

  componentDidMount() {
    axios.get(url.get('host'))
      .then(res => {
        this.setState({
          roomList: res.data.roomList,
          loaded: true
        });
      })
  }

  content() {
    return (
      <SceneManager
        roomList={ this.state.roomList }
        initialSceneIndex={ url.get('i') || 0 }
      />
    );
  }

  render() {
    return this.state.loaded ? this.content() : <Preloader/>;
  }
}

AppRegistry.registerComponent('App', () => App);
