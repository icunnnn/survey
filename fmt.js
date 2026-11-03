// Pemformat teks keterangan: **tebal**, *miring*, "# judul", "1. daftar bernomor", "- daftar poin"
window.fmt = t => {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const inl = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>');
  let out = '', list = null;
  const close = () => { if (list) { out += `</${list}>`; list = null; } };
  for (const ln of String(t || '').split('\n')) {
    let m;
    if (m = ln.match(/^\s*\d+[.)]\s+(.*)/)) { if (list !== 'ol') { close(); out += '<ol>'; list = 'ol'; } out += `<li>${inl(m[1])}</li>`; }
    else if (m = ln.match(/^\s*[-•]\s+(.*)/)) { if (list !== 'ul') { close(); out += '<ul>'; list = 'ul'; } out += `<li>${inl(m[1])}</li>`; }
    else { close(); if (m = ln.match(/^#\s+(.*)/)) out += `<h3>${inl(m[1])}</h3>`; else if (ln.trim()) out += `<p>${inl(ln)}</p>`; }
  }
  close();
  return out;
};

// Skala (Likert): {n: jumlah angka, labels: [keterangan tiap angka]}.
// Data lama berupa [kiri, kanan] (skala 5) atau kosong, tetap dikenali.
window.lkNorm = o => {
  if (o && !Array.isArray(o)) {
    const n = Math.min(10, Math.max(2, +o.n || 5));
    return { n, labels: Array.from({ length: n }, (_, i) => (o.labels || [])[i] || '') };
  }
  const [a, b] = o && o.length ? o : ['Sangat tidak setuju', 'Sangat setuju'];
  return { n: 5, labels: [a || '', '', '', '', b || ''] };
};
