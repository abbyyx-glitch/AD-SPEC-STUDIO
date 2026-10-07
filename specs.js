/* Public platform specifications only. No campaign copy is stored in this file. */
window.AD_SPECS = (() => {
  const checked = '2026-10-06';
  const meta = (kind, placement) => `https://www.facebook.com/business/ads-guide/update/${kind}/${placement}`;
  const google = id => `https://support.google.com/google-ads/answer/${id}?hl=en`;
  const lap = 'https://vos.line-scdn.net/lbstw-static/images/uploads/download_files/665393d0b15b774d1d291d2908121291/LINE%20Ads%20Platform_Media%20Guide_260930.pdf?openExternalBrowser=1';
  const manual = 'https://vos.line-scdn.net/lbstw-static/images/uploads/download_files/3592e7480a7aa3529de2bf4a7f842451/LAPUserManual_202609_Offline.pdf?openExternalBrowser=1';
  const field = (id, label, limit, mode='hard', required=false, min=1, max=1, note='') => ({id,label,limit,mode,required,min,max,note});
  const rule = (label, value, type='硬性規格') => ({label,value,type});
  const base = (id,platform,name,category,source,fields,rules,notes=[],extra={}) => ({id,platform,name,category,checked,source,fields,rules,notes,counting:platform==='Google'?'google':'unicode',...extra});
  const mf = [field('primary','主要文字',150,'recommendation',false,1,1,'官方建議 50–150 個字元'),field('headline','標題',27,'recommendation')];
  const codec = 'H.264；正方形像素；固定影格率；漸進式掃描；立體聲 AAC ≥128 kbps';
  const safe = '9:16 Reels 安全區域建議：頂端 14%、底部 35%、左右各 6% 不放文字、標誌或重要元素。';
  const metaNote = '採官方「品牌認知」目標頁；不同目標、版位與裝置的欄位顯示可能不同。文字長度為建議，超過可能截斷顯示，並非一律拒登。';
  const lvFields = [field('headline','標題',20,'hard',true),field('description','說明',75,'hard',true)];
  const lapExtra = {version:'Media Guide 260930／2026-09 操作手冊',sourceMore:[{label:'LINE 官方建立廣告說明',url:'https://help2.line.me/admanager_tw/win/?contentId=20016923&lang=zh-Hant'},{label:'官方下載頁（查找最新版本）',url:'https://tw.linebiz.com/download/line-ads-platform/'},{label:'2026-09 操作手冊',url:manual},{label:'廣告刊登規範',url:'https://tw.linebiz.com/terms-and-policies/ads-policies/'}]};
  const lapNotes = ['此版進稿表以網站導流、一般 LAP 廣告為範圍；應用程式、加好友、DPA 規格需另行查核。','CTA 請從實際廣告後台可用選項選擇。'];
  const videoRules = [rule('檔案格式','MP4／MOV'),rule('編碼','H.264 Main／High Profile；正方形像素；固定影格率；漸進式掃描'),rule('音訊','AAC；建議 ≥128 kbps；單聲道或立體聲','建議'),rule('影格率／位元率','最高 30 fps／8 Mbps'),rule('影片長度','5–600 秒'),rule('檔案大小','最大 1 GB'),rule('解析度','最高 1080p；遞送最高 720p')];
  const youtubeRules = [rule('建議解析度','橫式 1920×1080；直式 1080×1920；方形 1080×1080','建議'),rule('HD 最低解析度','橫式 1280×720；直式 720×1280；方形 480×480'),rule('可接受 SD','640×480／480×640／480×480；不建議 SD','可接受'),rule('比例','16:9／9:16／1:1；另接受 SD 4:3／2:3'),rule('檔案格式','建議 MPG；可接受 MP4、MOV、WMV、AVI、FLV、MPEG-1、MPEGPS、3GPP、WebM、DNxHR、ProRes、CineForm、HEVC'),rule('檔案大小','≤256 GB（YouTube 上傳限制）'),rule('影片連結','YouTube 公開或不公開影片；不接受私人影片')];
  const ytNotes = ['影片須先在 YouTube 上架；本工具只填寫連結，不會上傳影片。','影片廣告文案欄位會依活動子類型改變，請比對後台；本格式採個別廣告格式官方頁。','Google 加權計數：中日韓及全形字元以 2 單位估算、半形英數及空白以 1 單位；特殊符號與 emoji 仍需後台複核。'];
  const formats = [
    base('meta-fb-image','Meta','Facebook 動態消息｜單圖','圖片',meta('image','facebook-feed'),mf,[rule('建議尺寸／比例','1440×1800 px／4:5','建議'),rule('檔案格式','JPG／PNG'),rule('檔案大小','≤30 MB'),rule('最低尺寸','寬 600 px；4:5 時高 750 px'),rule('比例容許度','3%')],[metaNote]),
    base('meta-ig-image','Meta','Instagram 動態消息｜單圖','圖片',meta('image','instagram-feed'),[field('primary','主要文字',125,'recommendation'),field('headline','標題',40,'recommendation')],[rule('建議尺寸／比例','1440×1800 px／4:5','建議'),rule('檔案格式','JPG／PNG'),rule('檔案大小','≤30 MB'),rule('最低寬度','500 px'),rule('支援比例範圍','4:5–1.91:1'),rule('比例容許度','1%'),rule('主題標籤','最多 30 個')],[metaNote]),
    base('meta-fb-video','Meta','Facebook 動態消息｜影片','影片',meta('video','facebook-feed'),mf,[rule('建議尺寸／比例','1440×1800 px／4:5','建議'),rule('檔案格式','MP4／MOV／GIF'),rule('影片設定',codec,'建議'),rule('檔案大小','≤4 GB'),rule('影片長度','1 秒–241 分鐘'),rule('最低尺寸','120×120 px'),rule('字幕／音效','選用，但建議使用','建議')],[metaNote,'品牌認知及部分成效目標下，行動版 Facebook 動態消息不顯示標題、說明與 CTA 頁尾。']),
    base('meta-ig-video','Meta','Instagram 動態消息｜影片','影片',meta('video','instagram-feed'),[field('primary','主要文字',125,'recommendation')],[rule('建議比例','4:5','建議'),rule('官方頁所列解析度','1080×1920 px（與同頁 4:5 比例不一致）','官方文件差異'),rule('共用製作尺寸','1440×1800 px／4:5','製作建議'),rule('檔案格式','MP4／MOV／GIF'),rule('檔案大小','≤4 GB'),rule('影片長度','1 秒–60 分鐘'),rule('最低寬度','250 px'),rule('比例容許度','1%')],[metaNote,'官方頁同時列 4:5 與 1080×1920，兩者比例不一致；本表共用版本採 4:5 製作建議，投放時依後台預覽確認。']),
    base('meta-carousel','Meta','Facebook 動態消息｜輪播','輪播',meta('carousel','facebook-feed'),[field('primary','主要文字',80,'recommendation')],[rule('建議尺寸／比例','至少 1080×1080 px／1:1','建議'),rule('圖卡數量','2–10 張'),rule('圖片','JPG／PNG；每張 ≤30 MB'),rule('影片','MP4／MOV／GIF；每支 ≤4 GB；1 秒–240 分鐘'),rule('比例容許度','3%')],[metaNote],{cards:{min:2,max:10,fields:[field('headline','圖卡標題',20,'recommendation'),field('description','圖卡說明',18,'recommendation')]}}),
    base('meta-story-image','Meta','Instagram Stories｜單圖','圖片',meta('image','instagram-story'),[field('primary','主要文字',125,'recommendation')],[rule('建議尺寸／比例','1440×2560 px／9:16','建議'),rule('檔案格式','JPG／PNG'),rule('檔案大小','≤30 MB'),rule('最低寬度','500 px'),rule('比例容許度','1%'),rule('顯示時間','5–16 秒，或用戶滑過即結束','版位行為')],[metaNote,safe]),
    base('meta-story-video','Meta','Instagram Stories｜影片','影片',meta('video','instagram-story'),[field('primary','主要文字',125,'recommendation')],[rule('建議尺寸／比例','1440×2560 px／9:16','建議'),rule('檔案格式','MP4／MOV／GIF'),rule('影片設定',codec,'建議'),rule('檔案大小','≤4 GB'),rule('影片長度','1 秒–60 分鐘'),rule('最低寬度','250 px'),rule('比例容許度','1%')],[metaNote,safe,'16 秒以上影片可能拆為多張 Stories 圖卡；播放方式依成效目標及觀看者而異。']),
    base('meta-reels','Meta','Instagram Reels｜影片','影片',meta('video','instagram-reels'),[field('primary','主要文字',44,'recommendation')],[rule('建議尺寸／比例','1440×2560 px／9:16','建議'),rule('檔案格式','MP4／MOV'),rule('影片設定',codec,'建議'),rule('檔案大小','≤4 GB'),rule('影片長度','官方範圍 0 秒–15 分鐘；素材須為有效影片'),rule('最低寬度','<30 秒：250 px；≥30 秒：500 px'),rule('字幕／音效','字幕建議；音效強烈建議','建議')],[metaNote,safe,'不可含未授權版權音樂、變臉／相機特效、GIF、商品標籤，或容器編輯清單／特殊方塊；2021-10-15 前發布的 Reels 不適用。']),
    base('google-rsa','Google','搜尋｜回應式搜尋廣告 RSA','文字',google(7684791),[field('headlines','標題',30,'hard',true,3,15),field('descriptions','說明',90,'hard',true,2,4),field('path1','顯示路徑 1',15),field('path2','顯示路徑 2',15)],[rule('標題數量','至少 3、最多 15 則'),rule('說明數量','至少 2、最多 4 則'),rule('文字上限','標題 30；說明 90；每個顯示路徑 15 計數單位'),rule('圖片／影片','此格式不要求圖片或影片')],['中文字元以 2 單位計數，半形英數、空白以 1 單位。','素材可能重新組合或縮短顯示；字數符合不代表每次都完整呈現。']),
    base('google-rda','Google','多媒體｜回應式多媒體廣告 RDA','圖片',google(17090561),[field('headlines','短標題',30,'hard',true,1,5),field('long','長標題',90,'hard',true),field('descriptions','說明',90,'hard',true,1,5),field('business','商家名稱',25,'hard',true)],[rule('橫式圖片','1.91:1；建議 1200×628；最低 600×314 px；1–15 張'),rule('方形圖片','1:1；此規格頁建議 600×600；最低 300×300 px；1–15 張'),rule('圖片檔案大小','每張最大 5120 KB'),rule('方形 Logo（選填）','建議 1200×1200；最低 128×128 px；1–5 張'),rule('橫式 Logo（選填）','4:1；建議 1200×300；最低 512×128 px；1–5 張'),rule('Logo 大小','每張最大 5120 KB'),rule('影片（選填）','YouTube 連結；1–5 支；16:9／1:1／2:3；建議 30 秒','建議'),rule('CTA','由系統自動選擇')],['官方規格頁建議方圖 600×600；建立教學頁列 1200×1200。兩者最低尺寸一致，製作較高解析度可採 1200×1200。','此工具採保守的 Google 全形加權計数；特殊字元以後台結果為準。'],{sourceMore:[{label:'建立教學（檔案大小及尺寸）',url:google(7005917)}]}),
    base('google-skippable','Google','YouTube｜可略過串流內廣告','影片',google(6055025),[{...field('actionHeadline','標題（導流版）',30,'delivery',false,1,1,'交付建議：30 半形字元／15 個中文字。舊 VAC 官方上限為 30；現行 Demand Gen 影片規格可至 40，依後台確認。'),requirement:'導流版建議填寫'},field('headline','CTA 短標題（單一串流／VRC）',15,'hard',false,1,1,'最多 15 半形字元；純中文依本工具加權計數最多 7 字。與導流版標題擇適用欄位填寫。'),{...field('longHeadline','長標題',90,'hard',false,1,1,'多格式 VRC 必填；其他活動依後台確認。'),requirement:'多格式 VRC 必填'}, {...field('description','說明',90,'hard',false,1,1,'多格式 VRC 必填；不是 CTA 短標題。'),requirement:'多格式 VRC 必填'},field('cta','CTA',10)],[...youtubeRules,rule('影片長度','一般競價：格式頁未設上下限；預訂型：12 秒–6 分鐘'),rule('建議長度','認知／行動 15–20 秒；考慮 2–3 分鐘','建議'),rule('隨播橫幅（選填）','300×60 px；JPEG／GIF／PNG；最大 150 KB；桌機顯示')],[...ytNotes,'TrueView 不能視為只有一個標題：單一串流、VVC、VRC 及 Demand Gen 的欄位不同。此表補齊多格式 VRC 的長標題與說明，各最多 90 計數單位；單一串流 CTA 短標題最多 15、CTA 最多 10。','VVC 現行官方介紹以串流、In-feed、Shorts 多格式取得 TrueView 觀看；不能用單一串流格式的 15 字覆蓋整個活動。VVC 實際欄位及上限由投放人員依後台確認。','導流版標題建議交付 30 半形字元（純中文 15 字），作為較短版本。舊 VAC 官方上限為 30；VAC 已於 2026 年 5 月升級 Demand Gen，現行 Demand Gen 影片文件列標題 40。此欄是交付建議，不是全部 TrueView 的官方共用上限。'],{videoUrl:true,sourceMore:[{label:'多格式 VRC 建立流程（長標題／說明 90）',url:google(10510238)},{label:'TrueView／Video views 活動介紹',url:google(13982458)},{label:'影片活動素材總表（欄位依子類型）',url:google(17091270)},{label:'VAC 升級 Demand Gen 官方說明',url:google(10147229)},{label:'Demand Gen 影片文案規格（標題 40）',url:google(17140777)}]}),
    base('google-bumper','Google','YouTube｜Bumper 短廣告','影片',google(11462260),[field('headline','CTA 短標題',15),{...field('longHeadline','長標題',90,'hard',false,1,1,'多格式 VRC 必填；單一 Bumper 不一律要求。'),requirement:'多格式 VRC 必填'},{...field('description','說明',90,'hard',false,1,1,'多格式 VRC 必填；單一 Bumper 不一律要求。'),requirement:'多格式 VRC 必填'},field('cta','CTA',10)],[...youtubeRules,rule('影片長度','最多 6 秒；不可略過'),rule('隨播橫幅（選填）','300×60 px；JPEG／GIF／PNG；最大 150 KB')],[...ytNotes,'Bumper 格式頁及建立流程均列最多 6 秒；5–6 秒僅為本表製作建議，不列為所有活動的最短硬性限制。'],{videoUrl:true,sourceMore:[{label:'影片格式總覽（最短長度）',url:google(2375464)},{label:'多格式 VRC 文案建立流程',url:google(10510238)}]}),
    base('google-infeed','Google','YouTube｜動態內影片廣告','影片',google(6227733),[field('headline','標題',100,'hard',true),field('descriptions','說明行',35,'hard',false,0,2)],[...youtubeRules,rule('影片長度','格式頁：任何長度；部分活動子類型另有最低長度'),rule('建議長度','認知 15–20 秒；考慮 2–3 分鐘','建議'),rule('縮圖','可選影片產生的 4 張縮圖；自訂縮圖使用 YouTube Studio')],[...ytNotes,'標題主文列最大 100 字，但同頁規格表建議 2 行、每行 40 字；>25 字部分裝置可能截斷。說明最多 2 行、每行 35 字，桌機觀看頁與 TV 不顯示。'],{videoUrl:true}),
    base('line-image','LINE LAP','一般圖片｜橫式／方形','圖片',lap,lvFields,[rule('尺寸','1200×628 或 1080×1080 px'),rule('檔案格式','JPG／PNG'),rule('檔案大小','≤10 MB'),rule('文案','標題 20 字；說明 75 字；半形全形均算 1 字')],lapNotes,lapExtra),
    base('line-small','LINE LAP','小圖片｜600×400','圖片',lap,lvFields,[rule('尺寸','600×400 px（亦可依後台使用其他小圖片尺寸）'),rule('檔案格式','JPG／PNG'),rule('檔案大小','≤10 MB'),rule('文案','標題 20 字；說明 75 字；半形全形均算 1 字')],[...lapNotes,'小圖片可投版位與產業資格不同；請依最新版 Media Guide 版位表及後台可用選項確認。'],lapExtra),
    base('line-video','LINE LAP','一般影片｜橫式／方形／直式','影片',lap,lvFields,[...videoRules,rule('16:9 尺寸範圍','寬 240–1920；高 135–1080 px'),rule('1:1 尺寸範圍','600×600–1280×1280 px'),rule('9:16 尺寸範圍','寬 135–1080；高 240–1920 px')],[...lapNotes,'直式影片在 VOOM 追蹤中可能以 3:4 裁切，全螢幕才顯示 9:16。','LINE 影片 Safe Zone：1080×1920 直式的重點區域為 888×1344 px；1080×1080 方形為 972×972 px。重要文字與 Logo 依官方安全區圖放置；官方未列上下左右固定留白，請勿自行均分。'],lapExtra),
    base('line-small-video','LINE LAP','小影片｜橫式／方形','影片',lap,lvFields,[...videoRules,rule('比例','16:9／1:1；不支援 9:16'),rule('16:9 尺寸範圍','寬 240–1920；高 135–1080 px'),rule('1:1 尺寸範圍','600×600–1280×1280 px')],[...lapNotes,'小影片支援版位與一般影片不同；依 Media Guide 版位表及後台為準。'],lapExtra),
    base('line-carousel','LINE LAP','輪播｜2–10 張方形圖片','輪播',manual,[],[rule('圖卡數量','2–10 張'),rule('每張尺寸','1080×1080 px'),rule('檔案格式／大小','JPG／PNG；每張 ≤10 MB'),rule('每卡文案','標題 20 字；說明 75 字'),rule('廣告目標','不適用加好友；DPA 需另外使用產品摘要')],[...lapNotes,'輪播每張圖卡都需通過審核才會遞送。'],{...lapExtra,cards:{min:2,max:10,fields:[field('headline','圖卡標題',20,'hard',true),field('description','圖卡說明',75,'hard',true)]}})
  ];
  // Group existing verified placement records without losing their individual sources.
  const groups = [
    {id:'meta-fb-image',name:'單圖｜多版位素材',ids:['meta-fb-image','meta-ig-image','meta-story-image']},
    {id:'meta-fb-video',name:'影片｜多版位素材',ids:['meta-fb-video','meta-ig-video','meta-story-video','meta-reels']}
  ];
  groups.forEach(g=>{
    const placements=g.ids.map(id=>formats.find(f=>f.id===id));
    const target=placements[0];
    target.placements=placements.map(f=>({name:f.name,source:f.source,rules:f.rules,fields:f.fields,notes:f.notes}));
    target.name=g.name;
    target.ratios=[
      {ratio:'1:1',size:'1440×1440 px',placement:'方形動態消息素材',note:'工具製作建議：由 1440 px 寬度製作方形版本；非官方所有版位的統一最佳尺寸。'},
      {ratio:'9:16',size:'1440×2560 px',placement:g.id==='meta-fb-image'?'Instagram Stories':'Instagram Stories／Reels',note:'9:16 共用保守製作建議：頂端留白 14%、底部 35%、左右各 6%；Reels 有免責文字時底部建議留白 40%。Stories 仍須依版位預覽確認。'},
      {ratio:'4:5',size:'1440×1800 px',placement:'Facebook／Instagram 動態消息',note:'官方動態消息尺寸建議；保留較多垂直畫面。'}
    ];
    target.sourceMore=target.placements.slice(1).map(f=>({label:f.name+' 官方規格',url:f.source}));
    target.notes=[metaNote,'同一個創意，分別輸出 1:1、9:16、4:5 三個版本；不是一個檔案保證適用所有版位。請重排文字與主體，避免只靠自動裁切。',safe,'下方保留每個版位的官方規格與文案建議；投放資格仍依目標與後台為準。'];
    target.rules=[rule('製作比例','1:1／9:16／4:5','製作建議'),rule('建議輸出尺寸','1440×1440／1440×2560／1440×1800 px','製作建議'),rule('檔案格式／大小',g.id==='meta-fb-image'?'JPG／PNG；≤30 MB':'跨 Stories／Reels 建議 MP4／MOV；≤4 GB','建議')];
    target.fields=target.fields.map(f=>({...f,note:f.id==='primary'?'各版位建議長度不同，請依下方版位規格準備文案。':f.note}));
  });
  const groupedIds=new Set(groups.flatMap(g=>g.ids.slice(1)));
  const image=formats.find(f=>f.id==='meta-fb-image'),video=formats.find(f=>f.id==='meta-fb-video');
  const combined={...image,id:'meta-creative',name:'圖片／影片｜多版位共用表',category:'圖片／影片',unifiedMeta:true,fields:image.fields.map(f=>f.id==='primary'?{...f,limit:125,note:'圖片共用建議 125 字元；影片若共用 Reels 建議 44 字元；Feed／Stories 有各自建議，非影片一律只能 44 字。'}:f),
    placements:[...image.placements.map(p=>({...p,mediaType:'圖片'})),...video.placements.map(p=>({...p,mediaType:'影片'}))],
    rules:[rule('製作比例','1:1／9:16／4:5','製作建議'),rule('圖片檔案','JPG／PNG；≤30 MB'),rule('影片檔案','MP4／MOV；≤4 GB','共用製作條件'),rule('共用影片長度','1 秒–15 分鐘（含 Reels 的交付交集，非各版位個別上限）','共用製作條件')],
    sourceMore:[...image.sourceMore,{label:'Facebook 動態消息影片官方規格',url:video.source},...video.sourceMore],
    ratios:image.ratios.map(r=>({...r,placement:r.ratio==='9:16'?'圖片：Stories；影片：Stories／Reels':r.placement}))};
  const lapImage=formats.find(f=>f.id==='line-image');
  lapImage.fields=[field('headline','標題',20,'hard',true),{...field('smallDescription','小圖片短版說明',35,'delivery',true,1,1,'35 字為本表指定的短版交付需求；官方一般說明上限為 75 字，未另列 35 字小圖片硬性上限。'),requirement:'本表交付必填'},field('description','一般圖片說明',75,'hard',true)];
  lapImage.name='圖片｜三尺寸';lapImage.requiredSizes=['1080×1080','1200×628'];lapImage.recommendedSizes=['600×400'];
  lapImage.rules=[rule('交付尺寸','必要：1080×1080、1200×628 px；建議提供：600×400 px','交付必填'),rule('檔案格式','JPG／PNG'),rule('檔案大小','每張 ≤10 MB')];
  lapImage.notes=[...lapImage.notes,'1080×1080、1200×628 為本表必要交付；600×400 建議提供，依可投版位使用。','600×400 為小圖片格式，可投版位與產業資格請由投放人員確認。'];
  const visibleFormats=[combined,...formats.filter(f=>!groupedIds.has(f.id)&&!['meta-fb-image','meta-fb-video','line-small'].includes(f.id))];

  // Campaign-specific copy replaces the mixed legacy list; preview format stays unchanged.
  const vrcFields=[field('headline','CTA 短標題',15),field('longHeadline','長標題',90,'hard',true),field('description','說明',90,'hard',true),field('cta','CTA',10)];
  const dvSource='https://support.google.com/displayvideo/answer/14113197?hl=en';
  const dvFields=[field('headline','標題',30,'hard',false,1,1,'DV360 Video views：官方選填，包含空白。'),field('longHeadline','長標題',90,'hard',true),field('description','說明',90,'hard',true),field('business','商家名稱',25),field('cta','CTA',10)];
  const dgSource='https://support.google.com/google-ads/answer/17141078?hl=en-in';
  const dgFields=[field('headline','標題',40,'hard',true,1,1,'官方上限 40；可交付 30 的較短版本。'),field('longHeadline','長標題',90,'hard',true),field('description','說明',90,'hard',true),field('business','商家名稱',25,'hard',true)];
  const profiles={
    'google-skippable':[
      {id:'single',label:'Google Ads｜單一串流／VRC',fields:[field('headline','CTA 短標題',15),field('cta','CTA',10)],source:google(10510238),note:'CTA 短標題 15、CTA 10，均選填；單一串流不一律要求長標題及說明。'},
      {id:'vrc',label:'Google Ads｜多格式 VRC（觸及）',fields:vrcFields,source:google(10510238),note:'長標題 90、說明 90 必填；CTA 短標題 15、CTA 10 選填。'},
      {id:'dv360',label:'DV360｜TrueView／Video views（觀看）',fields:dvFields,source:dvSource,note:'標題上限 30（選填）、長標題 90、說明 90；CTA 10 與商家名稱 25 選填。'},
      {id:'demand-gen',label:'Google Ads｜Demand Gen 影片（導流）',fields:dgFields,source:dgSource,note:'影片標題 40、長標題 90、說明 90、商家名稱 25。30 是可交付的短版，不是現行上限。',deliveryRequired:true}
    ],
    'google-bumper':[
      {id:'single',label:'Google Ads｜單一 Bumper',fields:[field('headline','標題／CTA 短標題',15),field('cta','CTA',10)],source:google(11462260),note:'最多 6 秒，不可略過。文案必要性依建立流程；不一律收長標題、說明。'},
      {id:'vrc',label:'Google Ads｜多格式 VRC（含 Bumper）',fields:vrcFields,source:google(10510238),note:'同一活動搭配多格式時，長標題與說明各 90 必填；CTA 短標題與 CTA 選填。'}
    ],
    'google-infeed':[
      {id:'standalone',label:'Google Ads｜In-feed 格式規格',fields:[field('headline','標題',100,'hard',true),field('descriptions','說明行',35,'hard',false,0,2)],source:google(6227733),note:'格式頁列標題 100、說明最多兩行各 35；活動設定可能使用較短的長標題欄位。'},
      {id:'vrc',label:'Google Ads｜多格式 VRC（觸及）',fields:vrcFields,source:google(10510238),note:'活動共用長標題 90、說明 90 必填；不是 In-feed 格式頁的 100／35。'},
      {id:'dv360',label:'DV360｜TrueView／Video views（觀看）',fields:dvFields,source:dvSource,note:'同一觀看活動共用標題 30、長標題 90、說明 90；不是所有欄位都會在 In-feed 顯示。'},
      {id:'demand-gen',label:'Google Ads｜Demand Gen 影片（導流）',fields:dgFields,source:dgSource,note:'In-feed 使用活動的長標題 90；短標題 40 供串流使用，說明 90，商家名稱 25。',deliveryRequired:true}
    ]
  };
  visibleFormats.forEach(f=>{
    f.checked=checked;
    f.auditStatus='已核對公開官方文件';
    if(profiles[f.id]){
      f.copyProfiles=profiles[f.id].filter(p=>p.id!=='dv360');f.fields=f.copyProfiles[0].fields;
      f.notes=f.notes.filter(n=>!n.includes('VAC')&&!n.includes('VVC')&&!n.includes('此表補齊'));
      f.notes.push('投放方式不同，文案欄位與上限不同；請選擇上方活動方式後下載。Google Ads VVC 未在本版提供完整活動規格，請先確認活動類型。');
      f.sourceMore=[{label:'Google Ads VRC 文案建立流程',url:google(10510238)},{label:'Demand Gen 影片文案規格',url:dgSource}];
    }
  });
  const resolveSpec=(id,profileId)=>{
    const baseSpec=visibleFormats.find(f=>f.id===id);if(!baseSpec)throw new Error('Unknown format');
    if(!baseSpec.copyProfiles)return baseSpec;
    const profile=baseSpec.copyProfiles.find(p=>p.id===profileId)||baseSpec.copyProfiles[0];
    return {...baseSpec,fields:profile.fields.map(f=>profile.deliveryRequired&&f.required?{...f,requirement:'本表交付必填'}:{...f}),copyProfileId:profile.id,copyProfileLabel:profile.label,copyProfileNote:profile.note,source:profile.source,notes:[profile.note,...baseSpec.notes],rules:[...baseSpec.rules,...(profile.id==='demand-gen'?[rule('Demand Gen 串流最低長度','至少 10 秒；其他影片版位最低 5 秒'),rule('Demand Gen Logo','方形；建議 1200×1200；交付至少 144×144 px；≤150 KB','交付建議')]:[])]};
  };
  const textLimit=(spec,limit)=>{
    if(limit==null)return '未設定';
    if(spec.platform==='Google')return `${limit} 半形字元額度（純中文${spec.id==='google-rsa'?'最多':'保守建議'} ${Math.floor(limit/2)} 字${spec.id==='google-rsa'?'':'；實際計數依後台'}）`;
    return `${limit} 字元（全形／半形／空白各算 1；特殊符號另核對）`;
  };
  return {resolveSpec,textLimit,schemaVersion:1,checked,version:'2026.10.06',schedule:{status:'active',text:'各格式已於 10/06 核對；活動方式請分別選擇'},sourcesChecked:checked,formats:visibleFormats};
})();

