import hljs from 'highlight.js/lib/highlight';
import bash from 'highlight.js/lib/languages/bash';
import cpp from 'highlight.js/lib/languages/cpp';
import dart from 'highlight.js/lib/languages/dart';
import golang from 'highlight.js/lib/languages/go';
import groovy from 'highlight.js/lib/languages/groovy';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import makefile from 'highlight.js/lib/languages/makefile';
import markdown from 'highlight.js/lib/languages/markdown';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import sql from 'highlight.js/lib/languages/sql';
import swift from 'highlight.js/lib/languages/swift';

hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('c', cpp);
hljs.registerLanguage('c++', cpp);
hljs.registerLanguage('go', golang);
hljs.registerLanguage('golang', golang);
hljs.registerLanguage('swift', swift);
hljs.registerLanguage('dart', dart);
hljs.registerLanguage('python', python);
hljs.registerLanguage('py', python);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('makefile', makefile);
hljs.registerLanguage('Makefile', makefile);
hljs.registerLanguage('json', json);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('md', markdown);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('groovy', groovy);
hljs.registerLanguage('ruby', ruby);

export default hljs;