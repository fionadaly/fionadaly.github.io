const INQUIRY_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxsma0kSxS02XggQ2gbeLMWT4sjfZR6mCCxpH8r7s4j5nFQnQhknFN3scV6YvdDUEBm/exec';

const playlists = [
  { title: "The...26", url: "https://open.spotify.com/playlist/6NttOpzlNvdhIpLaQCMlrv?si=11bd26933f8a4c83" },
  { title: "The...25", url: "https://open.spotify.com/playlist/1cUdU40dJ3f50e7HG2WGj1?si=eaebedb6f7e44921" },
  { title: "The...24", url: "https://open.spotify.com/playlist/64JTBDikDQRRpGdAKnxAtP?si=b64d5eaf9e5f46db" },
  { title: "The...23", url: "https://open.spotify.com/playlist/6YubPdwLtgf9k7ScGiirUy?si=eaea7d507c9d4f10" },
  { title: "The...22", url: "https://open.spotify.com/playlist/3zb9EyPMdeejP5sTcDj5Bj?si=a9fd978bc68e4de4" },
  { title: "The...21", url: "https://open.spotify.com/playlist/4OaEQK1p5hilm9xXc0gkFs?si=b27ce6db45fd418c" },
  { title: "The...20", url: "https://open.spotify.com/playlist/3tVbpfIVrOVefbCYDCqZub?si=1ad7692e0c6c4639" },
  { title: "The...19", url: "https://open.spotify.com/playlist/3fOLsvhWwYi7Qsk70sOvR2?si=d5912e60251b4f4d" },
  { title: "The...18", url: "https://open.spotify.com/playlist/3WBPBK38EiHeItpIDXlgzl?si=77b5fae8deab401d" },
  { title: "The...17", url: "https://open.spotify.com/playlist/2XEl8bb6CJPZD77PdzuaWm?si=046f8afac1a549bf" },
  { title: "The...16", url: "https://open.spotify.com/playlist/1320WZvd0vxcGUwbD4LfjG?si=afd4a78204164f3f" },
  { title: "The...15", url: "https://open.spotify.com/playlist/6vGMpRdy3TaY4pMt48ylQW?si=221cf67a46414311" },
  { title: "The...14", url: "https://open.spotify.com/playlist/01vFniD0bzhL88QR5XZfRE?si=673e42e12783400d" },
  { title: "The...13", url: "https://open.spotify.com/playlist/15vxlxYQKujfDZIbs6z3ah?si=7c4a00e11eb44f56" },
  { title: "The...12", url: "https://open.spotify.com/playlist/3rBrWiC27e6hV3OWRWxrTR?si=174b7226e2dc4d72" },
  { title: "The...11", url: "https://open.spotify.com/playlist/53RaN23SuGcxFrY4D7Mft6?si=b3dada3e8dbf4992" },
  { title: "The...10", url: "https://open.spotify.com/playlist/7FhCCFBMgcQ6P9ACwqrfbF?si=bfdb6baa80d6436d" },
  { title: "The...9", url: "https://open.spotify.com/playlist/6yxrAet3Sx9wgbEoHLjZwA?si=34bc3809149743a2" },
  { title: "The...8", url: "https://open.spotify.com/playlist/5facCvb0A01Sbc3hUDPPwv?si=596d6a1eabfc4362" },
  { title: "The...7", url: "https://open.spotify.com/playlist/6rBiFdC1SDGjyUPDWjfvzQ?si=1942b83a4abc4623" },
  { title: "The...6", url: "https://open.spotify.com/playlist/02nMOM8PPvVxpsZzcbSZ1T?si=1b03571511674ec0" },
  { title: "The...5", url: "https://open.spotify.com/playlist/6TTnFQlrgcTdpVbWqEnY5O?si=d0323fa0c88a48bb" },
  { title: "The...4", url: "https://open.spotify.com/playlist/4YUBvbhuGtf2kSmM64B900?si=121fa10a1d4542a2" },
  { title: "The...3", url: "https://open.spotify.com/playlist/2vYLJc1rOCHS6QsR1OvO06?si=e3d723fda9af4bd4" },
  { title: "The...2", url: "https://open.spotify.com/playlist/2tZKFmw2MszQP0bmNdQWfF?si=1c9d5d8ca8fc4a2c" },
  { title: "The...1", url: "https://open.spotify.com/playlist/0OLdh8IeNtholLE0aPTyUD?si=17fa3d3f490e4dde" }
];

function setStatus(element, message, state) {
  if (!element) return;
  element.textContent = message;
  element.classList.remove('is-error', 'is-pending', 'is-success');
  if (state) {
    element.classList.add(state);
  }
}

function extractPlaylistId(url) {
  const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

function generatePlaylistHTML(playlist) {
  const playlistId = extractPlaylistId(playlist.url);
  if (!playlistId) {
    console.error('Invalid Spotify URL for playlist: ' + playlist.title);
    return '';
  }

  return (
    '<div class="playlist-item">' +
      '<iframe ' +
        'src="https://open.spotify.com/embed/playlist/' + playlistId + '?utm_source=generator&theme=0&view=list" ' +
        'width="100%" ' +
        'height="400" ' +
        'frameBorder="0" ' +
        'allowfullscreen ' +
        'allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" ' +
        'loading="lazy">' +
      '</iframe>' +
    '</div>'
  );
}

function renderPlaylists() {
  const container = document.getElementById('playlist-container');
  if (!container) return;
  container.innerHTML = playlists.map(generatePlaylistHTML).join('');
}

function setupInquiryForm() {
  const form = document.getElementById('inquiry-form');
  const nameInput = document.getElementById('inquiry-name');
  const emailInput = document.getElementById('inquiry-email');
  const messageInput = document.getElementById('inquiry-message');
  const statusDiv = document.getElementById('inquiry-message-status');

  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = (nameInput.value || '').trim();
    const email = (emailInput.value || '').trim();
    const message = (messageInput.value || '').trim();

    if (!message) {
      setStatus(statusDiv, 'Please enter a message.', 'is-error');
      return;
    }

    setStatus(statusDiv, 'Sending...', 'is-pending');

    fetch(INQUIRY_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'inquiry',
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toLocaleString(),
        source: 'Contact Page'
      })
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Network response was not ok');
        setStatus(statusDiv, 'Thanks! Your inquiry has been received!', 'is-success');
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
        setTimeout(function () { setStatus(statusDiv, ''); }, 4000);
      })
      .catch(function (error) {
        console.error(error);
        setStatus(statusDiv, 'There was a problem submitting. Please try again later.', 'is-error');
      });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  renderPlaylists();
  setupInquiryForm();
});
