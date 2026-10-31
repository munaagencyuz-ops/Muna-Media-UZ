// Progressive enhancement: native disclosures and city links work without JavaScript.
(() => {
 'use strict';
 const search = document.querySelector('#city-filter');
 const region = document.querySelector('#region-filter');
 const reset = document.querySelector('#city-reset');
 const status = document.querySelector('#city-count');
 const empty = document.querySelector('#city-empty');
 if (!search || !region || !reset || !status || !empty) return;
 const uz = document.documentElement.lang === 'uz';
 const normalize = value => value.toLocaleLowerCase().replace(/ё/g,'е').replace(/['‘’ʻʼ`]/g,'').replace(/\s+/g,' ').trim();
 const groups = [...document.querySelectorAll('.hub-region')].map(element => ({
  element, initialOpen:element.open,
  entries:[...element.querySelectorAll('.city-entry')].map(element => ({element, text:normalize(element.dataset.city)}))
 }));
 function update() {
  const terms = normalize(search.value).split(' ').filter(Boolean);
  const filtering = terms.length > 0 || region.value !== '';
  let count = 0;
  groups.forEach(group => {
   let matches = 0;
   group.entries.forEach(entry => {
    const match = (!region.value || region.value === group.element.dataset.region) && terms.every(term => entry.text.includes(term));
    entry.element.hidden = !match;
    if (match) matches++;
   });
   group.element.hidden = matches === 0;
   group.element.open = filtering ? matches > 0 : group.initialOpen;
   group.element.querySelector('.hub-region-count').textContent = String(matches);
   count += matches;
  });
  status.textContent = uz ? `Tanlash uchun shaharlar: ${count} / 120` : `Города для выбора: ${count} из 120`;
  empty.hidden = count !== 0;
 }
 search.addEventListener('input',update);
 region.addEventListener('change',update);
 reset.addEventListener('click',() => {
  search.value = '';
  region.value = '';
  update();
  search.focus();
 });
 document.querySelector('.hub-filter').hidden = false;
})();
