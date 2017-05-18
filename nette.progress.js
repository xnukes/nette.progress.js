/*
 * Copyright (c) 2017. All right reserved.
 * @author Lukáš Vlček
 */

$.nette.ext('progress', {
    init: function(load) {

        $.ajaxSettings.xhr = function() {
            var xhr = new window.XMLHttpRequest;
            xhr.upload.addEventListener('progress', function(e) {
                $.nette.ext('progress').netteAjaxProgress(e.loaded / e.total * 100);
            }, false);
            return xhr;
        };

    },
    before: function (xhr, settings) {
        this.defaults.progressBar = $(settings.nette.e.target).data('ajax-progress') ? $(settings.nette.e.target).data('ajax-progress') : false;
    },
    start: function (xhr, settings) {
        if(this.defaults.progressBar) {
            this.defaults.bar = $('.' + this.defaults.progressBar);
            this.defaults.bar.show();
        }
    },
    complete: function (xhr, status, settings) {
        if(this.defaults.progressBar) {
            this.defaults.bar.hide();
        }
    }
}, {
    defaults: {
        bar: false,
        progressBar: false
    },
    netteAjaxProgress: function(progress) {
        if(this.defaults.progressBar) {
            $(this.defaults.bar).find('.bar').css('width', progress + '%');
            $(this.defaults.bar).find('.text').html(Math.round(progress) + ' %');
        }
    }
});
