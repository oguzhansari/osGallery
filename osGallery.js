
(function ($) {
    $.osGallery = function (el, options) {
        var gallery = $(el);
        gallery.vars = $.extend({}, $.osGallery.defaults, options);
        $.data(el, "osGallery", gallery);
        osGmethods = {
            initx: function () {
                console.log("initx");
                return $(this).each(function () {
                    var active = 0;
                    var id = codeGenerator(20);
                    var t = gallery;
                    var o = gallery.vars;
                    t.addClass(id).attr("data-id", id);
                    var length = $(o.imgElement + '[ data-view="true"]', t).length;
                    $('body').append('<div class="osGallery ' + (length > 1 ? '' : 'oneImage') + '" id="' + id + '"><div class="navigation"><div class="navBox"><span class="title"></span><nav>' + (length > 1 ? '<a href="javascript:void(0)" data-arrows="left" class="osg osg-left"></a><a href="javascript:void(0)" data-arrows="right" class="osg osg-right"></a>' : '') + '<a href="javascript:void(0)" data-arrows="close" class="osg osg-cross"></a></nav></div></div><div class="galleryContent"><div class="galleryBox"></div></div>' + (length > 1 ? '<div class="gallerThumbnails"><nav><ul></ul></nav></div>' : '') + '</div>');
                    var gt = $('#' + id);
                    var gb = $('.galleryContent .galleryBox', gt);
                    var includeDiv = $(o.includeDiv + '', t);
                    //Image Generator +
                    var i = 1;
                    $(o.imgElement + '[ data-view="true"]' + ' img', t).each(function (index) {
                        var iet = $(this);
                        iet.parents(o.imgElement).attr('data-id', i)
                        //Big Image
                        var img = new Image();
                        img.src = iet.attr("data-big-img");
                        var figure = document.createElement('figure');
                        figure.setAttribute('data-fid', i);
                        figure.appendChild(img);
                        figure.setAttribute('class', 'deactive');
                        $('.galleryContent .galleryBox', gt).append(figure);
                        //Thumbnail
                        var img = new Image();
                        img.src = iet.attr("src");
                        img.setAttribute('class', "grayscale grayscale-fade");
                        var li = document.createElement('li');
                        li.setAttribute('data-tid', i);
                        li.appendChild(img);
                        $('.gallerThumbnails nav ul', gt).append(li);
                        i = i + 1;
                        $(this).css({ "display": "block" });
                    });
                    $(o.imgElement + '[ data-view="false"]', t).each(function (index) {
                        $(this).css({ "display": "none" });
                    });
                    //Image Generator -

                    //Click Functions +
                    var c = $('.gallerThumbnails nav li', gt);
                    c.click(function () {
                        clicker($(this).attr('data-tid'), id);
                    });
                    var fc = $(o.imgElement + '[ data-view="true"]', t);
                    if (o.galleryType == "include") {
                        fc.click(function () {
                            $(o.imgElement).removeClass("active");
                            $(this).addClass("active");
                            clickerInclude($(this), $(this).attr('data-id'), id);
                        });
                    } else {
                        fc.click(function () {
                            $(o.imgElement).removeClass("active");
                            $(this).addClass("active");
                            clicker($(this).attr('data-id'), id);
                        });
                    }
					if (o.galleryType == "include") {
						fc.eq(0).trigger('click');
                    }
                    function clickerInclude(t, a, id) {
                        var i = t.attr("data-id");
                        var t = $('img', t);
                        var img = new Image();
                        img.src = t.attr("data-big-img");
                        img.setAttribute("data-tid", i)
                        includeDiv.html(img);
                        $('img', includeDiv).click(function () {
                            clicker(i, id);
                        });
                    }

                    $(gt).hover(function () {
                        $("body").attr("onKeyDown", "$.doKey(event); return false;");
                    }, function () {
                        $("body").removeAttr("onKeyDown");
                    });

                    function clicker(a, id) {
                        var openGallery = $('#' + id);
                        if (!openGallery.hasClass('activeGallery')) {
                            openGallery.fadeIn();
                            openGallery.addClass('activeGallery');
                        }
                        $('.navigation span.title', openGallery).html($(o.imgElement + '[data-id="' + a + '"] img', t).attr('data-title'));
                        setTimeout(function () {
                            var thumb_t = $('.gallerThumbnails nav li[data-tid="' + a + '"]', openGallery);
                            var thumb_all = $('.gallerThumbnails nav li[data-tid]', openGallery);
                            var figure_all = $('[data-fid]', gb);
                            var figure_t = $('[data-fid="' + a + '"]', gb);
                            thumb_all.removeClass('tactive');
                            $('img', thumb_all).addClass('grayscale grayscale-fade');
                            thumb_t.addClass('tactive');
                            $('img', thumb_t).removeClass('grayscale grayscale-fade');
                            if (o.animateType == "animated") {
                                var e = o.animatedEffect;
                                $('[data-fid="' + active + '"] img', gb).removeClass().addClass(e[1] + ' animated');
                                figure_t.removeClass('deactive').addClass('active');
                                $('img', figure_t).removeClass().addClass(e[0] + ' animated');
                            } else {
                                $('img', figure_all).addClass('transition zoom');
                                figure_all.addClass('deactive transition zoom').removeClass('active');
                                figure_t.removeClass('deactive').addClass('active');
                            }
                            active = a;
                        }, 0);
                        if (o.galleryType == "include") {
                            $(o.imgElement + '[data-id="' + a + '"] img', t).trigger('click');
                        }
                    }

                    $('.navigation nav [data-arrows]', gt).click(function () {
                        var type = $(this).attr('data-arrows');
                        if (type == "close") {
                            galleryclosed();
                        } else if (type == "left") {
                            var go = active == 1 ? length : parseInt(active) - 1;
                            clicker(go, id);
                        } else if (type == "right") {
                            var go = active == length ? 1 : parseInt(active) + 1;
                            clicker(go, id);
                        }
                    });
                    //Click Functions -

                    $('.galleryBox figure', gt).click(function (e) {
                        var trgt = e.target;
                        if (!$('img', gt).is(trgt)) {
                            galleryclosed();
                        }
                    });

                    function galleryclosed() {
                        gt.removeClass('activeGallery');
                        gt.fadeOut();
                        setTimeout(function () {
                            gt.removeClass('transition');
                        }, 0);
                        $('[data-fid]', gb).addClass('deactive').removeClass('active');
                    }

                    $.doKey = function (e) {
                        if (e.keyCode == 37) {
                            $('.navigation nav [data-arrows="left"]', gt).trigger("click");
                        } else if (e.keyCode == 39) {
                            $('.navigation nav [data-arrows="right"]', gt).trigger("click");
                        }
                        return false;
                    }

                });
            }
        }
        gallery.destroy = function () {
            var o = gallery.vars;
            var t = gallery;
            var id = t.attr("data-id");
            var imgElement = $(o.imgElement, t);
            t.removeAttr("data-id").removeClass(id);
            $('#' + id).remove();
            $("*", t).off("click");
            imgElement.attr("data-view", "true");
            imgElement.css("display", "block");
            return true;
        }
        gallery.rebuild = function () {
            gallery.destroy();
            osGmethods.initx();
        }
        gallery.arrayrebuild = function (value) {
            if (gallery.destroy()) {
                var o = gallery.vars;
                var t = gallery;
                var imgElement = $(o.imgElement, t);
                var arrayVal = parseInt(value);
                imgElement.each(function (index) {
                    var t = $(this);
                    var split = $(this).attr('data-array-options').split(",");
                    var splitLen = split.length;
                    if ($(this).attr('data-array-options') == "" || $(this).attr('data-array-options') == undefined) {
                        splitLen = 0;
                    }
                    var array = [];
                    if (splitLen != 0) {
                        for (var i = 0; i < splitLen; i++) {
                            array.push(parseInt(split[i]));
                        }
                    }
                    if (array.indexOf(arrayVal) > -1 || array.length == 0) {
                        t.attr("data-view", "true");
                    } else {
                        t.attr("data-view", "false");
                    }
                });
                console.log("arraybuild finish");
                osGmethods.initx();
                console.log("arraybuild finish 2");
            }
        }
        gallery.initxreplay = function () {
            osGmethods.initx();
        }
        osGmethods.initx();
    }
    $.osGallery.defaults = {
        imgElement: 'figure',
        animateSpeed: 1500,
        animateType: 'animated', /* zoom, animated */
        animatedEffect: ['zoomIn', 'zoomOut'],
        galleryType: 'none', // include
        includeDiv: '.viewer'
    }
    $.fn.osGallery = function (options, opt) {
        if (options === undefined) { options = {}; } // object değer girilmemişse boş object tanımlıyoruz.
        if (typeof options === "object") {
            return this.each(function () {
                options = $.extend({}, options, { BottomMenuID: codeGenerator(20) });
                var $this = $(this);
                if ($this.data('osGallery') === undefined) {
                    new $.osGallery(this, options);
                }
            });
        } else {
            var $osGallery = $(this).data('osGallery');
            if (typeof opt === "object") {
                var arrayValue = opt.arrayValue;
            }
            switch (options) {
                case "destroy": $osGallery.destroy(); break;
                case "rebuild": $osGallery.rebuild(); break;
                case "arrayrebuild": $osGallery.arrayrebuild(arrayValue); break;
                default: $osGallery.destroy();
            }
        }
    }
})(jQuery);

function codeGenerator(t) { void 0 == t && (t = 10); for (var o = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", s = 0; t > s; s++) o += n.charAt(Math.floor(Math.random() * n.length)); return o }

$(function () {
    $('#gallery').osGallery({ animateType: 'zoom' });
});