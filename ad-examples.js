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
  const card=(title,body,note='')=>{
    const realistic=/Google|YouTube|LAP · Smart Channel/.test(title);
    const labels=[];
    if(realistic) body=body.replace(/(<span class="ad-zone-label">)([^<]+)(<\/span>)/g,(_,a,label,b)=>a+label.replace(/（.*）/g,'')+b);

    const type=title.includes('桌機首頁')||title.includes('桌機直式')?'desktop-home':title.includes('桌面觀看頁')?'desktop-youtube':title.includes('Smart Channel')?'phone-line':title.includes('YouTube')?'phone-youtube':title.includes('搜尋')?'desktop-search':title.includes('多媒體')?'display-placement':'';
    return `<figure class="ad-demo-card ${realistic?'placement-real '+type:''}"><figcaption>${title}${realistic?`<small>${(type==='desktop-search'||type==='desktop-youtube'||type==='desktop-home')?'桌面示意':type==='display-placement'?'內容網站版位示意':'手機示意'}</small>`:''}</figcaption><div class="ad-demo-surface"><div class="ad-native-frame">${body}</div></div>${note?`<p class="ad-demo-note">${note}</p>`:''}</figure>`;
  };
  const feed=(video=false)=>'<div class="mock-platform mock-meta"><b>facebook</b><span>⌕　☰</span></div>'+identity()+sample('主要文字',video?'u44':'u125','text','共用建議')+media(video?'影片':'圖片','square')+'<div class="meta-link-bar"><div class="meta-link-copy"><small>EXAMPLE.COM</small>'+zone('標題','為日常保養找到新靈感','headline')+'</div>'+cta()+'</div><div class="meta-reactions">👍 ❤️　128<span>8 則留言 · 3 次分享</span></div><div class="mock-social">♧ 讚　　▢ 留言　　↗ 分享</div>';
  const vertical=(reels=false)=>card(reels?'Reels 影片 · 9:16':'Stories 圖片／影片 · 9:16',`<div class="ad-demo-vertical ${reels?'meta-reels':'meta-story'}">${media(reels?'影片':'圖片／影片','portrait')}<div class="meta-vertical-top">${reels?'<b>Reels</b>':'<div class="story-progress"></div>'}<div class="meta-vertical-account"><span class="demo-avatar">L</span><span>LUMA 日常選物<small>贊助</small></span><span>⋯　×</span></div></div>${reels?'<div class="reels-rail">♡<small>128</small>▢<small>8</small>↗<small>分享</small>⋯</div>':''}<div class="meta-vertical-bottom">${reels?zone('主要文字','為忙碌生活留一點空白，探索適合自己的保養節奏。','text'):''}${cta()}</div></div>`,reels?'示範 Instagram Reels；主要文字可能截斷，CTA 位於下方。':'示範 Instagram Stories 的 CTA 貼紙；此示意不將動態消息標題與長篇主要文字疊入限時動態。');
  const ytBar=()=>'<div class="mock-platform mock-youtube"><b><i class="yt-logo">▶</i> YouTube</b><span>⌕　⋮</span></div>';
  const actual=(label,text,kind='text',google=true)=>zone(label+'（'+count(text,google)+(google?' 計數單位':' 字元')+'）',text,kind);
  const video=(skip=true)=>ytBar()+`<div class="yt-player">${media('影片')}<div class="yt-ad-status">廣告 · ${skip?'0:15':'0:06'}</div><span class="yt-skip">${skip?'略過廣告 ▷':'影片將在 6 秒後播放'}</span><div class="yt-controls">Ⅱ　${skip?'0:05 / 0:20':'0:00 / 0:06'}<span>⚙　□</span></div></div><div class="yt-ad-panel"><div class="yt-ad-brand"><span class="demo-avatar">L</span><div><strong>LUMA 日常選物</strong><small>贊助商 · example.com</small></div></div>${actual('CTA 短標題','探索新靈感','headline')}${actual('CTA','瞭解更多','cta')}</div><div class="yt-watch-context"><strong>日常靈感｜為生活留一點空白</strong><small>觀看頁面內容，非廣告文案</small></div>`;
  const desktopVideo=(skip=true)=>ytBar()+`<div class="yt-desktop-layout"><div class="yt-desktop-main"><div class="yt-player">${media('影片')}<div class="yt-overlay-brand"><span class="demo-avatar">L</span><div><strong>LUMA 日常選物</strong><small>探索新靈感</small><small>example.com</small></div><span class="yt-overlay-cta">瞭解更多</span></div><div class="yt-ad-status">贊助商 · ${skip?'0:15':'0:06'}</div><span class="yt-skip">${skip?'略過廣告 ▷':'影片將在 6 秒後播放'}</span><div class="yt-controls">Ⅱ　${skip?'0:05 / 0:20':'0:00 / 0:06'}<span>⚙　□</span></div></div><div class="yt-watch-context"><strong>日常生活提案｜用簡單的儀式，照顧每一天</strong><div class="yt-organic-channel"><span class="demo-avatar">日</span><span>日常靈感頻道<small>12.8 萬位訂閱者</small></span><b>訂閱</b></div><div class="yt-organic-actions">👍 1,280　　分享　　儲存　　⋯</div><small>以上為原本觀看影片的資訊，非廣告文案。</small></div></div><aside class="yt-desktop-ad"><div class="yt-companion">${media('隨播橫幅（建議提供）','banner')}</div><div class="yt-desktop-brand"><span class="demo-avatar">L</span><div><strong>LUMA 日常選物</strong><small>贊助商 · example.com</small></div><span>⋮</span></div><div class="yt-companion-action">${zone('CTA','瞭解更多','cta')}</div><div class="yt-recommendation"><b>接下來播放</b><div>▸　日常選物與生活靈感</div><div>▸　輕鬆安排週末時光</div></div></aside></div>`;
  const feedTile=(ad=true)=>`<div class="yt-home-tile ${ad?'is-ad':'is-organic'}"><div class="yt-thumbnail">${media(ad?'影片縮圖':'推薦影片')}<span class="yt-duration">${ad?'0:20':'8:32'}</span></div><div class="yt-home-copy"><span class="demo-avatar">${ad?'L':'日'}</span><div>${ad?zone('標題','為忙碌生活留一點空白｜LUMA 日常保養提案','headline'):'<strong>日常選物｜找到自己喜歡的生活節奏</strong>'}${ad?zone('品牌／贊助商標示','贊助商廣告 · LUMA 日常選物'):'<small>生活靈感頻道<br>3.2 萬次觀看 · 2 天前</small>'}</div><span>⋮</span></div></div>`;
  const desktopInfeed=()=>ytBar()+`<div class="yt-home-filters">全部　　生活　　保養　　音樂　　最新上傳</div><div class="yt-home-layout"><nav>⌂ 首頁<br>▷ Shorts<br>▤ 訂閱內容<br><hr>觀看記錄<br>稍後觀看</nav><div class="yt-home-grid"><div class="yt-home-ad">${feedTile()}</div>${feedTile(false)}${feedTile(false)}<div class="yt-shorts-context"><b>▶ Shorts</b><div><span>日常生活</span><span>週末靈感</span><span>輕鬆保養</span><span>自在時光</span></div></div></div></div>`;
  const mobileInfeed=()=>ytBar()+`<div class="yt-home-filters">全部　　生活　　保養</div>${feedTile()}<div class="yt-mobile-organic">${feedTile(false)}</div><div class="yt-mobile-nav">⌂ 首頁　　▷ Shorts　　＋　　▤ 訂閱</div>`;
  const displayAd=(long=false)=>'<div class="mock-ad-info">廣告　ⓘ</div>'+media('圖片')+actual('商家名稱','LUMA 日常選物')+actual(long?'長標題':'短標題',long?'從清晨到夜晚，探索適合你的保養系列，安排專屬日常時光':'為日常保養找到新靈感','headline')+actual('說明',long?'挑選喜歡的生活提案，從今天開始照顧自己。':'忙碌的日子也值得好好照顧自己。探索精選系列，為生活留一點時間。')+zone('CTA（系統選擇）','瞭解更多','cta');
  const lapSmall=()=>`<div class="lap-chat-header"><strong>聊天</strong><span>⌕　＋　⚙</span></div><div class="lap-smart"><div class="lap-smart-copy">${actual('標題','忙碌日常也值得好好照顧自己','headline',false)}${actual('小圖片說明','探索日常保養，安排專屬放鬆時光','text',false)}<small>AD　LUMA 官方帳號</small></div>${media('圖片','landscape-small')}</div><div class="lap-chat-list"><span class="demo-avatar">友</span><div><strong>日常好友</strong><small>今天也一起分享生活靈感吧</small></div><small>10:30</small></div><div class="lap-chat-list"><span class="demo-avatar">家</span><div><strong>家人群組</strong><small>週末一起吃飯吧</small></div><small>09:15</small></div>`;
  const lap=(type,small=false)=>'<div class="mock-platform mock-line"><b>LINE</b><span>推薦　⋮</span></div>'+identity('LUMA 官方帳號')+media(type,small?'square':'wide')+sample('標題','u20','headline')+sample(small?(type==='圖片'?'小圖片說明':'說明'):'說明',type==='圖片'&&small?'u35':'u75','text',type==='圖片'&&small?'交付需求':'上限')+cta();
  const carousel=platform=>'<div class="mock-platform '+(platform==='Meta'?'mock-meta':'mock-line')+'"><b>'+platform+'</b></div>'+identity()+(platform==='Meta'?sample('主要文字','u80','text','建議'):'')+'<div class="ad-demo-carousel">'+[1,2].map(i=>'<div class="ad-demo-carousel-card">'+media('圖卡 '+i,'square')+sample('每卡標題','u20','headline',platform==='Meta'?'建議':'上限')+sample('每卡說明',platform==='Meta'?'u18':'u75','text',platform==='Meta'?'建議':'上限')+cta()+'</div>').join('')+'</div>';
  const examples={
    'meta-creative':()=>[card('圖片動態消息 · 1:1／4:5',feed()),card('影片動態消息 · 1:1／4:5',feed(true)),vertical(),vertical(true)],
    'meta-carousel':()=>[card('動態消息 · 輪播',carousel('Meta'))],
    'google-rsa':()=>[card('Google 搜尋 · 呈現示意',`<div class="rsa-real"><h4>贊助商搜尋結果</h4><div class="rsa-site"><span class="rsa-icon">L</span><div><strong>LUMA 日常選物</strong><small>https://example.com</small></div><span>⋮</span></div>${zone('顯示網址／路徑','example.com／daily-care／collection')}<div class="rsa-result">${zone('標題組合（各則 ≤30 計數單位）','探索日常保養｜找到適合你的選擇｜為生活留一點空白','headline')}${zone('說明組合（各則 ≤90 計數單位）','忙碌的日子也值得好好照顧自己。探索 LUMA 精選系列，從日常保養開始。挑選適合自己的生活提案，安排專屬放鬆時光。')}<div class="rsa-product" aria-hidden="true"><div class="scene-bottle"><span class="bottle-cap"></span><b>LUMA</b><small>DAILY<br>ESSENTIAL</small></div></div></div></div>`,'示範 3 則不同標題與 2 則不同說明的組合；標題 2／3、說明 2 不保證顯示，可能截斷。圖片依素材設定及資格顯示。')],
    'google-rda':()=>[card('Google 多媒體 · 短標題版型',displayAd(),'此版型示範圖片、商家名稱、1 則短標題、1 則說明與 CTA；不是全部進稿文案同時顯示。'),card('Google 多媒體 · 長標題版型',displayAd(true),'長標題取代短標題；說明可能省略，實際組合依廣告空間而異。')],
    'google-skippable':()=>[card('YouTube · 桌面觀看頁｜可略過串流',desktopVideo(),'參考桌面觀看頁：左側影片下緣為品牌與 CTA，右側為廣告資訊。此例為隨播橫幅、品牌與 CTA 的精簡版型，不顯示網站連結。影片內短標題與 CTA 依活動設定顯示。'),card('YouTube · 手機觀看頁｜可略過串流',video(),'手機版空間較小，可能省略或截斷部分內容；此例只呈現品牌、CTA 短標題與按鈕。')],
    'google-bumper':()=>[card('YouTube · 桌面觀看頁｜Bumper',desktopVideo(false),'最多 6 秒、不可略過。右側示範隨播橫幅、品牌與 CTA，實際依活動設定與版位；非所有欄位必定出現。'),card('YouTube · 手機觀看頁｜Bumper',video(false),'手機版空間較小，部分廣告資訊可能省略或截斷。')],
    'google-infeed':()=>[card('YouTube · 桌機首頁｜In-feed',desktopInfeed(),'參考首頁左上角的贊助商影片卡：縮圖、影片時長、標題、品牌及贊助商標示。此首頁版型不強行加入說明或獨立 CTA。'),card('YouTube · 手機首頁｜In-feed',mobileInfeed(),'手機首頁卡片：縮圖上方／下方排列依介面版本而異；標題可能截斷。此示意不顯示兩行說明，說明的顯示依其他版位而定。')],
    'line-image':()=>[card('LAP · 一般圖片',lap('圖片')),card('LAP · Smart Channel 小圖片',lapSmall(),'600×400（3:2）圖片在右，文字在左；版位會截斷文案。20／35／75 為不同進稿欄位，75 字一般圖片說明不放進此版位。35 字為本表交付需求。')],
    'line-video':()=>[card('LAP · 一般影片',lap('影片'))],
    'line-small-video':()=>[card('LAP · 小影片',lap('影片',true))],
    'line-carousel':()=>[card('LAP · 輪播',carousel('LINE LAP'))]
  };
  examples['google-nonskippable']=()=>[card('YouTube · 桌面觀看頁｜不可略過串流',desktopVideo(false).replaceAll('0:06','0:15').replaceAll('6 秒','15 秒'),'不可略過；標準版 7–15 秒，16–30 秒僅 CTV 橫式素材。'),card('YouTube · 手機觀看頁｜不可略過串流',video(false).replaceAll('0:06','0:15').replaceAll('6 秒','15 秒'),'標題、CTA 的顯示受版位影響。')];
  examples['google-action']=()=>examples['google-skippable']().map(html=>html.replaceAll('可略過串流','Demand Gen 影音導流'));
  const shortBody=()=>`<div class="yt-short-ad">${media('直式影片','portrait')}<div class="yt-short-top">YouTube Shorts</div><div class="yt-short-rail">♡<br>留言<br>分享<br>⋮</div><div class="yt-short-copy"><strong>LUMA 日常選物 · 贊助商</strong>${zone('說明','用簡單的日常保養，為每一天留下一點從容。')}${zone('標題','探索適合你的日常保養','headline')}${zone('CTA','瞭解更多','cta')}</div></div>`;
  examples['google-shorts']=()=>[card('YouTube Shorts · 桌機直式播放器',shortBody(),'直式播放器旁可呈現其他內容；廣告位於 Shorts 動態中，可立即滑走。'),card('YouTube Shorts · 手機全螢幕',shortBody(),'右側工具列及下方廣告資訊可能遮住素材；CTA 出現時間依活動，非固定第 5 秒。')];
  const render=id=>`<section class="ad-examples" aria-label="廣告格式示意圖"><div class="ad-examples-heading"><h3>廣告格式示意圖</h3><span>實際版位模擬</span></div><p class="ad-examples-intro">虛構品牌模擬實際版位；文案依顯示空間挑選與組合，不代表全部進稿欄位同時出現。RSA 中文按 2 單位；其他 Google 文案採加權保守估算，實際以後台計數為準。非官方截圖，實際顯示依活動、版位與裝置。</p><div class="ad-examples-grid">${examples[id]().join('')}</div></section>`;
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
