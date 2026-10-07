import { PALETTES, OVERRIDES, ART_OVERRIDES } from './palette.js';
import { createController, STORAGE_KEY } from './controller.js';
import { artCss, installHeroCopy, installButtonPreviews } from './art.js';

export const inject = ['theme', 'slots', 'locale'];
export const dictionaries = {
  zh: { title:'薇斯纳主题', description:'青蓝与奶白，点缀珊瑚粉和淡金。', default:'默认配色', light:'春日浅色', dark:'夜宴深色', system:'跟随系统', activeLight:'当前为浅色', activeDark:'当前为深色', inactive:'已恢复默认配色', saved:'选择已保存', unavailable:'当前选择仅在本次打开期间生效，无法保存到本机。', newer:'已有较新版本的设置，本版不会覆盖；当前切换仅临时生效。', invalid:'保存的设置无法识别，已恢复默认；重新选择即可保存。', palette:'主题配色', colorTeal:'青蓝', colorWhite:'奶白', colorNavy:'深蓝', colorPink:'珊瑚粉', colorGold:'淡金' },
  en: { title:'Vesna theme', description:'Teal and ivory with coral pink and soft gold.', default:'Default colors', light:'Spring light', dark:'Evening dark', system:'Follow system', activeLight:'Light appearance', activeDark:'Dark appearance', inactive:'Default colors restored', saved:'Selection saved', unavailable:'This selection lasts for this window only. Local saving is unavailable.', newer:'Newer settings were found and will be preserved. Changes are temporary.', invalid:'Saved settings were not recognized. Choose an appearance to save again.', palette:'Theme palette', colorTeal:'Teal', colorWhite:'Ivory', colorNavy:'Navy', colorPink:'Coral pink', colorGold:'Soft gold' }
};
Object.assign(dictionaries.zh, {wallpaper:'全窗口角色壁纸',stickers:'日常按钮表情',artNote:'侧栏与顶部采用模糊玻璃效果。表情用于新会话、主页欢迎区和发送按钮；功能文字保留。',greeting:'你好呀',thinking:'思考中',reading:'认真看书',confused:'有点迷糊',good:'做得不错',heart:'送你一颗心'});
Object.assign(dictionaries.en, {wallpaper:'Character wallpaper',stickers:'Chibi stickers',artNote:'Wallpaper shading follows appearance. Turn it off to keep colors only.',greeting:'Hello',thinking:'Thinking',reading:'Reading',confused:'Confused',good:'Well done',heart:'A heart for you'});

// React comes from DSH's module table; it must not be bundled a second time.
export function makeCard(React, assets) {
  const h = React.createElement;
  return function VesnaCard({ controller, t }) {
    const state = React.useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getSnapshot);
    const colors = state.scheme === 'dark' ? PALETTES.dark : PALETTES.light;
    const swatches = [['accent','colorTeal'],['base','colorWhite'],['text','colorNavy'],['pink','colorPink'],['gold','colorGold']];
    const sticker = (index, className='') => h('span', {className:'vesna-sticker '+className, 'aria-hidden':true,style:{backgroundImage:`url("${assets.stickers}")`,backgroundPosition:`${(index%3)*50}% ${Math.floor(index/3)*100}%`}});
    return h('section', { className:'vesna-theme-card', 'aria-label':t('title') },
      state.enabled && state.wallpaper ? h('div',{className:'vesna-wallpaper-preview','aria-hidden':true},h('img',{src:assets.wallpaper,alt:'',decoding:'async'})) : null,
      h('div', { className:'vesna-theme-heading' }, state.enabled && state.stickers ? sticker(0) : h('span', { className:'vesna-theme-mark', 'aria-hidden':true }, '✧'), h('h3', null, t('title'))),
      h('p', { className:'vesna-theme-description' }, t('description')),
      h('div', { className:'vesna-theme-options', role:'group', 'aria-label':t('title') },
        ['default','light','dark','system'].map(mode => h('button', {
          key:mode, type:'button', 'aria-pressed':mode === 'default' ? !state.enabled : state.enabled && state.preference === mode,
          onClick:() => controller.choose(mode)
        }, state.enabled && state.stickers ? sticker({default:3,light:0,dark:2,system:1}[mode]) : null, t(mode)))),
      h('div', { className:'vesna-theme-swatches', 'aria-label':t('palette') }, swatches.map(([key,label]) => h('span', {
        key, className:'vesna-theme-swatch', style:{ background:colors[key] }, title:t(label), 'aria-label':t(label), role:'img'
      }))),
      h('div',{className:'vesna-decoration-options'}, ['wallpaper','stickers'].map(name=>h('label',{key:name},h('input',{type:'checkbox',checked:state[name],disabled:!state.enabled,onChange:event=>controller.setDecoration(name,event.target.checked)}),t(name)))),
      h('p',{className:'vesna-theme-description'},t('artNote')),
      state.enabled && state.stickers ? h('div',{className:'vesna-sticker-gallery'}, ['greeting','thinking','reading','confused','good','heart'].map((name,index)=>h('div',{key:name,title:t(name)},sticker(index),h('span',null,t(name))))) : null,
      h('p', { className:'vesna-theme-status', role:'status', 'aria-live':'polite' },
        t(state.enabled ? (state.scheme === 'dark' ? 'activeDark' : 'activeLight') : 'inactive'), ' · ', t(state.storageState))
    );
  };
}

