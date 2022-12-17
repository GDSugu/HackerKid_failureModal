// import React from 'react';

// const webViewBoilerPlate = () => {
//   const [viewData, setViewData] = React.useState({
//     bodyContent: false,
//     scriptContent: false,
//     styleContent: false,
//   });

//   const setContent = ({
//     bodyContent = '',
//     scriptContent = '',
//     styleContent = '',
//     strict = false,
//   }) => {
//     if (!strict) {
//       setViewData((prevState) => ({
//         bodyContent: prevState.bodyContent + bodyContent,
//         scriptContent: prevState.scriptContent + scriptContent,
//         styleContent: prevState.styleContent + styleContent,
//       }));
//     } else {
//       setViewData({
//         bodyContent,
//         scriptContent,
//         styleContent,
//       });
//     }
//   };

//   const boilerPlatestring = `<!DOCTYPE html>
//     <html lang="en">
//     <head>
//     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1">
//     <title>Turtle Workspace</title>
//     <style type="text/css" media="screen">
//         #editor { 
//             position: absolute;
//             top: 0;
//             right: 0;
//             bottom: 0;
//             left: 0;
//         }
//         ${viewData.styleContent}
//     </style>
//     </head>
//     <body>
//     <div id="editor"></div>
//     ${viewData.bodyContent}
//     ${viewData.scriptContent}
//     <script src="https://unpkg.com/ace-builds@1.4.8/src-min-noconflict/ace.js" type="text/javascript"></script>
//     </body>
//     </html>`;

//   const result = {
//     state: viewData,
//     setContent,
//     webViewString: boilerPlatestring,
//   };

//   return result;
// };

// export default null;

// export {
//   webViewBoilerPlate,
// };
