import React, { useRef } from 'react';
import { Image } from 'react-native';

const ImgComponent = ({
  url, fallback, style, resizeMethod, resizeMode,
}) => {
  const [img, setImg] = React.useState(fallback);
  const isPageMounted = useRef(true);

  React.useEffect(() => {
    if (url) {
      fetch(url)
        .then((res) => {
          if (isPageMounted.current) {
            if (res.status === 200) {
              setImg({
                uri: url,
              });
            }
          }
        });
    }

    return () => {
      isPageMounted.current = false;
    };
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
