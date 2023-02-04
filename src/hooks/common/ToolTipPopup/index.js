import { createPopper } from '@popperjs/core';

const useToolTipPopup = (refrenceElement, tooltipElement, options = {}) => {
  if (!refrenceElement || !tooltipElement) {
    return false;
  }

  const popperInstance = createPopper(refrenceElement, tooltipElement, options);

  const show = () => {
    // Make the tooltip visible
    tooltipElement.setAttribute('data-show', '');

    // Enable the event listeners
    popperInstance.setOptions((prevOptions) => ({
      ...prevOptions,
      modifiers: [
        ...prevOptions.modifiers,
        { name: 'eventListeners', enabled: true },
      ],
    }));

    // Update its position
    popperInstance.update();
  };

  const hide = () => {
    // Hide the tooltip
    tooltipElement.removeAttribute('data-show');

    // Disable the event listeners
    popperInstance.setOptions((prevOptions) => ({
      ...prevOptions,
      modifiers: [
        ...prevOptions.modifiers,
        { name: 'eventListeners', enabled: false },
      ],
    }));
  };

  const showEvents = ['mouseenter', 'focus'];
  const hideEvents = ['mouseleave', 'blur'];

  showEvents.forEach((event) => {
    refrenceElement.addEventListener(event, show);
  });

  hideEvents.forEach((event) => {
    refrenceElement.addEventListener(event, hide);
  });

  return {
    show,
    hide,
  };
};

export default useToolTipPopup;
