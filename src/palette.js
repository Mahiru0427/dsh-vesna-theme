export const PALETTES = Object.freeze({
  light: Object.freeze({ base:'#FAF8F2', surface:'#FFFFFF', sidebar:'#E5F2F2', raised:'#F2F8F7', elevated:'#FFFFFF', text:'#243D52', secondary:'#496376', tertiary:'#607788', muted:'#5B7180', accent:'#227C89', accentHover:'#196875', accentSoft:'#D8EEEB', onAccent:'#FFFFFF', border:'#C8DBDC', hover:'#DEEEEB', code:'#EDF3F4', pink:'#DB8F9E', gold:'#CFB47E', lilac:'#DBD5EA' }),
  dark: Object.freeze({ base:'#15283B', surface:'#1B3043', sidebar:'#1B3245', raised:'#20384A', elevated:'#294559', text:'#F2F3F1', secondary:'#C2D5DF', tertiary:'#A1B9C8', muted:'#94ADBE', accent:'#8EDDD5', accentHover:'#ACE9E2', accentSoft:'#294E57', onAccent:'#142C3B', border:'#426073', hover:'#294556', code:'#102236', pink:'#E8ACB9', gold:'#D6BF90', lilac:'#CFC4E5' })
});

function tokens(p) {
  const t = {};
  const assign = (value, ...names) => names.forEach(name => { t['--dsw-alias-' + name] = value; });
  assign(p.base, 'bg-base');
  assign(p.surface, 'bg-layer-1', 'button-floating-fill');
  assign(p.raised, 'bg-layer-2', 'bg-document-preview', 'button-elevated-fill', 'button-info-fill', 'markdown-code-block-banner');
  assign(p.elevated, 'bg-layer-3', 'bg-overlay');
  assign(p.sidebar, 'bg-module-platform');
  assign(p.text, 'label-primary', 'label-primary-bluish', 'label-document-preview', 'menu-icon');
  assign(p.secondary, 'label-secondary', 'label-caption');
  assign(p.tertiary, 'label-tertiary');
  assign(p.muted, 'label-dimmed', 'label-primary-dimmed', 'markdown-placeholder');
  assign(p.accent, 'brand-primary', 'brand-primary-invert', 'brand-primary-new-colorprimary-new-color', 'brand-text', 'button-primary-fill', 'button-contrast-fill', 'link', 'state-business-primary');
  assign(p.accentHover, 'button-primary-hover');
  assign(p.onAccent, 'label-primary-inverted', 'label-primary-foreground');
  assign(p.border, 'border-l1', 'border-l2', 'border-l2-darkmode-thin', 'border-l3', 'border-l4', 'button-ghost-active-border');
  assign(p.hover, 'interactive-bg-hover', 'interactive-bg-hover-solid', 'button-floating-hover', 'button-info-hover', 'button-tool-bar-hover', 'button-ghost-active-hover');
  assign(p.accentSoft, 'interactive-bg-active', 'interactive-bg-hover-accent', 'bg-multi-select', 'button-ghost-active-fill', 'button-primary-dimmed', 'markdown-citation', 'markdown-tag', 'markdown-code-segment-selected');
  assign(p.code, 'markdown-code-block', 'markdown-inline-code', 'markdown-code-segment-unselected');
  assign(p.raised, 'bg-skeleton', 'button-tool-bar-fill');
  assign(p.border, 'scrollbar-bg-l1', 'scrollbar-bg-l2');
  assign(p.tertiary, 'scrollbar-hover-l1', 'scrollbar-hover-l2');
  // Error, warning, success and diff tokens retain the platform's meanings.
  t['--vesna-pink'] = p.pink;
  t['--vesna-gold'] = p.gold;
  t['--vesna-lilac'] = p.lilac;
  t['--vesna-on-accent'] = p.onAccent;
  // Background images and illustrated controls can extend the theme later.
  t['--vesna-selection'] = p.accentSoft;
  t['--dsw-specific-sidebar-fill'] = p.sidebar;
  t['--dsw-specific-input-major'] = p.surface;
  t['--dsw-specific-bubble'] = p.raised;
  t['--dsw-specific-menu'] = p.elevated;
  t['--dsw-menu-backdrop-filter'] = 'none';
  return Object.freeze(t);
}

export const TOKENS = Object.freeze({ light: tokens(PALETTES.light), dark: tokens(PALETTES.dark) });
export const OVERRIDES = Object.freeze(Object.fromEntries(Object.keys(TOKENS.light).map(name => [name, Object.freeze({ light:TOKENS.light[name], dark:TOKENS.dark[name] })])));
// Content cards retain opaque colors. Only the page canvas reveals wallpaper.
export const ART_OVERRIDES = Object.freeze({ ...OVERRIDES,
  '--dsw-alias-bg-base': Object.freeze({light:'transparent',dark:'transparent'}),
  // Desktop's preload also reads this token to color native caption buttons.
  '--dsw-specific-sidebar-fill': Object.freeze({light:'transparent',dark:'transparent'}),
  '--dsw-specific-bubble': Object.freeze({light:'transparent',dark:'transparent'})
});
