// create svg canvas
const canvHeight = 580, canvWidth = 700;
const svgHistory = d3.select("#map_history").append("svg")
    .attr("id", "mapBody")
    .attr("width", canvWidth)
    .attr("height", canvHeight)
    .style("border", "1px solid");

// calc the width and height depending on margins.
const margin = {top: 50, right: 80, bottom: 50, left: 60};
const width = canvWidth - margin.left - margin.right;
const height = canvHeight - margin.top - margin.bottom;


const cities = [
    {long: -2.983333, lat: 53.400002, group: "B", size: 3, name: "Liverpool FC"}, 
    {long: -1.898575, lat: 52.489471, group: "C", size: 1, name: "Aston Villa"},
    {long: 9.993682, lat: 53.551086, group: "C", size: 1, name: "Hamburg SV"}, 
    {long: 26.096306, lat: 44.439663, group: "C", size: 1, name: "Steaua Bucaresti"}, 
    {long: -8.629932, lat: 41.150223, group: "C", size: 2, name: "FC Porto"},  
    {long: 5.4697225, lat: 51.441642, group: "C", size: 1, name: "PSV Eindhoven"}, 
    {long: 9.188540, lat: 45.464664, group: "A", size: 5, name: "AC Milan"},  
    {long: 7.742615, lat: 45.116177, group: "C", size: 2, name: "Juventus FC"}, 
    {long: 20.457273, lat: 44.787197, group: "C", size: 1, name: "Red Star"}, 
    {long: 2.154007, lat: 41.390205, group: "B", size: 3, name: "FC Barcelona"},
    {long: 5.370000, lat: 43.296398, group: "C", size: 1, name: "Marseille FC"},
    {long: 4.897070, lat: 52.377956, group: "C", size: 2, name: "AFC Ajax"},
    {long: 7.468429, lat: 51.514244, group: "C", size: 1, name: "Borussia Dortmund"}, 
    {long: -3.703790, lat: 40.416775, group: "A", size: 6, name: "Real Madrid CF"},  
    {long: -2.244644, lat: 53.483959, group: "C", size: 1, name: "Manchester United FC"},
    {long: 11.576124, lat: 48.137154, group: "B", size: 3, name: "FC Bayern"},
    {long: 6.98432, lat: 51.0303, group: "C", size: 1, name: "Bayern Leverkusen"},  
    {long: -0.118092, lat: 51.509865, group: "C", size: 2, name: "Chelsea FC"}  
  ];

// create parent group and add left and top margin
const g = svgHistory.append("g")
    .attr("id", "chart-area")
    .attr("transform", `translate(${margin.left},${margin.top})`);    
//-----------------------------------------------------------
function doPlot() {
    // adapt from https://bl.ocks.org/mbostock/4207744, https://d3-graph-gallery.com/graph/bubblemap_circleFeatures.html
    var projection = d3.geoAlbers()  // Albers is best at lat 45°
        .rotate([0, 0])       // rotate around globe by lat and long
        .center([8.3, 46.8])  // lat and long in degrees
        .scale(1400)         // zoom into europe, depends on the projection
        .translate([width / 2, height / 2])  // move to center of map
        .precision(.1);

    // change to d3-fetch
    Promise.all(
        [
            d3.json("./data/europe.json"),
            d3.csv("./data/sieger.csv")

        ]
    ).then(function(data) {

        var topology = data[0];
        var sl = data[1];

        var europe = topojson.feature(topology, topology.objects.europe);
    
        var pathGenerator = d3.geoPath().projection(projection);

        // Add a scale for bubble size
        var size = d3.scaleLinear()
            .domain([1,8])  // What's in the data
            .range([ 10, 50])  // Size in pixel

         // Create a color scale
        var color = d3.scaleOrdinal()
            .domain(["A", "B", "C" ])
            .range([ "#B4F8FE", "#0268FA", "#781984"])

        // create a tooltip
        var Tooltip = d3.select("#map_history")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 1)
            .style("color", "white")

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(event, cities) {
            Tooltip
                .style("top", (event.pageY)+"px")
                .style("left",(event.pageX)+"px")
                .style("cursor", "default")
                .style("opacity", 1)
                .html(cities.name);          
        }

        var mouseout = function(event, d) {
            Tooltip.style("opacity", 0)
        }
        
        g.append("path")
            .datum(topojson.mesh(topology, topology.objects.europe))
            .attr("class", "europe-boundary")
            .attr("d", pathGenerator);

        g.selectAll("text")
            .data(europe.features)
              .enter().append("text")
                .attr("transform", d => "translate(" + pathGenerator.centroid(d) + ")")
                .attr("dy", ".35em")
                .text(d => d.properties.name);

        g.selectAll("myCircles")
            .data(cities)
            .join("circle")
              .attr("cx", d => projection([d.long, d.lat])[0])
              .attr("cy", d => projection([d.long, d.lat])[1])
              .attr("r", d => size(d.size))
              .style("fill", d => color(d.group))
              .attr("stroke", d => color(d.group))
              .attr("stroke-width", 3)
              .attr("fill-opacity", .4)
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
    });
}

doPlot();
