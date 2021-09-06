import { activate, initialize } from 'react-devtools-inline/backend';

if (window.location.search.includes('initDevToolsBackend')) {
  initialize(window);
  const onMessage = ({ data }) => {
    switch (data.type) {
      case 'activate-backend':
        window.removeEventListener('message', onMessage);
        activate(window);
        break;
      default:
        break;
    }
  };

  window.addEventListener('message', onMessage);
}
