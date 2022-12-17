import $ from 'jquery';

const showInlineLoadingSpinner = (selector) => {
  const loadingSpinner = document.createElement('div');
  $(loadingSpinner).attr('id', 'loader-partial');

  const htmlBeforeLoading = $(selector).html();
  const widthBeforeLoading = $(selector)[0].offsetWidth;
  const heightBeforeLoading = $(selector)[0].offsetHeight;

  const hideInlineLoadingSpinner = () => {
    $(selector).empty();
    $(selector).removeAttr('disabled');
    $(selector).removeAttr('style');
    $(selector).html(htmlBeforeLoading);
  };
  $(selector).css('width', `${widthBeforeLoading}px`);
  $(selector).css('height', `${heightBeforeLoading}px`);
  $(selector).attr('disabled', true);
  $(selector).empty();
  $(selector).append(loadingSpinner);

  return hideInlineLoadingSpinner;
};

const showFullScreenLoadingSpinner = (selector = '') => {
  const loadingSpinner = document.createElement('div');
  $(loadingSpinner).attr('id', 'loader');

  const hideFullScreenLoadingSpinner = () => {
    $('#loader').hide();
    $('#loader').remove();
  };

  if (!selector) {
    $('body').append(loadingSpinner);
  } else {
    $(selector).append(loadingSpinner);
  }

  $('#loader').show();

  return hideFullScreenLoadingSpinner;
};

export default null;

export {
  showInlineLoadingSpinner,
  showFullScreenLoadingSpinner,
};
