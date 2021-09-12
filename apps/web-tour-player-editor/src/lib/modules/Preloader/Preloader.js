import React from 'react';
import { StyleSheet, View, Animated, asset } from 'react-360';

export default class Preloader extends React.Component {
  state = {
    spinValue: new Animated.Value(0),
    spin: null
  }

  componentWillMount() {
    Animated.loop(
      Animated.timing(this.state.spinValue, {
        toValue: 1,
        duration: 2000
      })
    ).start();

    this.setState({
      spin: this.state.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
    });
  }

  render() {
    const loader = [];

    for (let i = 0; i < 5; i++) {
      loader.push(
        <View key={ i } style={{
          position: 'absolute',
          transform: [{ translate: [800 * i, -600, 0] }]
        }}>

          <Animated.Image
            source={ asset('circle_ramp.png') }
            style={ [styles.image, { transform: [{ rotate: this.state.spin }] }] }
          />
        </View>
      );
    }

    return (
      <View>
        { loader }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50
  }
});
