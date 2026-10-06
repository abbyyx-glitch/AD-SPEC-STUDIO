/* Local schematic examples. No external images, customer data or live ads. */
(() => {
  const zone=(label,text,kind='text')=>`<div class="ad-zone ad-zone-${kind}"><span class="ad-zone-label">${label}</span><div>${text}</div></div>`;
  const media=(type='圖片',ratio='wide')=>`<div class="ad-demo-media ${ratio}"><span class="ad-zone-label">${type}素材</span><div class="product-scene" aria-hidden="true"><div class="scene-copy"><b>LUMA</b><span>留一點時間<br>給自己。</span><small>DAILY CARE COLLECTION</small></div><span class="scene-leaf"></span><span class="scene-podium"></span><div class="scene-bottle"><span class="bottle-cap"></span><b>LUMA</b><small>DAILY<br>ESSENTIAL</small><em>01</em></div><span class="scene-light"></span></div>${type.includes('影片')?'<span class="demo-play" aria-hidden="true">▶</span>':''}</div>`;
  const cta=()=>zone('CTA 按鈕','瞭解更多','cta');
  const identity=(name='LUMA 日常選物')=>`<div class="ad-demo-identity"><span class="demo-avatar" aria-hidden="true">L</span><div><strong>${name}</strong><small>廣告</small></div></div>`;
  const headline=()=>zone('標題','讓每一天，找到新的靈感','headline');
  const description=()=>zone('說明','從日常保養開始，留一點時間給自己。探索 LUMA 精選，找到適合你的生活提案。');
  const card=(title,body,note='')=>`<figure class="ad-demo-card"><figcaption>${title}</figcaption><div class="ad-demo-surface"><div class="ad-native-frame">${body}</div></div>${note?`<p class="ad-demo-note">${note}</p>`:''}</figure>`;
  const feed=()=>'<div class="mock-platform mock-meta"><b>facebook</b><span>⌕　☰</span></div>'+identity()+zone('主要文字','忙碌的日子，也值得好好照顧自己。探索 LUMA 日常保養，把生活過成喜歡的樣子。')+media('圖片／影片')+'<div class="ad-demo-destination">'+headline()+zone('說明（依版位顯示）','探索日常保養系列')+cta()+'</div><div class="mock-social">♡ 讚　　▢ 留言　　↗ 分享</div>';
  const vertical=(name)=>card(name,`<div class="ad-demo-vertical">${media('圖片／影片','portrait')}<div class="ad-demo-overlay">${zone('品牌／帳號','LUMA 日常選物')}${zone('素材內文字','留一點時間，給自己。')}${zone('文案／字幕（依版位）','LUMA 日常選物 · 為生活留一點空白')}${cta()}</div></div>`,'Stories／Reels 的顯示位置不同；素材內文字與後台文案是不同項目。');
  const ytBar=()=>`<div class="mock-platform mock-youtube"><b><i class="yt-logo">▶</i> YouTube</b><span>⌕　⋮</span></div>`;
  const video=(skip=true)=>`${ytBar()}<div class="yt-player">${media('影片')}<div class="yt-ad-status">廣告 · ${skip?'0:15':'0:06'} <span>ⓘ</span></div><span class="yt-skip">${skip?'略過廣告 ▷':'影片將在 6 秒後播放'}</span><div class="yt-controls">Ⅱ　◀ ▷　${skip?'0:05 / 0:20':'0:00 / 0:06'}<span>⚙　□</span></div></div><div class="yt-ad-panel"><div class="yt-ad-brand"><span class="demo-avatar">L</span><div><strong>LUMA 日常選物</strong><small>贊助商 · example.com</small></div></div>${zone('CTA 短標題','探索新靈感','headline')}${zone('CTA 按鈕','瞭解更多 ↗','cta')}</div><div class="yt-watch-context"><strong>為日常留一點空白｜生活靈感提案</strong><small>日常靈感頻道 · 觀看頁面內容</small><span>♡　分享　⋯</span></div>`;
  const infeed=(multi=false)=>`${ytBar()}<div class="yt-search-query">⌕　日常保養與生活靈感</div><div class="yt-feed-result"><div class="yt-thumbnail">${media('影片縮圖')}<span class="yt-duration">0:20</span></div><div class="yt-feed-copy">${zone(multi?'長標題':'標題',multi?'從早晨到夜晚，探索 LUMA 日常保養，留一點時間給自己':'讓每一天，找到新的靈感','headline')}<small>贊助商 · LUMA 日常選物</small>${multi?zone('說明','從日常保養開始，留一點時間給自己。探索 LUMA 精選，找到適合你的生活提案。'):zone('說明行 1','日常保養，從照顧自己開始')+zone('說明行 2','探索 LUMA 精選生活提案')}</div></div><div class="yt-organic"><div></div><p><strong>讓生活慢下來的五個日常習慣</strong><small>日常靈感頻道 · 1.2 萬次觀看</small></p></div>`;
  const multiCopy=()=>infeed(true);
  const lap=(type,small=false)=>'<div class="mock-platform mock-line"><b>LINE</b><span>推薦　⋮</span></div>'+identity('LUMA 官方帳號')+(small?`<div class="ad-demo-small">${media(type,'square')}<div>${headline()}${zone('小圖片說明','探索日常保養，留一點時間給自己。')}</div></div>`:media(type)+headline()+description())+cta();
  const carousel=(platform)=>`<div class="mock-platform ${platform==='Meta'?'mock-meta':'mock-line'}"><b>${platform==='Meta'?'facebook':'LINE'}</b><span>推薦　⋮</span></div>`+identity(platform==='Meta'?'LUMA 日常選物':'LUMA 官方帳號')+(platform==='Meta'?zone('主要文字','從清晨的第一道光，到夜晚的片刻寧靜。滑動圖卡，探索 LUMA 日常保養，找到屬於你的生活節奏。'):'')+`<div class="ad-demo-carousel">${[1,2].map(i=>`<div class="ad-demo-carousel-card">${media('圖卡 '+i,'square')}${zone('每卡標題',i===1?'晨光日常':'晚間時光','headline')}${zone('每卡說明',i===1?'從容開啟每一天':'留一點時間給自己')}${platform==='Meta'?cta():''}</div>`).join('')}</div>`+(platform==='LINE LAP'?cta():'');
  const examples={
    'meta-creative':()=>[card('動態消息 · 1:1／4:5',feed(),'標題、說明及 CTA 是否顯示，依活動與版位而異。'),vertical('直式版位 · 9:16')],
    'meta-carousel':()=>[card('動態消息 · 輪播',carousel('Meta'),'每張圖卡可有自己的素材、標題、說明與連結。')],
    'google-rsa':()=>[card('Google 搜尋結果',`<div class="mock-platform mock-google"><b>Google</b><span>日常保養　⌕</span></div><div class="ad-demo-search"><small>贊助商 · LUMA 日常選物</small>${zone('顯示路徑','example.com／產品／新品')}${zone('標題（組合顯示）','探索新靈感｜找到你的理想選擇','headline')}${zone('說明（組合顯示）','從日常保養開始，為忙碌生活留一點空白。探索 LUMA 精選系列，找到適合你的選擇。')}</div>`,'多則標題及說明會重新組合；RSA 沒有本表中的獨立 CTA 按鈕欄位。')],
    'google-rda':()=>[card('Google 多媒體廣告','<div class="mock-ad-info">廣告　ⓘ</div>'+zone('商家名稱','LUMA 日常選物')+media('圖片')+zone('短標題／長標題（依版型）','找到你的理想選擇','headline')+description()+zone('CTA（系統選擇）','瞭解更多','cta'),'圖片、標題、說明會依廣告空間組合；Logo 及影片為選填素材。')],
    'google-skippable':()=>[card('YouTube · 可略過串流',video(),'CTA 與短標題依活動設定；影片中的字幕不是後台「說明」欄位。'),card('多格式活動 · In-feed 文案對照',multiCopy(),'長標題與說明依活動／版位使用，不能以 CTA 短標題取代。')],
    'google-bumper':()=>[card('YouTube · Bumper',video(false),'Bumper 不可略過；CTA 與短標題依活動設定。'),card('多格式活動 · In-feed 文案對照',multiCopy(),'同一活動有其他版位時，可能另需長標題與說明。')],
    'google-infeed':()=>[card('YouTube · 動態內影片',infeed(),'這是獨立 In-feed 文案示意；說明在部分版位不顯示，CTA 依活動設定，非固定獨立按鈕。')],
    'line-image':()=>[card('LAP · 一般圖片',lap('圖片'),'1080×1080／1200×628 素材；說明使用「一般圖片說明」欄位。'),card('LAP · 小圖片',lap('圖片',true),'600×400 素材；說明使用獨立的「小圖片說明」欄位。')],
    'line-video':()=>[card('LAP · 一般影片',lap('影片'),'橫式、方形、直式的呈現可能裁切或覆蓋文字；重點請避開安全範圍。')],
    'line-small-video':()=>[card('LAP · 小影片',lap('影片',true).replace('小圖片說明','說明'),'此格式接受橫式／方形；此圖僅示意文案與影片的位置。')],
    'line-carousel':()=>[card('LAP · 輪播',carousel('LINE LAP'),'每張圖卡有自己的標題與說明；實際 CTA 及顯示位置依版位而異。')]
  };
  const render=id=>`<section class="ad-examples" aria-label="廣告格式示意圖"><div class="ad-examples-heading"><h3>廣告格式示意圖</h3><span>模擬廣告畫面 · 欄位對照</span></div><p class="ad-examples-intro">以虛構品牌模擬廣告畫面，外側標籤與指引線對照進稿欄位。非官方截圖，實際呈現依活動、版位與裝置而異。</p><div class="ad-examples-grid">${examples[id]().join('')}</div></section>`;
  async function toImage(id){
    const holder=document.createElement('div');
    holder.setAttribute('aria-hidden','true');
    holder.className='export-preview';holder.innerHTML=render(id);
    Object.assign(holder.style,{position:'fixed',left:'-10000px',top:'0',width:'1100px',padding:'16px',background:'#fff'});
    document.body.appendChild(holder);
    try{
      await document.fonts.ready;
      const width=1100,height=Math.ceil(holder.getBoundingClientRect().height);
      const clone=holder.cloneNode(true);clone.style.position='relative';clone.style.left='0';clone.style.top='0';
      clone.setAttribute('xmlns','http://www.w3.org/1999/xhtml');
      const css=[...document.styleSheets].flatMap(sheet=>[...sheet.cssRules].map(r=>r.cssText)).join('\n');
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('width',width);svg.setAttribute('height',height);
      const object=document.createElementNS('http://www.w3.org/2000/svg','foreignObject');object.setAttribute('width','100%');object.setAttribute('height','100%');
      const style=document.createElement('style');style.textContent=css;clone.prepend(style);object.appendChild(clone);svg.appendChild(object);
      const src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(svg));
      const img=new Image();await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=()=>reject(new Error('Preview image could not be rendered'));img.src=src;});
      const canvas=document.createElement('canvas');canvas.width=width*2;canvas.height=height*2;
      const ctx=canvas.getContext('2d');ctx.scale(2,2);ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height);ctx.drawImage(img,0,0);
      return {base64:canvas.toDataURL('image/png').split(',')[1],width,height};
    }finally{holder.remove();}
  }
  window.AdExamples={render,toImage};
})();
