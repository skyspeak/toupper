/* Paints the agent marks in the Ask our Agents page header. */
(function () {
  var el = document.getElementById('askFaces');
  if (!el) return;
  el.innerHTML = ['sam', 'perry', 'bill', 'sarah', 'rick'].map(TU.agent).filter(Boolean).map(TU.mark).join('');
  TU.paintMarks(el);
})();
