import React from 'react';
import { StyleSheet, Text, View } from 'react-360';

// const ANIMATION_DURATION = 150;

export default class SceneTitle extends React.Component {
  // state = {
  //   rotateX: new Animated.Value(0)
  // };

  // handleTitleEnter = () => {
  //   Animated.sequence([
  //     Animated.timing(this.state.rotateX, {
  //       toValue: -20,
  //       duration: ANIMATION_DURATION
  //     }),
  //     Animated.timing(this.state.rotateX, {
  //       toValue: 20,
  //       duration: ANIMATION_DURATION
  //     }),
  //     Animated.spring(this.state.rotateX, {
  //       toValue: 0
  //     })
  //   ]).start();
  // };

  render() {
    return (
      // <Animated.View
      //   style={[styles.box, { transform: [{ rotateZ: this.state.rotateX }] }]}
      //   onEnter={this.handleTitleEnter}
      // >
      <View style={ styles.box }>
        <Text style={ styles.title }>
          { this.props.roomName }
        </Text>
      </View>
      // </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    padding: 20,
    left: 4680 / 2,
    top: 500,
    backgroundColor: '#0c193c'
  },
  title: {
    fontSize: 30,
    color: '#fff'
  }
});
