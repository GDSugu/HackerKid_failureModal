import React, {
  forwardRef, useImperativeHandle, useRef, useState,
} from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';

const Recaptchav3 = forwardRef((props, ref) => {
  const { siteKey, executeOptions, domainURL } = props;
  const [onTokenFn, setOnTokenFn] = useState(null);
  const webViewRef = useRef(null);

  const onMessage = (e) => {
    const { nativeEvent } = e;
    const { data } = nativeEvent;
    const recaptchaVersion = 3;

    onTokenFn(data, recaptchaVersion);
  };

  const generateNewToken = () => {
    webViewRef.current.injectJavaScript(`window.grecaptcha.execute('${siteKey}', ${executeOptions}).then((token)=>{
      window.ReactNativeWebView.postMessage(token);
    })`);
  };

  useImperativeHandle(ref, () => ({
    generateNewToken,
    setOnTokenFn,
  }));

  const getHTML = (sitekey) => `<html>
    <head>
    <meta content="width=width, initial-scale=1, maximum-scale=1" name="viewport"></meta>
    <script src="https://www.google.com/recaptcha/api.js?render=${sitekey}"></script>
    </head>
  </html>`;

  return (
        <View style={{ flex: 0.00001, width: 0, height: 0 }}>
        <WebView
            ref={webViewRef}
            javaScriptEnabled
            originWhitelist={['*']}
            source={{ html: getHTML(siteKey), baseUrl: domainURL }}
            style={{ flex: 1 }}
            onMessage={onMessage} />
        </View>
  );
});

Recaptchav3.displayName = 'Recaptchav3';

export default Recaptchav3;
