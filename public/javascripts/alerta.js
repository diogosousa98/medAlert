async function createCards() {
    let main = document.getElementById('Infor');
    let user = JSON.parse(sessionStorage.getItem("conta"));
    let alertas = await $.ajax({
        url: "/API/alertas/getById/" + user.C_id,
        method: "get",
        dataType: "json"
    });

    main.innerHTML = `<table id="alertas" class="tabelaAlertas">
        <thead>
        <tr>
          <th>Nome</th>
          <th>Dia</th>
          <th>Hora</th>
          <th>Estado</th>
          <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
      </table>`;

    let tableAlertas = document.getElementById('alertas');
    for (let idx in alertas) {  
        $(tableAlertas).find('tbody').append(showInformation(alertas[idx]));
    }
}

function showInformation(alerta) {
    let html = `<tr>
                <td>${alerta.A_nomeMedicamento}</td>
                <td>${getDate(alerta.A_date)}</td>
                <td>${alerta.A_hour}</td>
                <td>${alerta.A_estado}</td>
                <td><input type="button" value="Alterar Estado" id="submit" onclick="alterarEstado(${alerta.A_id})" /></td>
            </tr>`;
    return html;
}

window.onload = () => {
    createCards();   
}

function getDate(data) {
    return data.substring(data.indexOf('T'), -1);
}

async function alterarEstado(alertaID) {
      
    if (alertaID != "") {

      let res = await $.ajax({
        type: "PUT",
        url: "/API/alertas/alterarEstado/" + alertaID,
        dataType: "json",
        contentType: "application/json",
      });

      if (res) {
        location.reload();
      } else {
        alert("Algo correu mal.\n Tente mais tarde.");
      }
    } else {
      alert("Por favor preencha todos os campos.");
    }
  }