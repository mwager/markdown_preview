(function($) {
    // dom ready
    $(function() {
        var md = $('#md');

        /**
         * Simple namespace
         */
        var markdownPreview = {
            contentsAreVisible: false,

            initNavigationToggle: function() {

                // hide all between the h2 tags
                markdownPreview.toggleAllContens(false);

                // make result "collapsible"...
                md.find('h2').on('click', function () {
                    var next = $(this).next();

                    var showIt = !next.is(':visible');

                    while (typeof next[0] !== 'undefined' && (next[0].tagName !== 'H2')) {
                        // console.log(next[0].tagName) 

                        if(showIt) {
                            next.fadeIn(300);
                            markdownPreview.contentsAreVisible = true;
                        }
                        else {
                            next.hide();
                            markdownPreview.contentsAreVisible = false;
                        }
                        
                        next = next.next();
                    }                    
                });
            },

            /**
             * Show or hide all content betwenn h2-tags
             */
            toggleAllContens: function(show) {
                md.find("h2").each(function () {
                    $(this).nextAll().each(function () {
                        if (this.tagName == 'H2') {
                            return false; // stop execution
                        }
                        if(show) {
                            $(this).fadeIn();
                            markdownPreview.contentsAreVisible = true;
                        }
                        else {
                            $(this).hide();
                            markdownPreview.contentsAreVisible = false;
                        }
                    });
                });
            }
        };

        // ========== EVENTS ==========

        $('#md-input')
        .focus()
        .on('keyup', function() {
            var res = $(this).val();
            
            // render generated html
            md.html(markdown.toHTML(res));

            markdownPreview.initNavigationToggle();
        });

        $('#toggle-headlines').on('click', function() {
            markdownPreview.toggleAllContens(markdownPreview.contentsAreVisible ? false : true);
            return false;
        });
    });
})(jQuery);