$(document).ready(function() {

    $(".slide-strip>article").each(function(num,elem){
        var title = $(elem).find('header').html();
        $(".toc>ol").append("<li><a href='#"+title+"'>"+title+"</a></li>");
    });

    localStorage.slideNo = parseInt(1);
    localStorage.totalSlides = parseInt($(".slide-strip>article").length);

    $(".slide-strip").css("width",parseInt(localStorage.totalSlides*window.innerWidth) + "px");

    $(".slide-strip>article").css("width",window.innerWidth+"px");

    $("#toc-toggle").click(function(){
        $("#toc").toggleClass("toc-shown");
    });

    $("#help-toggle").click(function(){
        $("#help").toggleClass("help-shown");
    });

    $(".prev-slide").click(function(){
        goLeft();
    });
    $(".next-slide").click(function(){
        goRight();
    });

    $(".toc>ul>li").click(function(elem){
        var slideNo = $(this).index();

        moveTo(slideNo);
    });

    $(document).keydown(function(e){
        if (e.keyCode == 37) {
            goLeft();
            return false;
        }
        else if(e.keyCode == 39) {
            goRight();
            return false;
        }
        else if(e.keyCode == 38) {
            moveTo(0);
            return false;
        }
        else if(e.keyCode == 40) {
            moveTo(localStorage.totalSlides - 1)
            return false;
        }

    });



});

function goLeft(){
    localStorage.slideNo = localStorage.slideNo<=0?0:parseInt(localStorage.slideNo)-1;
    moveTo(localStorage.slideNo);
}

function goRight(){
    localStorage.slideNo = localStorage.slideNo>=(localStorage.totalSlides-1)?(localStorage.totalSlides-1):parseInt(localStorage.slideNo)+1;
    moveTo(localStorage.slideNo);
}

function moveTo(index){
    localStorage.slideNo = index;
    var newX =  - ( index * $(document).width()) ;
    $(".slide-strip").css("-webkit-transform","translate("+newX+"px,0px)");
}