import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button, Slider, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Axios from 'axios';

const ModalAddRoomButton = ({isOpen, classes, onClose, listRoom}) => {
  const [vertical, setVertical] = useState(0);
  const [horizontal, setHorizontal] = useState(0);
  const [roomTargetIndex, setRoomTargetIndex] = useState(0);
  const { tour, roomIndex } = useParams();

  const handleVerticalChange = (event, value) => setVertical(value);
  const handleHorizontalChange = (event, value) => setHorizontal(value);

  const createRoomButton = e => {
    e.preventDefault();

    const data = {
      roomTargetIndex,
      buttonRotation: {
        x: vertical,
        y: horizontal,
        z: 0
      }
    };

    Axios.put(`${process.env.REACT_APP_API_SERVER}project/room/${tour}/${roomIndex}`, data)
      .then(() => window.location.reload())
      .catch(err => console.log(err))
  };

  return (
    <Modal open={isOpen} onClose={ onClose }>
      <div className={classes.paper}>
        <h2>Add Button to Next Room</h2>

        <form>
          <label id="room">Room destination</label>

          <select
            labelId="room"
            style={{ width: '100%' }}
            onChange={ e => setRoomTargetIndex(e.target.value) }
          >
            { listRoom.map((item, i) => (
              <option key={i} value={i}>{item.roomName}</option>
            )) }
          </select>

          <div className="mt-3 flex align-center">
            <p style={{width: 120}}>Vertical Position:</p>

            <Slider
              aria-labelledby="continuous-slider"
              valueLabelDisplay="on"
              min={-90}
              max={90}
              value={vertical}
              onChange={handleVerticalChange}
            />
          </div>

          <div className="mt-3 flex align-center">
            <p style={{width: 120}}>Horizontal Position:</p>

            <Slider
              aria-labelledby="continuous-slider"
              valueLabelDisplay="on"
              min={-180}
              max={180}
              value={horizontal}
              onChange={handleHorizontalChange}
            />
          </div>

          <Box display="flex" justifyContent="flex-end" style={{marginTop: 30}}>
            <Button
              onClick={createRoomButton}
              variant="contained"
              color="primary"
              endIcon={ <AddIcon /> }
            >
              Add
            </Button>
          </Box>
        </form>
      </div>
    </Modal>
  );
}

export default ModalAddRoomButton;
