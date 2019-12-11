$(document).ready(function(){
    const api_url = "http://greenvelvet.alwaysdata.net/kwick/api/"
    $("#signup_submit").on("click",function(){
        check()
    })
    function check() {
        if ($(signup_password1).val() == $(signup_password2).val()) {
            $(signup_password1).css("border", "#c0d6df 1px solid")
            $(signup_password2).css("border", "#c0d6df 1px solid")
            if ($(signup_username).val().length <= 3) {
                $(signup_username).val("to short !").css({"border" : "#ec4e20 1px solid","color":"#ec4e20","font-size":"10px"})
            }else{
                signup()

            }
        }
        else{
            $(signup_password1).css({"border":"#ec4e20 1px solid"})
            $(signup_password2).css({"border":"#ec4e20 1px solid"})
        }
    }

    signup = function(){
        let user = $(signup_username).val()
        let pass = $(signup_password1).val()
        $.ajax({
            url: api_url + "signup/" + user +"/" + pass,
            dataType: 'jsonp',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            success: function(result, status, xhr) {
                console.log(result);
                if (result.result.status == "failure") {
                    $("#signup_username").css({"border" : "#ec4e20 1px solid","color":"#ec4e20","font-size":"10px"}).val("login not available")
                }else{
                    localStorage.setItem('token', result.result.token);
                    localStorage.setItem('id', result.result.id);
                    localStorage.setItem('name', user);
                    window.location = "main.html"
                }
                
            },
            error: function(xhr, status, error) {
                $(signup_username).css("border", "#ec4e20 1px solid")
                $(signup_password1).css("border", "#ec4e20 1px solid")
                $(signup_password2).css("border", "#ec4e20 1px solid")       }
        })
    }
    $("#signup_username").on("click",function(){
        if ($("#signup_username").val() == "login not available" || $("#signup_username").val() == "to short !") {
            $("#signup_username").val("").css({"color":"#0d0221","border":"#c0d6df 1px solid","font-size":"initial"})
        }
    })
    $(document).keypress(function(event){
        var keycode = event.which;
        if(keycode == '13'){
            check()
        }
    });
});

