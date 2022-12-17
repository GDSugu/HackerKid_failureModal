import React from 'react';
import { Image } from 'react-native';

const ImgComponent = ({
  url, fallback, style, resizeMethod, resizeMode,
}) => {
  const [img, setImg] = React.useState(fallback);

  React.useEffect(() => {
    if (url) {
      fetch(url)
        .then((res) => {
          if (res.status === 200) {
            setImg({
              uri: url,
            });
          }
        });
    }
  }, []);

  return <>
    <Image
      source={img}
      defaultSource={fallback}
      style={style}
      resizeMethod={resizeMethod}
      resizeMode={resizeMode}
    />
  </>;
};

export default ImgComponent;
