(() => {
  'use strict';
  const catalog=window.AD_SPECS,$=id=>document.getElementById(id);
  const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  const requested=catalog.formats.find(f=>f.id===new URLSearchParams(location.search).get('form')); let platform=requested?.platform||'Meta',formatId=requested?.id||catalog.formats[0].id,timer;
  const selected=new Set(), profileSelections=new Map(), selectedSpecs=new Map();
  const getSpec=()=>catalog.resolveSpec(formatId,profileSelections.get(formatId));
  function renderSpecs(){const s=getSpec();const textRules=[...s.fields,...(s.cards?.fields||[])].map(f=>({label:(s.cards?.fields.includes(f)?'每張圖卡 ':'')+f.label,value:`${esc(catalog.textLimit(s,f.limit))}${f.max>1?`；${f.min}–${f.max} 則`:''}${f.requirement?`；${f.requirement}`:''}${f.note?`；${f.note}`:''}`,type:f.mode==='recommendation'?'建議長度':f.mode==='delivery'?'交付需求':'硬性上限'}));$('specContent').innerHTML=`${AdExamples.render(s.id)}${s.copyProfileLabel?`<div class="notes"><h3>本表適用活動</h3><p>${esc(s.copyProfileLabel)}</p><p>${esc(s.copyProfileNote)}</p></div>`:''}${s.ratios?`<h3>一款素材，準備三種比例</h3><p>同一個創意分別輸出三個尺寸，配合版位重排主體與文案。</p><div class="ratio-grid">${s.ratios.map(r=>`<article class="ratio-card"><strong>${esc(r.ratio)}</strong><h4>${esc(r.size)}</h4><p>${esc(r.placement)}</p><small>${esc(r.note)}</small></article>`).join('')}</div>`:''}<h3>圖片、影片與版位</h3><table class="spec-table"><thead><tr><th>項目</th><th>規格</th><th>性質</th></tr></thead><tbody>${s.rules.map(r=>`<tr><td>${esc(r.label)}</td><td>${esc(r.value)}</td><td>${esc(r.type)}</td></tr>`).join('')}</tbody></table><h3>文案欄位</h3><table class="spec-table"><thead><tr><th>欄位</th><th>規格</th><th>性質</th></tr></thead><tbody>${textRules.map(r=>`<tr><td>${esc(r.label)}</td><td>${esc(r.value)}</td><td>${esc(r.type)}</td></tr>`).join('')}</tbody></table>${(s.placements||[]).map(p=>`<details class="official-details"><summary>${esc(p.name)} · 官方完整規格</summary><div class="official-detail-body"><table class="spec-table"><thead><tr><th>項目</th><th>規格</th><th>性質</th></tr></thead><tbody>${[...p.rules,...p.fields.map(f=>({label:f.label,value:`${esc(catalog.textLimit(p,f.limit))}${f.requirement?`；${f.requirement}`:''}${f.note?`；${f.note}`:''}`,type:'建議長度'}))].map(r=>`<tr><td>${esc(r.label)}</td><td>${esc(r.value)}</td><td>${esc(r.type)}</td></tr>`).join('')}</tbody></table><p>${p.notes.map(esc).join(' ')}</p><a href="${esc(p.source)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">${esc(p.name)} 官方來源</a></div></details>`).join('')}<div class="notes"><h3>進稿注意事項</h3><ul>${s.notes.map(n=>`<li>${esc(n)}</li>`).join('')}</ul></div><div class="sources"><h3>官方文件</h3><p class="source-date">查核日期：${esc(s.checked)}${s.version?` · ${esc(s.version)}`:''}</p><a href="${esc(s.source)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">${s.platform==='LINE LAP'?'LINE 官方規格文件':'官方 '+s.name+' 規格'}</a>${(s.sourceMore||[]).map(x=>`<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">${esc(x.label)}</a>`).join('')}<p class="source-date">來源連結會開啟外部官方網站；不附帶你填寫的文案或連結內容。</p></div>`;}
  function render(){
    const s=getSpec();
    document.querySelectorAll('[data-platform]').forEach(b=>{const on=b.dataset.platform===platform;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
    $('formatList').innerHTML=catalog.formats.filter(f=>f.platform===platform).map(f=>`<button class="format-button ${f.id===formatId?'active':''}" data-format="${f.id}" aria-pressed="${f.id===formatId}"><span class="format-symbol">${{圖片:'IMG',影片:'VID','圖片／影片':'MIX',輪播:'CAR',文字:'TXT'}[f.category]}</span><span>${esc(f.name)}</span></button>`).join('');
    $('formatPlatform').textContent=s.platform+' / '+s.category;
    $('formatName').textContent=s.name;$('category').textContent=s.category;
    $('downloadHint').textContent=selected.size?`已選 ${selected.size} 個格式，匯出同一檔案、各自一個頁簽。`:'可直接下載目前格式，或加入多個格式一起匯出。';$('selectFormat').textContent=selected.has(formatId)?'移除目前格式':'加入目前格式';$('selectedFormats').innerHTML=catalog.formats.filter(f=>selected.has(f.id)).map(f=>`<button class="selected-chip" data-remove="${f.id}" aria-label="移除 ${esc(f.platform+' '+f.name)}">${esc(f.platform+' '+f.name+(selectedSpecs.get(f.id)?.copyProfileLabel?' · '+selectedSpecs.get(f.id).copyProfileLabel:''))} ×</button>`).join('');renderSpecs();simplifyYouTube();window.dispatchEvent(new Event('ad-selection-change'));
  }
  function simplifyYouTube(){
    const s=getSpec();if(s.ytIndependent){
      const table=rules=>`<table class="spec-table"><thead><tr><th>項目</th><th>規格</th></tr></thead><tbody>${rules.map(r=>`<tr><td>${esc(r.label)}</td><td>${esc(r.value)}</td></tr>`).join('')}</tbody></table>`;
      const fields=s.fields.map(f=>({label:f.label+'（'+(f.requirement|| (f.required?'必要':'選填'))+'）',value:(f.limit==null?'依後台 CTA 選項':catalog.textLimit(s,f.limit))+(f.max>1?`；最多 ${f.max} 行`:'')+(f.note?'；'+f.note:'')}));
      $('specContent').innerHTML=`<section class="yt-simple"><h3>${esc(s.sections[0])}</h3>${table(s.rules)}<h3>${esc(s.sections[1])}</h3>${table(fields)}<h3>${esc(s.sections[2])}</h3>${table(s.visual)}<h3>${esc(s.sections[3])}</h3><ul class="yt-checklist">${s.notes.map(n=>`<li>${esc(n)}</li>`).join('')}</ul></section>${AdExamples.render(s.id)}<details class="official-details"><summary>官方來源與查核（${esc(s.checked)}）</summary><div class="sources">${[{label:'本格式官方規格',url:s.source},...s.sourceMore].map(x=>`<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">${esc(x.label)}</a>`).join('')}</div></details>`;return;
    }if(!s.copyProfiles)return;
    const full=$('specContent').innerHTML,preview=AdExamples.render(s.id);
    const activity={single:'一般影片廣告',standalone:'In-feed 影片廣告',vrc:'多格式觸及活動', 'demand-gen':'導流活動'}[s.copyProfileId]||s.copyProfileLabel;
    const lines=s.fields.map(f=>`<tr><td>${esc(f.label)}（${f.required?'必要':'選填'}）</td><td>${esc(catalog.textLimit(s,f.limit))}${f.max>1?`；最多 ${f.max} 則`:''}</td></tr>`).join('');
    $('specContent').innerHTML=`<section class="yt-simple"><h3>Google Ads · ${esc(activity)}</h3><p>交付公開或不公開的 YouTube 影片連結、Landing URL。${s.id==='google-bumper'?'影片最多 6 秒。':''}</p><table class="spec-table"><thead><tr><th>填寫項目</th><th>字數限制</th></tr></thead><tbody>${lines}</tbody></table><p class="notice">全形中文與半形英數混用時需合計；中文換算採保守估算，實際以後台為準。Landing URL：確認網址有效／產品已上架，建議加上 UTM。</p></section>${preview}<details class="official-details"><summary>查看完整素材規格與官方來源</summary>${full.slice(preview.length)}</details>`;
  }
  async function download(button){
    button.disabled=true;const label=button.textContent;button.textContent='正在產生表單…';
    try{
      const formats=selected.size?catalog.formats.filter(f=>selected.has(f.id)).map(f=>selectedSpecs.get(f.id)||catalog.resolveSpec(f.id)):[getSpec()];
      const sheets=[];
      for(const [i,f] of formats.entries()){button.textContent=`正在加入預覽圖 ${i+1}/${formats.length}…`;const sheet=AdExcel.buildTemplate(f,catalog)[0];sheets.push(AdExcel.withPreview(sheet,await AdExamples.toImage(f.id)));}
      if(button.id==='downloadCombined')sheets.push(window.SpecSummary.buildSheet(formats));
      const bytes=await AdExcel.makeWorkbook(sheets);
      const url=URL.createObjectURL(new Blob([bytes],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
      const a=document.createElement('a');a.href=url;a.download=`${button.id==='downloadCombined'?'廣告素材進稿表與規格總表':'廣告素材進稿表'}_${formats.length>1?'多媒體':formats[0].platform}.xlsx`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
      $('toast').textContent=button.id==='downloadCombined'?'已下載同一個 Excel：包含進稿表各頁簽與一張規格總表。':'已下載進稿表；每個格式各一頁簽，請填淡黃色欄位。';
    }catch(error){$('toast').textContent='表單產生失敗，請確認網頁檔案完整。';console.error(error);}
    finally{button.disabled=false;button.textContent=label;$('toast').hidden=false;clearTimeout(timer);timer=setTimeout(()=>$('toast').hidden=true,5000);}
  }
  document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.platform){platform=b.dataset.platform;formatId=catalog.formats.find(f=>f.platform===platform).id;render();}else if(b.dataset.format){formatId=b.dataset.format;render();}else if(b.id==='selectFormat'){if(selected.has(formatId)){selected.delete(formatId);selectedSpecs.delete(formatId);}else{selected.add(formatId);selectedSpecs.set(formatId,getSpec());}render();}else if(b.dataset.remove){selected.delete(b.dataset.remove);selectedSpecs.delete(b.dataset.remove);render();}else if(b.id==='downloadTemplate'||b.id==='downloadCombined')download(b);});
  window.AdSelection={getFormats:()=>selected.size?catalog.formats.filter(f=>selected.has(f.id)).map(f=>selectedSpecs.get(f.id)||catalog.resolveSpec(f.id)):[getSpec()],hasSelected:()=>selected.size>0};
  $('checkedDate').textContent=catalog.checked;$('scheduleText').textContent=catalog.schedule.text;
  $('versionText').textContent='規格版本 '+catalog.version+' · '+catalog.formats.length+' 種常用格式';render();
})();
