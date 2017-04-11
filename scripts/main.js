//The data for Sea Lions and Sea Level is from year 2001 to 2010
var sealions = [49700, 45500, 45500, 37300, 43500, 48900, 56800, 54300, 60000, 61500];
var sealevel = [0.006, 0.008, 0.01, 0.012, 0.014, 0.016, 0.018, 0.02, 0.022, 0.024];
var datarelations = d3.scale.linear()
                  .domain(sealevel)
                  .range(sealions);

var inner_domain = d3.scale.linear()
                  .domain([30000, 70000])
                  .range([0, 100]);

var outer_domain = d3.scale.linear()
                  .domain([0.005, 0.030])
                  .range([101, 200]);

var data = [outer_domain(0.008), inner_domain(datarelations(0.008))]; // Default for init run taking sea level as 0.008
var color = d3.scale.linear()
    .domain([0, 200])
    .range(['red', 'blue']);
var canvas = d3.select('body')
              .append('svg')
              .attr('width', 1000)
              .attr('height', 1000)
              .attr('transform', 'translate(50, 50)');
var circles = canvas.selectAll('circle');

function firstRun() {
    circles.data(data)
    .enter()
      .append('circle')
        .attr('cx', 300)
        .attr('cy', 300)
        .attr('r', function (d) {
          return (d);
        })
        .style('fill', 'none')
        .style('stroke', function(d) {
          return color(d);
        })
        .attr("stroke-width", 5);
        //.style('fill', function (d) {
        //  return color(d);
        //});
}
firstRun();

function setOuterDomain(val) {
  document.getElementById('label_sealevel').innerHTML = 'Sea Level: ' + val;
  sl = datarelations(val);
  document.getElementById('label_sealions').innerHTML = 'Sea Lions: ' + sl;
  document.getElementById('sealions_range').value = sl;
  data = [outer_domain(val), inner_domain(sl)];
  canvas.selectAll('circle')
  .data(data)
      .transition()
      .duration(500)
      .attr('r', function (d) {
        return (d);
      });
      //.style('fill', function (d) {
      //  return color(d);
      //});

}

function setInnerDomain(val) {
  document.getElementById('label_sealions').innerHTML = 'Sea Lions: ' + val;
  var invdatarelations = d3.scale.linear()
                    .domain(sealions)
                    .range(sealevel);
  sl = invdatarelations(val);
  document.getElementById('label_sealevel').innerHTML = 'Sea Level: ' + sl;
  document.getElementById('sealevel_range').value = sl;
  data = [outer_domain(sl), inner_domain(val)];
  canvas.selectAll('circle')
  .data(data)
      .transition()
      .duration(500)
      .attr('r', function (d) {
        return (d);
      });
      //.style('fill', function (d) {
      //  return color(d);
      //});

}
