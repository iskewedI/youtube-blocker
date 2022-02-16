/***
 * Returns an unique string ID
 */
export const uuid = () => '_' + Math.random().toString(36).substr(2, 9);

/***
 * Returns a sanitized HH:MM time. For example, if the time is 9:30, it will return 09:30.
 */
export const sanitizeTime = time => {
  let [left, right] = time.split(':');

  if (!left || !right) {
    console.error("Couldn't sanitize time without the expected format HH:MM => ", time);
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
