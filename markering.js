var colors = ["transparent", "#d8b6c2", "#ffd700", "#40e0d0", "#d9f7f7", "#efdea1"];

$(document).ready(function() {

    $(".markering").click(function() {
        

        var value = parseInt($(this).attr("value"));
        console.log("val: " + value);
        if (value < colors.length-1) {
            value = value + 1;
        } else {
            value = 0
        }

        $(this).fadeOut(0).css("background-color", colors[value]).fadeIn(500);

        $(this).attr("value", value);

        $(this).addClass("select 0");
    });


    init();
});

function init() {
    $(".box").each(function(index) {
        $(this).css("background-color", colors[index+1]);
    });
};