export function applyClient(ctx, React, css, assets) {
  let controller;
  let storage;
  ctx.effect(() => {
    try { storage = window.localStorage; } catch { /* Browsers may block local storage. The controller reports session-only saving. */ }
    controller = createController(ctx.theme, storage, OVERRIDES, ART_OVERRIDES);
    return () => controller.dispose();
  });
  ctx.on('theme/change', () => controller.syncTheme());
  ctx.effect(() => installHeroCopy(controller));
  ctx.effect(() => {
    const onStorage = event => { if (storage && event.storageArea === storage && (event.key === STORAGE_KEY || event.key === null)) controller.syncStorage(); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  });
  ctx.effect(() => {
    const style = document.createElement('style');
    style.dataset.plugin = 'dsh-vesna-theme';
    style.textContent = css;
    document.head.appendChild(style);
    return () => style.remove();
  });
  ctx.effect(() => {
    const body = document.body;
    const previous = body.getAttribute('data-vesna-art');
    const previousStickers = body.getAttribute('data-vesna-stickers');
    const sync = () => {
      const state=controller.getSnapshot();
      if (state.enabled && state.wallpaper) body.setAttribute('data-vesna-art',state.scheme);
      else body.removeAttribute('data-vesna-art');
      body.toggleAttribute('data-vesna-stickers',state.enabled && state.stickers);
    };
    const artStyle=document.createElement('style');
    // Keep large inline artwork out of CSS variable substitution limits.
    const bytes=Uint8Array.from(atob(assets.wallpaper.split(',')[1]),ch=>ch.charCodeAt(0));
    const imageUrl=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
    const stickerBytes=Uint8Array.from(atob(assets.stickers.split(',')[1]),ch=>ch.charCodeAt(0));
    const stickerUrl=URL.createObjectURL(new Blob([stickerBytes],{type:'image/webp'}));
    const individualUrls=assets.individual.map(data=>URL.createObjectURL(new Blob([Uint8Array.from(atob(data.split(',')[1]),ch=>ch.charCodeAt(0))],{type:'image/webp'})));
    artStyle.dataset.plugin='dsh-vesna-theme-art';
    // Desktop's Windows frame has an opaque sidebar fill underneath centerCol.
    // Target the CSS-module role observed in both installed layout versions,
    // without coupling to its changing hash or changing native panel geometry.
    artStyle.textContent=artCss(imageUrl,stickerUrl,individualUrls);
    document.head.appendChild(artStyle);
    const disposePreviews=installButtonPreviews(controller,individualUrls);
    sync();
    const unsubscribe=controller.subscribe(sync);
    return () => {unsubscribe();disposePreviews();artStyle.remove();URL.revokeObjectURL(imageUrl);URL.revokeObjectURL(stickerUrl);individualUrls.forEach(url=>URL.revokeObjectURL(url));if(previous===null)body.removeAttribute('data-vesna-art');else body.setAttribute('data-vesna-art',previous);if(previousStickers===null)body.removeAttribute('data-vesna-stickers');else body.setAttribute('data-vesna-stickers',previousStickers);};
  });
  ctx.effect(() => ctx.locale.register('settings.vesna', dictionaries));
  ctx.slots.inject('settings.general.item', () => ctx.slots.register({
    name:'settings.general.item', id:'vesna-theme', order:12, locale:'settings.vesna', inject:() => ({ controller })
  }, makeCard(React, assets)));
}

