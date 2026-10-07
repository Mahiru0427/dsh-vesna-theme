import test from 'node:test';
import assert from 'node:assert/strict';
import { createController, STORAGE_KEY } from '../src/controller.js';
import { PALETTES, OVERRIDES } from '../src/palette.js';

function fixture(raw=null) {
  const data=new Map(raw===null?[]:[[STORAGE_KEY,raw]]);
  const storage={getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,value)};
  const layers=new Map(); let preference='system'; let scheme='light'; let releaseCount=0;
  const theme={getTheme:()=>({preference,active:{colorScheme:scheme,tokens:{}}}),setTheme:mode=>{preference=mode;scheme=mode==='dark'?'dark':'light';},overrideTokens:(source,tokens)=>{const entry={tokens};layers.set(source,entry);return()=>{if(layers.get(source)===entry){layers.delete(source);releaseCount++;}};}};
  return {theme,storage,data,layers,get releaseCount(){return releaseCount;}};
}
test('disabled preference survives a new window and restores native colors',()=>{
  const f=fixture();const c=createController(f.theme,f.storage,OVERRIDES);c.choose('dark');c.choose('default');
  assert.equal(f.layers.size,0);assert.equal(c.getSnapshot().preference,'dark');c.dispose();
  const next=createController(f.theme,f.storage,OVERRIDES);assert.equal(next.getSnapshot().enabled,false);assert.equal(f.layers.size,0);
});
test('native theme changes update the card without removing the overlay',()=>{
  const f=fixture();const c=createController(f.theme,f.storage,OVERRIDES);f.theme.setTheme('dark');c.syncTheme();
  assert.equal(c.getSnapshot().scheme,'dark');assert.equal(c.getSnapshot().preference,'dark');assert.equal(f.layers.size,1);
});
test('switching choices never leaves duplicate layers, disposal releases the last',()=>{
  const f=fixture();const c=createController(f.theme,f.storage,OVERRIDES);for(const mode of ['light','dark','system','light'])c.choose(mode);
  assert.equal(f.layers.size,1);assert.equal(f.releaseCount,4);c.dispose();c.dispose();assert.equal(f.layers.size,0);assert.equal(f.releaseCount,5);
});
test('a cross-window disable removes the active layer',()=>{
  const f=fixture();const c=createController(f.theme,f.storage,OVERRIDES);f.data.set(STORAGE_KEY,JSON.stringify({version:1,enabled:false}));c.syncStorage();
  assert.equal(c.getSnapshot().enabled,false);assert.equal(f.layers.size,0);
});
test('future settings are preserved even when a temporary choice is made',()=>{
  const raw=JSON.stringify({version:2,enabled:true,background:'future'});const f=fixture(raw);const c=createController(f.theme,f.storage,OVERRIDES);
  assert.equal(c.getSnapshot().enabled,false);c.choose('light');assert.equal(c.getSnapshot().storageState,'newer');assert.equal(f.data.get(STORAGE_KEY),raw);
});
test('storage write failures keep the current choice usable and report the limit',()=>{
  const f=fixture();f.storage.setItem=()=>{throw new Error('quota');};const c=createController(f.theme,f.storage,OVERRIDES);c.choose('dark');
  assert.equal(c.getSnapshot().enabled,true);assert.equal(c.getSnapshot().storageState,'unavailable');assert.equal(f.layers.size,1);
});
test('malformed boolean is not treated as enabled and can be repaired by choosing',()=>{
  const f=fixture('{"version":1,"enabled":"false"}');const c=createController(f.theme,f.storage,OVERRIDES);
  assert.equal(c.getSnapshot().enabled,false);c.choose('system');assert.deepEqual(JSON.parse(f.data.get(STORAGE_KEY)),{version:1,enabled:true,wallpaper:true,stickers:true});
});
test('corrupted JSON restores default colors until the user chooses again',()=>{
  const f=fixture('{broken');const c=createController(f.theme,f.storage,OVERRIDES);
  assert.equal(c.getSnapshot().enabled,false);assert.equal(c.getSnapshot().storageState,'invalid');assert.equal(f.layers.size,0);
  c.choose('light');assert.equal(c.getSnapshot().storageState,'saved');assert.equal(f.layers.size,1);
});
test('disposed controller cannot write or notify',()=>{
  const f=fixture();const c=createController(f.theme,f.storage,OVERRIDES);let events=0;c.subscribe(()=>events++);c.dispose();c.choose('dark');c.syncTheme();c.syncStorage();
  assert.equal(events,0);assert.equal(f.data.size,0);assert.equal(f.layers.size,0);
});
test('decoration toggles persist and old color-only settings migrate safely',()=>{
  const f=fixture('{"version":1,"enabled":true}');const c=createController(f.theme,f.storage,OVERRIDES);
  assert.equal(c.getSnapshot().wallpaper,true);c.setDecoration('wallpaper',false);c.setDecoration('stickers',false);c.dispose();
  const next=createController(f.theme,f.storage,OVERRIDES);assert.equal(next.getSnapshot().wallpaper,false);assert.equal(next.getSnapshot().stickers,false);
  assert.throws(()=>next.setDecoration('bad',true));
});
test('wallpaper selects its canvas overrides and restores colors when turned off',()=>{
  const f=fixture();const art={canvas:'transparent'};const c=createController(f.theme,f.storage,OVERRIDES,art);
  assert.equal([...f.layers.values()][0].tokens,art);c.setDecoration('wallpaper',false);assert.equal([...f.layers.values()][0].tokens,OVERRIDES);
  c.choose('default');assert.equal(f.layers.size,0);
});
function luminance(hex){const channels=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;}
function contrast(a,b){const aa=luminance(a),bb=luminance(b);return(Math.max(aa,bb)+.05)/(Math.min(aa,bb)+.05);}
test('body, secondary text, code, and active button text retain 4.5:1 contrast',()=>{
  for(const [mode,p]of Object.entries(PALETTES))for(const [fg,bg]of [['text','base'],['text','sidebar'],['text','surface'],['text','code'],['secondary','base'],['secondary','sidebar'],['muted','base'],['onAccent','accent'],['onAccent','accentHover']])assert.ok(contrast(p[fg],p[bg])>=4.5,`${mode} ${fg}/${bg}: ${contrast(p[fg],p[bg])}`);
});
test('semantic danger/success/warning/diff colors are not reclassified',()=>{
  assert.ok(Object.keys(OVERRIDES).length>50);
  for(const name of Object.keys(OVERRIDES))assert.doesNotMatch(name,/state-(error|warn|success)|diff-(added|deleted)/);
});
