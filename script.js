const video = document.getElementById('video');
const channelList = document.getElementById('channel-list');
let hls;

async function fetchM3U(url) {
  const response = await fetch(url);
  const text = await response.text();
  const lines = text.split('\n');

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('#EXTINF')) {
      const name = lines[i].split(',')[1] || 'Channel';
      const streamUrl = lines[i + 1];
      if (streamUrl && streamUrl.startsWith('http')) {
        const button = document.createElement('button');
        button.textContent = name;
        button.onclick = () => playStream(streamUrl);
        channelList.appendChild(button);
      }
    }
  }
}

function playStream(url) {
  if (hls) hls.destroy();
  if (Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
  } else {
    video.src = url;
    video.play();
  }
}

// Replace with your GitHub-hosted M3U file URL:
fetchM3U("https://github.com/Himanshu8221/live-tv-jazztv/blob/main/jaaz%20tv.m3u");
