import React, { useContext, useState } from 'react';
import {
  Alert,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormattedMessage, useIntl } from 'react-intl';
import ThemeContext from '../components/theme';

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBg,
  },
});

const More = ({ navigation }) => {
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenMore;
  const style = getStyles(pageTheme);
  const intl = useIntl();

  const [authtoken, setAuthToken] = useState(null);

  AsyncStorage.getItem('authtoken')
    .then(setAuthToken);

  const handleAuthTokenChange = (token) => {
    AsyncStorage.setItem('authtoken', token)
      .then(() => {
        setAuthToken(token);
      })
      .catch(console.error);
  };

  return (
    <ScrollView style={style.container}>
      <View style={{ marginVertical: 250 }}>
        <Text style={{
          textAlign: 'center',
          ...font.heading1,
        }}>
          <FormattedMessage
            defaultMessage="This is more options page"
            description="More options Page"
          />
        </Text>
        <TextInput
          style={{ borderWidth: 2, marginBottom: 10, marginTop: 20 }}
          placeholder='authtoken'
          value={authtoken}
          onChangeText={(value) => handleAuthTokenChange(value)}
        />
        <Button
          title={intl.formatMessage({
            defaultMessage: 'store authtoken',
            description: 'authtoken temp storage btn',
          })}
          onPress={() => {
            AsyncStorage.setItem('authtoken', authtoken)
              .then(() => {
                ToastAndroid.show('authtoken set', ToastAndroid.SHORT);
              })
              .catch((error) => {
                Alert.alert('Authtoken Error', error);
              });
          }}
          color={pageTheme.btnBg}
        />
      </View>
      <Button
        onPress={() => navigation.navigate('EditProfile')}
        title={intl.formatMessage({
          defaultMessage: 'Go to Profile',
          description: 'Link description',
        })}
        color={pageTheme.btnBg}
      />
      <Button
        onPress={() => navigation.navigate('TurtleHome')}
        title={intl.formatMessage({
          defaultMessage: 'Go to Turtle Home',
          description: 'Link description',
        })}
        color={pageTheme.btnBg}
      />
      <Button
        onPress={() => navigation.navigate('Home')}
        title={intl.formatMessage({
          defaultMessage: 'Go to Home',
          description: 'Home Navigation Button',
        })}
        color={pageTheme.btnBg}
      />
    </ScrollView>
  );
};

export default More;
