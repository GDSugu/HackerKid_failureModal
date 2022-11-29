import React, { useEffect, useState } from 'react';
import { Skeleton } from '@rneui/base';
import { Image, StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
  certificateImage: {
    flex: 1,
    borderRadius: 12,
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

const CertificateImageComponent = ({
  viewShotRef,
  contentContainerStyle = {},
  imageStyle = {},
  certificateId,
  certificateName,
  studentName,
}) => {
  const [imageDataUri, setImageDataUri] = useState(false);

  useEffect(() => {
    if (certificateId && certificateName && studentName) {
      viewShotRef.current.capture().then((uri) => {
        console.log(uri);
        setImageDataUri(uri);
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [certificateId, certificateName, studentName]);

  return <>
    {
      imageDataUri && <View style={contentContainerStyle}>
        <Image
          source={{ uri: imageDataUri }}
          style={[style.certificateImage, imageStyle]} />
      </View>
    }
    {
      !imageDataUri && <Skeleton style={contentContainerStyle} />
    }
  </>;
};

export default CertificateImageComponent;
