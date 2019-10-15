import marked from 'marked';

import config from '../../configs';

function hrenderer(id: number) {
    const renderer = new marked.Renderer();
    const techimg =
        config.api.cloud + '/techimg/' + id + '?name=';
    renderer.image = (href: any, title: any, text: any) => {
        const linkstyle = href.split('=');
        const link = linkstyle[0];
        if (linkstyle.length === 1) {
            return '<div class="markdown-img"><img src="' + techimg + link + '" alt="' + text + '" /></div>';
        }
        const wh = linkstyle[1].split('x');
        let style = '';
        const width = wh[0];
        if (wh.length > 1) {
            const height = wh[1];
            style = 'width="' + width + 'px" height="' + height + 'px"';
        } else {
            style = 'width="' + width + 'px"';
        }
        return '<div class="markdown-img"><img src="' + techimg + link + '" alt="' + text + '" ' + style + '/></div>';
    };

    return renderer;
}

export default hrenderer;
