import React, { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const useWebViewState = () => {
  const [viewData, setViewData] = useState({
    bodyContent: '',
    scriptContent: '',
    styleContent: '',
    scriptToInject: '',
  });

  const setContent = ({
    bodyContent = '',
    scriptContent = '',
    styleContent = '',
    scriptToInject = '',
  }) => {
    setViewData((prevState) => ({
      ...prevState,
      bodyContent,
      scriptContent,
      styleContent,
      scriptToInject,
    }));
  };

  const jsx = <>
    <html>
     <head>
     <style type="text/css" media="screen" dangerouslySetInnerHTML={{ __html: viewData.styleContent }}>
     </style>
     </head>
     <body dangerouslySetInnerHTML={{ __html: `${viewData.bodyContent} ${viewData.scriptContent}` }}>
     </body>
     </html>
  </>;

  return {
    state: viewData,
    setContent,
    webViewString: renderToStaticMarkup(jsx),
  };
};

export default null;

export {
  useWebViewState,
};
