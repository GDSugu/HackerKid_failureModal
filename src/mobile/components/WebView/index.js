import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
// import { Helmet } from 'react-helmet';

const webViewElement = ({
  BodyComponent = false,
  ScriptComponent = false,
  styleString = false,
}) => {
  console.log('WebView preparing');

  const WebViewJSX = <>
    <html>
      <head>
        {/* <meta name='viewport' content='device-width,initial-scale=1' /> */}
        {/* {'<meta name="viewport" content="width=device-width,initial-scale=1">'} */}
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1" />
        <style type='text/css' media='screen'>
          {styleString}
        </style>
        <ScriptComponent />
      </head>
      <body>
        <BodyComponent />
      </body>
    </html>
    </>;

  return renderToStaticMarkup(WebViewJSX);
};

export default webViewElement;
