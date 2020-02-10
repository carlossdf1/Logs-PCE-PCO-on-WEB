google.charts.load('current', {'packages':['corechart']});

function drawChart(x) {
  console.log("DIBUJADO#####################################");
  console.log(x);
var data = google.visualization.arrayToDataTable(x);

var options = {
    title: 'Medicion de particulas en el Aire',
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}
