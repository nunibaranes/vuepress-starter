function parser () {
    const parser = new UAParser();
    const parserBrowser = parser.getBrowser();

    if (parserBrowser.name === 'IE') {

        const html = '<div id="unsupported-ie-section">\n' +
                        '<div name="section-main" slot="main">\n' +
                            '<div class="content">\n' +
                                '<h1 class="title main-title"><span>We are still working on supporting your browser</span></h1>\n' +
                                '<p class="text">We recommend using the latest version of Chrome, Firefox, Safari or Edge</p>\n' +
                            '</div>\n' +
                        '</div>'+
                    '</div>';
        document.body.innerHTML = html;
    }

}

function init () {
    window.addEventListener('load', parser);
}

init();

