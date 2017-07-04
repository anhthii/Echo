export const pageQuery = function (page) {
  return page ? `?page=${page}` : '';
};