/* Excel export runs entirely in this browser. Text is always an inline string, never a formula. */
(() => {
  const xml = value => String(value ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g,'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
  const col = n => { let s=''; for(n++;n;n=Math.floor((n-1)/26)) s=String.fromCharCode(65+(n-1)%26)+s; return s; };
  function sheetXml(rows,widths,editable=[],sections=[],validations=[],merges=[],options={}){
    const end=`${col(Math.max(...rows.map(r=>r.length))-1)}${rows.length}`;
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><dimension ref="A1:${end}"/><sheetViews><sheetView workbookViewId="0" zoomScale="70" topLeftCell="A1"><pane ySplit="${options.freezeRow||1}" topLeftCell="A${(options.freezeRow||1)+1}" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="D4" sqref="D4"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="22"/><cols>${widths.map((w,i)=>`<col min="${i+1}" max="${i+1}" width="${w}" customWidth="1"/>`).join('')}</cols><sheetData>${rows.map((row,r)=>`<row r="${r+1}" ht="${options.rowHeights?.[r+1]??(r===0||sections.includes(r+1)||options.headers?.includes(r+1)?28:Math.min(409,Math.max(36,...row.map((v,i)=>String(v??'').split('\n').reduce((n,line)=>n+Math.max(1,Math.ceil(Array.from(line).reduce((n,ch)=>n+(ch.charCodeAt(0)>255?2:1),0)/Math.max(8,(widths[i]||24)-3))),0)*17+12))))}" customHeight="1">${row.map((v,c)=>{const ref=col(c)+(r+1),style=r===0||sections.includes(r+1)||options.headers?.includes(r+1)?1:((options.editableCols||[4]).includes(c)&&editable.includes(r+1)?4:(typeof v==='number'?3:2));return typeof v==='number'&&Number.isFinite(v)?`<c r="${ref}" s="${style}"><v>${v}</v></c>`:`<c r="${ref}" s="${style}" t="inlineStr"><is><t xml:space="preserve">${xml(v)}</t></is></c>`;}).join('')}</row>`).join('')}</sheetData>${sections.length||merges.length?`<mergeCells count="${sections.length+merges.length}">${[...sections.map(r=>`A${r}:F${r}`),...merges].map(ref=>`<mergeCell ref="${ref}"/>`).join('')}</mergeCells>`:''}${validations.length?`<dataValidations count="${validations.length}">${validations.map(v=>`<dataValidation type="list" allowBlank="1" showDropDown="0" showInputMessage="1" showErrorMessage="1" errorStyle="warning" promptTitle="${xml(v.title||'CTA 選擇')}" prompt="${xml(v.prompt||'可用按鈕依活動目標及後台為準')}" errorTitle="請確認選項" error="建議從下拉選單選擇，其他需求請填備註。" sqref="${v.cell}"><formula1>${xml('"'+v.options.join(',')+'"')}</formula1></dataValidation>`).join('')}</dataValidations>`:''}<pageMargins left="0.3" right="0.3" top="0.5" bottom="0.5" header="0.2" footer="0.2"/><pageSetup orientation="landscape" paperSize="9" fitToWidth="1" fitToHeight="0"/>${options.image?'<drawing r:id="rId1"/>':''}</worksheet>`;
  }
  async function makeWorkbook(sheets){
    const z=new JSZip();
    z.file('[Content_Types].xml',`<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((s,i)=>`<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}${sheets.map((s,i)=>s.image?`<Override PartName="/xl/drawings/drawing${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/>`:'').join('')}</Types>`);
    z.file('_rels/.rels','<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>');
    z.file('xl/workbook.xml',`<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><bookViews><workbookView/></bookViews><sheets>${sheets.map((s,i)=>`<sheet name="${xml(s.name)}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join('')}</sheets></workbook>`);
    z.file('xl/_rels/workbook.xml.rels',`<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((s,i)=>`<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join('')}<Relationship Id="rId${sheets.length+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`);
    z.file('xl/styles.xml','<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><color rgb="FF23354F"/><name val="Microsoft JhengHei"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Microsoft JhengHei"/></font></fonts><fills count="4"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF173E92"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFFF2CC"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="2"><border/><border><left/><right/><top/><bottom style="hair"><color rgb="FFDCE4F0"/></bottom></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="5"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf><xf numFmtId="49" fontId="0" fillId="0" borderId="1" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf><xf numFmtId="1" fontId="0" fillId="0" borderId="1" xfId="0" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="49" fontId="0" fillId="3" borderId="1" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>');
    sheets.forEach((s,i)=>z.file(`xl/worksheets/sheet${i+1}.xml`,sheetXml(s.rows,s.widths,s.editable,s.sections,s.validations,s.merges,s)));
    sheets.forEach((s,i)=>{if(!s.image)return;const n=i+1,im=s.image;
      z.file(`xl/media/preview${n}.png`,im.base64,{base64:true});
      z.file(`xl/worksheets/_rels/sheet${n}.xml.rels`,`<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing" Target="../drawings/drawing${n}.xml"/></Relationships>`);
      z.file(`xl/drawings/_rels/drawing${n}.xml.rels`,`<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/preview${n}.png"/></Relationships>`);
      z.file(`xl/drawings/drawing${n}.xml`,`<?xml version="1.0" encoding="UTF-8"?><xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><xdr:oneCellAnchor><xdr:from><xdr:col>7</xdr:col><xdr:colOff>76200</xdr:colOff><xdr:row>0</xdr:row><xdr:rowOff>57150</xdr:rowOff></xdr:from><xdr:ext cx="${Math.round(im.displayWidth*9525)}" cy="${Math.round(im.displayHeight*9525)}"/><xdr:pic><xdr:nvPicPr><xdr:cNvPr id="1" name="${xml(s.name)} 廣告預覽" descr="虛構品牌廣告示意，標示素材、標題、說明及CTA；非官方截圖。"/><xdr:cNvPicPr><a:picLocks noChangeAspect="1"/></xdr:cNvPicPr></xdr:nvPicPr><xdr:blipFill><a:blip r:embed="rId1"/><a:stretch><a:fillRect/></a:stretch></xdr:blipFill><xdr:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${Math.round(im.displayWidth*9525)}" cy="${Math.round(im.displayHeight*9525)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></xdr:spPr></xdr:pic><xdr:clientData/></xdr:oneCellAnchor></xdr:wsDr>`);
    });
    return z.generateAsync({type:'uint8array',compression:'DEFLATE'});
  }
  function buildTemplate(spec,catalog){
    const rows=[['區塊','填寫項目','需求','規格與填寫說明','客戶填寫（淡黃色）','補充／確認備註']],editable=[],sections=[],validations=[];
    function add(section,item,required,description,note='',input=false){rows.push([section,item,required,description,'',note]);if(input)editable.push(rows.length);}
    function section(title){rows.push([title,'','','','','']);sections.push(rows.length);}
    section(spec.platform+' '+spec.name+' 進稿表');
    add('使用說明','如何完成','說明','每組素材填一欄，請填淡黃色欄位；附檔名或下載連結。','本表為交付整理用途，非後台直接匯入檔。');
    add('基本資料','專案／活動名稱','交付必填','填寫本次活動名稱。','',true);
    add('基本資料','素材名稱','交付必填','每欄填寫一組素材，共三組。','',true);
    if(spec.unifiedMeta){add('基本資料','素材類型','必填','圖片／影片（下拉選單）','選擇類型後，依對應圖片或影片規格填寫。',true);validations.push({cell:'E'+rows.length,options:['圖片','影片'],title:'素材類型',prompt:'選擇圖片或影片；規格列於同表'});}
    add('基本資料','預計投放日期','選填','填寫起訖日期。','',true);
    add('基本資料','最終／登陸頁面網址','網站導流必填','完整 http:// 或 https:// 網址。','• 請確認網址有效、產品已上架。\n• 建議加上 UTM 追蹤參數。',true);
    if(spec.id!=='google-rsa'){
      const options=spec.platform==='Meta'?['瞭解詳情','立即購買','立即註冊','聯絡我們','取得報價','下載','預約時間','立即訂購','依後台選擇']:spec.id==='google-rda'?['系統自動選擇']:['瞭解更多','立即購買','立即註冊','聯絡我們','下載','依後台選擇'];
      add('基本資料','CTA 按鈕','依活動設定',spec.id==='google-rda'?'系統自動選擇。':'下拉選單'+(spec.fields.some(f=>f.id==='cta')?'；CTA 文案最多 10 計數單位。':'。'),spec.id==='google-rda'?'RDA 官方規格由系統自動選擇。':spec.platform==='Meta'?'可用按鈕依目標及後台確認；其他需求請寫交付備註。':'交付需求選項；正式按鈕文字及可用性依後台確認。',true);
      validations.push({cell:'E'+rows.length,options});
    }
    section('素材交付');
    const bullet=lines=>lines.map(x=>'• '+x).join('\n');
    // Customer-facing summaries; full platform technical guidance stays on the website.
    const summaries={
      'meta-carousel':{rules:['2–10 張圖卡；1:1；建議至少 1080×1080 px。','圖片：JPG／PNG；每張 ≤30 MB。','影片：MP4／MOV／GIF；每支 ≤4 GB；1 秒–240 分鐘。'],notes:['每張圖卡請填素材與連結。','內容及音樂須有使用授權。']},
      'google-rsa':{rules:['純文字廣告，不需圖片或影片。'],notes:['標題、說明可能重新組合，請讓每則文案都能獨立閱讀。']},
      'google-rda':{rules:['橫圖：1200×628 px（最低 600×314）；1–15 張。','方圖：建議 1200×1200 px（最低 300×300）；1–15 張。','圖片／Logo：每張 ≤5120 KB。','選填 Logo：方形 1200×1200；橫式 1200×300 px，各 1–5 張。','選填影片：YouTube 連結；1–5 支；建議 30 秒。'],notes:['方圖採較高解析度製作建議；官方格式頁亦列 600×600。','圖片避免畫上假的可點擊按鈕。','影片及 Logo 可不提供。']},
      'google-skippable':{rules:['影片：建議 1920×1080／1080×1920／1080×1080 px。','長度：一般競價未設上限；預訂型 12 秒–6 分鐘。','建議 15–20 秒；YouTube 上傳檔案 ≤256 GB。','選填隨播橫幅：300×60 px；JPG／PNG／GIF；≤150 KB。'],notes:['提供公開或不公開 YouTube 連結，不能設為私人影片。','內容及音樂須有使用授權。','不同活動設定的字數需求可能不同，投放前請複核。']},
      'google-bumper':{rules:['影片：5–6 秒；最長 6 秒。','建議 1920×1080／1080×1920／1080×1080 px。','YouTube 上傳檔案 ≤256 GB。','選填隨播橫幅：300×60 px；JPG／PNG／GIF；≤150 KB。'],notes:['提供公開或不公開 YouTube 連結。','5 秒為官方總覽列出的最短長度，實際依活動設定。','內容及音樂須有使用授權。']},
      'google-infeed':{rules:['影片：建議 1920×1080／1080×1920／1080×1080 px。','格式頁未限長度；建議 15–20 秒；YouTube 檔案 ≤256 GB。'],notes:['提供公開或不公開 YouTube 連結。','標題建議簡短，部分裝置可能截斷。','內容及音樂須有使用授權。']},
      'line-image':{rules:['JPG／PNG；每張 ≤10 MB。'],notes:['三個尺寸全部必交，屬本表交付需求。','600×400 小圖片投放資格，由投放人員確認。']},
      'line-video':{rules:['MP4／MOV；每支 ≤1 GB；5–600 秒。','建議製作：橫式 1920×1080／方形 1080×1080／直式 1080×1920 px。'],notes:['直式重點區域建議 888×1344（1080×1920）；方形建議 972×972（1080×1080）。','直式影片部分畫面會裁切，重要文字置中。','內容及音樂須有使用授權。']},
      'line-small-video':{rules:['MP4／MOV；每支 ≤1 GB；5–600 秒。','僅橫式 16:9 或方形 1:1，不收直式 9:16。','建議製作：1920×1080 或 1080×1080 px。'],notes:['內容及音樂須有使用授權。']},
      'line-carousel':{rules:['2–10 張圖卡；每張 1080×1080 px。','JPG／PNG；每張 ≤10 MB。'],notes:['每張圖卡請填文案、素材與連結。','全部圖卡通過審核後才會投放。']}
    };
    if(spec.ratios){
      spec.ratios.forEach(r=>add('素材版本',r.ratio+' 素材','建議交齊',r.size+'\n'+r.placement,r.ratio==='1:1'?'方形為製作建議。':'',true));
      add('素材交付','檔案規格','依素材類型',bullet(['圖片：JPG／PNG；每張 ≤30 MB。','影片：MP4／MOV；每支 ≤4 GB；1 秒–15 分鐘。']), '各比例填檔名或下載連結；影片請註明秒數。');
      add('素材交付','重要提醒','參考','',bullet(['9:16：頂端 14%、底部 35%、左右各 6% 不放重要文字與標誌。','各尺寸請重排主體與文字，避免裁切。','影片建議加字幕，音樂及內容須有授權。','Reels 請勿使用 GIF、變臉／相機特效或商品標籤。']));
    }else{
      if(spec.requiredSizes){spec.requiredSizes.forEach(size=>add('素材版本',size+' 圖片','必交',size+' px','填檔名或下載連結。',true));}
      else if(spec.videoUrl)add('影片','YouTube 影片網址','必填','YouTube 影片連結。','設定為公開或不公開。',true);
      else if(!spec.cards&&spec.category!=='文字')add('素材','檔名／下載連結','必填','素材檔名或下載連結。','多個素材請分行填寫；影片請註明秒數。',true);
      const summary=summaries[spec.id];
      if(!summary)throw new Error('Missing customer summary: '+spec.id);
      add('素材交付','素材規格','規格',bullet(summary.rules));
      if(summary.notes.length)add('素材交付','重要提醒','參考','',bullet(summary.notes));
    }
    section('文案填寫');
    add('文字計數','計數方式','說明',spec.counting==='google'?'中文／全形算 2，半形英數／空白算 1。':'全形、半形、空白均算 1 字。','字數不會自動計算；特殊符號請由投放人員確認。');
    function fields(list,group='文案',slotRequired=true){list.filter(f=>f.id!=='cta').forEach(f=>{for(let i=0;i<f.max;i++){
      const shared=spec.placements?.flatMap(p=>p.fields.filter(x=>x.id===f.id).map(x=>x.limit));
      const limit=shared?.length?Math.min(...shared):f.limit;
      const req=f.requirement||(!slotRequired&&f.required?'加卡時必填':slotRequired&&f.required&&i<Math.max(1,f.min)?'必填':f.mode==='recommendation'?'建議填寫':'選填');
      const metaCopy=spec.unifiedMeta&&f.id==='primary'?'• 圖片建議：125 字元\n• 影片建議：44 字元':null;
      const desc=metaCopy||bullet([(f.mode==='recommendation'?'建議 ':'最多 ')+(limit??'未設定')+' '+(spec.counting==='google'?'計數單位':'字元'),...(f.max>1&&i===0?['填 '+f.min+'–'+f.max+' 則。']:[]),...(f.id==='labels'&&i===0?['最多 3 個，合計最多 17 字。']:[])]);
      add(group,f.label+(f.max>1?' '+(i+1):''),req,desc,f.mode==='recommendation'?'超出可能截斷。':f.id==='smallDescription'?'用於 600×400 小圖片。':'',true);
    }});}
    fields(spec.fields);
    if(spec.unifiedMeta)add('文案','說明','選擇填寫','• 製作建議 27 字元','依活動與後台確認是否使用。',true);
    if(spec.cards){section('輪播圖卡（'+spec.cards.min+'–'+spec.cards.max+' 張）');for(let i=1;i<=spec.cards.max;i++){
      add('圖卡 '+i,'檔名／素材下載連結',i<=spec.cards.min?'必填':'加卡時必填','素材檔名或下載連結。','選填圖卡未使用時留白。',true);
      fields(spec.cards.fields,'圖卡 '+i,i<=spec.cards.min);
      add('圖卡 '+i,'連結網址',i<=spec.cards.min?'必填':'加卡時必填','填寫此圖卡完整網址。','',true);
    }}
    add('交付備註','其他需求','選填','填寫字幕、授權、排程或其他交付事項。','',true);
    section('官方來源與查核');
    add('查核','查核日期','參考',spec.checked,'查核日期不是官方發佈日期。');
    const sharedSources={Meta:{label:'Meta Ads Guide',url:'https://www.facebook.com/business/ads-guide/'},Google:{label:'Google Ads Help',url:'https://support.google.com/google-ads/'},'LINE LAP':{label:'LINE LAP 官方下載頁',url:'https://tw.linebiz.com/download/line-ads-platform/'}};
    const shared=sharedSources[spec.platform];
    add('來源',shared.label,'官方入口',shared.url,'詳細文件與版位來源可在網頁查閱。');
    add('使用範圍','素材確認','說明','由投放人員確認平台規格與審核。');
    // Match the supplied client template without modifying the reference file.
    const omitted=new Set(['專案／活動名稱','素材名稱','素材類型','預計投放日期','其他需求','重要提醒','計數方式']);
    const clean=rows.filter(r=>!omitted.has(r[1]));
    const assetNote=rows.find(r=>r[1]==='重要提醒')?.[5]||'';
    const assetRows=clean.filter(r=>r[0]==='素材版本');
    const assetSpec=clean.find(r=>['檔案規格','素材規格'].includes(r[1]));
    if(assetRows.length&&assetSpec){clean.splice(clean.indexOf(assetSpec),1);clean.splice(clean.indexOf(assetRows[0]),0,assetSpec);}
    const assetTarget=assetRows[0]||assetSpec;
    if(assetTarget)assetTarget[5]=[assetTarget[5],assetNote].filter(Boolean).join('\n');
    const copyRows=clean.filter(r=>r[0]==='文案');
    if(spec.unifiedMeta){copyRows.sort((a,b)=>['主要文字','標題','說明'].indexOf(a[1])-['主要文字','標題','說明'].indexOf(b[1]));const start=clean.findIndex(r=>r[0]==='文案');clean.splice(start,copyRows.length,...copyRows);}
    if(copyRows.length){copyRows.forEach(r=>r[5]='');copyRows[0][5]=(spec.counting==='google'?'中文／全形算 2，半形英數／空白算 1。':'全形、半形、空白均算 1 字。')+'\n'+(spec.platform==='Meta'?'超出建議長度可能隱藏並顯示「查看更多」。':'請依各欄字數上限填寫。')+(spec.id==='line-image'?'\n35 字說明用於 600×400 小圖片。':'')+(['google-skippable','google-bumper'].includes(spec.id)?'\n• 多格式 VRC：長標題、說明必填。\n• 單一串流／Bumper：不一律要求長標題及說明。\n• VVC／Demand Gen 請依活動後台確認，不能只交 CTA 短標題。':'');}
    clean.find(r=>r[1]==='如何完成')[5]='';
    const newEditable=clean.map((r,i)=>editable.includes(rows.indexOf(r)+1)?i+1:0).filter(Boolean);
    const newSections=clean.map((r,i)=>sections.includes(rows.indexOf(r)+1)?i+1:0).filter(Boolean);
    const newValidations=validations.flatMap(v=>{const row=rows[Number(v.cell.slice(1))-1],i=clean.indexOf(row);return i<0?[]:[{...v,cell:'E'+(i+1)}];});
    const merges=[];
    for(const group of [assetRows,copyRows])if(group.length>1){const first=clean.indexOf(group[0])+1,last=clean.indexOf(group[group.length-1])+1;if(last-first===group.length-1)merges.push(`C${first}:C${last}`);}
    const reqLabel=req=>({'必填':'必要','必交':'必要','交付必填':'必要','選擇填寫':'選填'}[req]||req);
    const displayRows=clean.map((r,i)=>{
      if(i===0)return ['進稿項目','規格／填寫說明','補充備註','素材 1','素材 2','素材 3'];
      if(newSections.includes(i+1))return [r[0],'','','','',''];
      const detail=['規格','說明','參考','官方入口'].includes(r[2])?'':`（${reqLabel(r[2])}）`;
      const cardPrefix=r[0].startsWith('圖卡 ')?r[0]+' · ':'';
      return [cardPrefix+r[1]+detail,r[3],r[5],'','',''];
    });
    const tripleValidations=newValidations.flatMap(v=>['D','E','F'].map(c=>({...v,cell:c+v.cell.slice(1)})));
    const names={'meta-creative':'Meta 圖片影片','meta-carousel':'Meta 輪播','google-rsa':'Google 搜尋 RSA','google-rda':'Google 多媒體 RDA','google-skippable':'Google 可略過影片','google-bumper':'Google 串場影片','google-infeed':'Google 動態內影片','line-image':'LAP 圖片','line-video':'LAP 影片','line-small-video':'LAP 小影片','line-carousel':'LAP 輪播'};
    return [{name:names[spec.id],rows:displayRows,widths:[27,52,46,30,30,30,3,48,48,48],editable:newEditable,sections:newSections,validations:tripleValidations,merges,editableCols:[3,4,5]}];
  }
  function withPreview(sheet,image){
    const displayWidth=1000,displayHeight=displayWidth*image.height/image.width;
    return {...sheet,image:{...image,displayWidth,displayHeight},freezeRow:2};
  }
  window.AdExcel={makeWorkbook,buildTemplate,withPreview};
})();
