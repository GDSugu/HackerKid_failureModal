import $ from 'jquery';

const upsertTitle = (title = false) => {
  if (!title) {
    throw new Error('INVALID_DATA');
  }
  const headSelector = $('head');
  const titleSelector = $('head title');
  if (titleSelector.length) {
    titleSelector.text(title);
  } else {
    headSelector.append(`<title>${title}</title>`);
  }
};

const upsertDescription = (description = false) => {
  if (!description) {
    throw new Error('INVALID_DATA');
  }
  const headSelector = $('head');
  const descriptionSelector = $('head meta[name=description]');
  if (descriptionSelector.length) {
    descriptionSelector.attr('content', description);
  } else {
    headSelector.append(`<meta name="description" content="${description}">`);
  }
};

const upsertFBMeta = (title, description, url, image = false) => {
  const headSelector = $('head');
  const urlSelector = $('head meta[property="og:url"]');
  const typeSelector = $('head meta[property="og:type"]');
  const titleSelector = $('head meta[property="og:title"]');
  const descriptionSelector = $('head meta[property="og:description"]');
  const imageSelector = $('head meta[property="og:image"]');
  if (!title || !description || !url) {
    throw new Error('INVALID_DATA');
  }

  // mandatory tags
  if (urlSelector.length) {
    urlSelector.attr('content', url);
  } else {
    headSelector.append(`<meta property="og:url" content="${url}">`);
  }

  if (typeSelector.length) {
    typeSelector.attr('content', 'website');
  } else {
    headSelector.append('<meta property="og:type" content="website">');
  }

  if (titleSelector.length) {
    titleSelector.attr('content', title);
  } else {
    headSelector.append(`<meta property="og:title" content="${title}">`);
  }

  if (descriptionSelector.length) {
    descriptionSelector.attr('content', description);
  } else {
    headSelector.append(`<meta property="og:description" content="${description}">`);
  }

  if (imageSelector.length) {
    imageSelector.attr('content', image);
  } else if (image) {
    headSelector.append(`<meta property="og:image" content="${image}">`);
  }
};

const upsertTwitterMeta = (title, description, url, image = false) => {
  const headSelector = $('head');
  const urlSelector = $('head meta[property="twitter:url"]');
  const typeSelector = $('head meta[name="twitter:card"]');
  const titleSelector = $('head meta[name="twitter:title"]');
  const descriptionSelector = $('head meta[name="twitter:description"]');
  const imageSelector = $('head meta[name="twitter:image"]');
  if (!title || !description || !url) {
    throw new Error('INVALID_DATA');
  }

  // mandatory tags
  if (urlSelector.length) {
    urlSelector.attr('property', url);
  } else {
    headSelector.append(`<meta property="twitter:url" content="${url}">`);
  }

  if (typeSelector.length) {
    typeSelector.attr('content', 'summary_large_image');
  } else {
    headSelector.append('<meta name="twitter:card" content="summary_large_image">');
  }

  if (titleSelector.length) {
    titleSelector.attr('content', title);
  } else {
    headSelector.append(`<meta name="twitter:title" content="${title}">`);
  }

  if (descriptionSelector.length) {
    descriptionSelector.attr('content', description);
  } else {
    headSelector.append(`<meta name="twitter:description" content="${description}">`);
  }

  if (imageSelector.length) {
    imageSelector.attr('content', image);
  } else if (image) {
    headSelector.append(`<meta name="twitter:image" content="${image}">`);
  }
};

export {
  upsertTitle,
  upsertDescription,
  upsertFBMeta,
  upsertTwitterMeta,
};
