/**
 * Returns whether this webpage is open in an iframe
 */
export const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (error) {
    return true;
  }
};
