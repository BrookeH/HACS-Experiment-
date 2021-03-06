$(function() {
    var textID, lineHeight
 
	$.getJSON("text.json", function(data) {
        if (readCookie("text2ID") == 1) {
            text = data.text[0]
        } else if (readCookie("text2ID") == 2) {
            text = data.text[1]
        } else if (readCookie("text2ID") == 3) {
            text = data.text[2]
        }
        for (var i = 0; i < text.questions.length; i++) {
            $("#questions").append("<fieldset id='"+ i +"'><legend>"+ text.questions[i].question +"</legend>")
            for (var a = 0; a < text.questions[i].answers.length; a++) {
                $("#"+ i +"").append("<input type='radio' data-correct='"+ text.questions[i].answers[a].correct +"' name='question"+ i +"' id='"+ i + a +"' value='"+ a +"'/><label for='"+ a +"'>"+ text.questions[i].answers[a].text +"<lable><br/>");
            }
        }
    });

    $('.next').click(function(){
        if (validateQuestions()) {
            createCookie("text2Score", markQuestions(), 30)
            createCookie("text2Difficulty", $("[name=text2Difficulty]:checked").val(), 30)
            location.href = "finish.html"
        } else {
            alert("Please answer all the Questions")
        }
    });
    
	})

function validateQuestions() {
    for ( var i = 0; i < text.questions.length; i++ ) {
            if ($('#'+ i +' [type="radio"]:checked').length == 0) {
                return false
            }
        }
    if ($("[name=text2Difficulty]:checked").length == 0) {
        return false
    }
    return true
}

function markQuestions() {
    count = 0
    for ( var i = 0; i < text.questions.length; i++ ) {
            if ($('#'+ i +' [type="radio"]:checked').data('correct')) {
                    count++
            }
        }
        return count
}