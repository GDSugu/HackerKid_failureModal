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
  const [imgSrc, setImgSrc] = React.useState(src);
  const filePath = src.split('/').pop();
  const fileName = filePath.split('.')[0];
  const fileExtension = filePath.split('.').pop();

  React.useEffect(() => {
    if (!local) {
      fetch(src)
        .then((res) => {
          if (res.status === 200) {
            setImgSrc(src);
          } else {
            setImgSrc(`${imgPath + fallback}`);
          }
        });
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
