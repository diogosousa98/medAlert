window.onload = function () {
    $("#alertaData").datepicker({ dateFormat: "yy/mm/dd" });
    $("#alertaHora").timepicker({ timeFormat: "HH:mm", interval: 60 });
  };