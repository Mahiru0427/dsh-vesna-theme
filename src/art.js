// CSS-module roles verified against Desktop 0.2.0-rc.2. Match complete
// class tokens rather than a build-specific hash. No DOM or event replacement.
function role(name) {
  return `:is([class$="_${name}"],[class*="_${name} "])`;
}

export function artCss(wallpaperUrl, stickersUrl, individualUrls) {
  // Conversation viewports also have a "frame" role: only the shell owns art.
  const sidebar = role('sidebarCol'), frame = `${role('frame')}:has(> ${sidebar})`;
  const canvas = `${role('centerCol')},${role('rightbarCol')}`;
  const newIcon = `button${role('newSession')} ${role('newSessionContent')}`;
  const send = `button${role('primary')}:is([aria-label^="发送"],[aria-label^="Send"])`;
  const hello = role('fishHitbox');
  const sticker = index => `background-image:url("${individualUrls[index]}");background-size:contain;background-repeat:no-repeat;background-position:center;pointer-events:none`;
  return `
body[data-vesna-art="dark"]{background-color:#15283B;--vesna-scene:linear-gradient(90deg,rgba(21,40,59,.65),rgba(21,40,59,.61)),url("${wallpaperUrl}");--vesna-glass:rgba(21,40,59,.20)}
body[data-vesna-art="light"]{background-color:#FAF8F2;--vesna-scene:linear-gradient(90deg,rgba(250,248,242,.80),rgba(250,248,242,.76)),url("${wallpaperUrl}");--vesna-glass:rgba(250,248,242,.32)}
body[data-vesna-art]{background-image:var(--vesna-scene);background-size:cover;background-position:center;background-attachment:fixed}
body[data-vesna-art] ${frame}{background-image:var(--vesna-scene);background-size:cover;background-position:center;background-color:transparent}
body[data-vesna-art] :is(${canvas}){background:transparent}
body[data-vesna-art] ${sidebar}{background:transparent;position:relative;isolation:isolate}
body[data-vesna-art] ${sidebar}::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:var(--vesna-glass);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
body[data-vesna-art] ${sidebar} ${role('root')}{background:transparent}
body[data-vesna-art] ${frame}::before{background:var(--vesna-glass);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
body[data-vesna-art] ${role('rightbarCol')}{background:var(--vesna-glass);backdrop-filter:blur(8px)}
body[data-vesna-art="dark"]{--vesna-input-glass:rgba(16,34,50,.62)}
body[data-vesna-art="light"]{--vesna-input-glass:rgba(250,248,242,.66)}
body[data-vesna-art] ${role('card')}:has(${role('input')}){background:var(--vesna-input-glass);background-image:none;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid var(--dsw-alias-border-l2)}
body[data-vesna-art] ${role('frame')}:not(:has(> ${sidebar})){background-image:none;background-color:transparent}
body[data-vesna-personal] ${role('menu')}:has([role="listbox"]){background:var(--dsw-specific-menu);background-image:none;backdrop-filter:none;-webkit-backdrop-filter:none;box-shadow:0 8px 28px rgba(0,0,0,.24)}
body[data-vesna-art] ${role('root')}:has(> ${role('stack')}>${role('headline')}){justify-content:flex-start;align-items:center}
body[data-vesna-personal] ${role('headline')}:has(${hello}){justify-content:flex-start;text-align:left;gap:12px;font-size:22px;line-height:1.5}
body[data-vesna-personal] ${role('titleGroup')}:has(> ${role('previewBadge')}){justify-content:flex-start;flex:1;min-width:0}
body[data-vesna-personal] ${role('titleGroup')}>${role('previewBadge')}{display:none}
body[data-vesna-personal] ${role('stack')}:has(>${role('headline')}){margin-right:auto;max-width:min(620px,100%);gap:18px}
body[data-vesna-personal] ${role('root')}:has(> ${role('stack')}){padding-left:clamp(24px,4vw,56px);padding-right:24px}
body[data-vesna-personal] ${role('composerStack')}${role('composerHero')}{width:38%;min-width:min(360px,calc(100% - 48px));max-width:calc(100% - 48px);align-self:flex-start;margin-left:clamp(24px,3vw,56px);container-type:inline-size}
body[data-vesna-personal] ${role('composerHero')} ${role('card')}:has(${role('input')}){width:100%;max-width:none;box-sizing:border-box}
body[data-vesna-personal] ${role('composerHero')} ${role('input')}{min-height:clamp(52px,10cqw,160px)}
body[data-vesna-personal] ${role('composerHero')} ${role('root')}:has(> ${role('stack')}){width:100%;box-sizing:border-box;padding:0}
body[data-vesna-stickers] ${newIcon}{gap:8px;justify-content:flex-start;width:100%}
body[data-vesna-stickers] ${newIcon}::before{content:"";width:36px;height:36px;flex:none;${sticker(0)};background-size:150%;background-position:50% 35%;border-radius:50%;background-color:var(--dsw-specific-menu);box-shadow:0 0 0 1px var(--dsw-alias-border-l2)}
body[data-vesna-stickers] ${newIcon}>svg{display:none}
body[data-vesna-stickers] ${send}{position:relative;width:88px;height:46px;border-radius:12px}
body[data-vesna-stickers] ${send}>svg{visibility:hidden}
body[data-vesna-stickers] ${send}::before{content:"";position:absolute;left:3px;top:3px;width:40px;height:40px;${sticker(5)};background-size:145%;background-position:55% 75%;border-radius:50%;background-color:var(--dsw-specific-menu)}
body[data-vesna-stickers] ${send}::after{content:"发送";position:absolute;right:8px;top:50%;transform:translateY(-50%);font:500 13px/20px sans-serif;color:var(--dsw-alias-label-primary);pointer-events:none}
body[data-vesna-stickers] ${send}:disabled{opacity:.72}
body[data-vesna-stickers] button${role('newSession')}{height:48px}
body[data-vesna-stickers] ${role('collapsed')} button${role('newSession')}{width:42px;height:42px}
body[data-vesna-stickers] ${role('collapsed')} ${newIcon}::before{width:36px;height:36px}
body[data-vesna-stickers] button${role('add')}[aria-label="添加文件或调用指令"]{position:relative;width:32px;height:32px}
body[data-vesna-stickers] button${role('add')}[aria-label="添加文件或调用指令"]::before{content:"";position:absolute;left:-16px;bottom:calc(100% + 8px);width:64px;height:64px;${sticker(2)};opacity:0;visibility:hidden}
body[data-vesna-stickers] button${role('add')}[aria-label="添加文件或调用指令"]:not([aria-expanded="true"]):is(:hover,:focus-visible)::before{opacity:1;visibility:visible}
body[data-vesna-stickers] ${role('card')}:has(${role('menu')} [role="listbox"]) button${role('add')}::before{opacity:0;visibility:hidden}
body[data-vesna-stickers] button:is([aria-label="好的回答"],[aria-label="有问题的回答"]){position:relative;width:28px;height:28px}
body[data-vesna-stickers] button:is([aria-label="好的回答"],[aria-label="有问题的回答"])::before{content:"";position:absolute;left:-18px;bottom:calc(100% + 8px);width:64px;height:64px;opacity:0;visibility:hidden}
body[data-vesna-stickers] button[aria-label="好的回答"]::before{${sticker(4)}}
body[data-vesna-stickers] button[aria-label="有问题的回答"]::before{${sticker(3)}}
body[data-vesna-stickers] button:is([aria-label="好的回答"],[aria-label="有问题的回答"]):is(:hover,:focus-visible)::before{opacity:1;visibility:visible}
body[data-vesna-stickers] ${hello}{width:84px;height:84px;position:relative}
body[data-vesna-stickers] ${hello} svg{display:none}
body[data-vesna-stickers] ${hello}::before{content:"";position:absolute;inset:0;${sticker(1)}}
.vesna-button-preview{position:fixed;z-index:10000;width:80px;height:80px;padding:6px;box-sizing:content-box;background:var(--dsw-specific-menu);border:1px solid var(--dsw-alias-border-l2);border-radius:16px;box-shadow:0 8px 24px rgba(0,0,0,.24);pointer-events:none}
.vesna-button-preview[hidden],body:not([data-vesna-stickers]) .vesna-button-preview{display:none}
.vesna-button-preview img{width:100%;height:100%;object-fit:contain}
@media(prefers-reduced-transparency:reduce){body[data-vesna-art] ${sidebar}::before,body[data-vesna-art] ${frame}::before,body[data-vesna-art] ${role('rightbarCol')},body[data-vesna-art] ${role('card')}:has(${role('input')}){background:var(--dsw-alias-bg-module-platform);backdrop-filter:none}}
@media(max-width:600px){body[data-vesna-art],body[data-vesna-art] ${frame}{background-position:70% center}body[data-vesna-stickers] ${hello}{width:64px;height:64px}body[data-vesna-stickers] ${send}{width:84px}}
`;
}

