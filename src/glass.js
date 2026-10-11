// Verified read-only against installed Desktop 0.2.0-rc.2, ui-chat CSS map.
// The assistant has no bubble wrapper in DSH. Decorate its existing root;
// preserve streaming nodes, copy handlers and selection without DOM replacement.
export function liquidGlassCss() {
  const user=':is([class$="_userRow"],[class*="_userRow "]) :is([class$="_bubble"],[class*="_bubble "])';
  const assistant=':is(.v5IAXa_root,.kshsua_root,[data-vesna-assistant])';
  const panels=`:is(${user},${assistant})`;
  return `
body[data-vesna-art="dark"]{--vesna-message-ink:#F3F8FC;--vesna-message-muted:#EDF4F8;--vesna-message-link:#D0FAFB;--vesna-message-base:rgba(255,255,255,.015);--vesna-user-base:rgba(255,255,255,.025);--vesna-message-rim:rgba(194,239,243,.30);--vesna-message-glint:rgba(255,255,255,0);--vesna-message-solid:#122D40;--vesna-message-code:rgba(0,0,0,.10);--vesna-message-shadow:rgba(3,15,27,.06)}
body[data-vesna-art="light"]{--vesna-message-ink:#173447;--vesna-message-muted:#3F596A;--vesna-message-link:#126572;--vesna-message-base:rgba(255,255,255,.015);--vesna-user-base:rgba(255,255,255,.025);--vesna-message-rim:rgba(63,119,127,.27);--vesna-message-glint:rgba(255,255,255,0);--vesna-message-solid:#F4FAF8;--vesna-message-code:rgba(255,255,255,.10);--vesna-message-shadow:rgba(32,63,75,.04)}
body[data-vesna-art] ${panels}{position:relative;box-sizing:border-box;min-width:0;max-width:100%;border:1px solid var(--vesna-message-rim);border-radius:22px;background:linear-gradient(135deg,var(--vesna-message-glint),transparent 42%),var(--vesna-message-base);backdrop-filter:blur(3px) saturate(108%);-webkit-backdrop-filter:blur(3px) saturate(108%);box-shadow:inset 0 1px 0 rgba(255,255,255,.30),inset 0 -1px 0 rgba(128,218,226,.08),0 8px 24px var(--vesna-message-shadow);color:var(--vesna-message-ink);--dsw-alias-label-primary:var(--vesna-message-ink);--dsw-alias-label-secondary:var(--vesna-message-muted);--dsw-alias-label-tertiary:var(--vesna-message-muted);--dsw-alias-label-caption:var(--vesna-message-muted);--dsw-alias-label-primary-dimmed:var(--vesna-message-muted);overflow-wrap:anywhere;text-shadow:0 1px 2px rgba(0,0,0,.22)}
body[data-vesna-art] ${user}{background:linear-gradient(135deg,var(--vesna-message-glint),transparent 48%),var(--vesna-user-base);padding:12px 18px;border-bottom-right-radius:8px}
body[data-vesna-art] ${assistant}{padding:20px 22px;border-top-left-radius:8px}
body[data-vesna-art] ${panels}::before{content:"";position:absolute;pointer-events:none;top:0;left:22px;right:22px;height:1px;background:linear-gradient(90deg,transparent,rgba(234,255,255,.68),transparent)}
body[data-vesna-art="light"] ${panels}{text-shadow:0 1px 2px rgba(255,255,255,.35)}
body[data-vesna-art] ${panels} a{color:var(--vesna-message-link);text-decoration:underline;text-underline-offset:3px}
body[data-vesna-art] ${panels} :is(pre,code){background:var(--vesna-message-code)}
body[data-vesna-art] ${panels} pre{max-width:100%;overflow-x:auto;border:1px solid var(--vesna-message-rim);border-radius:12px;padding:12px}
body[data-vesna-art] ${assistant} .md-table-wide{width:100%;max-width:100%;margin-left:0;padding-left:0;overflow-x:auto}
body[data-vesna-art] ${panels} :is(th,td){border-color:var(--vesna-message-rim)}
body[data-vesna-art] ${panels} :is(button,[role="button"]):focus-visible{outline:2px solid var(--vesna-message-link);outline-offset:3px}
body[data-vesna-art] ${panels} ::selection{background:#337988;color:white}
/* Clear variant: leave the reading plane untouched. Lensing and highlights
   are masked to an edge ring; pointer light never displaces text/content. */
body[data-vesna-art] ${panels}{--vesna-glass-x:18%;--vesna-glass-y:12%;--vesna-glass-energy:0;background:transparent;backdrop-filter:blur(1px) saturate(110%);-webkit-backdrop-filter:blur(1px) saturate(110%);border-color:transparent;border-radius:48px;corner-shape:superellipse(1.5);box-shadow:0 4px 10px rgba(7,25,40,.06),0 12px 28px rgba(7,25,40,.07)}
body[data-vesna-art] ${user}{background:transparent}
body[data-vesna-art] ${panels}::before{z-index:1;inset:-1px;height:auto;border-radius:inherit;corner-shape:inherit;padding:0;box-sizing:border-box;pointer-events:none;border:2px solid rgba(234,252,255,.04);background-image:var(--vesna-rim-reflection,linear-gradient(transparent,transparent));background-size:100% 100%;background-origin:border-box;mask:none;-webkit-mask:none;box-shadow:0 0 3px rgba(223,248,255,.04)}
body[data-vesna-art] ${panels}::after{content:"";position:absolute;z-index:0;inset:1px;pointer-events:none;border-radius:46px;corner-shape:inherit;padding:6px;box-sizing:border-box;background-image:var(--vesna-edge-sheen,linear-gradient(transparent,transparent)),radial-gradient(ellipse at var(--vesna-glass-x) var(--vesna-glass-y),rgba(255,255,255,calc(.035 + var(--vesna-glass-energy)*.075)),transparent 65%);background-size:100% 100%;box-shadow:none;-webkit-backdrop-filter:blur(.6px) saturate(112%);backdrop-filter:var(--vesna-edge-filter,blur(.6px)) saturate(112%);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask-composite:exclude;opacity:calc(.78 + var(--vesna-glass-energy)*.22)}body[data-vesna-art] ${panels}[style*="--vesna-edge-mask"]::after{-webkit-mask:var(--vesna-edge-mask) 0 0 / 100% 100% no-repeat border-box;mask:var(--vesna-edge-mask) 0 0 / 100% 100% no-repeat border-box;-webkit-mask-composite:source-over;mask-composite:add}
@media(prefers-reduced-motion:reduce){body[data-vesna-art] ${panels}::after{transition:none}}
@media(prefers-reduced-transparency:reduce),(forced-colors:active){body[data-vesna-art] ${panels}::before,body[data-vesna-art] ${panels}::after{display:none}}
@supports not (backdrop-filter:blur(1px)){body[data-vesna-art] ${panels}{background:var(--vesna-message-solid)}}
@media(prefers-reduced-transparency:reduce){body[data-vesna-art] ${panels}{background:var(--vesna-message-solid);backdrop-filter:none;-webkit-backdrop-filter:none}}
@media(forced-colors:active){body[data-vesna-art] ${panels}{background:Canvas;color:CanvasText;border:1px solid CanvasText;box-shadow:none;backdrop-filter:none;text-shadow:none}body[data-vesna-art="light"] ${panels}{text-shadow:none}
body[data-vesna-art] ${panels} a{color:LinkText}}
@media(max-width:700px){body[data-vesna-art] ${assistant}{padding:16px}body[data-vesna-art] ${user}{padding:10px 14px}}
`;
}

