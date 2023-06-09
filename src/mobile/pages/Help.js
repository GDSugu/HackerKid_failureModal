import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Icon from '../common/Icons';
import ThemeContext from '../components/theme';
import { openDialer, openMail } from '../common/framework';
import CallIcon from '../../images/help-modal/call-icon.svg';
import EmailIcon from '../../images/help-modal/email-icon.svg';
import { useTimeTrack } from '../../hooks/pages/timeTrack';
// import ChatIcon from '../../images/help-modal/chat-icon.svg';
// import FAQIcon from '../../images/help-modal/faq-icon.svg';

const getStyles = (theme, font, utils) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBg,
    padding: 12,
  },
  helpMenuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.borderLight,
    padding: 16,
    marginVertical: 4,
  },
  helpMenuBtnText: {
    ...font.subtitle1,
    lineHeight: 24,
  },
  helpMenuBtnTitle: {
    color: utils.lightGrey,
  },
  helpMenuBtnContent: {
    color: utils.dark,
  },
});

const Help = ({ navigation }) => {
  const { static: { startTimeTrack, stopTimeTrack } } = useTimeTrack({ navigation });
  const { font, theme } = React.useContext(ThemeContext);
  const pageTheme = theme.screenMore;
  const style = getStyles(pageTheme, font, theme.utilColors);

  useEffect(() => {
    startTimeTrack('help');

    return () => {
      stopTimeTrack('help');
    };
  }, []);

  return <>
    <ScrollView style={style.container}>
      <TouchableOpacity onPress={() => openDialer('+918778517060')}>
        <View style={style.helpMenuBtn}>
          <View>
            <Text style={{
              ...style.helpMenuBtnText,
              ...style.helpMenuBtnTitle,
            }}>
              <FormattedMessage
                defaultMessage="Call"
                description="Call Button Title"
              />
            </Text>
            <Text style={{
              ...style.helpMenuBtnText,
              ...style.helpMenuBtnContent,
            }}>
              <FormattedMessage
                defaultMessage='+91 8778517060'
                description="Call Button Text"
              />
            </Text>
          </View>
          <Icon type='SVGFile' name={CallIcon} size={32} color={theme.utilColors.dark} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openMail('reach@hackerkid.org')}>
        <View style={style.helpMenuBtn}>
          <View>
            <Text style={{
              ...style.helpMenuBtnText,
              ...style.helpMenuBtnTitle,
            }}>
              <FormattedMessage
                defaultMessage="Email"
                description="Email Button Title"
              />
            </Text>
            <Text style={{
              ...style.helpMenuBtnText,
              ...style.helpMenuBtnContent,
            }}>
              <FormattedMessage
                defaultMessage='reach@hackerkid.org'
                description="Email Button Text"
              />
            </Text>
          </View>
          <Icon type='SVGFile' name={EmailIcon} size={32} color={theme.utilColors.dark} />
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => {}}>
        <View style={style.helpMenuBtn}>
          <View>
            <Text style={{
              ...style.helpMenuBtnText,
              ...style.helpMenuBtnContent,
            }}>
              <FormattedMessage
                defaultMessage='Open chat now'
                description="Chat Button Text"
              />
            </Text>
          </View>
          <Icon type='SVGFile' name={ChatIcon} size={32} color={theme.utilColors.dark} />
        </View>
      </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={() => {}}>
        <View style={style.helpMenuBtn}>
          <View>
            <Text style={{
              ...style.helpMenuBtnText,
              ...style.helpMenuBtnContent,
            }}>
              <FormattedMessage
                defaultMessage="FAQ"
                description="FAQ Button Text"
              />
            </Text>
          </View>
          <Icon type='SVGFile' name={FAQIcon} size={32} color={theme.utilColors.dark} />
        </View>
      </TouchableOpacity> */}
    </ScrollView>
</>;
};

export default Help;
