
// Mock implementation of normalize-colors
module.exports = function normalizeColor(color) {
  if (typeof color === 'string' && color.startsWith('#')) {
    return parseInt(color.substring(1), 16);
  }
  return color;
};
module.exports.default = module.exports;
