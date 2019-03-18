function draw(data) {
  var ctx = document.getElementById("myChart");

  for (var i = 0; i < data.value.length; i++) {
    data.value[i] = parseFloat(data.value[i].replace(',', '.'));
  }


  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.mounth,
      datasets: [{
        data: data.value,
        backgroundColor: "ffo"
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  // console.log(chart)
}
window.onload = function() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(xhttp.responseText)
      var mounth = data.mounth
      var value = data.value
      draw(data)
      // console.log(data.mounth)
      // console.log(data.value)
    }

  };
  xhttp.open("GET", "/api", true);
  xhttp.send();
}
