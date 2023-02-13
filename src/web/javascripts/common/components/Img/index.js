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
  type = 'image',
  onLoad = () => {},
  onError = () => {},
}) => {
  const isPageMounted = React.useRef(true);
  let imgSource = `${imgPath + fallback}`;
  let imgType = type;
  if (src) {
    const extension = src.split('.').pop();
    if (extension === 'svg') {
      imgType = extension;
    }
    imgSource = src;
    if (!local) {
      imgSource = `${imgSource}?updatedAt=${Date.now()}`;
    }
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
    if (!local && imgType === 'image') {
      if (src) {
        fetch(src)
          .then((res) => {
            if (isPageMounted.current) {
              if (res.status !== 200) {
                setImgSrc(`${imgPath + fallback}`);
              }
            }
          })
          .catch((err) => {
            console.log('fetch image error', err);
          });
      } else {
        setImgSrc(`${imgPath + fallback}`);
      }
    }
  }, []);

  React.useEffect(() => {
    if (!local) {
      if (src) {
        setImgSrc(src);
      } else {
        setImgSrc(`${imgPath + fallback}`);
      }
    }

    return () => {
      isPageMounted.current = false;
    };
  }, [src]);

  return <>
    {
      local && imgType === 'image' && <picture style={style} className={className}>
        <source media='(max-width: 500px)' srcSet={`${imgPath}/resized/${fileName}-1000w.webp`} type="image/webp" />
        {!useSource && <source media="(min-width: 1200px)" srcSet={`${imgPath + src}`} type="image/png" />}
        <source srcSet={`${imgPath}/webps/${fileName}.webp`} type="image/webp"></source>
        <img srcSet={`${imgPath}/resized/${fileName}-1000w.${fileExtension} 1000w`} src={`${imgPath + src}`} alt={alt} loading='lazy' onLoad={onLoad} onError={onError} />
      </picture>
    }
    {
      imgType === 'svg'
      && <img
        src={`${imgPath + src}`}
        style={style}
        className={className}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        loading={'lazy'}
      />
    }
    {
      !local
      && <img src={imgSrc}
        style={style}
        className={className}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        loading={'lazy'}
      />
    }
  </>;
};

export default Img;
