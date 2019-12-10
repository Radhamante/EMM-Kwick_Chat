$(document).ready(function(){
    // if (localStorage.getItem('token').length < 0) {
    //     window.location = "file:///C:/Users/Raphael%20D/Desktop/TRAVAIL/Kwick/login"
    // }

    ////////////////////////       AFFICHAGE DES USERS         ///////////////////////////////
    
    $.ajax({
        url: "http://greenvelvet.alwaysdata.net/kwick/api/user/logged/" + localStorage.getItem('token'),
        dataType: 'jsonp',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function(result, status, xhr) {
            for (let index = 0; index < result.result.user.length; index++) {
                $("#user").append( "<div><i class='far fa-dot-circle'></i><p class='all_user'>" + result.result.user[index] + "</b></div>")
            }  
        },
        error: function(xhr, status, error) {
        }
    })

    /////////////////////////     affichage des messages ////////////////////////

    $.ajax({
        url: "http://greenvelvet.alwaysdata.net/kwick/api/talk/list/" + localStorage.getItem('token') + "/0",
        dataType: 'jsonp',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function(result, status, xhr) {
            console.log(result)
            for (let index = 0; index < result.result.talk.length; index++) {
                if (localStorage.getItem("name") == result.result.talk[index].user_name.toLowerCase()) {
                    $("#messageList").append("<div class='msg personnal'><span>" + result.result.talk[index].user_name + "</span><p class='test'>" + result.result.talk[index].content + "</p></div>")
                    
                }else{
                    $("#messageList").append("<div class='msg'><span>" + result.result.talk[index].user_name + "</span><p>" + result.result.talk[index].content + "</p></div>")
                }
            }
            $('#messageList').scrollTop($('#messageList')[0].scrollHeight);
        },
        error: function(xhr, status, error) {
        }
    })

    $(".test").click(function(){
        console.log("chibre")
        $(".test").append("<span>" + "test" + "</span>")
    });

      ///////////////////////////    envoie d'un message     /////////////////////////

    $("#send_message").on("click", function(){
        $.ajax({
            url: "http://greenvelvet.alwaysdata.net/kwick/api/say/" + localStorage.getItem('token') + "/" + localStorage.getItem('id') + "/" + $("#message_content").val(),
            dataType: 'jsonp',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            success: function(result, status, xhr) {
                $("#message_content").val('')
                $("#message_content").css("border", "#c0d6df 1px solid")
            },
            error: function(xhr, status, error) {
                $("#message_content").css("border", "#ec4e20 1px solid")
            }
        })
    })

    /////////////////////////////   disconnect     //////////////
    $("#disconnect").on("click",function(){
        $("#disconnect_menu_background").css("display","flex");
        $("#disconnect_menu").css("display","flex");
    });
    $("#disconnect_yes").on("click",function(){
        $.ajax({
            url: "http://greenvelvet.alwaysdata.net/kwick/api/logout/" + localStorage.getItem('token') + "/" + localStorage.getItem('id'),
            dataType: 'jsonp',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            success: function(result, status, xhr) {
                window.location = "file:///C:/Users/Raphael%20D/Desktop/TRAVAIL/Kwick/login.html";
                localStorage.removeItem("token");
                localStorage.removeItem("id");
            },
            error: function(xhr, status, error) {
            }
        });
    });
    $("#disconnect_no").on("click",function(){
        $("#disconnect_menu_background").css("display","none");
        $("#disconnect_menu").css("display","none");
    });
    
});
