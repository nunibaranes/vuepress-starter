// noinspection JSAnnotator
module.exports = {
    title: 'Site Title',
    description: 'Site Description',
    base: '/',
    dest: 'public',
    them: '',
    contentLoading: true,
    permalink: '/:slug',
    head: [
        ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `/assets/images/favicon.ico` }],
        ['meta', { 'http-equiv': 'X-UA-Compatible', content: "IE=edge" }],
        ['meta', { property: 'og:type', content: "article" }],
        ['meta', { property: 'og:site_name', content: "Site Name" }],
        ['meta', { name: 'twitter:site', content: "@SiteTitle" }],
        ['meta', { name: 'twitter:card', content: "article" }],
        ['meta', { name: 'twitter:creator', content: "@SiteTitle" }],
        ['link', { rel: 'stylesheet', href: '/assets/styles/ie-browser.css'}],
        ['script', {src: '/assets/scripts/ua-parser.min.js'}],
        ['script', {src: '/assets/scripts/detectIE.js'}],

    ],
    locales: {
        '/': {
            lang: 'en-US',
            title: 'Site Name',
        }
    },
    themeConfig: {
        breakpoints: {
            wideDesktop: 1300,
            thinDesktop: 960,
            tablet: 750,
            mobile: 500,
            thinMobile: 420,
        },
        // footer: [
        //     {
        //         title: 'footer menu item title',
        //         collapsable: false,
        //         children: [
        //             '/permalink/',
        //         ]
        //     },
        // ],
        sidebar: [
            {
                title: 'menu item title',
                children: [
                    '/page-1/',
                    '/page-2/',
                ]
            },
        ]
    },
    markdown: {
        anchor: {permalink: false, permalinkBefore: false, permalinkSymbol: '#' },
        toc: { includeLevel: [1, 2] },
        lineNumbers: true,
        externalLinks: { target: '_blank', rel: 'noopener noreferrer' },
    },
    plugins:
        []
};