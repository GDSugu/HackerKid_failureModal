const getCommonStyles = (theme, utilColors, font) => ({
  stepContainer: {
    flexBasis: '95%',
  },
  container: {
    paddingLeft: 18,
    paddingRight: 18,
    justifyContent: 'center',
  },
  label: {
    color: utilColors.dark,
    marginBottom: 5,
    ...font.bodyBold,
  },
  formHeading: {
    color: utilColors.dark,
    textAlign: 'center',
    ...font.heading6,
  },
  backBtn: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  formHeadingAndBackBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    flexBasis: '5%',
    width: '100%',
  },
  inputField: {
    borderWidth: 1,
    borderColor: theme.inputBorderColor,
    borderRadius: 8,
    padding: 8,
    color: utilColors.dark,
    ...font.bodyBold,
  },
  errorField: {
    borderColor: utilColors.red,
  },
  errorText: {
    color: utilColors.red,
    ...font.bodyBold,
  },
  btnPrimary: {
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: theme.btnBg,
    padding: 14,
  },
  btnPrimaryText: {
    ...font.bodyBold,
    color: utilColors.white,
    textAlign: 'center',
  },
  btnOutlinePrimary: {
    padding: 14,
    borderWidth: 1,
    marginBottom: 8,
    borderColor: theme.inputBorderColor,
    borderRadius: 8,
  },
  btnOutlinePrimaryText: {
    ...font.bodyBold,
    textAlign: 'center',
    color: utilColors.dark,
  },
  formSvgContainer: {
    justifycontent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 50,
  },
  labelAndInputContainer: {
    marginBottom: 10,
  },
  btnAsInteractiveText: {
    color: theme.fadedBtnTextColor,
    ...font.bodyBold,
    marginTop: 16,
    marginBottom: 25,
    textAlign: 'center',
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },
  labelAndFormHelperContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  formError: {
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default getCommonStyles;
