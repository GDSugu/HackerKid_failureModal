import React from 'react';

const imgPath = '../../../../images/';

const Img = ({
  alt = 'Hackerkid resource',
  className = '',
  fallback = 'resized/default_user-1000w.webp',
  local = true,
  src = 'resized/default_user-1000w.webp',
  style = null,
  useSource = true,
}) => {
  let imgSource = `${imgPath + fallback}`;
  if (src) {
    imgSource = src;
  }
  const [imgSrc, setImgSrc] = React.useState(imgSource);
  let filePath;
  let fileName;
  let fileExtension;
  if (local) {
    filePath = src.split('/').pop();
    [fileName] = filePath.split('.');
    fileExtension = filePath.split('.').pop();
  }

  React.useEffect(() => {
    if (!local) {
      if (src) {
        fetch(src)
          .then((res) => {
            if (res.status !== 200) {
              setImgSrc(`${imgPath + fallback}`);
            }
          });
      } else {
        setImgSrc(`${imgPath + fallback}`);
      }
    }
  }, []);

  React.useEffect(() => {
    if (!local) {
      if (src) {
        fetch(src)
          .then((res) => {
            if (res.status !== 200) {
              setImgSrc(`${imgPath + fallback}`);
            }
          });
      } else {
        setImgSrc(`${imgPath + fallback}`);
      }
    }
  }, []);

  return <>
  {local && <picture style={style} className={className}>
    <source media='(max-width: 500px)' srcSet={`${imgPath}/resized/${fileName}-1000w.webp`} type="image/webp" />
    { !useSource && <source media="(min-width: 1200px)" srcSet={`${imgPath + src}`} type="image/png" />}
    <source srcSet={`${imgPath}/webps/${fileName}.webp`} type="image/webp"></source>
    <img srcSet={`${imgPath}/resized/${fileName}-1000w.${fileExtension} 1000w`} src={`${imgPath + src}`} alt={alt} />
  </picture>}
    {!local && <img src={imgSrc} style={style} className={className} alt={alt} />}
  </>;
};

export default Img;
