// Inject prompt into Gemini input field
(function() {
  // Get prompt from URL hash
  const hash = window.location.hash;
  if (!hash || !hash.includes('prompt=')) {
    return;
  }

  const prompt = decodeURIComponent(hash.replace('#prompt=', ''));
  if (!prompt) {
    return;
  }

  // Clear the hash
  history.replaceState(null, '', window.location.pathname);

  // Wait for the input field to appear
  const maxAttempts = 30;
  let attempts = 0;

  const tryInject = () => {
    attempts++;

    // Try different selectors for the input field
    const selectors = [
      'rich-textarea div[contenteditable="true"]',
      'div[contenteditable="true"]',
      '.ql-editor',
      'textarea[aria-label]',
      'textarea'
    ];

    let inputField = null;
    for (const selector of selectors) {
      inputField = document.querySelector(selector);
      if (inputField) break;
    }

    if (inputField) {
      // Focus the field
      inputField.focus();

      if (inputField.tagName === 'TEXTAREA') {
        inputField.value = prompt;
        inputField.dispatchEvent(new Event('input', { bubbles: true }));
      } else {
        // For contenteditable divs
        inputField.innerHTML = '';

        // Create a text node and insert
        const p = document.createElement('p');
        p.textContent = prompt;
        inputField.appendChild(p);

        // Trigger input event
        inputField.dispatchEvent(new InputEvent('input', {
          bubbles: true,
          cancelable: true,
          inputType: 'insertText',
          data: prompt
        }));
      }

      console.log('YouTube Gemini Table: Prompt injected');

      // Try to find and click the submit button
      setTimeout(() => {
        const submitBtn = document.querySelector('button[aria-label*="Send"], button[aria-label*="전송"], button.send-button, button[mattooltip*="Send"]');
        if (submitBtn && !submitBtn.disabled) {
          submitBtn.click();
          console.log('YouTube Gemini Table: Submit clicked');
        }
      }, 800);

    } else if (attempts < maxAttempts) {
      setTimeout(tryInject, 500);
    } else {
      console.log('YouTube Gemini Table: Input field not found after', maxAttempts, 'attempts');
    }
  };

  // Start after page loads
  if (document.readyState === 'complete') {
    setTimeout(tryInject, 1500);
  } else {
    window.addEventListener('load', () => setTimeout(tryInject, 1500));
  }
})();
