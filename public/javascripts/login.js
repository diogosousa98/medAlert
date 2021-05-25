async function login() {
    let username = $("#username").val();

    let result = await $.ajax({
        url: "/api/clientes/login/"+username,
        method: "get",

    });
    console.log(result);

    if(result != false) {
        sessionStorage.setItem('conta', JSON.stringify(result));
        window.location = "menu.html";
    }
    else {
        alert('Username não existe');
    }
}