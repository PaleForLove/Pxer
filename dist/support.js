'use strict';

/**
 * Automatic generated by "support.build.js"
 * */
~~~function () {
    // 环境检测
    window['PXER_SUPPORT'] = true;
    window['PXER_LOAD_APP'] = false;
    var supportType = ['bookmark_works', 'member_works', 'search', 'works_medium', 'bookmark_new', 'rank', 'discovery', 'member_works_new'];
    var URLData = parseURL(document.URL);
    if (URLData.domain === 'www.pixiv.net') {
        if (supportType.indexOf(getPageType()) !== -1) {
            window['PXER_SUPPORT'] = true;
            window['PXER_LOAD_APP'] = true;
            window['PXER_LOAD_ANALYTICS'] = true;
        } else {
            window['PXER_SUPPORT'] = true;
            window['PXER_LOAD_APP'] = false;
            window['PXER_LOAD_ANALYTICS'] = true;
        }
    } else if (URLData.domain === '127.0.0.1' || URLData.domain === 'localhost') {
        window['PXER_SUPPORT'] = true;
        window['PXER_LOAD_APP'] = true;
        window['PXER_LOAD_ANALYTICS'] = false;
    } else {
        window['PXER_SUPPORT'] = false;
        window['PXER_LOAD_APP'] = false;
        window['PXER_LOAD_ANALYTICS'] = false;
        return; //退出整个程序
    };

    // 要加载的文件
    var appClass = /**/"dist/pxer-core.js"; //*/[];
    var viewTpl = /**/"dist/view/template.html"; //*/'';
    var viewStyles = /**/"dist/view/style.css"; //*/[];
    var viewScripts = /**/["dist/view/PxerAnalytics.class.js", "dist/view/AutoSuggestControl.class.js", "dist/view/vue.min.js", "dist/view/vm.js"]; //*/[];
    var afterRun = /**/"dist/run.js"; //*/[];
    var linkResource = /**/["dist/public/favicon.ico"]; //*/[];

    // 捕获载入过程的错误
    var errorCatcher = function errorCatcher(error) {
        if (error.filename && error.filename.indexOf(window['PXER_URL']) !== -1) {
            if (window['PXER_MODE'] === 'dev') {
                alert('Pxer开发版载入出错，请尝试使用稳定版');
            } else {
                prompt('Pxer载入出错，请在这个地址中汇报Bug', 'https://github.com/pea3nut/Pxer/issues/5');
            }
        }
        ;
    };
    var cancelErrorCatcher = function cancelErrorCatcher() {
        window.removeEventListener('error', errorCatcher);
    };
    window.addEventListener('error', errorCatcher);
    window.addEventListener('error', cancelErrorCatcher);

    // 过程化载入文件
    var Flow = Promise.resolve();

    // 加载pxer-app
    if (window['PXER_LOAD_APP']) {
        // 加载无关紧要的资源
        Flow = Flow.then(function () {
            return execPromise(linkResource, createResource);
        });
        // 加载pxer-app class
        Flow = Flow.then(function () {
            return execPromise(appClass, createScript);
        });
        // 加载UI
        Flow = Flow.then(function () {
            return new Promise(function (resolve, reject) {
                if (window['PXER_MODE'] === 'dev') console.log('load pxer UI');
                // CSS
                Flow = Flow.then(function () {
                    return execPromise(viewStyles, createResource);
                });
                // HTML模板
                var xhr = new XMLHttpRequest();
                xhr.open('GET', window['PXER_URL'] + viewTpl);
                xhr.onload = function () {
                    window['PXER_TEMPLATE'] = xhr.responseText;
                    resolve();
                };
                xhr.onerror = reject;
                xhr.ontimeout = reject;
                xhr.send();
            });
        });
        // 加载UI JavaScript
        Flow = Flow.then(function () {
            return execPromise(viewScripts, createScript);
        });
    };
    // 最后才会运行的JavaScript文件
    Flow = Flow.then(function () {
        return execPromise(afterRun, createScript);
    });

    // 一些收尾工作
    Flow = Flow.then(function () {
        return console.log('Pxer loaded');
    });
    Flow = Flow.then(cancelErrorCatcher);
    Flow = Flow.catch(console.error);
}();