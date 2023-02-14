export const transformTimeString = (time) => {
  const [, hour = '0', minute = '0', second = '0'] = time.match(
    /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/,
  );
  return {
    hour: parseInt(hour),
    minute: parseInt(minute),
    second: parseInt(second),
  };
};
