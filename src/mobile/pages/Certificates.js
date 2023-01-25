import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  LogBox,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { Skeleton } from '@rneui/base';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import ThemeContext from '../components/theme';
import SortIconSvg from '../../images/common/sort-icon.svg';
import SearchIconSvg from '../../images/common/search-icon.svg';
import { useProfileInfo } from '../../hooks/pages/profile';
import ShareIcon from '../../images/common/black-share-icon.svg';
import ShareModal from '../components/Modals/ShareModal';
import ViewCertificateModal from '../components/Modals/ViewCertificateModal';
import CertificateBuilder from '../components/CertificateBuilder';

const getStyles = (theme, utilColors, font) => StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  section: {
    marginTop: 16,
  },
  textColor1: {
    color: utilColors.dark,
  },
  textColor2: {
    color: utilColors.white,
  },
  textColor3: {
    color: theme.textBold,
  },
  heading: {
    ...font.subtitleBold,
  },
  btnText: {
    ...font.subtitle1,
  },
  text: {
    ...font.subtitle2,
  },
  smallText: {
    ...font.body,
  },
  smallestText: {
    ...font.caption,
  },
  borderRadius12: {
    borderRadius: 12,
  },
  controls: {
    flexDirection: 'row',
  },
  sortSelectorIcon: {
    marginRight: 5,
    marginLeft: 0,
    justifyContent: 'center',
  },
  sortSelectorContainerStyle: {
    width: '35%',
  },
  sortSelector: {
    flexDirection: 'row-reverse',
    borderColor: theme.borderDark,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  sortSelectorText: {
    flexShrink: 1,
  },
  sortSelectorDropdown: {
    width: 200,
    position: 'absolute',
    borderColor: theme.borderDark,
    borderRadius: 8,
    borderTopLeftRadius: 8,
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    left: 15,
    transform: [{ translateY: -10 }],
  },
  searchBoxContainer: {
    flex: 1,
    position: 'relative',
  },
  searchBox: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: theme.borderDark,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    paddingLeft: 32,
    backgroundColor: utilColors.white,
    marginLeft: 5,
  },
  certificateItemContainer: {
    marginTop: 10,
    backgroundColor: utilColors.white,
  },
  certificateItem: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greyBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: utilColors.tertiary,
  },
  certificateImageContainer: {
    width: 72,
    height: 72,
    borderRadius: 12,
    marginRight: 10,
  },
  certificateImage: {
    flex: 1,
    borderRadius: 12,
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  certificateDate: {
    marginTop: 16,
  },
});

const SortDropDown = ({
  activeSortValue, setSort, open, setOpen, onChangeValue, style,
}) => {
  const [items, setItems] = useState([
    { label: 'Alphabetically ', value: 'alphabetical' },
    { label: 'Reverse Alphabetically', value: 'reverse-alphabetical' },
    { label: 'Newest to Oldest', value: 'posted' },
    { label: 'Oldest to Newest', value: 'reverse-posted' },
  ]);

  return (
    <DropDownPicker
      open={open}
      setOpen={setOpen}
      setValue={setSort}
      onChangeValue={onChangeValue}
      value={activeSortValue}
      items={items}
      setItems={setItems}
      style={style.sortSelector}
      containerStyle={style.sortSelectorContainerStyle}
      listItemContainerStyle={{
        paddingVertical: 10,
        paddingHorizontal: 15,
      }}
      dropDownContainerStyle={style.sortSelectorDropdown}
      selectedItemLabelStyle={[style.btnText, style.textColor3]}
      labelProps={{ numberOfLines: 1 }}
      textStyle={[style.text, style.textColor1]}
      ArrowUpIconComponent={
        ({ iconContainerStyle }) => <SortIconSvg style={iconContainerStyle} />}
      ArrowDownIconComponent={
        ({ iconContainerStyle }) => <SortIconSvg style={iconContainerStyle} />}
      arrowIconContainerStyle={style.sortSelectorIcon}
      showTickIcon={false}
      searchable={false}
    />
  );
};