// One decorative preview shared by both buttons. Delegation survives React
// navigation; no button content, click handlers or disabled state is changed.
export function installButtonPreviews(controller, individualUrls) {
  const preview=document.createElement('div');
  preview.className='vesna-button-preview';preview.hidden=true;
  preview.setAttribute('aria-hidden','true');
  const image=document.createElement('img');image.alt='';preview.appendChild(image);
  document.body.appendChild(preview);
  const selector=`button${role('newSession')},button${role('primary')}:is([aria-label^="发送"],[aria-label^="Send"])`;
  let active;
  const hide=()=>{preview.hidden=true;active=null;};
  const identify=target=>target instanceof Element?target.closest(selector):null;
  const show=event=>{
    const button=identify(event.target),state=controller.getSnapshot();
    if(!button||!state.enabled||!state.stickers)return;
    if(active===button&&!preview.hidden)return;
    active=button;
    const send=button.matches(role('primary'));
    image.src=individualUrls[send?5:0];
    const rect=button.getBoundingClientRect(),size=94;
    const left=send?rect.right-size:rect.right+10;
    const top=send?rect.top-size-10:rect.top+(rect.height-size)/2;
    preview.style.left=Math.max(8,Math.min(left,innerWidth-size-8))+'px';
    preview.style.top=Math.max(8,Math.min(top,innerHeight-size-8))+'px';
    preview.hidden=false;
  };
  const leave=event=>{if(active===identify(event.target)&&active!==identify(event.relatedTarget))hide();};
  document.addEventListener('pointerover',show,true);document.addEventListener('pointerout',leave,true);
  document.addEventListener('focusin',show,true);document.addEventListener('focusout',leave,true);
  document.addEventListener('scroll',hide,true);document.addEventListener('keydown',hide,true);
  window.addEventListener('resize',hide);window.addEventListener('blur',hide);
  const unsubscribe=controller.subscribe(hide);
  return()=>{unsubscribe();preview.remove();document.removeEventListener('pointerover',show,true);document.removeEventListener('pointerout',leave,true);document.removeEventListener('focusin',show,true);document.removeEventListener('focusout',leave,true);document.removeEventListener('scroll',hide,true);document.removeEventListener('keydown',hide,true);window.removeEventListener('resize',hide);window.removeEventListener('blur',hide);};
}

