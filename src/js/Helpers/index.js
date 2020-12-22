export { fetchPixabayImages } from './apiService';
import { alert, Stack } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const stackBottomRight = new Stack({
  dir1: 'up',
  firstpos1: 0,
  spacing1: 0,
});

export function displayNotifycation({
  text = 'Something went wrong',
  type = 'error',
  title = '',
  delay = 1500,
  stack,
}) {
  const options = {
    title,
    text,
    type,
    stack: stack === undefined ? stackBottomRight : new Stack(stack),
    delay,
    width: `${document.body.clientWidth}px`,
  };
  alert(options);
}
