var colors = ["#d8b6c2", "#ffd700", "#40e0d0", "#d9f7f7", "#efdea1"];
var active_object = null;
var fejl = 0;
var score_Array = [0, 0, 0, 0, 0];
var score = 0;

$(document).ready(function() {
    $(".dropout_container").fadeOut(0);

    $(".markering").click(function(e) {
        $(".brod_txt").off("click");
        clicked_word($(this), e);
        active_object = $(this).parent().parent().find('span').index(this);
    });

    $(".brod_txt").click(function() {
        UserMsgBox("html", "Der er ikke nogen vigtige ord her");
        fejl++;
        check_answers();
    });

    $(".close_dropout").click(hide_dropout);
    $(".checkAnswer").click(check_answers);

    init();

});

function init() {
    $(".box").each(function(index) {
        $(this).css("background-color", colors[index]);
    });
    $(".dropout").each(function(index) {
        $(this).css("background-color", colors[index]);
    });
};


function clicked_word(clicked_object, pos) {
    clicked_object.css("text-decoration", "underline");

    //clicked_object.hide();
    console.log("AO: " + active_object);
    var instr_height = $(".instr_container").height();

    //alert(instr_height);

    var offset = $(".container-fluid").offset();
    var posX = pos.pageX; // - offset.left + 10;
    var posY = pos.pageY - (instr_height + 30);


    console.log("posY: " + posY + ", offset.top: " + offset.top);

    show_dropdown(posX, posY);
}


function show_dropdown(posX, posY) {
    $(".dropout_container").fadeIn(100).css("position", "absolute").css("left", posX).css("top", posY);
    $(".dropout").click(function() {
        clicked_dropout($(this));
    });


}

function clicked_dropout(objekt) {
    var indeks = objekt.index();
    console.log("clicked: " + indeks)

    $(".markering").eq(active_object).attr("value", indeks - 1).css("background-color", colors[indeks - 1]).css("text-decoration", "none");
    hide_dropout();
}

function hide_dropout() {
    $(".markering").css("text-decoration", "none");
    $(".dropout_container").fadeOut(100);

    $(".brod_txt").click(function() {
        UserMsgBox("html", "Der er ikke nogen vigtige ord her");
    });

}

function check_answers() {
    score_Array = [0, 0, 0, 0, 0];
    score = 0;
    $(".markering").each(function(index) {
        var korrekt = $(this).attr('class').split(' ')[1];
        var svar = $(this).attr("value");
        if (korrekt == svar) {
            $(this).addClass("korrekt");

            var new_score = score_Array[korrekt] + 1;
            score_Array.splice(korrekt, 1, new_score);
            console.log("score_Array: " + score_Array);
            score++;


        } else if (korrekt != svar && $(this).attr("value")) {

            $(this).animate({
                backgroundColor: "#fff"
            }, Math.random() * 3000, function() {
                $(this).removeAttr("value").css("background-color", "none");
            });
            fejl++;
        }
        console.log("korrekt: " + korrekt + ", svar: " + svar);
    });
    $(".span_score").each(function(index) {
        $(this).html(score_Array[index] + "/3")
    });

    $(".score").html("Rigtige: " + score + " / Fejl: " + fejl);

}
