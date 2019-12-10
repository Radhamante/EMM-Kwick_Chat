$(document).ready(function(){
    const api_url = "http://greenvelvet.alwaysdata.net/kwick/api/"
    $("#login_submit").on("click",function(){
        user = $("#signup_username").val().toLowerCase()
        pass = $("#signup_password").val()
        $.ajax({
            url: api_url + "login/" + user +"/" + pass,
            dataType: 'jsonp',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            success: function(result, status, xhr) {
                console.log(result);
                localStorage.setItem('token', result.result.token);
                localStorage.setItem('id', result.result.id);
                localStorage.setItem('name', user);
                window.location = "file:///C:/Users/Raphael%20D/Desktop/TRAVAIL/Kwick/main.html"
            },
            error: function(xhr, status, error) {
                $(signup_username).css("border", "#ec4e20 1px solid")
                $(signup_password).css("border", "#ec4e20 1px solid")
            }
        })
    })

    $(document).keypress(function(event){
	
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            $.ajax({
                url: api_url + "login/" + user +"/" + pass,
                dataType: 'jsonp',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                success: function(result, status, xhr) {
                    console.log(result);
                    localStorage.setItem('token', result.result.token);
                    localStorage.setItem('id', result.result.id);
                    localStorage.setItem('name', user);
                    window.location = "file:///C:/Users/Raphael%20D/Desktop/TRAVAIL/Kwick/main.html"
                },
                error: function(xhr, status, error) {
                    $(signup_username).css("border", "#ec4e20 1px solid")
                    $(signup_password).css("border", "#ec4e20 1px solid")
                }
            })
        }
    
    });

});

