/***
 * Returns an unique string ID
 */
export const uuid = () => '_' + Math.random().toString(36).substr(2, 9);

/***
 * Returns a formatted HH:MM time. For example, if the time is 9:30, it will return 09:30.
 */
export const formatTime = (time: string) => {
  let [left, right] = time.split(':');

  if (!left || !right) {
    console.error("Couldn't format time without the expected structure HH:MM => ", time);
    return time;
  }

  if (left.length < 2) {
    left = `0${left}`;
  }

  if (right.length < 2) {
    right = `0${right}`;
  }

  return `${left}:${right}`;
};
