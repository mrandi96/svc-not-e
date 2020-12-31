module.exports = (uppercase = 'lowercase') => {
  const string = Math.random().toString(36).slice(2);
  if (uppercase === 'uppercase') return string.toUpperCase();
  return string.toLowerCase();
};
