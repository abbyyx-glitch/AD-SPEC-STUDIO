(() => {
  'use strict';
  const catalog=window.AD_SPECS,$=id=>document.getElementById(id);
  const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  let platform='Meta',formatId=catalog.formats[0].id,timer;
  const selected=new Set();
  const getSpec=()=>catalog.formats.find(f=>f.id===formatId);
  function renderSpecs(){const s=getSpec();const textRules=[...s.fields,...(s.cards?.fields||[])].map(f=>({label:(s.cards?.fields.includes(f)?'每張圖卡 ':'')+f.label,value:`${f.limit??'未設定'} ${s.counting==='google'?'計數單位':'字元'}${f.max>1?`；${f.min}–${f.max} 則`:''}${f.requirement?`；${f.requirement}`:''}${f.note?`；${f.note}`:''}`,type:f.mode==='recommendation'?'建議長度':f.mode==='delivery'?'交付需求':'硬性上限'}));$('specContent').innerHTML=`${AdExamples.render(s.id)}${s.ratios?`<h3>一款素材，準備三種比例</h3><p>同一個創意分別輸出三個尺寸，配合版位重排主體與文案。</p><div class="ratio-grid">${s.ratios.map(r=>`<article class="ratio-card"><strong>${esc(r.ratio)}</strong><h4>${esc(r.size)}</h4><p>${esc(r.placement)}</p><small>${esc(r.note)}</small></article>`).join('')}</div>`:''}<h3>圖片、影片與版位</h3><table class="spec-table"><thead><tr><th>項目</th><th>規格</th><th>性質</th></tr></thead><tbody>${s.rules.map(r=>`<tr><td>${esc(r.label)}</td><td>${esc(r.value)}</td><td>${esc(r.type)}</td></tr>`).join('')}</tbody></table><h3>文案欄位</h3><table class="spec-table"><thead><tr><th>欄位</th><th>規格</th><th>性質</th></tr></thead><tbody>${textRules.map(r=>`<tr><td>${esc(r.label)}</td><td>${esc(r.value)}</td><td>${esc(r.type)}</td></tr>`).join('')}</tbody></table>${(s.placements||[]).map(p=>`<details class="official-details"><summary>${esc(p.name)} · 官方完整規格</summary><div class="official-detail-body"><table class="spec-table"><thead><tr><th>項目</th><th>規格</th><th>性質</th></tr></thead><tbody>${[...p.rules,...p.fields.map(f=>({label:f.label,value:`${f.limit} 字元${f.requirement?`；${f.requirement}`:''}${f.note?`；${f.note}`:''}`,type:'建議長度'}))].map(r=>`<tr><td>${esc(r.label)}</td><td>${esc(r.value)}</td><td>${esc(r.type)}</td></tr>`).join('')}</tbody></table><p>${p.notes.map(esc).join(' ')}</p><a href="${esc(p.source)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">${esc(p.name)} 官方來源</a></div></details>`).join('')}<div class="notes"><h3>進稿注意事項</h3><ul>${s.notes.map(n=>`<li>${esc(n)}</li>`).join('')}</ul></div><div class="sources"><h3>官方文件</h3><p class="source-date">查核日期：${esc(s.checked)}${s.version?` · ${esc(s.version)}`:''}</p><a href="${esc(s.source)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">${s.platform==='LINE LAP'?'LINE 官方規格文件':'官方 '+s.name+' 規格'}</a>${(s.sourceMore||[]).map(x=>`<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">${esc(x.label)}</a>`).join('')}<p class="source-date">來源連結會開啟外部官方網站；不附帶你填寫的文案或連結內容。</p></div>`;}
  function render(){
    const s=getSpec();
    document.querySelectorAll('[data-platform]').forEach(b=>{const on=b.dataset.platform===platform;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
    $('formatList').innerHTML=catalog.formats.filter(f=>f.platform===platform).map(f=>`<button class="format-button ${f.id===formatId?'active':''}" data-format="${f.id}" aria-pressed="${f.id===formatId}"><span class="format-symbol">${{圖片:'IMG',影片:'VID','圖片／影片':'MIX',輪播:'CAR',文字:'TXT'}[f.category]}</span><span>${esc(f.name)}</span></button>`).join('');
    $('formatPlatform').textContent=s.platform+' / '+s.category;
    $('formatName').textContent=s.name;$('category').textContent=s.category;
    $('downloadHint').textContent=selected.size?`已選 ${selected.size} 個格式，匯出同一檔案、各自一個頁簽。`:'可直接下載目前格式，或加入多個格式一起匯出。';$('selectFormat').textContent=selected.has(formatId)?'移除目前格式':'加入目前格式';$('selectedFormats').innerHTML=catalog.formats.filter(f=>selected.has(f.id)).map(f=>`<button class="selected-chip" data-remove="${f.id}" aria-label="移除 ${esc(f.platform+' '+f.name)}">${esc(f.platform+' '+f.name)} ×</button>`).join('');renderSpecs();
  }
  async function download(button){
    button.disabled=true;const label=button.textContent;button.textContent='正在產生表單…';
    try{
      const formats=selected.size?catalog.formats.filter(f=>selected.has(f.id)):[getSpec()];
      const sheets=[];
      for(const [i,f] of formats.entries()){button.textContent=`正在加入預覽圖 ${i+1}/${formats.length}…`;const sheet=AdExcel.buildTemplate(f,catalog)[0];sheets.push(AdExcel.withPreview(sheet,await AdExamples.toImage(f.id)));}
      const bytes=await AdExcel.makeWorkbook(sheets);
      const url=URL.createObjectURL(new Blob([bytes],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
      const a=document.createElement('a');a.href=url;a.download=`廣告素材進稿表_${formats.length>1?'多媒體':formats[0].platform}.xlsx`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
      $('toast').textContent='已下載進稿表；每個格式各一頁簽，請填淡黃色欄位。';
    }catch(error){$('toast').textContent='表單產生失敗，請確認網頁檔案完整。';console.error(error);}
    finally{button.disabled=false;button.textContent=label;$('toast').hidden=false;clearTimeout(timer);timer=setTimeout(()=>$('toast').hidden=true,5000);}
  }
  document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.platform){platform=b.dataset.platform;formatId=catalog.formats.find(f=>f.platform===platform).id;render();}else if(b.dataset.format){formatId=b.dataset.format;render();}else if(b.id==='selectFormat'){selected.has(formatId)?selected.delete(formatId):selected.add(formatId);render();}else if(b.dataset.remove){selected.delete(b.dataset.remove);render();}else if(b.id==='downloadTemplate')download(b);});
  $('checkedDate').textContent=catalog.checked;$('scheduleText').textContent=catalog.schedule.text;
  $('versionText').textContent='規格版本 '+catalog.version+' · '+catalog.formats.length+' 種常用格式';render();
})();
