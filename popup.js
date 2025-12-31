document.addEventListener('DOMContentLoaded', async () => {
  const statusEl = document.getElementById('status');
  const notYoutubeEl = document.getElementById('not-youtube');
  const mainContentEl = document.getElementById('main-content');
  const videoTitleEl = document.getElementById('video-title');
  const promptTextarea = document.getElementById('prompt');
  const extractBtn = document.getElementById('extract-btn');

  let currentVideoUrl = null;

  // Load saved prompt
  const savedPrompt = localStorage.getItem('saved_prompt');
  if (savedPrompt) {
    promptTextarea.value = savedPrompt;
  }

  // Check if current tab is YouTube
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab.url || !tab.url.includes('youtube.com/watch')) {
      statusEl.classList.add('hidden');
      notYoutubeEl.classList.remove('hidden');
      return;
    }

    currentVideoUrl = tab.url;
    const videoTitle = tab.title.replace(' - YouTube', '');

    statusEl.classList.add('hidden');
    mainContentEl.classList.remove('hidden');
    videoTitleEl.textContent = videoTitle;

  } catch (error) {
    statusEl.textContent = '탭 정보를 가져올 수 없습니다.';
    console.error('Error getting tab info:', error);
    return;
  }

  // Open Gemini with prompt
  extractBtn.addEventListener('click', () => {
    const userPrompt = promptTextarea.value.trim();
    if (!userPrompt) {
      alert('프롬프트를 입력해주세요.');
      return;
    }

    // Build the full prompt
    const fullPrompt = `${currentVideoUrl} ${userPrompt}`;

    // Save prompt for next time
    localStorage.setItem('saved_prompt', userPrompt);

    // Open Gemini with prompt in URL hash
    const geminiUrl = `https://gemini.google.com/app#prompt=${encodeURIComponent(fullPrompt)}`;
    chrome.tabs.create({ url: geminiUrl });
  });
});
