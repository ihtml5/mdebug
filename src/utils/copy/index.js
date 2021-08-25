// 复制到剪贴板
export const toCopy = (data) => {
    if (typeof document.execCommand !== 'function') {
      return false;
    }
    const fragment = document.createElement('div');
    fragment.innerHTML = data;
    let selection;
    let clipSuccess = false;
    const fragmentChildren = [...fragment.children];
    fragmentChildren.forEach((childrenDom) => {
      try {
        document.body.appendChild(childrenDom);
        if (childrenDom.hasAttribute('contenteditable')) {
          childrenDom.focus();
        }
        selection = window.getSelection();
        const range = document.createRange();
        range.selectNode(childrenDom);
        selection.removeAllRanges();
        selection.addRange(range);
        clipSuccess = document.execCommand('copy');
      } catch (e) {
        clipSuccess = false;
      }
      document.body.removeChild(childrenDom);
    });
    if (selection) {
      selection.removeAllRanges();
    }
    return clipSuccess;
  };
  
  
  const select = (element) => {
    const isReadOnly = element.hasAttribute('readonly');
  
    if (!isReadOnly) {
      element.setAttribute('readonly', '');
    }
  
    element.select();
    element.setSelectionRange(0, element.value.length);
  
    if (!isReadOnly) {
      element.removeAttribute('readonly');
    }
  
    const selectedText = element.value;
    return selectedText;
  };
  
export const copyText = () => {
    let succeeded = false;
    try {
      succeeded = document.execCommand('copy');
    } catch (err) {
      succeeded = false;
    }
    return succeeded;
  };
  
  const selectFake = (text) => {
    const fakeElem = document.createElement('textarea');
    // Prevent zooming on iOS
    fakeElem.style.fontSize = '12pt';
    // Reset box model
    fakeElem.style.border = '0';
    fakeElem.style.padding = '0';
    fakeElem.style.margin = '0';
    // Move element out of screen horizontally
    fakeElem.style.position = 'absolute';
    fakeElem.style.left = '-9999px';
    // Move element to the same position vertically
    const yPosition = window.pageYOffset || document.documentElement.scrollTop;
    fakeElem.style.top = `${yPosition}px`;
  
    fakeElem.setAttribute('readonly', '');
    fakeElem.value = text;
  
    document.body.appendChild(fakeElem);
  
    select(fakeElem);
    copyText();
  };
  
  export const copyToClip = (text) => {
    selectFake(text);
    return copyText();
  };
  
  