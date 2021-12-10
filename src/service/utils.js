/***
 * Returns an unique string ID
 */
export const uuid = () => '_' + Math.random().toString(36).substr(2, 9);
