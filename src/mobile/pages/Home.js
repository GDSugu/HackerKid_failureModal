import React, { useContext, useState } from 'react';
import {
  Alert,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from '../components/theme';

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBg,
  },
});

const Index = ({ navigation }) => {
  const { font, theme, toggleTheme } = useContext(ThemeContext);
  const pageTheme = theme.screenHome;
  const style = getStyles(pageTheme);

  const intl = useIntl();

  const [authtoken, setAuthToken] = useState(null);

  AsyncStorage.getItem('authtoken')
    .then(setAuthToken);

  return (
    <ScrollView style={style.container}>

      <View style={{ marginVertical: 250 }}>
        <Text style={{
          textAlign: 'center',
          ...font.heading1,
        }}>
          <FormattedMessage
            description = "Page description"
            defaultMessage = "This is Home page"
          />
        </Text>
        <TextInput
          style={{ borderWidth: 2, marginBottom: 10, marginTop: 20 }}
          placeholder='authtoken'
          value={authtoken}
          onChangeText={setAuthToken} />
        <Button
          title={intl.formatMessage({
            defaultMessage: 'store authtoken',
            description: 'authtoken temp storage btn',
          })}
          onPress={() => {
            AsyncStorage.setItem('authtoken', authtoken)
              .then((response) => {
                ToastAndroid.show('authtoken set', ToastAndroid.SHORT);
                console.log('response ', response);
              })
              .catch((error) => {
                Alert.alert('Authtoken Error', error);
              });
          }}
          color={pageTheme.btnBg}
        />
      </View>

      <Button
        onPress={() => navigation.navigate('Games')}
        title={intl.formatMessage({
          defaultMessage: 'Go to Games',
          description: 'Link description',
        })}
        color={pageTheme.btnBg}
      />
      <Button
        onPress={() => navigation.navigate('EditProfile')}
        title={intl.formatMessage({
          defaultMessage: 'Go to Profile',
          description: 'Link description',
        })}
        color={pageTheme.btnBg}
      />
      <Button
        onPress={() => toggleTheme()}
        title={intl.formatMessage({
          defaultMessage: 'Toggle Theme',
          description: 'Toggle theme Button description',
        })}
        color={pageTheme.btnBg}
      />
    </ScrollView>
  );
};

export default Index;
