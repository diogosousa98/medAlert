async function login() {
    let username = $("#username").val();
    console.log(username);

    let result = await $.ajax({
        url: "/API/clientes/login/"+username,
        method: "get",

    });
    console.log(result);

    if(result.accountType == 'Cliente') {
        sessionStorage.setItem('conta', JSON.stringify(result));
        window.location = "menu.html";
    }
    else {
        alert('Username não existe')
    }
}