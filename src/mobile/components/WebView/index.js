import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const webViewElement = ({
  BodyComponent = false,
  ScriptComponent = false,
  styleString = false,
}) => {
  console.log('WebView preparing');

  const WebViewJSX = <>
    <html>
      <head>
        <style type='text/css' media='screen'>
          {styleString}
        </style>
      </head>
      <body>
        <BodyComponent />
        <ScriptComponent />
      </body>
    </html>
    </>;

  return renderToStaticMarkup(WebViewJSX);
};

export default webViewElement;
