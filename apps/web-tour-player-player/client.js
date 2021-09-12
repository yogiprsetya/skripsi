import { ReactInstance, Surface } from 'react-360-web';
import MetaTag from 'lib/modules/MetaTag/MetaTag';
import screen from 'screen.config';

function init(bundle, parent, options = {}) {
  r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    nativeModules: [
      new MetaTag()
    ],
    ...options
  });

  const cylinderSurface = new Surface(
    screen.width,
    screen.height,
    Surface.SurfaceShape.Cylinder
  );

  cylinderSurface.setDensity(screen.width);

  r360.renderToSurface(
    r360.createRoot('App'),
    cylinderSurface
  );

  r360.compositor.createVideoPlayer('vplayer').setMuted(false);
}

window.React360 = { init };