const Certificates = ({ navigation }) => {
  const isPageMounted = useRef(true);
  const certificateViewShotRef = useRef(true);
  // hooks
  const {
    state: {
      uniqueUrl,
      name,
    },
  } = useProfileInfo({ isPageMounted });
  const {
    state: {
      gameDetails,
    },
    getProfileData,
  } = useProfileInfo({ isPageMounted, action: 'getProfileData', uniqueurl: uniqueUrl });
  const [localState, setLocalState] = useState({
    sort: 'posted',
    sortDropdownOpen: false,
    originalCertificatesList: false,
    currentList: false,
    toBuildCertificateObj: false,
    shareModalOpen: false,
    toShareCertificateId: false,
    toViewModalOpen: false,
    templateCertificateImageUri: false,
    viewCertificateImageUri: false,
  });

  const {
    sort,
    sortDropdownOpen,
    originalCertificatesList,
    currentList,
    shareModalOpen,
    toShareCertificateId,
    toViewModalOpen,
    toBuildCertificateObj,
    templateCertificateImageUri,
    viewCertificateImageUri,
  } = localState;

  // setters
  const setViewCertificateImageUri = (uri) => {
    setLocalState((prev) => ({ ...prev, viewCertificateImageUri: uri }));
  };

  const setTemplateCertificateImageUri = (uri) => {
    setLocalState((prev) => ({ ...prev, templateCertificateImageUri: uri }));
  };

  const setToViewModalOpen = (open) => {
    setLocalState((prev) => ({ ...prev, toViewModalOpen: open }));
  };

  const setOriginalCertificatesList = (list) => {
    setLocalState((prev) => ({ ...prev, originalCertificatesList: list }));
  };

  const setCurrentList = (listToBeSet) => {
    setLocalState((prev) => ({ ...prev, currentList: listToBeSet }));
  };

  const setSort = (toSetSort) => {
    setLocalState((prev) => ({ ...prev, sort: toSetSort }));
  };

  const setToBuildCertificateObj = (certificateObj) => {
    setLocalState((prev) => ({ ...prev, toBuildCertificateObj: certificateObj }));
  };

  const setToShareCertificateId = (certificateId) => {
    setLocalState((prev) => ({ ...prev, toShareCertificateId: certificateId }));
  };

  const setShareModalOpen = (open) => {
    setLocalState((prev) => ({ ...prev, shareModalOpen: open }));
  };

  // styles
  const { font, theme } = useContext(ThemeContext);
  const screenTheme = theme.screenCertificates;
  const style = getStyles(screenTheme, theme.utilColors, font, theme.gradients);

  // methods
  const onSetSort = (getValueFn) => {
    const value = getValueFn();
    setSort(value);
  };

  const onDateWiseSort = (list, currentSort) => {
    let compartorFn;

    if (currentSort === 'posted') {
      compartorFn = (a, b) => b - a;
    } else if (currentSort === 'reverse-posted') {
      compartorFn = (a, b) => a - b;
    }

    const certificates = [...list];

    const timeStampToCertificateMap = {};

    certificates.forEach((certificate) => {
      if (timeStampToCertificateMap[certificate.createdAt]) {
        timeStampToCertificateMap[certificate.createdAt].push(certificate);
      } else {
        timeStampToCertificateMap[certificate.createdAt] = [certificate];
      }
    });

    const sortedKeys = Object.keys(timeStampToCertificateMap).map(Number).sort(compartorFn);

    const finalList = {};

    sortedKeys.forEach((timeStamp) => {
      const timeStampDMY = moment.unix(timeStamp).format('DD/MM/YYYY');
      const nowDMY = moment().format('DD/MM/YYYY');
      const yesterdayDMY = moment().subtract(1, 'days').format('DD/MM/YYYY');

      let dateString = moment.unix(timeStamp).format('DD/MM/YYYY');

      if (timeStampDMY === nowDMY) {
        dateString = 'Today';
      } else if (timeStampDMY === yesterdayDMY) {
        dateString = 'Yesterday';
      }

      finalList[dateString] = timeStampToCertificateMap[timeStamp];
    });

    setCurrentList(finalList);
  };

  const onAlphabeticalSort = (list, currentSort) => {
    let compartorFn;

    if (currentSort === 'alphabetical') {
      compartorFn = (a, b) => a.certificateName.localeCompare(b.certificateName);
    } else if (currentSort === 'reverse-alphabetical') {
      compartorFn = (a, b) => -1 * a.certificateName.localeCompare(b.certificateName);
    }
    const toSortArr = [...list];
    toSortArr.sort(compartorFn);
    setCurrentList(toSortArr);
  };

  const sortList = (list, sortPressed) => {
    if (sortPressed === 'posted' || sortPressed === 'reverse-posted') {
      onDateWiseSort(list, sortPressed);
    } else if (sortPressed === 'alphabetical' || sortPressed === 'reverse-alphabetical') {
      onAlphabeticalSort(list, sortPressed);
    }
  };

  const onSearhBoxChange = (searchQuery) => {
    const filteredList = originalCertificatesList.filter((certificate) => {
      const lowerCaseName = certificate.certificateName.toLowerCase();
      const lowerCaseQuery = searchQuery.toLowerCase();

      return lowerCaseName.includes(lowerCaseQuery);
    });
    sortList(filteredList, sort);
  };

  const onCertificateImagePress = (certificateObj) => {
    setToBuildCertificateObj(certificateObj);
    certificateViewShotRef.current.capture().then((uri) => {
      setViewCertificateImageUri(uri);
      setToViewModalOpen(true);
    }).catch((err) => {
      console.error(err);
    });
  };

  const onShareBtnPress = () => {
    setLocalState((prev) => ({
      ...prev,
      toViewModalOpen: false,
      toShareCertificateId: prev.toBuildCertificateObj.certificateId,
      shareModalOpen: true,
    }));
  };

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const onDownloadBtnPress = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.save(viewCertificateImageUri);
  };

  // side effects
  useEffect(() => {
    if (originalCertificatesList && originalCertificatesList.length) {
      sortList(originalCertificatesList, 'posted');
      setToBuildCertificateObj(originalCertificatesList[0]);
      certificateViewShotRef.current.capture().then((uri) => {
        setTemplateCertificateImageUri(uri);
      }).catch((err) => {
        console.error(err);
      });
    } else if (originalCertificatesList && originalCertificatesList.length === 0) {
      setCurrentList([]);
    }
  }, [originalCertificatesList]);

  useEffect(() => {
    if (gameDetails) {
      const allCertificatesObject = gameDetails[0].certificateData;
      setOriginalCertificatesList(Object.values(allCertificatesObject));
    }
  }, [gameDetails]);

  useEffect(() => {
    getProfileData({ cached: false });
  }, [uniqueUrl]);

  useEffect(() => {
    navigation?.setOptions({
      contentStyle: {
        backgroundColor: screenTheme.bodyBg,
      },
    });

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    return () => {
      isPageMounted.current = false;
    };
  }, []);

  // certificate item
  const CertificateItem = ({
    contentContainerStyle, certificateName, certificateId, onImagePress,
  }) => <View
    style={[style.certificateItem, style.borderRadius12, contentContainerStyle]}
    options={{ fileName: 'test', result: 'data-uri' }}
  >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => onImagePress({
          certificateName,
          certificateId,
        })}>
          {
            !templateCertificateImageUri
            && <Skeleton style={style.certificateImageContainer} />
          }
          {
            templateCertificateImageUri
            && <View style={style.certificateImageContainer}>
              <Image
                style={style.certificateImage}
                source={{ uri: templateCertificateImageUri }} />
            </View>
          }
        </TouchableOpacity>
        <Text style={[style.textColor1, style.text]} numberOfLines={1}>
          <FormattedMessage defaultMessage={'{certificateName}'} description='certificaten name' values={{
            certificateName,
          }} />
        </Text>
      </View>
      <TouchableOpacity onPress={() => {
        setShareModalOpen(true);
        setToShareCertificateId(certificateId);
      }}>
        <ShareIcon />
      </TouchableOpacity>
    </View>;

  return <>
    <ScrollView
      style={[style.container, style.mainContainer]}>
      {
        !currentList && <ActivityIndicator size="large" color={'black'} style={{ marginTop: 40 }} />
      }
      {
        (originalCertificatesList.length > 0)
        && <View style={style.controls}>
          <SortDropDown
            style={style}
            activeSortValue={sort}
            setSort={onSetSort}
            open={sortDropdownOpen}
            setOpen={() => {
              setLocalState((prev) => ({ ...prev, sortDropdownOpen: !prev.sortDropdownOpen }));
            }}
            onChangeValue={(selectedSort) => { sortList(originalCertificatesList, selectedSort); }}
          />
          <View style={style.searchBoxContainer}>
            <TextInput
              multiline={false}
              placeholder={'Search'}
              style={[style.searchBox, style.text, style.textColor1]}
              placeholderTextColor={style.textColor1.color}
              onChangeText={onSearhBoxChange}
            />
            <SearchIconSvg style={style.searchIcon} />
          </View>
        </View>
      }
      {
        (currentList && (currentList.length === 0 || Object.keys(currentList).length === 0))
        && <View style={[style.container, { alignItems: 'center', marginTop: 50 }]}>
          <Text style={[style.heading, style.textColor1]}>
            <FormattedMessage
              defaultMessage={'No Certificates Found'}
              description='no certificates found text'
            />
          </Text>
        </View>
      }
      {
        currentList && (sort === 'posted' || sort === 'reverse-posted') && !Array.isArray(currentList)
        && Object.keys(currentList).map((dateString, idx) => <View
          key={idx}>
          <Text style={[style.textColor1, style.text, style.certificateDate]}>
            <FormattedMessage defaultMessage={'{dateString}'} description='date' values={{ dateString }} />
          </Text>
          <View style={[style.certificateItemContainer, style.borderRadius12]}>
            {
              currentList[dateString].map((certificate, index) => <CertificateItem
                onImagePress={onCertificateImagePress}
                key={index}
                certificateName={certificate.certificateName}
                certificateId={certificate.certificateId}
                contentContainerStyle={
                  (currentList[dateString].length > 1
                    && index !== currentList[dateString].length - 1)
                    ? style.greyBorderBottom
                    : {}}
              />)
            }
          </View>
        </View>)
      }
      {
        currentList && (Array.isArray(currentList))
        && <View style={[style.certificateItemContainer, style.borderRadius12]}>
          {
            currentList.map((certificate, idx) => <CertificateItem
              onImagePress={onCertificateImagePress}
              key={idx}
              certificateName={certificate.certificateName}
              certificateId={certificate.certificateId}
              contentContainerStyle={
                (currentList.length > 1 && idx !== currentList.length - 1)
                  ? style.greyBorderBottom
                  : {}}
            />)
          }
        </View>
      }
    </ScrollView>
    <ShareModal open={shareModalOpen} setOpen={setShareModalOpen} shareLink={`www.hackerkid.org/certificate/view/${toShareCertificateId}`} />
    {
      viewCertificateImageUri && <ViewCertificateModal
        open={toViewModalOpen}
        setOpen={setToViewModalOpen}
        viewCertificateImageUri={viewCertificateImageUri}
        onShareBtnPress={onShareBtnPress}
        onDownloadBtnPress={onDownloadBtnPress}
      />
    }
    <CertificateBuilder
      viewShotRef={certificateViewShotRef}
      certificateId={toBuildCertificateObj.certificateId}
      certificateName={toBuildCertificateObj.certificateName}
      studentName={name}
    />
  </>;
};

export default Certificates;
