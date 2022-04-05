import React from 'react';

const imgPath = '../../../../images/';

const Img = ({
  alt = 'Hackerkid resource',
  className = '',
  local = true,
  src = 'resized/default_user-1000w.webp',
  style = null,
  useSource = true,
}) => {
  const filePath = src.split('/').pop();
  const fileName = filePath.split('.')[0];
  const fileExtension = filePath.split('.').pop();

  return <>
  {local && <picture style={style} className={className}>
    <source media='(max-width: 500px)' srcSet={`${imgPath}/resized/${fileName}-1000w.webp`} type="image/webp" />
    { !useSource && <source media="(min-width: 1200px)" srcSet={`${imgPath + src}`} type="image/png" />}
    <source srcSet={`${imgPath}/webps/${fileName}.webp`} type="image/webp"></source>
    <img srcSet={`${imgPath}/resized/${fileName}-1000w.${fileExtension} 1000w`} src={`${imgPath + src}`} alt={alt} />
  </picture>}
  {!local && <img src={src} />}
  </>;
};

export default Img;
