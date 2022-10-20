import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { FormattedMessage } from 'react-intl';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions,
} from 'react-native';
import { useDeleteChallenge, useUpdateChallengeStateOnly } from '../../../hooks/pages/challenges';
import { AuthContext } from '../../../hooks/pages/root';
import ThemeContext from '../theme';

const ToastModal = ({
  style, toastModalOpen, toastMessage, onToastHide,
}) => {
  const deviceHeight = Dimensions.get('window').height;

  const [state, setState] = useState({
    toastY: new Animated.Value(-deviceHeight),
    toastOpen: false,
  });

  useEffect(() => {
    if (toastModalOpen) {
      setTimeout(() => {
        setState((prev) => ({ ...prev, toastOpen: true }));
      }, 500);
    }
  }, [toastModalOpen]);

  const {
    toastY,
    toastOpen,
  } = state;

  useEffect(() => {
    if (toastOpen) {
      Animated.timing(toastY, {
        duration: 500,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else if (!toastOpen) {
      Animated.timing(toastY, {
        duration: 100,
        toValue: -deviceHeight,
        useNativeDriver: true,
      }).start(() => {
        onToastHide();
      });
    }
  }, [state.toastOpen]);

  return <>
    {
      toastModalOpen && <View style={style.toastModal}>
      <Animated.View style={[style.toastModalBody, {
        transform: [
          { translateY: toastY },
        ],
      }]}>
        <Text style={style.toastMessage}>
          <FormattedMessage defaultMessage={'{toastMessage}'} description='toast message' values={{ toastMessage }}/>
        </Text>
          <TouchableOpacity
            style={style.dismissToastBtn}
            onPress={() => setState((prev) => ({ ...prev, toastOpen: false }))}>
          <Text style={style.dismissToastBtnText}>
            <FormattedMessage defaultMessage={'Dismiss'} description='dismiss modal button'/>
          </Text>
        </TouchableOpacity>
    </Animated.View>
    </View>
    }
  </>;
};
const getStyles = (theme, utilColors, font) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBg,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  btnGroup: {
    marginTop: 20,
  },
  secondaryBtn: {
    borderRadius: 15,
    backgroundColor: utilColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row',
    marginBottom: 10,
  },
  disbabledSecondaryBtn: {
    opacity: 0.5,
  },
  dangerBtn: {
    borderRadius: 15,
    backgroundColor: utilColors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row',
    marginBottom: 10,
  },
  disabledDangerBtn: {
    opacity: 0.5,
  },
  dangerBtnText: {
    ...font.subtitle1,
    color: utilColors.white,
    justifyContent: 'center',
  },
  secondaryBtnText: {
    ...font.subtitle1,
    color: theme.textBold,
    justifyContent: 'center',
  },
  challengeCardItem: {
    marginTop: 15,
  },
  challengeCardTitle: {
    ...font.heading6,
    color: theme.textColor1,
    marginBottom: 10,
  },
  challengeCardImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  toastModal: {
    zIndex: 999,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: utilColors.darkTransparent50,
    justifyContent: 'flex-start',
  },
  toastModalBody: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: utilColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastMessage: {
    ...font.subtitle1,
    marginTop: 20,
    marginBottom: 15,
    color: theme.textColor1,
  },
  dismissToastBtn: {
    width: '100%',
    marginTop: 10,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.toastBtnBorderColor,
    backgroundColor: utilColors.white,
    alignItems: 'center',
  },
  dismissToastBtnText: {
    ...font.subtitle1,
    color: theme.toastBtnBorderColor,
  },
});

const YourChallengesActions = ({ navigation, route }) => {
  const isPageMounted = useRef(true);
  // hooks
  const [state, setState] = useState({
    toastModalOpen: false,
    toastMessage: false,
    btnsDisabled: false,
  });

  const authContext = useContext(AuthContext);

  const updateChallengeStateOnly = useUpdateChallengeStateOnly();
  const deleteChallengeRequest = useDeleteChallenge();

  // styles
  const { theme, font } = useContext(ThemeContext);
  const pageTheme = theme.screenYourChallengesActions;
  const style = getStyles(pageTheme, theme.utilColors, font);

  const { challenge, routeCalling } = route.params;

  // methods
  const onTakeActionBtnPress = (changeChallengeStateTo, challengeId) => {
    updateChallengeStateOnly(challengeId, changeChallengeStateTo).then((res) => {
      const data = JSON.parse(res);

      if (data.status === 'success') {
        setState((prev) => ({
          ...prev,
          toastModalOpen: true,
          toastMessage: changeChallengeStateTo === 'published' ? 'Challenge published successfully' : 'Challenge moved to drafts',
          btnsDisabled: true,
        }));
        authContext.setAuthState({
          appData: {
            isRefresh: true,
          },
        });
      } else if (data.status === 'error') {
        setState((prev) => ({
          ...prev,
          toastModalOpen: true,
          toastMessage: 'Something went wrong! Please try again',
          btnsDisabled: false,
        }));
      }
    });
  };

  const onDeleteChallengeBtnPress = (challengeId) => {
    deleteChallengeRequest(challengeId).then((res) => {
      const data = JSON.parse(res);

      if (data.status === 'success') {
        setState((prev) => ({
          ...prev,
          toastModalOpen: true,
          toastMessage: 'Challenge deleted successfully',
          btnsDisabled: true,
        }));
        authContext.setAuthState({
          appData: {
            isRefresh: true,
          },
        });
      } else if (data.status === 'error') {
        setState((prev) => ({
          ...prev,
          toastModalOpen: true,
          toastMessage: 'Something went wrong! Please try again',
          btnsDisabled: false,
        }));
      }
    });
  };

  const onToastHide = () => {
    if (isPageMounted.current) {
      setState((prev) => ({ ...prev, toastMessage: false, toastModalOpen: false }));
    }
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === 'GO_BACK') {
        if (state.toastModalOpen) {
          e.preventDefault();
          setState((prev) => ({ ...prev, toastModalOpen: false }));
        }
      }
    });

    return () => {
      isPageMounted.current = false;
    };
  }, []);

  return (
    <>
      <View style={style.container}>
         <View style={style.challengeCardItem}>
           <Text style={style.challengeCardTitle}>{challenge.challengeName}</Text>
            <Image
              source={{
                uri: challenge.imgPath,
              }}
              style={style.challengeCardImage}
            />
          </View>
        <View style={style.btnGroup}>
          {
            routeCalling === 'YourChallenges' && <TouchableOpacity
              style={state.btnsDisabled
                ? [style.secondaryBtn, style.disbabledSecondaryBtn]
                : style.secondaryBtn}
              onPress={() => onTakeActionBtnPress('draft', challenge.challengeId)}
              disabled={state.btnsDisabled}>
            <Text style={style.secondaryBtnText}>
              <FormattedMessage defaultMessage={'Move to drafts'} description='move to drafts button text'/>
            </Text>
          </TouchableOpacity>
          }
          {
            routeCalling === 'YourDraftChallenges' && <TouchableOpacity
              style={state.btnsDisabled
                ? [style.secondaryBtn, style.disbabledSecondaryBtn]
                : style.secondaryBtn}
              disabled={state.btnsDisabled}
              onPress={() => onTakeActionBtnPress('published', challenge.challengeId)}
            >
            <Text style={style.secondaryBtnText}>
              <FormattedMessage defaultMessage={'Publish'} description='publish challenge button text'/>
            </Text>
          </TouchableOpacity>
          }
          <TouchableOpacity style={style.secondaryBtn}>
            <Text style={style.secondaryBtnText}>
              <FormattedMessage defaultMessage={'Edit Challenge'} description='edit challenge button'/>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={state.btnsDisabled
              ? [style.dangerBtn, style.disabledDangerBtn]
              : style.dangerBtn}
            disabled={state.btnsDisabled}
            onPress={() => onDeleteChallengeBtnPress(challenge.challengeId)}
          >
            <Text style={style.dangerBtnText}>
              <FormattedMessage defaultMessage={'Delete Challenge'} description='delete challenge button'/>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ToastModal
        style={style}
        toastMessage={state.toastMessage}
        toastModalOpen={state.toastModalOpen}
        onToastHide={onToastHide} />
    </>
  );
};

export default YourChallengesActions;
