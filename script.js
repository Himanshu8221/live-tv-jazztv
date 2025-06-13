const video = document.getElementById('video');
const channelList = document.getElementById('channel-list');
let hls;

async function fetchM3U(url) {
  const response = await fetch(url);
  const text = await response.text();
  const lines = text.split('\n');

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('#EXTINF')) {
      const name = lines[i].split(',')[1] || 'Unnamed Channel';
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
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = url;
    video.play();
  }
}

fetchM3U("http://103.168.18.108/jazztv/m3u.php");
