import { NativeModules } from 'react-360';
import { connect } from 'store';

const { AudioModule } = NativeModules;

const APlayer = ({ currentAudio, dataConfig }) => {
  currentAudio && currentAudio.forEach(element => {
    AudioModule.playEnvironmental({
      source: ({
        uri: `${dataConfig.projectDir}/audios/${element.url}`
      }),
      volume: element.volume / 100
    });
  });

  return null;
};

const AudioPlayer = connect(APlayer);

export default AudioPlayer;
