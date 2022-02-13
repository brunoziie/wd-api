interface ElementAttrs {
  [key: string]: any;
}

interface StyleAttrs {
  [key: string]: string;
}

type ElementChildren =
  | string
  | string[]
  | ElementContructor
  | ElementContructor[]
  | ShortElementContructor
  | ShortElementContructor[]
  | undefined;

type ElementContructor = (
  type: string,
  attrs: ElementAttrs,
  children: ElementChildren
) => string;

type ShortElementContructor = (
  attrs?: ElementAttrs,
  children?: ElementChildren
) => string;

const asArray = (items: any) => (Array.isArray(items) ? items : [items]);
const selfClosing = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
  'command',
  'keygen',
  'menuitem',
];

export function el(
  type: string,
  attrs?: ElementAttrs,
  children?: ElementChildren
): string {
  const renderAttrs = Object.keys(attrs || {})
    .map((key) => {
      const value = String((attrs || {})[key]).replace(/"/g, '"');
      return `${key}="${value}"`;
    })
    .join(' ');

  if (selfClosing.includes(type)) {
    return [`<${type}`, ...(renderAttrs ? [' ', renderAttrs] : ['']), '/>'].join('');
  }

  const renderChildren = children
    ? asArray(children)
        .map((child) => (typeof child === 'function' ? String(child()) : String(child)))
        .join('')
    : null;

  return [
    `<${type}`,
    ...(renderAttrs ? [' ', renderAttrs] : ['']),
    '>',
    renderChildren,
    `</${type}>`,
  ].join('');
}

export function style(props: StyleAttrs) {
  return {
    style: Object.keys(props)
      .map((key) => {
        const k = key.replace(/([A-Z])/g, '-$1').toLocaleLowerCase();
        return `${k}:${props[key]}`;
      })
      .join(';'),
  };
}

export function tags(...tags: string[]): { [key: string]: ShortElementContructor } {
  return tags.reduce((acc: any, tag) => {
    acc[tag] = (attrs?: ElementAttrs, children?: ElementChildren) => {
      return el(tag, attrs, children);
    };
    return acc;
  }, {});
}

export function html5(children?: ElementChildren) {
  return el('html', { lang: 'en' }, [
    el('head', {}, [
      el('meta', { charset: 'utf-8' }),
      el('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
      el(
        'style',
        {},
        '* { margin: 0; padding: 0; box-sizing: border-box; outline: 0; font-family: -apple-system, "system-ui", "Segoe UI", "Liberation Sans", sans-serif }'
      ),
    ]),
    el('body', {}, children),
  ]);
}

export function defaultTemplate(children?: ElementChildren) {
  const { h1, p, div } = tags('h1', 'p', 'div');

  return html5([
    div(
      style({
        backgroundColor: '#f9f9f9',
        margin: '24px auto',
        maxWidth: '480px',
        width: '100%',
        padding: '0 24px',
        borderRadius: '8px',
      }),

      [
        h1(
          style({
            textAlign: 'center',
            borderBottom: '1px solid #efefef',
            marginBottom: '24px',
            lineHeight: '3',
          }),
          'weedocs'
        ),

        div(style({ paddingBottom: '24px' }), children),
      ]
    ),

    p(
      style({ fontSize: '12px', color: '#666', textAlign: 'center' }),
      "this email was generated automatically, please don't reply."
    ),
  ]);
}

defaultTemplate.components = {
  btn(href: string = '#', text: string, color: 'danger' | 'primary' | 'success') {
    return el(
      'a',
      {
        href,
        ...style({
          backgroundColor: { danger: '#dd514c', primary: '#1f8dd6', success: '#5eb95e' }[
            color
          ],
          borderRadius: '4px',
          color: '#fff',
          display: 'inline-block',
          fontSize: '14px',
          lineHeight: '40px',
          marginRight: '8px',
          padding: '0 24px',
          textDecoration: 'none',
        }),
      },
      text
    );
  },

  paragraph(text: string) {
    return el(
      'p',
      style({ fontSize: '14px', lineHeight: '1.4', marginBottom: '16px', color: '#666' }),
      text
    );
  },
};
