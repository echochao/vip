// ==UserScript==
// @name         VIP 视频在线解析
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  VIP 视频在线解析!
// @author       echochao
// @license      MIT
// @match        *://v.youku.com/v_show/*
// @match        *://*.iqiyi.com/v_*
// @match        *://*.iqiyi.com/dianying/*
// @match        *://*.le.com/ptv/vplay/*
// @match        *://v.qq.com/x/cover/*
// @match        *://v.qq.com/x/page/*
// @match        *://*.tudou.com/listplay/*
// @match        *://*.tudou.com/albumplay/*
// @match        *://*.tudou.com/programs/view/*
// @match        *://*.mgtv.com/b/*
// @match        *://*.sohu.com/*
// @match        *://*.acfun.cn/v/*
// @match        *://*.bilibili.com/video/*
// @match        *://*.bilibili.com/anime/*
// @match        *://v.pptv.com/show/*
// @match        *://v.yinyuetai.com/video/*
// @match        *://v.yinyuetai.com/playlist/*
// @match        *://*.wasu.cn/Play/show/*
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var curWords = '';
    const videoSite = window.location.href;
    const reYk = /youku/i;
    const reAqy = /iqiyi/i;
    const reLS = /le/i;
    const reTX = /qq/i;
    const reTD = /tudou/i;
    const reMG = /mgtv/i;
    const reSH = /sohu/i;
    const reAF = /acfun/i;
    const reBL = /bilibili/i;
    const reYJ = /1905/i;
    const rePP = /pptv/i;
    const reYYT = /yinyuetai/i;
    const vipBtn = '<a id="asvideoBtn" style="cursor:pointer;text-decoration:none;color:green;padding:0 5px;border:1px solid green;">一键vip解析</a>';
    const $ = window.jQuery;
    const redirectUrl = `http://api.bbbbbb.me/jx/?url=`;
    new Promise(resolve => {
        // 优酷
        if (reYk.test(videoSite)) {
            var youkuTitle = $('#subtitle');
            if (youkuTitle.length !== 0) {
                youkuTitle.after(vipBtn);
                $('#asvideoBtn').css({ 'font-size': '17px', display: 'inline-block', height: '22px', 'line-height': '22px', margin: '0 5px', 'vertical-align': 'bottom' });
                if ($('.tvinfo').length !== 0) {
                    curWords = $('.tvinfo')
                        .find('h3')
                        .eq(0)
                        .text();
                } else {
                    curWords = $('.title').attr('title');
                }
            } else {
                $('.tags').after(vipBtn);
                $('#asvideoBtn').css({ 'font-size': '17px', display: 'inline-block', height: '22px', 'line-height': '22px', margin: '0 5px', 'vertical-align': 'bottom' });

                if ($('.tvinfo').length !== 0) {
                    curWords = $('.tvinfo')
                        .find('h3')
                        .eq(0)
                        .text();
                } else {
                    curWords = $('.title').attr('title');
                }
            }
            resolve();
        }
        // 爱奇艺
        if (reAqy.test(videoSite)) {
            setTimeout(() => {
                var iqiyiTitle = $('.player-title');
                iqiyiTitle.append(vipBtn);
                $('#asvideoBtn').css({ 'font-size': '17px', display: 'inline-block', height: '24px', 'line-height': '24px', margin: '0 5px' });
                resolve();
            }, 3000);
        }
        // 乐视
        if (reLS.test(videoSite)) {
            var lsTitle = $('.briefIntro_tit');
            lsTitle.after(vipBtn);
            lsTitle.css('float', 'left');
            $('#asvideoBtn').css({ 'font-size': '16px', display: 'inline-block', height: '20px', 'line-height': '20px', margin: '0 5px' });
            if (
                $('.Info')
                    .find('.title')
                    .find('h3').length !== 0
            ) {
                curWords = $('.Info')
                    .find('.title')
                    .find('h3')
                    .text();
            } else {
                curWords = lsTitle.text();
            }
            resolve();
        }
        // 腾讯
        if (reTX.test(videoSite)) {
            var qqTitle = $('.mod_intro').find('.video_title');
            qqTitle.eq(0).after(vipBtn);
            $('#asvideoBtn').css({ 'font-size': '24px', display: 'inline-block', height: '36px', 'line-height': '36px', margin: '0 5px' });
            if ($('.player_title').length !== 0 && $('.player_title').find('a').length === 0) {
                curWords = $('.player_title').text();
            } else {
                curWords = $('._base_title').text();
            }
            if (curWords === '') {
                curWords = $('.player_title').text();
            }
            resolve();
        }
        // 土豆
        if (reTD.test(videoSite)) {
            var tdTitle = $('.td-playbase__title');
            tdTitle.parent('.fix').append(vipBtn);
            $('#asvideoBtn').css({ 'font-size': '18px', display: 'inline-block', height: '22px', 'line-height': '22px', margin: '14px 5px 0' });
            resolve();
        }
        // 芒果
        if (reMG.test(videoSite)) {
            var mgTitle = $('.v-panel-title');
            mgTitle.after(vipBtn);
            mgTitle.css({ float: 'left', 'margin-right': '0' });
            $('#asvideoBtn').css({ 'font-size': '22px', display: 'inline-block', height: '40px', 'line-height': '40px', margin: '0 5px' });
            curWords = mgTitle.text();
            resolve();
        }
        // 搜狐
        if (reSH.test(videoSite)) {
            var shTitle = $('.crumbs');
            shTitle.append(vipBtn);
            shTitle.find('h2').css({ float: 'left' });
            $('#asvideoBtn').css({ 'font-weight': 'bold', 'font-size': '16px', display: 'inline-block', height: '36px', 'line-height': '36px', margin: '0 5px' });
            curWords = shTitle.find('h2').text();
            resolve();
        }
        // A站
        if (reAF.test(videoSite)) {
            var acTitle = $('.head').find('.title');
            acTitle.append(vipBtn);
            $('#asvideoBtn').css({ 'font-weight': 'bold', 'font-size': '16px', display: 'inline-block', height: '20px', 'line-height': '20px', margin: '0 5px' });
            resolve();
        }
        // B站
        if (reBL.test(videoSite)) {
            var biliTitle = $('.v-title').find('h1');
            biliTitle.after(vipBtn);
            biliTitle.css({ float: 'left', 'margin-right': '0' });
            $('#asvideoBtn').css({ 'font-weight': 'bold', 'font-size': '16px', display: 'inline-block', height: '36px', 'line-height': '36px', margin: '0 5px' });
            resolve();
        }
        // pptv
        if (rePP.test(videoSite)) {
            var pptvTitle = $('.hd-logo fl');
            pptvTitle.after(vipBtn);
            $('#asvideoBtn').css({ 'font-weight': 'bold', 'font-size': '16px', display: 'inline-block', height: '36px', 'line-height': '36px', margin: '0 5px' });
            curWords = pptvTitle.text();
            resolve();
        }
        // 音悦台
        if (reYYT.test(videoSite)) {
            var yytTitle = $('.videoName');
            yytTitle.append(vipBtn);
            $('#asvideoBtn').css({ 'font-weight': 'bold', 'font-size': '14px', display: 'inline-block', height: '32px', 'line-height': '32px', margin: '0 5px' });
            resolve();
        }
    }).then(() => {
        $('#asvideoBtn').on('click', function() {
            window.location.href = 'https://echochao.github.io/vip/?url=' + videoSite;
        });
    });
})();