// The host locale registry disallows overrides of existing namespaces. Change
// only the verified hero text node, retaining React's element and restoring it
// on disable/unload. Reconcile after navigation and host rerenders.
export function installHeroCopy(controller) {
  const original = new Map();
  const selector = `${role('headline')}:has(${role('fishHitbox')}) ${role('titleGroup')}>span:first-child`;
  const sentence = '找我什么事呀，亲爱的朋友~';
  const patch = () => {
    for (const el of document.querySelectorAll(selector)) {
      if (!original.has(el)) original.set(el,el.textContent);
      if (el.textContent !== sentence) el.textContent=sentence;
    }
    for (const el of original.keys()) if (!el.isConnected) original.delete(el);
  };
  const observer = new MutationObserver(patch);
  const previous = document.body.getAttribute('data-vesna-personal');
  const sync = () => {
    observer.disconnect();
    const enabled=controller.getSnapshot().enabled;
    document.body.toggleAttribute('data-vesna-personal',enabled);
    if (enabled) {patch();observer.observe(document.body,{subtree:true,childList:true,characterData:true});}
    else {for(const[el,text]of original)if(el.isConnected)el.textContent=text;original.clear();}
  };
  sync();
  const unsubscribe=controller.subscribe(sync);
  return () => {
    unsubscribe();observer.disconnect();
    for(const[el,text]of original)if(el.isConnected)el.textContent=text;
    original.clear();
    if(previous===null)document.body.removeAttribute('data-vesna-personal');else document.body.setAttribute('data-vesna-personal',previous);
  };
}

