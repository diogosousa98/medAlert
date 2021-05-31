let user;

window.onload = function () {
    user = JSON.parse(sessionStorage.getItem("conta"));
    $("#alertaData").datepicker({ dateFormat: "yy/mm/dd" });
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
    user = JSON.parse(sessionStorage.getItem("conta"));

    let dataA = $("#alertaData").val();
    let hora = $('#alertaHora').val();
    let nome = $('#nomeMedicamento').val();
  
    
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
      if (res.insertId) {
        alert("Reserva feita!");
        window.location = "marcacao.html";
      } else {
        alert("Algo correu mal.\n Tente mais tarde.");
      }
    } else {
      alert("Por favor preencha todos os campos.");
    }
  }