export function installLiquidGlassOptics() {
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('aria-hidden','true');svg.setAttribute('width','0');svg.setAttribute('height','0');
  svg.id='vesna-glass-edge-lens';
  svg.style.cssText='position:fixed;pointer-events:none;overflow:hidden';
  // Deterministic rounded-rectangle normal field, not random turbulence.
  // Keep the rim itself out of the refractive ring so its silhouette is straight.
  svg.innerHTML='<defs></defs>';
  document.body.append(svg);
  const lenses=new Map();let nextLens=0;
  const lensFor=(panel,bounds)=>{
    const w=bounds.width-4,h=bounds.height-4,dpr=Math.min(1,devicePixelRatio||1),old=lenses.get(panel);
    if(w<=0||h<=0)return;
    if(old?.w===w&&old?.h===h&&old?.dpr===dpr)return;
    old?.filter.remove();
    const filter=document.createElementNS(svg.namespaceURI,'filter');
    const id='vesna-glass-edge-lens-'+(++nextLens);
    filter.id=id;filter.setAttribute('x','0%');filter.setAttribute('y','0%');filter.setAttribute('width','100%');filter.setAttribute('height','100%');filter.setAttribute('color-interpolation-filters','sRGB');
    const canvas=document.createElement('canvas'),scale=Math.min(dpr,1024/Math.max(w,h));
    canvas.width=Math.max(1,Math.round(w*scale));canvas.height=Math.max(1,Math.round(h*scale));
    const context=canvas.getContext('2d'),pixels=context.createImageData(canvas.width,canvas.height);
    const edgeCanvas=document.createElement('canvas'),sheenCanvas=document.createElement('canvas');
    edgeCanvas.width=sheenCanvas.width=canvas.width;edgeCanvas.height=sheenCanvas.height=canvas.height;
    const edgeContext=edgeCanvas.getContext('2d'),sheenContext=sheenCanvas.getContext('2d');
    const edgePixels=edgeContext.createImageData(canvas.width,canvas.height),sheenPixels=sheenContext.createImageData(canvas.width,canvas.height);
    // Use the same superellipse as the CSS silhouette. Higher-order corners
    // meet the straight edge with zero curvature, instead of a circular kink.
    // This is a web approximation, not Apple's proprietary native geometry.
    const radius=Math.min(46,w/2,h/2),band=12;
    const exponent=CSS.supports('corner-shape','superellipse(1.5)')?2**1.5:2;
    for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++){
      const px=(x+.5)/canvas.width*w-w/2,py=(y+.5)/canvas.height*h-h/2;
      // The central rectangle has zero displacement. Avoid expensive powers
      // there so first entry remains responsive even on long answers.
      if(Math.abs(px)<w/2-radius-band&&Math.abs(py)<h/2-radius-band){const i=(y*canvas.width+x)*4;pixels.data[i]=128;pixels.data[i+1]=128;pixels.data[i+2]=128;pixels.data[i+3]=255;continue}
      const qx=Math.abs(px)-(w/2-radius),qy=Math.abs(py)-(h/2-radius),ox=Math.max(qx,0),oy=Math.max(qy,0);
      const length=ox===0?oy:oy===0?ox:(ox**exponent+oy**exponent)**(1/exponent);
      const gx=length? (ox/length)**(exponent-1):0,gy=length?(oy/length)**(exponent-1):0,gradient=Math.hypot(gx,gy);
      const distance=(length+Math.min(Math.max(qx,qy),0)-radius)/(gradient||1);
      let nx=0,ny=0;if(gradient>0){nx=gx/gradient*Math.sign(px);ny=gy/gradient*Math.sign(py)}else if(qx>qy)nx=Math.sign(px);else ny=Math.sign(py);
      const depth=Math.max(0,-distance),t=depth/band;
      // Concentrate lensing at the outer shoulder, with a gentle decay inward.
      const strength=distance<=0&&depth<band?t*(1-t)**2*3.1:0;
      const i=(y*canvas.width+x)*4;pixels.data[i]=Math.round(128+127*nx*strength);pixels.data[i+1]=Math.round(128+127*ny*strength);pixels.data[i+2]=128;pixels.data[i+3]=255;
      if(distance<=0&&depth<band){
        // A feathered optical shoulder, not an opaque constant-width bevel.
        const coverage=Math.min(1,depth/.8)*(.5+.5*Math.cos(Math.PI*depth/band));
        const facing=Math.max(0,-nx*.55-ny*.835),opposite=Math.max(0,nx*.55+ny*.835);
        const reflection=(facing**10*.38+opposite**12*.16)*Math.exp(-(((depth-1.4)/1.5)**2));
        edgePixels.data[i]=edgePixels.data[i+1]=edgePixels.data[i+2]=255;edgePixels.data[i+3]=Math.round(255*coverage);
        sheenPixels.data[i]=sheenPixels.data[i+1]=sheenPixels.data[i+2]=255;sheenPixels.data[i+3]=Math.round(255*reflection);
      }
    }
    context.putImageData(pixels,0,0);
    edgeContext.putImageData(edgePixels,0,0);sheenContext.putImageData(sheenPixels,0,0);
    panel.style.setProperty('--vesna-edge-mask',`url("${edgeCanvas.toDataURL()}")`);
    panel.style.setProperty('--vesna-edge-sheen',`url("${sheenCanvas.toDataURL()}")`);
    // Draw a directional reflection along the full outer silhouette. The
    // baseline stays quiet; broad white outlines read as metal/plastic trim.
    const rimCanvas=document.createElement('canvas'),rw=w+4,rh=h+4,rr=Math.min(48,rw/2,rh/2);
    rimCanvas.width=Math.round(rw*scale);rimCanvas.height=Math.round(rh*scale);
    const rimContext=rimCanvas.getContext('2d'),rimPixels=rimContext.createImageData(rimCanvas.width,rimCanvas.height);
    for(let y=0;y<rimCanvas.height;y++)for(let x=0;x<rimCanvas.width;x++){
      const px=(x+.5)/rimCanvas.width*rw-rw/2,py=(y+.5)/rimCanvas.height*rh-rh/2;
      if(Math.abs(px)<rw/2-rr-3&&Math.abs(py)<rh/2-rr-3)continue;
      const qx=Math.abs(px)-(rw/2-rr),qy=Math.abs(py)-(rh/2-rr),ox=Math.max(qx,0),oy=Math.max(qy,0);
      const length=ox===0?oy:oy===0?ox:(ox**exponent+oy**exponent)**(1/exponent);
      const gx=length?(ox/length)**(exponent-1):0,gy=length?(oy/length)**(exponent-1):0,gradient=Math.hypot(gx,gy);
      const distance=(length+Math.min(Math.max(qx,qy),0)-rr)/(gradient||1),depth=-distance;
      if(depth<0||depth>2.8)continue;
      const nx=gradient?gx/gradient*Math.sign(px):qx>qy?Math.sign(px):0;
      const ny=gradient?gy/gradient*Math.sign(py):qx>qy?0:Math.sign(py);
      const key=Math.max(0,-nx*.55-ny*.835),bounce=Math.max(0,nx*.55+ny*.835);
      const coverage=Math.min(1,depth/.5)*Math.max(0,Math.min(1,(2.8-depth)/.8));
      const i=(y*rimCanvas.width+x)*4;
      rimPixels.data[i]=242;rimPixels.data[i+1]=252;rimPixels.data[i+2]=255;
      rimPixels.data[i+3]=Math.round(255*coverage*(.10+key**12*.72+bounce**14*.38));
    }
    rimContext.putImageData(rimPixels,0,0);
    panel.style.setProperty('--vesna-rim-reflection',`url("${rimCanvas.toDataURL()}")`);
    const image=document.createElementNS(svg.namespaceURI,'feImage');image.setAttribute('href',canvas.toDataURL());image.setAttribute('preserveAspectRatio','none');image.setAttribute('result','normal');
    const smooth=document.createElementNS(svg.namespaceURI,'feGaussianBlur');smooth.setAttribute('in','normal');smooth.setAttribute('stdDeviation','.35');smooth.setAttribute('result','lens');
    const displacement=document.createElementNS(svg.namespaceURI,'feDisplacementMap');displacement.setAttribute('in','SourceGraphic');displacement.setAttribute('in2','lens');displacement.setAttribute('scale',String(8+4*(motion.get(panel)?.energy||0)));displacement.setAttribute('xChannelSelector','R');displacement.setAttribute('yChannelSelector','G');
    filter.append(image,smooth,displacement);svg.firstElementChild.append(filter);lenses.set(panel,{filter,displacement,w,h,dpr});panel.style.setProperty('--vesna-edge-filter',`url("#${id}") blur(.6px)`);
  };
  const selector='.v5IAXa_root,.kshsua_root,[data-vesna-assistant],[class$="_userRow"] [class$="_bubble"],[class*="_userRow "] [class*="_bubble "]';
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const previous=new Map(),motion=new Map();let frame=0,lastTime=0,active=null,disposed=false;
  const restore=panel=>{for(const [key,value,priority]of previous.get(panel)||[]){if(value)panel.style.setProperty(key,value,priority);else panel.style.removeProperty(key)}previous.delete(panel);motion.delete(panel);lenses.get(panel)?.filter.remove();lenses.delete(panel)};
  const write=(panel,state)=>{
    panel.style.setProperty('--vesna-glass-x',state.x.toFixed(3)+'%');panel.style.setProperty('--vesna-glass-y',state.y.toFixed(3)+'%');panel.style.setProperty('--vesna-glass-energy',state.energy.toFixed(4));
    lenses.get(panel)?.displacement.setAttribute('scale',(8+4*state.energy).toFixed(3));
  };
  const tick=now=>{
    frame=0;if(disposed)return;
    const dt=lastTime?Math.min(40,Math.max(1,now-lastTime)):16;lastTime=now;let unsettled=false;
    for(const [panel,state]of motion){
      if(!panel.isConnected){restore(panel);continue}
      const following=panel===active,tx=following?state.targetX:18,ty=following?state.targetY:12,te=following?1:0;
      const positionBlend=1-Math.exp(-dt/(following?40:140)),lightBlend=1-Math.exp(-dt/(following?50:130));
      state.x+=(tx-state.x)*positionBlend;state.y+=(ty-state.y)*positionBlend;state.energy+=(te-state.energy)*lightBlend;
      const stillMoving=Math.abs(tx-state.x)>.025||Math.abs(ty-state.y)>.025||Math.abs(te-state.energy)>.002;
      if(!stillMoving){state.x=tx;state.y=ty;state.energy=te}
      write(panel,state);unsettled||=stillMoving;
    }
    if(unsettled&&!reduced.matches)frame=requestAnimationFrame(tick);else lastTime=0;
  };
  const animate=()=>{if(!disposed&&!frame&&!reduced.matches){lastTime=0;frame=requestAnimationFrame(tick)}};
  const prepare=panel=>{
    const bounds=panel.getBoundingClientRect();if(bounds.width===0||bounds.height===0)return;
    if(!previous.has(panel)){
      for(const [old]of previous)if(!old.isConnected)restore(old);
      if(previous.size>=32){const old=[...previous.keys()].find(x=>!visible.has(x)&&x!==active);if(old)restore(old);else return}
      previous.set(panel,['--vesna-glass-x','--vesna-glass-y','--vesna-glass-energy','--vesna-edge-filter','--vesna-edge-mask','--vesna-edge-sheen','--vesna-rim-reflection'].map(key=>[key,panel.style.getPropertyValue(key),panel.style.getPropertyPriority(key)]));
      motion.set(panel,{x:18,y:12,energy:0,targetX:18,targetY:12});
    }
    lensFor(panel,bounds);return bounds;
  };
  const move=event=>{
    if(scrolling||reduced.matches||!document.body.hasAttribute('data-vesna-art'))return;
    const panel=event.target instanceof Element?event.target.closest(selector):null;
    if(!panel){if(active){active=null;animate()}return}
    const bounds=prepare(panel);if(!bounds)return;active=panel;
    const state=motion.get(panel);state.targetX=Math.max(0,Math.min(100,(event.clientX-bounds.left)/bounds.width*100));state.targetY=Math.max(0,Math.min(100,(event.clientY-bounds.top)/bounds.height*100));animate();
  };
  const leave=()=>{if(active){active=null;animate()}};
  const out=event=>{const next=event.relatedTarget instanceof Element?event.relatedTarget.closest(selector):null;if(active&&next!==active){active=null;animate()}};
  const reduce=()=>{if(reduced.matches){active=null;if(frame)cancelAnimationFrame(frame);frame=0;lastTime=0;for(const [panel,state]of motion){state.x=18;state.y=12;state.energy=0;write(panel,state)}}};
  document.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerover',move,{passive:true});document.addEventListener('pointerout',out,{passive:true});document.addEventListener('mouseleave',leave);document.addEventListener('scroll',onScroll,{passive:true,capture:true});window.addEventListener('blur',leave);reduced.addEventListener('change',reduce);
  // Build visible panels before interaction. Static glass must still refract;
  // observers also keep the optical maps aligned as replies stream or resize.
  const watched=new Set();
  const assistantMarks=new Map();let styleCount=-1,assistantPrefixes=[];
  const markAssistants=()=>{
    const styles=document.querySelectorAll('style');
    if(styles.length!==styleCount){
      styleCount=styles.length;const prefixes=new Set();
      // The reply renderer owns wide Markdown table layout. Discover its
      // module prefix from the host CSS instead of guessing every build hash.
      for(const style of styles)for(const match of style.textContent.matchAll(/\.([\w-]+)_body\s+\.md-table-wide\s*\{/g))prefixes.add(match[1]);
      assistantPrefixes=[...prefixes];
    }
    const current=new Set();
    for(const prefix of assistantPrefixes)for(const root of document.querySelectorAll('.'+CSS.escape(prefix+'_root'))){
      if(![...root.children].some(x=>x.classList.contains(prefix+'_body')))continue;
      current.add(root);
      if(!assistantMarks.has(root))assistantMarks.set(root,root.getAttribute('data-vesna-assistant'));
      root.setAttribute('data-vesna-assistant','true');
    }
    for(const [root,old]of assistantMarks)if(!current.has(root)){
      if(old===null)root.removeAttribute('data-vesna-assistant');else root.setAttribute('data-vesna-assistant',old);
      assistantMarks.delete(root);restore(root);
    }
  };
  const visible=new Set(),pending=new Set();let workTimer=0,scrollTimer=0,scrolling=false;
  const flush=()=>{workTimer=0;if(disposed||scrolling)return;const panel=pending.values().next().value;if(!panel)return;pending.delete(panel);if(panel.isConnected&&visible.has(panel)&&document.body.hasAttribute('data-vesna-art'))prepare(panel);if(pending.size)workTimer=setTimeout(flush,16)};
  const schedule=panel=>{pending.add(panel);if(!workTimer&&!scrolling)workTimer=setTimeout(flush,80)};
  function onScroll(){leave();scrolling=true;clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>{scrolling=false;if(!workTimer&&pending.size)workTimer=setTimeout(flush,0)},120)}
  const visibility=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){visible.add(e.target);schedule(e.target)}else{visible.delete(e.target);pending.delete(e.target)}}},{rootMargin:'100px'});
  const resize=new ResizeObserver(entries=>{for(const e of entries)if(visible.has(e.target))schedule(e.target)});
  const scan=(records=[])=>{if(records.some(x=>(x.target instanceof Element?x.target:x.target.parentElement)?.closest('style')))styleCount=-1;markAssistants();for(const panel of document.querySelectorAll(selector))if(!watched.has(panel)){watched.add(panel);visibility.observe(panel);resize.observe(panel)}for(const panel of watched)if(!panel.isConnected||!panel.matches(selector)){visibility.unobserve(panel);resize.unobserve(panel);watched.delete(panel);restore(panel)}};
  const mutations=new MutationObserver(scan);mutations.observe(document.documentElement,{childList:true,subtree:true});scan();
  return ()=>{disposed=true;clearTimeout(workTimer);clearTimeout(scrollTimer);pending.clear();visible.clear();mutations.disconnect();visibility.disconnect();resize.disconnect();watched.clear();for(const[root,old]of assistantMarks){if(old===null)root.removeAttribute('data-vesna-assistant');else root.setAttribute('data-vesna-assistant',old)}assistantMarks.clear();document.removeEventListener('pointermove',move);document.removeEventListener('pointerover',move);document.removeEventListener('pointerout',out);document.removeEventListener('mouseleave',leave);document.removeEventListener('scroll',onScroll,{capture:true});window.removeEventListener('blur',leave);reduced.removeEventListener('change',reduce);if(frame)cancelAnimationFrame(frame);for(const [panel]of previous)restore(panel);active=null;motion.clear();lenses.clear();svg.remove()};
}

