$(document).ready(function() {
    var words = $(".brod_txt").text().split(' ');
    //console.log(words + words.length);

    for (var i = 0; i < words.length; i++) {
        words[i] = "<span class='word'>" + words[i] + "</span> ";

    }
    $(".brod_txt").html(words);

    $(".word").click(function() {
        if ($(this).hasClass("word_selected")) {
        	console.log("hasClass");
            $(this).removeClass("word_selected");
        } else {
        	console.log("!hasClass");
            $(this).addClass("word_selected");
        }


    });
});
