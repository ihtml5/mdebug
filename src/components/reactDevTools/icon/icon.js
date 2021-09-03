// @flow

import React from 'react';

import styles from './Icon.module.css';

export default function Icon({ className = '', type }) {
  let pathData = null;
  switch (type) {
    case 'add':
      pathData = PATH_ADD;
      break;
    case 'clear':
      pathData = PATH_CLEAR;
      break;
    case 'close':
      pathData = PATH_CLOSE;
      break;
    case 'export':
      pathData = PATH_EXPORT;
      break;
    case 'left':
      pathData = PATH_LEFT;
      break;
    case 'import':
      pathData = PATH_IMPORT;
      break;
    case 'record':
      pathData = PATH_RECORD;
      break;
    case 'right':
      pathData = PATH_RIGHT;
      break;
    case 'selector':
      pathData = PATH_SELECTOR;
      break;
    case 'settings':
      pathData = PATH_SETTINGS;
      break;
    case 'suspend':
      pathData = PATH_SUSPEND;
      break;
    case 'toggle':
      pathData = PATH_TOGGLE;
      break;
    default:
      console.warn(`Unsupported type "${type}" specified for Icon`);
      break;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={[styles.Icon, className].join(' ')}
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path fill="currentColor" d={pathData} />
    </svg>
  );
}

const PATH_ADD =
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z';

const PATH_CLOSE =
  'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z';

const PATH_CLEAR = `
  M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69
  16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z
`;

const PATH_EXPORT = 'M15.82,2.14v7H21l-9,9L3,9.18H8.18v-7ZM3,20.13H21v1.73H3Z';

const PATH_LEFT = 'M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z';

const PATH_IMPORT = 'M8.18,18.13v-7H3l9-8.95,9,9H15.82v7ZM3,20.13H21v1.73H3Z';

const PATH_RECORD = 'M4,12a8,8 0 1,0 16,0a8,8 0 1,0 -16,0';

const PATH_RIGHT = 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z';

const PATH_SELECTOR =
  'M8.5,22H3.7l-1.4-1.5V3.8l1.3-1.5h17.2l1,1.5v4.9h-1.3V4.3l-0.4-0.6H4.2L3.6,4.3V20l0.7,0.7h4.2V22z M23,13.9l-4.6,3.6l4.6,4.6l-1.1,1.1l-4.7-4.4l-3.3,4.4l-3.2-12.3L23,13.9z';

const PATH_SETTINGS = `
  M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49
  1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38
  2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11
  1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4
  1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49
  1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5
  3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z
`;

const PATH_SUSPEND = `
  M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97
  0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z
`;

const PATH_TOGGLE =
  'M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z';