// Static Gaussian material: no canvas, SVG displacement or pointer animation.
export function gaussianGlassCss(){
 const panels=':is(.v5IAXa_root,.kshsua_root,[data-vesna-assistant],[class$="_userRow"] [class$="_bubble"],[class*="_userRow "] [class*="_bubble "])';
 return `body[data-vesna-material="gaussian"][data-vesna-art] ${panels}{position:relative;box-sizing:border-box;max-width:100%;min-width:0;padding:18px 22px;border:1px solid rgba(186,228,233,.32);border-radius:24px;background:rgba(21,40,59,.12);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);box-shadow:0 3px 12px rgba(7,25,40,.06);overflow-wrap:anywhere;color:#f3f8fc;text-shadow:0 1px 2px rgba(0,0,0,.22)}
 body[data-vesna-material="gaussian"][data-vesna-art="light"] ${panels}{background:rgba(250,248,242,.16);border-color:rgba(54,103,117,.28);color:#173447;text-shadow:none}
 body[data-vesna-material="gaussian"][data-vesna-art] ${panels}::before,body[data-vesna-material="gaussian"][data-vesna-art] ${panels}::after{content:none}
 body[data-vesna-material="gaussian"][data-vesna-art] ${panels} .md-table-wide{width:100%;max-width:100%;margin-left:0;padding-left:0;overflow-x:auto}
 body[data-vesna-material="gaussian"][data-vesna-art] ${panels} pre{max-width:100%;overflow-x:auto}
 @media(prefers-reduced-transparency:reduce){body[data-vesna-material="gaussian"][data-vesna-art] ${panels}{background:#122d40;backdrop-filter:none}body[data-vesna-material="gaussian"][data-vesna-art="light"] ${panels}{background:#f4faf8}}
 @media(max-width:700px){body[data-vesna-material="gaussian"][data-vesna-art] ${panels}{padding:14px 16px}}`;
}
// Only discover the host reply renderer; no scroll or mouse listeners.
export function installGaussianMessageMarkers(){
 const marks=new Map();let timer=0,disposed=false;
 const scan=()=>{timer=0;if(disposed)return;const prefixes=new Set();for(const s of document.querySelectorAll('style'))for(const m of s.textContent.matchAll(/\.([\w-]+)_body\s+\.md-table-wide\s*\{/g))prefixes.add(m[1]);
 for(const prefix of prefixes)for(const root of document.querySelectorAll('.'+CSS.escape(prefix+'_root'))){if(![...root.children].some(x=>x.classList.contains(prefix+'_body')))continue;if(!marks.has(root))marks.set(root,root.getAttribute('data-vesna-assistant'));root.setAttribute('data-vesna-assistant','true')}
 for(const[root]of marks)if(!root.isConnected)marks.delete(root);
 };
 const observer=new MutationObserver(()=>{if(!timer)timer=setTimeout(scan,100)});observer.observe(document.documentElement,{childList:true,subtree:true});scan();
 return()=>{disposed=true;clearTimeout(timer);observer.disconnect();for(const[root,old]of marks){if(old===null)root.removeAttribute('data-vesna-assistant');else root.setAttribute('data-vesna-assistant',old)}marks.clear()};
}

// Tear down the entire optical engine when Gaussian mode is selected.
export function createMessageMaterialManager(){
 const body=document.body,previous=body.getAttribute('data-vesna-material');let mode=null,disposeEngine=null;
 return{sync(state){const next=state.enabled&&state.wallpaper?state.material:null;if(next===mode)return;disposeEngine?.();disposeEngine=null;mode=next;if(next){body.setAttribute('data-vesna-material',next);disposeEngine=next==='gaussian'?installGaussianMessageMarkers():installLiquidGlassOptics()}else body.removeAttribute('data-vesna-material')},dispose(){disposeEngine?.();disposeEngine=null;mode=null;if(previous===null)body.removeAttribute('data-vesna-material');else body.setAttribute('data-vesna-material',previous)}};
}
