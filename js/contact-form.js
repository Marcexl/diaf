$("#contactForm").on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        var name = $("#name").val();
        var phone = $("#phone").val();
        var campaign = $("#campaign").val();
        var placement = $("#placement").val();
        event.preventDefault();
        if (name != "" && phone.length == 10 || phone.length == 11) {
            console.log("enviando");
            $('#btn-send').prop('disabled', true);
            submitForm(name, phone, campaign, placement);
        }else{
            formError();           
        }
        
    }
});


function submitForm(name, phone, campaign, placement){
        var parametros = {
            "name" : name,
            "phone" : phone,
            "campaign" : campaign,
            "placement" : placement
        };
    
        $.ajax({
            type: "POST",
            url: "process.php",
            data: parametros,
            success : function(text){
                var obj = JSON.parse(text);
                //console.log(parametros.campaign);
                if (obj['status'] == "success"){
                    formSuccess(parametros.campaign);
                } else {
                    formError();
                    submitMSG(false,text);
                }
            }
        });

}

function formSuccess(campaign){
    $("#contactForm")[0].reset();
    if (campaign == 'withoutbox') {
        window.location.href = "https://thinku.academy/gracias.php?campaign=withoutbox";
    } else {
        window.location.href = "https://thinku.academy/gracias.php";
    }
    submitMSG(true, "Message Submitted!")
}

function formError(){
    $("#contactForm .send").removeClass().addClass('error');
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}