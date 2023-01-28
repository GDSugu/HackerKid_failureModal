import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  StyleSheet, View, TouchableOpacity, Text, Dimensions, KeyboardAvoidingView,
} from 'react-native';
import { usePagination } from '../../../hooks/pages/pagination';
import ThemeContext from '../theme';
import PrevBtnSvg from '../../../images/common/pagination-previous-icon.svg';
import NextBtnSvg from '../../../images/common/pagination-next-icon.svg';

const windowWidth = Dimensions.get('window').width;

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  paginator: {
    width: windowWidth,
    height: 50,
    backgroundColor: theme.bg1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: theme.borderColor,
  },
  pageBtn: {
    flex: 1,
  },
  pageBtnText: {
    color: theme.textColor1,
    ...font.subtitle1,
  },
  pageBtnActiveText: {
    color: theme.textBold,
  },
  prevBtnIcon: {
    color: theme.btnBg,
  },
  nextBtnIcon: {
    color: theme.btnBg,
  },
  paginationBtnDisabled: {
    color: utilColors.lightGrey,
  },
});

const Paginator = ({
  currentPageNumber, totalItems, countPerPage, initialWindow = 5,
  onPageChange, onNextBtnPress, onPrevBtnPress,
  styleNextBtn = false, stylePrevBtn = false, styleActiveBtn = false,
}) => {
  const pageNumbersArr = usePagination(totalItems, countPerPage, currentPageNumber, initialWindow);

  // styles
  const { theme, font } = useContext(ThemeContext);
  const pageTheme = theme.screenAllChallenges;
  const style = getStyles(pageTheme, theme.utilColors, font);

  //
  const initialPageNumber = 1;
  const maximumPageNumber = Math.ceil(totalItems / countPerPage);

  return <KeyboardAvoidingView>
    <View style={style.paginator}>
      <TouchableOpacity
        style={[style.prevBtn, style.pageBtn]}
        onPress={onPrevBtnPress}
        disabled={currentPageNumber === initialPageNumber}
      >
        <PrevBtnSvg style={currentPageNumber === initialPageNumber
          ? [stylePrevBtn || style.prevBtnIcon, style.paginationBtnDisabled]
          : stylePrevBtn || style.prevBtnIcon} />
      </TouchableOpacity>
      {
        pageNumbersArr && pageNumbersArr.map((pageNumber, idx) => (pageNumber ? <TouchableOpacity
            key={idx} onPress={() => onPageChange(pageNumber)} style={style.pageBtn}>
            <Text style={currentPageNumber === pageNumber
              ? [style.pageBtnText, styleActiveBtn || style.pageBtnActiveText]
              : style.pageBtnText}>
                <FormattedMessage
                  defaultMessage={'{pageNumber}'}
                  description='page button'
                  values={{
                    pageNumber,
                  }}
                />
              </Text>
            </TouchableOpacity>
          : <TouchableOpacity key={`null-btn${idx}`} disabled={true} style={style.pageBtn}>
              <Text style={style.pageBtnText}>...</Text>
          </TouchableOpacity>))
      }
      <TouchableOpacity
        style={[style.nextBtn, style.page]}
        onPress={onNextBtnPress}
        disabled={currentPageNumber === maximumPageNumber}
      >
        <NextBtnSvg style={currentPageNumber === maximumPageNumber
          ? [styleNextBtn || style.nextBtnIcon, style.paginationBtnDisabled]
          : styleNextBtn || style.nextBtnIcon} />
      </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>;
};

export default Paginator;
