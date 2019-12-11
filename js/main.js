$(document).ready(function(){
    // if (localStorage.getItem('token').length < 0) {
    //     window.location = "file:///C:/Users/Raphael%20D/Desktop/TRAVAIL/Kwick/login"
    // }
    let smiley = {
        "smile" : ' 😀 ',
        "mad" : ' 😤 ',
        "cry" : ' 😥 '
    }


    ////////////////////////       AFFICHAGE DES USERS         ///////////////////////////////
    showUser()
    setInterval(function(){
        showUser()
    },10000)
    function showUser(){
        $.ajax({
            url: "http://greenvelvet.alwaysdata.net/kwick/api/user/logged/" + localStorage.getItem('token'),
            dataType: 'jsonp',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            success: function(result, status, xhr) {
                $( ".userrs" ).remove();
                for (let index = 0; index < result.result.user.length; index++) {
                    if (result.result.user[index].toLowerCase() != localStorage.getItem("name")) {
                        $("#user").append("<div class='userrs'><i class='far fa-dot-circle'></i><p class='all_user'>" + result.result.user[index] + "</b></div>")
                    }else{
                        $("#user").append("<div class='userrs me'><i class='far fa-dot-circle'></i><p class='all_user'>Vous (" + result.result.user[index] + ") </p></div>")
                    }
                }  
            },
            error: function(xhr, status, error) {
            }
        })
    }
    /////////////////////////     affichage des messages ////////////////////////

    sessionStorage.setItem("time",0)
    showmessage()
    function showmessage() {
        $.ajax({
            
            url: "http://greenvelvet.alwaysdata.net/kwick/api/talk/list/" + localStorage.getItem('token') + "/" + sessionStorage.getItem('time'),
            dataType: 'jsonp',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            success: function(result, status, xhr) {
                for (let index = 0; index < result.result.talk.length; index++) {
                    console.log()
                    if (localStorage.getItem("name") == result.result.talk[index].user_name.toLowerCase()) {
                        $("#messageList").append("<div class='msg personnal'><span>" + result.result.talk[index].user_name + "</span><p>" + result.result.talk[index].content + "</p></div>");
                        
                        
                    }else{
                        $("#messageList").append("<div class='msg'><span>" + result.result.talk[index].user_name + "</span><p>" + result.result.talk[index].content + "</p></div>");
                    }
                    sessionStorage.setItem("time",result.result.last_timestamp);
                    scrollBot();
                }
                
                
            },
            error: function(xhr, status, error) {
            }
        })
    }
    function scrollBot(){
        $('#messageList').scrollTop($('#messageList')[0].scrollHeight);
    }
    
    setInterval(function(){showmessage()},3000)
    // $(".test").click(function(){
    //     console.log("chibre")
    //     $(".test").append("<span>" + "test" + "</span>")
    // });

    ///////////////////////////    envoie d'un message     /////////////////////////
   
    $("#send_message").on("click", function(){
        send_message()
    })
    function send_message() {
        $.ajax({
            url: "http://greenvelvet.alwaysdata.net/kwick/api/say/" + localStorage.getItem('token') + "/" + localStorage.getItem('id') + "/" + $("#message_content").val(),
            dataType: 'jsonp',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            success: function(result, status, xhr) {
                console.log(result)
                $("#message_content").val('')
                $("#message_content").css("border", "#fcd2d6 1px solid")
                showmessage()
                scrollBot()
                
            },
            error: function(xhr, status, error) {
                console.log(xhr)
                $("#message_content").css("border", "#ec4e20 1px solid")
            }
        })
    }
    
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
                localStorage.removeItem("token");
                localStorage.removeItem("id");
                localStorage.removeItem("name");
                window.location = "login.html";
            },
            error: function(xhr, status, error) {
            }
        });
    });
    $("#disconnect_no").on("click",function(){
        $("#disconnect_menu_background").css("display","none");
        $("#disconnect_menu").css("display","none");
    });

    $('#message_content').keypress(function(event){
	
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            send_message()	
        }
    
    });

});
