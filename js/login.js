$(document).ready(function(){
    if (localStorage.getItem("token") === null) {
    }else{
        window.location = "main.html"
    }

    const api_url = "http://greenvelvet.alwaysdata.net/kwick/api/"
        $("#login_submit").on("click",function(){
            login()
        })
        function login(){
            user = $("#signup_username").val().toLowerCase()
            pass = $("#signup_password").val()
            $.ajax({
                url: api_url + "login/" + user +"/" + pass,
                dataType: 'jsonp',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                success: function(result, status, xhr) {
                    console.log(result);
                    if (result.result.status == "failure") {
                        $(signup_username).css("border", "#ec4e20 2px solid")
                        $(signup_password).css("border", "#ec4e20 2px solid")
                    }else{
                        localStorage.setItem('token', result.result.token);
                        localStorage.setItem('id', result.result.id);
                        localStorage.setItem('name', user);
                        window.location = "main.html"
                    }
                },
                error: function(xhr, status, error) {
                    console.log(result);
                    $(signup_username).css("border", "#ec4e20 2px solid")
                    $(signup_password).css("border", "#ec4e20 2px solid")
                }
            })
        }
    
    $(document).keypress(function(event){
        var keycode = event.which;
        if(keycode == '13'){
            login()
        }
    });
    
        

    
});

