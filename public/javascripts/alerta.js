async function createCards() {
    let main = document.getElementById('Infor');
    let user = JSON.parse(sessionStorage.getItem("conta"));
    let alertas = await $.ajax({
        url: "/API/alertas/getById/" + user.C_id,
        method: "get",
        dataType: "json"
    });
    console.log(user.C_id)
    for (let idx in alertas) {  
        main.innerHTML += showInformation(alertas[idx]);
    }
}

function showInformation(alerta) {
    let html = "";
        html += `<table id="alertas">
        <tr>
          <th>Nome</th>
          <th>Dia</th>
          <th>Hora</th>
          <th>Estado</th>
        </tr>
        <tr>
        <th>${alerta.A_nomeMedicamento}</th>
        <th>${getDate(alerta.A_date)}</th>
        <th>${alerta.A_hour}</th>
        <th>${alerta.A_estado}</th>
      </tr>
      </table>`;
    return html;
}

window.onload = () => {
    createCards();   
}

function getDate(data) {
    return data.substring(data.indexOf('T'), -1);
}