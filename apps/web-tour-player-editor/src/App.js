import React from 'react';
import { View, Environment, NativeModules } from 'react-360';
import { RoomButton, RoomInfo } from 'lib/components';
import AudioPlayer from 'helper/AudioPlayer';

const { VideoModule } = NativeModules;

class SceneManager extends React.Component {
  state = {
    currentSceneId: this.props.initialSceneIndex
  }

  componentDidMount() {
    this.updateScene({});
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateScene(prevState);
  }

  updateScene = prevState => {
    if (prevState.currentSceneId === this.state.currentSceneId) return;

    const textureFormat = this.getCurrentScene().roomTexture.split('.').pop();

    if (textureFormat === 'mp4' || textureFormat === 'MP4') {
      VideoModule.createPlayer('vplayer');
      VideoModule.play('vplayer', { source: { url: this.getCurrentScene().roomTexture }, loop: true });

      Environment.setBackgroundVideo('vplayer');
    } else {
      Environment.setBackgroundImage({ uri: this.getCurrentScene().roomTexture });
    }
  }

  getCurrentScene = () => this.getSceneById(this.state.currentSceneId);

  getSceneById = roomTargetIndex => this.props.roomList[roomTargetIndex];

  handleDoorClick = sceneToGo => this.setState({ currentSceneId: sceneToGo });

  render() {
    return (
      <View style={{flex: 1}}>
        <AudioPlayer currentAudio={this.getCurrentScene().roomAudio} />

        { this.getCurrentScene().roomButton && <RoomButton
          door={this.getCurrentScene().roomButton}
          sceneToGo={this.getSceneById}
          move={this.handleDoorClick}
        /> }

        { this.getCurrentScene().roomInfo && <RoomInfo info={this.getCurrentScene().roomInfo} /> }
      </View>
    );
  }
}

export default SceneManager;
