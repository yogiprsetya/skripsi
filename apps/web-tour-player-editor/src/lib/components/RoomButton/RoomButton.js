import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, VrButton, asset } from 'react-360';
import screen from 'screen.config';

const CONTAINER = 200;
const HEIGHT_BTN = 60;
const WIDTH_BTN = 60;

class Door extends Component {
  handleButtonClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  createButton = (x, y) => {
    return (
      <View
        style={[{
          position: 'absolute',
          zIndex: 0,
          transform: [{
            translate: [y, x, 0]
          }]
        }]}
      >
        <VrButton
          style={ styles.button }
          onClick={ this.handleButtonClick }
        >

          <Text style={ styles.title }>
            { `${this.props.roomName}` }
          </Text>

          <Image
            source={ asset(`dynamic-icon/${this.props.icon || 'icon-1.png'}`) }
            style={ styles.image }
          />

        </VrButton>
      </View>
    )
  }

  render() {
    const { y, x } = this.props.location;
    const widthPerUnit = screen.width / 360;
    const heightPerUnit = (screen.height / 2) / 90;

    const sumbuVertical = loc => {
      const minus = 600 + (loc * heightPerUnit) - (HEIGHT_BTN);
      const plus = (loc * heightPerUnit) + 600 - (HEIGHT_BTN / 2);

      return loc < 0 ? -Math.abs(minus) : -Math.abs(plus);
    };

    const sumbuHorizontal = loc => {
      if (loc < 0) {
        return (loc + 360) * widthPerUnit - (CONTAINER / 2);
      }

      return loc * widthPerUnit - (CONTAINER / 2);
    };

    const isOverlap = sumbu => {
      if (sumbu > 0 || sumbu === 0) {
        if (sumbu * widthPerUnit < CONTAINER) {
          return true;
        }
      }

      return false;
    }

    return (
      <View>
        { this.createButton(sumbuVertical(x), sumbuHorizontal(y)) }
        { isOverlap(y) && this.createButton(sumbuVertical(x), screen.width - ((CONTAINER / 2) - (y * widthPerUnit))) }
      </View>
    );
  }
}

export default class DoorSpot extends Component {
  render() {
    const {door, sceneToGo, move} = this.props;

    const nextRoom = target => {
      move(target);
    };

    return door.map((listDoor, i) => (
      <Door
        key={i}
        onClick={() => nextRoom(listDoor.roomTargetIndex)}
        icon={listDoor.icon}
        roomName={sceneToGo(listDoor.roomTargetIndex).roomName}
        location={listDoor.buttonRotation}
      />
    ));
  }
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: CONTAINER
  },
  image: {
    width: WIDTH_BTN,
    height: HEIGHT_BTN,
    opacity: 0.9
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    width: 200,
    textAlign: 'center'
  }
});
