const commodityAliases = {
  wheat: 'WHEAT',
  'गेहूं': 'WHEAT',
  rice: 'RICE',
  paddy: 'PADDY',
  cotton: 'COTTON',
};

const marketData = {
  WHEAT: { general: 2400, pune: 2520, nagpur: 2480 },
  RICE: { general: 2200, pune: 2280 },
  PADDY: { general: 1950 },
  COTTON: { general: 6200, akola: 6400 },
};

const el = (id) => document.getElementById(id);
const state = {
  lastQuery: null,
  watchlist: JSON.parse(localStorage.getItem('watchlist') || '[]'),
};

function normalizeCrop(input) {
  const key = (input || '').trim().toLowerCase();
  return commodityAliases[key] || key.toUpperCase();
}

function normalizeDistrict(input) {
  return (input || '').trim().toLowerCase();
}

function setStatus(text) {
  el('status').textContent = text;
}

function fetchPrice(cropRaw, districtRaw) {
  const crop = normalizeCrop(cropRaw);
  const district = normalizeDistrict(districtRaw);
  const data = marketData[crop];

  if (!data) {
    return { ok: false, error: `No data for crop ${crop}` };
  }

  if (district && data[district]) {
    return { ok: true, crop, district, price: data[district], fallback: false };
  }

  if (data.general) {
    return { ok: true, crop, district: district || 'general', price: data.general, fallback: true };
  }

  return { ok: false, error: 'No district or fallback data available' };
}

function renderWatchlist() {
  const ul = el('watchlist');
  ul.innerHTML = '';
  state.watchlist.forEach((w, i) => {
    const item = document.createElement('li');
    const now = fetchPrice(w.crop, w.district);
    let msg = `${w.crop} @ ${w.district || 'general'} | last: ₹${w.lastPrice}`;
    if (now.ok) {
      const rise = ((now.price - w.lastPrice) / w.lastPrice) * 100;
      if (rise >= 10) {
        msg += ` | 🔔 Price Surge: ₹${now.price} (+${rise.toFixed(1)}%)`;
      } else {
        msg += ` | current: ₹${now.price}`;
      }
    }

    const remove = document.createElement('button');
    remove.textContent = 'Remove';
    remove.className = 'secondary';
    remove.onclick = () => {
      state.watchlist.splice(i, 1);
      localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
      renderWatchlist();
    };

    item.textContent = msg + ' ';
    item.appendChild(remove);
    ul.appendChild(item);
  });
}

function runSearch() {
  const crop = el('cropInput').value;
  const district = el('districtInput').value;
  state.lastQuery = { crop, district };

  setStatus('Loading...');
  setTimeout(() => {
    const res = fetchPrice(crop, district);
    if (!res.ok) {
      setStatus('Error');
      el('result').textContent = res.error;
      return;
    }

    setStatus('Success');
    el('result').textContent = `${res.crop} price in ${res.district}: ₹${res.price}${res.fallback ? ' (fallback: general mandi data)' : ''}`;
  }, 300);
}

el('searchBtn').onclick = runSearch;
el('retryBtn').onclick = () => {
  if (!state.lastQuery) return;
  el('cropInput').value = state.lastQuery.crop;
  el('districtInput').value = state.lastQuery.district;
  runSearch();
};

el('addWatch').onclick = () => {
  const crop = normalizeCrop(el('watchCrop').value);
  const district = normalizeDistrict(el('watchDistrict').value);
  const current = fetchPrice(crop, district);
  if (!current.ok) {
    alert(current.error);
    return;
  }

  state.watchlist.push({
    crop,
    district,
    lastPrice: current.price,
  });
  localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
  renderWatchlist();
};

el('convertBtn').onclick = () => {
  const value = Number(el('unitValue').value);
  const from = el('fromUnit').value;
  const to = el('toUnit').value;
  if (!Number.isFinite(value)) {
    el('convertOut').textContent = 'Enter a valid value.';
    return;
  }

  const toAcre = {
    acre: 1,
    hectare: 2.47105,
    bigha: 0.619834,
    kanal: 0.125,
    guntha: 0.025,
  };

  const acres = value * toAcre[from];
  const out = acres / toAcre[to];
  el('convertOut').textContent = `${value} ${from} = ${out.toFixed(4)} ${to}`;
};

el('themeToggle').onclick = () => document.body.classList.toggle('dark');

el('voiceBtn').onclick = () => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    alert('Speech recognition not supported in this browser.');
    return;
  }

  const recog = new SR();
  recog.lang = 'en-IN';
  recog.onresult = (e) => {
    const text = e.results[0][0].transcript;
    el('cropInput').value = text;
  };
  recog.start();
};

renderWatchlist();
