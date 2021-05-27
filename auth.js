
function register(){
    let f = document.forms['registerForm'];

    let user = {};

    user.firstName = f['firstName'].value;
    user.lastName = f['lastName'].value;
    user.username = f['username'].value;
    user.password = f['password'].value;

    let json = JSON.stringify(user);
    console.log(json);

    http.post("/api/register", json, function(response){
        console.log("Muvaffaqiyatli . . .");
        console.log(response);

    }, function (error){
        console.log("Xatolik");
        console.log(error);

    });


}


function login(){
    let f = document.forms['loginForm'];

    let user = {};

    user.username = f['username'].value;
    user.password = f['password'].value;

    let json = JSON.stringify(user);
    console.log(json);

    http.post("/api/auth", json, function(response){
        let res = JSON.parse(response);
        localStorage.setItem("token", res.token);
        location.href = "/mahsulot.html";

    }, function (error){
        console.log("Xatolik");
        console.log(error);

    });

}