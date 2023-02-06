import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
// import { Helmet } from 'react-helmet';

const webViewElement = ({
  BodyComponent = false,
  ScriptComponent = false,
  styleString = false,
}) => {
  const WebViewJSX = <>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
        <link href="https://fonts.googleapis.com/css2?family=Courgette&display=swap" rel="stylesheet"></link>
        <style>
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
