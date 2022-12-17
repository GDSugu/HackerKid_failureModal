import { useRoute } from '@react-navigation/native';
import React, {
  forwardRef, useImperativeHandle, useRef, useState,
} from 'react';
import { FormattedMessage } from 'react-intl';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';
import getCommonStyles from '../commonStyles';
import ThemeContext from '../theme';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  ...getCommonStyles(theme, utilColors, font),
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#00000096',
  },
  webViewContainer: {
    backgroundColor: utilColors.white,
    width: '95%',
    height: '85%',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  headingAndCloseBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const Recaptchav2Modal = forwardRef((props, ref) => {
  const { siteKey, domainURL } = props;
  const webViewRef = useRef(null);
  const [modalVisiblity, setModalVisiblity] = useState(false);
  const [onTokenFn, setOnTokenFn] = useState(null);
  const route = useRoute();

  // styles
  const { font, theme } = React.useContext(ThemeContext);
  const screenTheme = theme[`screen${route.name}`];
  const style = getStyles(screenTheme, theme.utilColors, font);

  const showModal = () => {
    setModalVisiblity(true);
  };

  const closeModal = () => {
    setModalVisiblity(false);
  };

  const onMessage = (e) => {
    const { nativeEvent } = e;
    const { data } = nativeEvent;
    const recaptchaVersion = 2;

    closeModal();
    onTokenFn(data, recaptchaVersion);
  };

  useImperativeHandle(ref, () => ({
    showModal,
    closeModal,
    setOnTokenFn,
  }));

  const getHTML = (sitekey) => `<html>
  <head>
  <meta content="width=width, initial-scale=1, maximum-scale=1" name="viewport"></meta>
    <script>
      var onToken = (token)=>{
        window.ReactNativeWebView.postMessage(token);
      };
    </script>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <style>
      .g-recaptcha-container {
        width:100%;
        height:90vh;
        display:flex;
        justify-content:center;
        align-items:center;
      }
    </style>
  </head>
  <body style='padding:0;margin:0'>
    <div class='g-recaptcha-container'>
      <div class="g-recaptcha" data-sitekey=${sitekey} data-callback='onToken'></div>
    </div>
  </body>
</html>`;

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisiblity}
      onRequestClose = {closeModal}
    >
      <View style={style.modalView}>
        <View style={style.webViewContainer}>
          <View style={style.headingAndCloseBtn}>
            <Text style={[style.label, style.recaptchaModalLabel]}>
              <FormattedMessage defaultMessage='Please verify to continue' description='Recaptcha Modal heading'/>
            </Text>
          </View>
          <WebView ref={webViewRef}
            javaScriptEnabled
            originWhitelist={['*']}
            source={{ html: getHTML(siteKey), baseUrl: domainURL }}
            style={{ flex: 1 }}
            onMessage={onMessage}
            renderLoading={<ActivityIndicator size="large" color="#00ff00" style={{ flex: 1 }} />}/>
        </View>
      </View>
    </Modal>
  );
});

Recaptchav2Modal.displayName = 'Recaptchav2Modal';

export default Recaptchav2Modal;
