import React, { useLayoutEffect, useRef, useState } from 'react';

import styles from './Console.module.css';

function argsToText(args) {
  if (args.length === 0) {
    return '';
  }

  let text = args.shift();

  if (typeof text === 'string') {
    while (text.includes('%s')) {
      text = text.replace('%s', args.shift());
    }
  }

  while (args.length > 0) {
    text += ' ' + args.shift();
  }

  return text;
}

export default function Console({ hidden, iframeRef }) {
  const inputRef = useRef();
  const [entries, setEntries] = useState([]);

  useLayoutEffect(() => {
    const { contentWindow } = iframeRef.current;
    contentWindow.console.error = (...args) =>
      setEntries(entries => [
        ...entries,
        { type: 'Error', text: argsToText(args) },
      ]);
    contentWindow.console.info = (...args) =>
      setEntries(entries => [
        ...entries,
        { type: 'Info', text: argsToText(args) },
      ]);
    contentWindow.console.log = (...args) =>
      setEntries(entries => [
        ...entries,
        { type: 'Log', text: argsToText(args) },
      ]);
    contentWindow.console.warn = (...args) =>
      setEntries(entries => [
        ...entries,
        { type: 'Warn', text: argsToText(args) },
      ]);
  }, [iframeRef]);

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();

      const text = event.target.innerText;

      event.target.innerText = '';

      const { contentWindow } = iframeRef.current;

      try {
        contentWindow.eval(text);
      } catch (error) {
        setEntries(entries => [
          ...entries,
          { type: 'Error', text: error.message },
        ]);
      }
    }
  };

  return (
    <div
      className={styles.Console}
      hidden={hidden}
      onClick={() => inputRef.current.focus()}
    >
      {entries.map((entry, index) => (
        <div className={entry.type} key={index}>
          {entry.text}
        </div>
      ))}
      <div
        ref={inputRef}
        className={styles.Input}
        contentEditable
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
