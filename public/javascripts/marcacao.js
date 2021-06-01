let user;

window.onload = function () {
    user = JSON.parse(sessionStorage.getItem("conta"));
    $("#alertaData").datepicker({ dateFormat: "yy/mm/dd" });
    $("#alertaDataFim").datepicker({ dateFormat: "yy/mm/dd" });
    $("#alertaHora").timepicker({ timeFormat: "HH:mm", interval: 60 });
  };

  $(function() {
    var medicamentos = [
      "Aerius", "Aftum", "Aquilea", "Aspirina", "Benuron",
      "Benzac", "Bruffen", "Cêgripe", "Corega", "Daflon",
      "Depuralina", "Digestil", "Drenaslim", "Dulcolax", "Easyslim",
      "Eludril", "Griponal", "Kukident", "Mucosolvan", "Nurofen",
      "Oral-B", "Paracetamol", "Strepfen", "Strepsils", "Tantum",
      "Vaporil", "Venex", "Viagra", "Viartril", "Voltaren", "Zonegran", "Zovirax"
    ];
    $("#nomeMedicamento" ).autocomplete({
      source: medicamentos
    });
  });

  async function submit() {
    let dataA = $("#alertaData").val();
    let nome = $('#nomeMedicamento').val();
    let hora = $('#alertaHora').val();
  
    let id = marcacao(dataA, nome, hora)

    if (id) {
        alert("Reserva feita!");
        window.location = "marcacao.html";
      } else {
        alert("Algo correu mal.\n Tente mais tarde.");
      }
  }

  async function submitMarcacaoMultipla() {
    user = JSON.parse(sessionStorage.getItem("conta"));

    let dataA = new Date($("#alertaData").val());
    let dataF = new Date($("#alertaDataFim").val());
    let hora = $('#alertaHora').val();
    let nome = $('#nomeMedicamento').val();
  
    for (var d = dataA; d <= dataF; d.setDate(d.getDate() + 1)) {
      let id = marcacao(formatDate(d), nome, hora)

      if (!id) {
        alert("Algo correu mal.\n Tente mais tarde.");
      }
    }
    alert("Reserva feita!");
    //window.location = "marcacaoMultipla.html";
  }

async function marcacao(dataA, nome, hora){
  user = JSON.parse(sessionStorage.getItem("conta"));

  if (
      dataA != ""&& 
      nome != ""&& 
      hora != "" 
    ) {
  
      let body = {
        medicamento: nome,
        hora: hora,
        dataA: dataA,
        estado: 'não concluido',
        C_id: user.C_id,
      };

      let res = await $.ajax({
        type: "POST",
        url: "/api/alertas",
        data: JSON.stringify(body),
        dataType: "json",
        contentType: "application/json",
      });

      return res.insertId
    } else {
      alert("Por favor preencha todos os campos.");
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('/');
}