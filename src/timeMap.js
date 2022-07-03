// create svg canvas
const svgTime = d3.select("#map_time").append("svg")
    .attr("id", "mapBody")
    .attr("width", canvWidth)
    .attr("height", canvHeight)
    .style("border", "1px solid");

// calc the width and height depending on margins.
const marginTime = {top: 50, right: 80, bottom: 50, left: 60};
const widthTime = canvWidth - marginTime.left - marginTime.right;
const heightTime = canvHeight - marginTime.top - marginTime.bottom;

   const link = [
     {year: 1982, type: "LineString", coordinates: [[-2.983333,53.400002], [-1.898575, 52.489471]], from: "Liverpool", to: "Birmingham"}, //Liverpool -> Birmingham
     {year: 1983, type: "LineString", coordinates: [[-1.898575, 52.4894710], [9.993682, 53.551086]], from: "Birmingham", to: "Hamburg"}, //Birmingham -> Hamburg
     {year: 1984, type: "LineString", coordinates: [[9.993682, 53.551086], [-2.983333,53.400002]], from: "Hamburg", to: "Liverpool"}, //Hamburg -> Liverpool
     {year: 1985, type: "LineString", coordinates: [[-2.983333,53.400002], [7.742615, 45.116177]], from: "Liverpool", to: "Turin"}, //Liverpool -> Turin
     {year: 1986, type: "LineString", coordinates: [[7.742615, 45.116177], [26.096306, 44.439663]], from: "Turin", to: "Bucharest"}, //Turin -> Bucharest
     {year: 1987, type: "LineString", coordinates: [[26.096306, 44.439663], [-8.629932, 41.150223]], from: "Bucharest", to: "Port"}, //Bucharest -> Porto
     {year: 1988, type: "LineString", coordinates: [[-8.629932, 41.150223], [5.4697225, 51.441642]], from: "Porto", to: "Eindhoven"}, //Porto -> Eindhoven
     {year: 1989, type: "LineString", coordinates: [[5.4697225, 51.441642], [9.188540, 45.464664]], from: "Eindhoven", to: "Milano"}, //Eindhoven -> Milano
     {year: 1990, type: "LineString", coordinates: [[9.188540, 45.464664], [9.188540, 45.464664]], from: "Milano", to: "Milano"}, //Milano -> Milano
     {year: 1991, type: "LineString", coordinates: [[9.188540, 45.464664], [20.457273, 44.787197]], from: "Milano", to: "Belgrade"}, //Milano -> Belgrade
     {year: 1992, type: "LineString", coordinates: [[20.457273, 44.787197], [2.154007, 41.390205]], from: "Belgrade", to: "Barcelona"}, //Belgrade -> Barcelona
     {year: 1993, type: "LineString", coordinates: [[2.154007, 41.390205], [5.370000, 43.296398]], from: "Barcelona", to: "Marseille"}, //Barcelona -> Marseille
     {year: 1994, type: "LineString", coordinates: [[5.370000, 43.296398], [9.188540, 45.464664]], from: "Marseille", to: "Milano"}, //Marseille -> Milano
     {year: 1995, type: "LineString", coordinates: [[9.188540, 45.464664], [4.897070, 52.377956]], from: "Milano", to: "Amsterdam"}, //Milano -> Amsterdam
     {year: 1996, type: "LineString", coordinates: [[4.897070, 52.377956], [4.897070, 52.377956]], from: "Amsterdam", to: "Amsterdam"}, //Amsterdam -> Amsterdam
     {year: 1997, type: "LineString", coordinates: [[4.897070, 52.377956], [7.46842, 51.514244]], from: "Amsterdam", to: "Dortmund"}, //Amsterdam -> Dortmund
     {year: 1998, type: "LineString", coordinates: [[7.46842, 51.514244], [-3.703790, 40.416775]], from: "Dortmund", to: "Madrid"},//Dortmund -> Madrid
     {year: 1999, type: "LineString", coordinates: [[-3.703790, 40.416775], [-2.244644, 53.483959]], from: "Madrid", to: "Manchester"}, //Madrid -> Manchester
     {year: 2000, type: "LineString", coordinates: [[-2.244644, 53.483959], [-3.703790, 40.416775]], from: "Manchester", to: "Madrid"},//Manchester -> Madrid
     {year: 2001, type: "LineString", coordinates: [[-3.703790, 40.416775], [11.576124, 48.137154]], from: "Madrid", to: "München"}, //Madrid -> München
     {year: 2002, type: "LineString", coordinates: [[11.576124, 48.137154], [6.98432, 51.0303]], from: "München", to: "Leverkusen"},//München -> Leverkusen
     {year: 2003, type: "LineString", coordinates: [[6.98432, 51.0303], [7.742615, 45.116177]], from: "Leverkusen", to: "Turin"}, //Leverkusen -> Turin
     {year: 2004, type: "LineString", coordinates: [[7.742615, 45.116177], [-8.629932, 41.150223]], from: "Turin", to: "Porto"},//Turin -> Porto
     {year: 2005, type: "LineString", coordinates: [[-8.629932, 41.150223], [9.188540, 45.464664]], from: "Porto", to: "Milano"}, //Porto -> Milano
     {year: 2006, type: "LineString", coordinates: [[9.188540, 45.464664], [2.154007, 41.390205]], from: "Milano", to: "Barcelona"},//Milano -> Barcelona
     {year: 2007, type: "LineString", coordinates: [[2.154007, 41.390205], [9.188540, 45.464664]], from: "Barcelona", to: "Milano"},//Barcelona -> Milano
     {year: 2008, type: "LineString", coordinates: [[9.188540, 45.464664], [-2.244644, 53.483959]], from: "Milano", to: "Manchester"}, //Milano -> Manchester
     {year: 2009, type: "LineString", coordinates: [[-2.244644, 53.483959], [2.154007, 41.390205]], from: "Manchester", to: "Barcelona"},//Manchester -> Barcelona
     {year: 2010, type: "LineString", coordinates: [[2.154007, 41.390205], [9.188540, 45.464664]], from: "Barcelona", to: "Milano"}, //Barcelona -> Milano
     {year: 2011, type: "LineString", coordinates: [[9.188540, 45.464664], [2.154007, 41.390205]], from: "Milano", to: "Barcelona"},//Milano -> Barcelona
     {year: 2012, type: "LineString", coordinates: [[2.154007, 41.390205], [-0.118092,  51.509865]], from: "Barcelona", to: "London"},//Barcelona -> London
     {year: 2013, type: "LineString", coordinates: [[-0.118092,  51.509865], [11.576124, 48.137154]], from: "London", to: "München"}, //London -> München
     {year: 2014, type: "LineString", coordinates: [[11.576124, 48.137154], [-3.703790, 40.416775]], from: "München", to: "Madrid"},//München -> Madrid
     {year: 2015, type: "LineString", coordinates: [[-3.703790, 40.416775], [2.154007, 41.390205]], from: "Madrid", to: "Barcelona"}, //Madrid -> Barcelona
     {year: 2016, type: "LineString", coordinates: [[2.154007, 41.390205], [-3.703790, 40.416775]], from: "Barcelona", to: "Madrid"},//Barcelona -> Madrid
     {year: 2017, type: "LineString", coordinates: [[-3.703790, 40.416775], [-3.703790, 40.416775]], from: "Madrid", to: "Madrid"},//Madrid -> Madrid
     {year: 2018, type: "LineString", coordinates: [[-3.703790, 40.416775], [-3.703790, 40.416775]], from: "Madrid", to: "Madrid"},//Madrid -> Madrid
     {year: 2019, type: "LineString", coordinates: [[-3.703790, 40.416775], [-2.983333,53.400002]], from: "Madrid", to: "Liverpool"},//Madrid -> Liverpool
     {year: 2020, type: "LineString", coordinates: [[-2.983333,53.400002], [11.576124, 48.137154]], from: "Liverpool", to: "München"},//Liverpool -> München
     {year: 2021, type: "LineString", coordinates: [[11.576124, 48.137154], [-0.118092,  51.509865]], from: "München", to: "London"}//München -> London
   ]
