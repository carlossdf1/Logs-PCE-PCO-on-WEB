google.charts.load('current', {'packages':['corechart']});
//google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  console.log("DIBUJADO#####################################");
  console.log(datos);
  var data = google.visualization.arrayToDataTable(datos);

//var data = google.visualization.arrayToDataTable([
//    ['Year', 'Sales', 'Expenses'],
//    ['2004',  1000,      400],
//    ['2005',  1170,      460],
//    ['2006',  660,       1120],
//    ['2007',  1030,      540]
//  ]);


//var data = google.visualization.arrayToDataTable([
//  ["date time","2.5um","10 um"],
//  ["11-23-2019 20-36-02",18,41],
//  ["11-23-2019 20-35-21",29,53],
//  ["11-23-2019 20-34-54",25,50],
//  ["11-23-2019 20-34-27",35,51],
//  ["11-23-2019 20-33-50",25,43],
//  ["11-23-2019 20-33-19",20,47]
//]);


  var options = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}
