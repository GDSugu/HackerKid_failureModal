import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Text,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import certificateImage from '../../../images/common/certificate1.png';
import authoritySignature from '../../../images/common/authority1.png';

const style = StyleSheet.create({
  certificateContainer: {
    position: 'relative',
    width: 324,
    height: 229,
    alignSelf: 'center',
    borderRadius: 12,
  },
  certificateImage: {
    flex: 1,
    borderRadius: 12,
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  authoritySignature: {
    position: 'absolute',
    top: 165,
    right: 35,
    height: 20,
    width: 45,
  },
  studentNameText: {
    position: 'absolute',
    top: 110,
    right: 28,
    fontSize: 20,
    textTransform: 'capitalize',
    fontFamily: 'Courgette-Regular',
    textAlign: 'right',
    color: '#F55151',
  },
  certificateNameText: {
    width: 200,
    textAlign: 'right',
    position: 'absolute',
    top: 138,
    right: 28,
    fontFamily: 'DM Sans-Regular',
    fontSize: 7,
    color: 'black',
    lineHeight: 11,
  },
  textBold: {
    fontWeight: '700',
    fontFamily: 'DM Sans-Regular',
    fontSize: 7,
    color: 'black',
  },
  certificateIdText: {
    position: 'absolute',
    top: 6,
    right: 10,
    fontSize: 7,
    fontFamily: 'DM Sans-Regular',
    color: 'black',
  },
});

const CertificateBuilder = ({
  viewShotRef,
  certificateId,
  certificateName,
  studentName,
  contentContainerStyle = {},
  certificateImageStyle = {},
  authoritySignatureImageStyle = {},
  certificateIdTextStyle = {},
  certificateNameTitleTextStyle = {},
  certificateNameTextStyle = {},
  studentNameTextStyle = {},
}) => <View style={{ position: 'absolute', left: '100%', borderRadius: 12 }}>
    <ViewShot
      style={[contentContainerStyle, style.certificateContainer]}
      ref={viewShotRef}
      options={{
        fileName: `${certificateId}-${new Date()}`,
        format: 'jpg',
        quality: 1.0,
      }}
    >
      <Image style={[certificateImageStyle, style.certificateImage]} source={certificateImage} />
      <Image style={[authoritySignatureImageStyle, style.authoritySignature]}
        source={authoritySignature} />
      <Text style={[certificateIdTextStyle, style.certificateIdText]}>
        <FormattedMessage defaultMessage={'ID: {certificateId}'} description='certificate id' values={{
          certificateId,
        }} />
      </Text>
      <Text style={[certificateNameTitleTextStyle, style.certificateNameText]} numberOfLines={2}>
        <FormattedMessage
          defaultMessage={'is here by awarded the certification of achievement for the successfull completion of'}
          description='certificate name pretext'
        />
        <Text style={[certificateNameTextStyle, style.textBold, { paddingLeft: 5 }]}>
          <FormattedMessage defaultMessage={'{certificateName}'} description='certificate name' values={{
            certificateName: ` ${certificateName}`,
          }} />
        </Text>
      </Text>
      <Text style={[studentNameTextStyle, style.studentNameText]}>
        <FormattedMessage defaultMessage={'{studentName}'} description='certificate student name' values={{
          studentName,
        }} />
      </Text>
    </ViewShot>
  </View>;

export default CertificateBuilder;
