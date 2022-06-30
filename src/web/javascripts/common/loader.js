import $ from 'jquery';

const showInlineLoadingSpinner = (selector) => {
  const loadingSpinner = document.createElement('div');
  $(loadingSpinner).attr('id', 'loader-partial');

  const htmlBeforeLoading = $(selector).html();

  const hideInlineLoadingSpinner = () => {
    $(selector).empty();
    $(selector).removeAttr('disabled');
    $(selector).html(htmlBeforeLoading);
  };
  $(selector).attr('disabled', true);
  $(selector).empty();
  $(selector).append(loadingSpinner);

  return hideInlineLoadingSpinner;
};

export default showInlineLoadingSpinner;
