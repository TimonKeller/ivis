//adapt from:
//https://d3-graph-gallery.com/graph/barplot_basic.html,

// set the dimensions and margins of the graph
var margin1 = {top: 10, right: 30, bottom: 90, left: 40},
    width1 = 600 - margin1.left - margin1.right,
    height1 = 400 - margin1.top - margin1.bottom;

// append the svg object to the body of the page
const svgSuccess = d3.select("#success_barChart")
  .append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
  .append("g")
    .attr("transform", `translate(${margin1.left},${margin1.top})`);

var color = d3.scaleOrdinal().range(["#B4F8FE", "grey", "grey", "grey", "grey"])
//https://stackoverflow.com/questions/35641503/d3-how-to-show-only-top-3-of-6-items-in-bar-chart
// Parse the Data
d3.csv("./data/sieger.csv")
    .then( function(data) {

var data = data.sort(function(a,b){
  return b.Title - a.Title;
  });

 //if you want to just keep top thre
data = data.filter(function(d,i){
  return i < 5;
 });

// X axis
const x = d3.scaleBand()
  .range([ 0, width1 ])
  .domain(data.map(d => d.Club))
  .padding(0.2)

svgSuccess.append("g")
  .attr("transform", `translate(0, ${height1})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
    .style("text-anchor", "middle")
    .style("color", "white")
    .style("font-size", "15px");

svgSuccess.append("g")
  .selectAll("text")
    .style("text-anchor", "middle")
    .style("color", "white")
    .style("font-size", "15px")

// Add Y axis
const y = d3.scaleLinear()
  .domain([0, 6])
  .range([ height1, 0]);

svgSuccess.append("g")
  .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(",.0f")))
  .selectAll("text")
    .style("color", "white")

// Bars
svgSuccess.selectAll("mybar")
  .data(data)
  .join("rect")
    .attr("x", d => x(d.Club))
    .attr("width", x.bandwidth())
    .attr("fill", function(d, i) {
      return color(i);
    })
    // no bar at the beginning thus:
    .attr("height", 0) // always equal to 0
    .attr("y", d => y(0))
    .style("color", "white")

    // Animation
svgSuccess.selectAll("rect")
  .transition()
  .duration(800)
  .attr("y", d => y(d.Title))
  .attr("height", d => height1 - y(d.Title))
})

