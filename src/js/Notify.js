import { alert, Stack } from '@pnotify/core';

export function notifyHandler(
  text = 'Something went wrong',
  type = 'error',
  title = '',
  delay = 2000,
) {
  const stackBottomRight = new Stack({
    dir1: 'up',
    firstpos1: 0,
    spacing1: 0,
  });
  const options = {
    title,
    text,
    type,
    stack: stackBottomRight,
    delay,
    width: `${document.body.clientWidth}px`,
  };
  //   if (document.body.clientWidth < 400) {
  //     options.width = '300px';
  //   } else if (document.body.clientWidth < 800) {
  //     options.width = '340px';
  //   }
  alert(options);
}
