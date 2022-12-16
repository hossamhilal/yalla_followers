/*global $ */
(function ($) {
    "use strict";

    // // Pre Loading 
    window.onpaint = preloadFunc();
    function preloadFunc() {
        $('body').addClass('stopScroll');
    }
    
    // Loader 
    $(window).on('load', function () { 
        setTimeout(function () {
            $('.loader').fadeOut(3000, function () {
                $('body').removeClass('stopScroll');
                $(this).remove();
            }); 
        },5000);   
    });

    // OPEN SIDE  MENU 
    $('.menuBtn').on('click', function () {
        $('.navMenu').toggleClass('show');
        $('.bodyOverlay').addClass('show');
        setTimeout(function () {
            $('body').addClass('stopScroll');
        }, 100);
    });

    // CLOSE SIDE MENU 
    $('.bodyOverlay').on('click', function () {
        $(this).removeClass('show');
        $('.navMenu').removeClass('show');
        $('body').removeClass('stopScroll');
    });


    // Custom Select
    let Index = 0 ;
    $('select').each(function () {
        let This = $(this),
            Options = $(this).children('option').length;
            
        // Loop In All Select
        Index ++;

        // Hide Select 
        This.addClass('d-none');

        // Create Parent CusotomSelect
        This.wrap('<div class="customSelect"></div>');

        // Create Selected Box
        This.after('<div class="selected"></div>');

        // Selected Preview Box
        let selected =This.next('.selected');

        // Create Dropdown
        let DropDown = $('<div />', {
            'class': 'selectList'
        }).insertAfter(selected);

        // Create Option List 
        let List = $('<ul />', {
            'class': 'list'
        }).appendTo(DropDown);

        // Close Other Lists Expect Current List 
        selected.click(function (e) {
            e.stopPropagation();
            $('.selected.active').not(this).each(function () {
                $(this).removeClass('active').next('.selectList').slideUp();
            });
            $(this).toggleClass('active').next('.selectList').slideToggle();
        });

        // close dropdown 
        $(document).click(function () {
            selected.removeClass('active');
            DropDown.hide();
        });

        // Default Select
        if($(this).is('[default]')) {

            // Display First Option In Selected Box  
            This.children('option[selected]') ? selected.text(This.children('option[selected]').text()) : selected.text(This.children('option').eq(0).text());

            // Loop on items 
            for (let i = 0; i < Options; i++) {
                $('<li />', {
                    text:This.children('option').eq(i).text(),
                    value:This.children('option').eq(i).val()
                }).appendTo(List);
            }

            // Get Selected Items 
            let item = List.children('li');

            // Item Click
            item.click(function (e) {
                e.stopPropagation();

                // Append Selected Elements
                selected.text($(this).text()).removeClass('active');

                // Toggle otionSelected Class 
                $(item).removeClass('optionSelected');
                $(this).addClass('optionSelected');

                // Pass Value To Select 
                This.val($(this).attr('value'));

                // close dropdown 
                DropDown.hide();
            });
        }
    });


    // Profile Avatar
    $('#avatar').on('change' ,function () {
        let input = (this) ,
            fileName = $(this).siblings('.fileName');
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                // image.attr('src', e.target.result);
                fileName.text(input.files[0].name);
            }
            reader.readAsDataURL(input.files[0]);
        }
    });


    // iniat WOW Js
    new WOW().init();


})(jQuery);

