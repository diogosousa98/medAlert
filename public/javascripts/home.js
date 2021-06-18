function logout(){
    sessionStorage.clear()
    window.location = "index.html"
}

async function createCards() {
    let mainMenu = document.getElementById('InforMenu');
    let user = JSON.parse(sessionStorage.getItem("conta"));
    let alertas = await $.ajax({
        url: "/API/alertas/getByIdMenu/" + user.C_id,
        method: "get",
        dataType: "json"
    });

    mainMenu.innerHTML = `<table id="alertas" class="tabelaAlertas">
        <thead>
        <tr>
          <th>Nome</th>
          <th>Dia</th>
          <th>Hora</th>
          <th>Estado</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
      </table>`;

    let tableAlertas = document.getElementById('alertas');
    for (let idx in alertas) {  
        $(tableAlertas).find('tbody').append(showInformationMenu(alertas[idx]));
    }
}

function showInformationMenu(alerta) {
    let html = `<tr>
                <td>${alerta.A_nomeMedicamento}</td>
                <td>${getDate(alerta.A_date)}</td>
                <td>${alerta.A_hour}</td>
                <td>${alerta.A_estado}</td>
            </tr>`;
    return html;
}

window.onload = () => {
    createCards();   
}

function getDate(data) {
    return data.substring(data.indexOf('T'), -1);
}