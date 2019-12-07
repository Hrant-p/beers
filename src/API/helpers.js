export const constructUrl = (arr, queryObj) => {
  const queryString = Object.keys(queryObj)
    .map((x) => `${x}=${queryObj[x]}`)
    .join('&');

  return arr.join('/') + (queryString ? `?${queryString}` : '');
};
