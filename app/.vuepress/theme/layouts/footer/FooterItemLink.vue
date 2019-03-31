<script>
import { isActive, hashRE, groupHeaders } from '../../util'

export default {
  functional: true,

  props: ['item'],

  render (h, { parent: { $page, $site, $route }, props: { item }}) {
    // use custom active class matching logic
    // due to edge case of paths ending with / + hash
    const selfActive = isActive($route, item.path)
    // for footer: auto templates, a hash link should be active if one of its child
    // matches
    const active = item.type === 'auto'
      ? selfActive || item.children.some(c => isActive($route, item.basePath + '#' + c.slug))
      : selfActive;
    const itemTitle = item.frontmatter.footerTitle ?  item.frontmatter.footerTitle : item.title;
    const link = renderLink(h, item.path, itemTitle || item.path, active);
    const configDepth = $page.frontmatter.footerDepth != null
      ? $page.frontmatter.footerDepth
      : $site.themeConfig.footerDepth;
    const maxDepth = configDepth == null ? 1 : configDepth;
    const displayAllHeaders = !!$site.themeConfig.displayAllHeaders;
    if (item.type === 'auto') {
      return [link, renderChildren(h, item.children, item.basePath, $route, maxDepth)]
    } else if ((active || displayAllHeaders) && item.headers && !hashRE.test(item.path)) {
      const children = groupHeaders(item.headers);
      return [link, renderChildren(h, children, item.path, $route, maxDepth)]
    } else {
      return link
    }
  }
}

function renderLink (h, to, text, active) {
    const isResourceItem = to.indexOf('/resources/') !== -1;

    return h('router-link', {
        props: {
            to,
            activeClass: '',
            exactActiveClass: ''
        },
        class: {
            active,
            'footer-link': true
        }
    }, !isResourceItem ? text : getOverrideText(to) )

}

function renderChildren (h, children, path, route, maxDepth, depth = 1) {
  if (!children || depth > maxDepth) return null;
  return h('ul', { class: 'footer-sub-headers' }, children.map(c => {
    const active = isActive(route, path + '#' + c.slug);
    return h('li', { class: 'footer-sub-header' }, [
      renderLink(h, path + '#' + c.slug, c.title, active),
      renderChildren(h, c.children, path, route, maxDepth, depth + 1)
    ])
  }))
}

function getOverrideText (path) {
    const pathArr = path.split('/');
    let hashText = pathArr.pop();
    let overrideText = '';

    switch (hashText) {
        case '#whitepaper-and-data-sheets':
            overrideText = 'Whitepapers & Data Sheets';
            break;
        case '#demos-and-videos':
            overrideText = 'Demos & Videos';
            break;
        case '#ultimate-guides':
            overrideText = 'Ultimate Guides';
            break;
        case '#use-cases':
            overrideText = 'Use Cases';
            break;
        default:
            break;
    }

    return overrideText;
}
</script>