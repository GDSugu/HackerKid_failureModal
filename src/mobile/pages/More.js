import React, { useContext } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import ThemeContext from '../components/theme';
import Icon from '../common/Icons';

const getStyles = (theme, font, utils) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBg,
    padding: 12,
  },
  moreMenuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    shadowColor: `${utils.shadowColor2}`,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 16,
    shadowOpacity: 0,
    marginVertical: 4,
  },
  collectionBtn: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: theme.inputBorderColor,
  },
  moreMenuBtnText: {
    ...font.subtitle1,
    color: utils.dark,
  },
  collectionBtnText: {
    color: theme.textBold,
  },
});

const More = () => {
  const { font, theme } = useContext(ThemeContext);
  const pageTheme = theme.screenMore;
  const style = getStyles(pageTheme, font, theme.utilColors);

  return (
    <ScrollView style={style.container}>
      <TouchableOpacity onPress={() => {}}>
        <View style={{
          ...style.moreMenuBtn,
          ...style.collectionBtn,
        }}
          >
          <Text style={{
            ...style.moreMenuBtnText,
            ...style.collectionBtnText,
          }}>
            <FormattedMessage
              defaultMessage="Your Collections and Perks"
              description="Collections and Perks CTA"
            />
          </Text>
          <Icon type='FontAwesome5' name={'angle-right'} size={32} color={pageTheme.textBold} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <View style={style.moreMenuBtn}>
          <Text style={style.moreMenuBtnText}>
            <FormattedMessage
              defaultMessage="Doubts"
              description="Doubts CTA"
            />
          </Text>
          <Icon type='FontAwesome5' name={'angle-right'} size={32} color={theme.utilColors.dark} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <View style={style.moreMenuBtn}>
          <Text style={style.moreMenuBtnText}>
            <FormattedMessage
              defaultMessage="Logout"
              description="Logout Button"
            />
          </Text>
          <Icon type='FontAwesome5' name={'angle-right'} size={32} color={theme.utilColors.dark} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <View style={style.moreMenuBtn}>
          <Text style={style.moreMenuBtnText}>
            <FormattedMessage
              defaultMessage="Account Settings"
              description="account settings CTA"
            />
          </Text>
          <Icon type='FontAwesome5' name={'angle-right'} size={32} color={theme.utilColors.dark} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <View style={style.moreMenuBtn}>
          <Text style={style.moreMenuBtnText}>
            <FormattedMessage
              defaultMessage="Help"
              description="Help CTA"
            />
          </Text>
          <Icon type='FontAwesome5' name={'angle-right'} size={32} color={theme.utilColors.dark} />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default More;
