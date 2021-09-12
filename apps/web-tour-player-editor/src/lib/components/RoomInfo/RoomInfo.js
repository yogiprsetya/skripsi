import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, asset, Animated } from 'react-360';
import screen from 'screen.config';

const ANIMATION_DURATION = 500;
const HEIGHT_BTN = 40;
const WIDTH_BTN = 40;

class Info extends Component {
  state = {
    infoCardOpacity: new Animated.Value(0)
  }

  handleInfo = value => {
    Animated.timing(this.state.infoCardOpacity, {
      toValue: value,
      duration: ANIMATION_DURATION
    }).start();
  }

  renderInfoIcon = () => {
    return (
      <Image
        source={ asset('info.png') }
        style={ styles.image }
        onEnter={() => this.handleInfo(1) }
      />
    );
  }

  renderInfoCard = () => {
    return (
      <Animated.View
        style={ [styles.box, { opacity: this.state.infoCardOpacity }] }
      >
        <Text style={ styles.title }>{ this.props.title }</Text>
        <Text style={ styles.info }>{ this.props.info }</Text>
      </Animated.View>
    );
  }

  render() {
    const sumbuVertical = x => {
      const minus = 600 + (x * (1200 / 90)) - (HEIGHT_BTN / 2);
      const plus = (x * (1200 / 90)) + 600 - (HEIGHT_BTN / 2);

      return x < 0 ? -Math.abs(minus) + 100 : -Math.abs(plus) + 100;
    };

    const sumbuHorizontal = y => {
      if (y < 0) {
        return ((y + 360) * (screen.width / 360)) - (WIDTH_BTN / 2);
      } else if (y * (screen.width / 360) < WIDTH_BTN) {
        return 0;
      } else {
        return (y * (screen.width / 360)) - (WIDTH_BTN / 2);
      }
    };

    return (
      <View style={{
        position: 'absolute',
        zIndex: 10,
        transform: [{
          translate: [
            sumbuHorizontal(this.props.location.y),
            sumbuVertical(this.props.location.x),
            0
          ]
        }]
      }}
        onExit={() => this.handleInfo(0) }
      >
        { this.renderInfoCard() }
        { this.renderInfoIcon() }
      </View>
    );
  }
}

export default class InfoSpot extends Component {
  render() {
    const { info } = this.props;

    return info.map((roomInfo, i) => (
      <Info
        key={i}
        title={roomInfo.title}
        info={roomInfo.info}
        location={roomInfo.buttonRotation}
      />
    ));
  }
};

const styles = StyleSheet.create({
  image: {
    width: WIDTH_BTN,
    height: HEIGHT_BTN
  },
  box: {
    padding: 5,
    paddingLeft: 30,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: 260,
    top: 73,
    left: 12,
    backgroundColor: '#2C2B2B'
  },
  title: {
    fontSize: 23,
    color: '#fff'
  },
  info: {
    fontSize: 19,
    color: '#fff'
  }
});