let slider = document.getElementById('timeSlide');
let output = document.getElementById('value');
const from = document.getElementById('from');
const hans = document.getElementById('hans');

slider.addEventListener ('input', function(e){
    output.value = e.target.value;
    doPlot(this.value)
});

output.addEventListener ('input', function(e){
    slider.value = e.target.value;
    doPlot(this.value)
});

// create parent group and add left and top margin
const gTime = svgTime.append("g")
    .attr("id", "chart-area")
    .attr("transform", `translate(${marginTime.left},${marginTime.top})`);    
//-----------------------------------------------------------
function doPlot(yearNumber) {
    // adapt from https://bl.ocks.org/mbostock/4207744, https://d3-graph-gallery.com/graph/bubblemap_circleFeatures.html
    var projection = d3.geoAlbers()  // Albers is best at lat 45°
        .rotate([0, 0])       // rotate round globe by lat and long
        .center([8.3, 46.8])  // lat and long in degrees
        .scale(1400)         // zoom into europe, depends on the projection
        .translate([widthTime / 2, heightTime / 2])  // move to center of map
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
                .style("opacity", 1)
                .html(cities.name);            
        }

        var mouseout = function(event, d) {
            Tooltip.style("opacity", 0)
        }

        gTime.append("path")
            .datum(topojson.mesh(topology, topology.objects.europe))
            .attr("class", "europe-boundary")
            .attr("d", pathGenerator)
            .style("stroke-width", 1)

        gTime.selectAll("text")
            .data(europe.features)
              .enter().append("text")
                .attr("transform", d => "translate(" + pathGenerator.centroid(d) + ")")
                .attr("dy", ".35em")
                .text(d => d.properties.name);

        gTime.selectAll("myCircles")
            .data(cities)
            .join("circle")
              .attr("cx", d => projection([d.long, d.lat])[0])
              .attr("cy", d => projection([d.long, d.lat])[1])
              .attr("r", 7)
              .style("fill", d => color(d.group))
              .attr("stroke", d => color(d.group))
              .attr("stroke-width", 3)
              .attr("fill-opacity", .4)
     
        const filteredData = link.filter(function(d){
            return d.year == yearNumber;
        })

        gTime.selectAll("path.myPath")
            .remove()
        
        gTime.selectAll("path.myPath")
            .data(filteredData, d => d)
            .join(
                enter => enter.append("path")
                .attr("class", "myPath")
                .attr("d", function(d){return pathGenerator(d);}),
                update => update
                .attr("d", function(d){return pathGenerator(d);})     
            )  
            .style("stroke", "#B4F8FE")
            .style("stroke-linecap", "round")
            .style("stroke-width", 3)

        from.innerHTML = filteredData[0].from
        hans.innerHTML = filteredData[0].to
});
}

doPlot(1982);
