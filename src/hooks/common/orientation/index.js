import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};
const useOrientation = () => {
  // State to hold the connection status
  const [orientation, setOrientation] = useState(
    isPortrait() ? 'PORTRAIT' : 'LANDSCAPE',
  );

  useEffect(() => {
    const callback = () => setOrientation(isPortrait() ? 'PORTRAIT' : 'LANDSCAPE');

    const handler = Dimensions.addEventListener('change', callback);

    return () => {
      handler.remove();
    };
  }, []);

  return orientation;
};

export default useOrientation;
