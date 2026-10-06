/* Fictional demo copy; counts follow the existing spec records. */
(() => {
  const copy={
  "u125": "探索適合你的保養選擇。用簡單的保養步驟，開啟每天的生活。結束忙碌的一天，也別忘了照顧自己。挑選適合自己的系列，安排專屬保養時光。讓每一次日常保養，都成為喜歡的生活儀式。探索精選保養系列，找到屬於自己的生活提案。從今天開始，為每一天留下一段放鬆的時光。",
  "u44": "每一個忙碌的日子，也都值得好好照顧自己。探索日常保養，為生活留一點時間，從容開啟每一天。",
  "u80": "讓日常多一點從容。為自己留一點時間。探索適合你的保養選擇。從早晨到夜晚，照顧每個生活片刻。讓清晨的第一道光，陪你從容出發。挑選適合自己的系列，安排專屬保養時光。",
  "u75": "讓日常多一點從容。為自己留一點時間。探索適合你的保養選擇。從早晨到夜晚，照顧每個生活片刻。找到喜歡的日常節奏。讓每一次日常保養，都成為喜歡的生活儀式。",
  "u35": "讓日常多一點從容。為自己留一點時間。用簡單的保養步驟，開啟每天的生活。",
  "u27": "從早晨到夜晚，探索屬於你的日常保養新靈感，享受自在時光",
  "u20": "從早晨到夜晚，探索屬於你的日常保養新靈感",
  "u18": "探索日常保養靈感，找到自己的生活節奏",
  "g90": "每一個忙碌的日子，也都很值得好好照顧自己。探索日常保養，為生活留一點時間，從容開啟每一天。",
  "g30": "探索日常保養，找到適合你的選擇",
  "g15": "LUMA 日常新靈感",
  "g10": "探索新生活",
  "g80": "忙碌的日子，也值得好好照顧自己。探索日常保養，為生活留一點時間，從容開啟每一天。",
  "g25": "LUMA 日常保養精選新生活館",
  "g35": "LUMA 用心探索日常保養，從早晨到夜晚",
  "path1": "daily-care-shop",
  "path2": "new-collections"
};
  const count=(text,google=false)=>[...text].reduce((n,c)=>n+(google&&c.codePointAt(0)>255?2:1),0);
  const zone=(label,text,kind='text')=>`<div class="ad-zone ad-zone-${kind}"><span class="ad-zone-label">${label}</span><div>${text}</div></div>`;
  const sample=(label,key,kind='text',basis='上限')=>{const text=copy[key],google=key.startsWith('g');const limit=Number(key.slice(1));return zone(label+'（'+count(text,google)+'/'+limit+(google?' 計數單位':' 字元')+' · '+basis+'）',text,kind);};
  const media=(type='圖片',ratio='wide')=>`<div class="ad-demo-media ${ratio}"><span class="ad-zone-label">${type}素材</span><div class="product-scene" aria-hidden="true"><div class="scene-copy"><b>LUMA</b><span>留一點時間<br>給自己。</span><small>DAILY CARE COLLECTION</small></div><span class="scene-leaf"></span><span class="scene-podium"></span><div class="scene-bottle"><span class="bottle-cap"></span><b>LUMA</b><small>DAILY<br>ESSENTIAL</small><em>01</em></div><span class="scene-light"></span></div>${type.includes('影片')?'<span class="demo-play" aria-hidden="true">▶</span>':''}</div>`;
  const cta=(google=false)=>google?sample('CTA','g10','cta'):zone('CTA 按鈕','瞭解更多','cta');
  const identity=(name='LUMA 日常選物')=>`<div class="ad-demo-identity"><span class="demo-avatar" aria-hidden="true">L</span><div><strong>${name}</strong><small>廣告</small></div></div>`;
  const card=(title,body,note='')=>`<figure class="ad-demo-card"><figcaption>${title}</figcaption><div class="ad-demo-surface"><div class="ad-native-frame">${body}</div></div>${note?`<p class="ad-demo-note">${note}</p>`:''}</figure>`;
  const feed=(video=false)=>'<div class="mock-platform mock-meta"><b>facebook</b><span>⌕　☰</span></div>'+identity()+sample('主要文字',video?'u44':'u125','text','共用建議')+media(video?'影片':'圖片')+'<div class="ad-demo-destination">'+sample('標題','u27','headline','建議')+cta()+'</div><div class="mock-social">♡ 讚　　▢ 留言　　↗ 分享</div>';
  const vertical=(reels=false)=>card(reels?'Reels 影片 · 9:16':'Stories 圖片／影片 · 9:16',`<div class="ad-demo-vertical">${media(reels?'影片':'圖片／影片','portrait')}<div class="ad-demo-overlay">${zone('品牌／帳號','LUMA 日常選物')}${zone('素材內文字（無統一字數建議）','留一點時間，給自己。')}${sample('主要文字',reels?'u44':'u125','text','建議')}${cta()}</div></div>`,'素材內文字與後台文案是不同項目；實際顯示依版位與裝置。');
  const ytBar=()=>'<div class="mock-platform mock-youtube"><b><i class="yt-logo">▶</i> YouTube</b><span>⌕　⋮</span></div>';
  const video=(skip=true)=>ytBar()+media('影片')+zone('播放行為',skip?'5 秒後可略過':'6 秒 Bumper，不可略過')+sample('CTA 短標題','g15','headline')+cta(true);
  const infeed=(multi=false)=>ytBar()+media('影片縮圖')+sample(multi?'長標題':'標題',multi?'g90':'g80','headline',multi?'上限':'兩行各 40 的建議總量')+(multi?sample('說明','g90'):sample('說明行 1','g35')+sample('說明行 2','g35'));
  const lap=(type,small=false)=>'<div class="mock-platform mock-line"><b>LINE</b><span>推薦　⋮</span></div>'+identity('LUMA 官方帳號')+media(type,small?'square':'wide')+sample('標題','u20','headline')+sample(small?(type==='圖片'?'小圖片說明':'說明'):'說明',type==='圖片'&&small?'u35':'u75','text',type==='圖片'&&small?'交付需求':'上限')+cta();
  const carousel=platform=>'<div class="mock-platform '+(platform==='Meta'?'mock-meta':'mock-line')+'"><b>'+platform+'</b></div>'+identity()+(platform==='Meta'?sample('主要文字','u80','text','建議'):'')+'<div class="ad-demo-carousel">'+[1,2].map(i=>'<div class="ad-demo-carousel-card">'+media('圖卡 '+i,'square')+sample('每卡標題','u20','headline',platform==='Meta'?'建議':'上限')+sample('每卡說明',platform==='Meta'?'u18':'u75','text',platform==='Meta'?'建議':'上限')+cta()+'</div>').join('')+'</div>';
  const examples={
    'meta-creative':()=>[card('圖片動態消息 · 1:1／4:5',feed()),card('影片動態消息 · 1:1／4:5',feed(true)),vertical(),vertical(true)],
    'meta-carousel':()=>[card('動態消息 · 輪播',carousel('Meta'))],
    'google-rsa':()=>[card('Google 搜尋 · 素材欄位對照','<div class="mock-platform mock-google"><b>Google</b></div>'+[1,2,3].map(i=>sample('標題 '+i,'g30','headline')).join('')+[1,2].map(i=>sample('說明 '+i,'g90')).join('')+zone('顯示路徑 1（15/15 計數單位）',copy.path1)+zone('顯示路徑 2（15/15 計數單位）',copy.path2),'每則標題與說明分別計數；此圖列出素材，不代表所有內容會同時顯示。')],
    'google-rda':()=>[card('Google 多媒體 · 素材欄位對照',sample('商家名稱','g25')+media('圖片')+sample('短標題','g30','headline')+sample('長標題','g90','headline')+sample('說明','g90')+zone('CTA（系統選擇）','瞭解更多','cta'),'短標題與長標題是不同欄位，實際版型依廣告空間組合。')],
    'google-skippable':()=>[card('YouTube · 可略過串流',video()),card('多格式 VRC · In-feed 文案',infeed(true))],
    'google-bumper':()=>[card('YouTube · Bumper',video(false)),card('多格式 VRC · In-feed 文案',infeed(true))],
    'google-infeed':()=>[card('YouTube · 動態內影片',infeed(),'標題採兩行各 40 計數單位的建議總量 80，低於 100 上限；示意不保證實際裝置的換行位置。')],
    'line-image':()=>[card('LAP · 一般圖片',lap('圖片')),card('LAP · 小圖片',lap('圖片',true),'35 字是此進稿表的交付需求，不宣稱為官方上限。')],
    'line-video':()=>[card('LAP · 一般影片',lap('影片'))],
    'line-small-video':()=>[card('LAP · 小影片',lap('影片',true))],
    'line-carousel':()=>[card('LAP · 輪播',carousel('LINE LAP'))]
  };
  const render=id=>`<section class="ad-examples" aria-label="廣告格式示意圖"><div class="ad-examples-heading"><h3>廣告格式示意圖</h3><span>模擬廣告畫面 · 欄位對照</span></div><p class="ad-examples-intro">虛構品牌文案依現有規格的建議字數或上限示範；各欄標示實際計數。Google 中日韓與全形字元按 2 單位估算，半形英數與空白按 1 單位。CTA 固定選項及素材內文字不為湊字數而填滿。非官方截圖，實際顯示依活動、版位與裝置。</p><div class="ad-examples-grid">${examples[id]().join('')}</div></section>`;
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
