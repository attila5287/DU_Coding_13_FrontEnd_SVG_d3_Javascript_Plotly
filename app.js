/* eslint-disable no-var, no-var, no-var, comma-dangle, no-var, no-var, max-len, no-var, no-undef, quotes, quotes, quotes, quotes, no-var, quotes, quotes, no-undef, quotes, func-names, prefer-arrow-callback, space-before-function-paren, indent, prefer-arrow-callback, func-names, space-before-function-paren, no-param-reassign, no-param-reassign, vars-on-top, no-var, no-undef, no-undef, no-var, vars-on-top, no-undef, no-undef, no-var, vars-on-top, no-undef, no-var, vars-on-top, no-undef, quotes, quotes, quotes, indent, no-var, vars-on-top, quotes, indent, indent, indent, quotes, indent, quotes, indent, quotes, indent, quotes, quotes, indent, quotes, quotes, indent, quotes, quotes, no-var, vars-on-top, no-undef, quotes, quotes, func-names, prefer-arrow-callback, space-before-function-paren, quotes, func-names, prefer-arrow-callback, space-before-function-paren, quotes, func-names, prefer-arrow-callback, space-before-function-paren, no-unused-vars, quotes, quotes, quotes, quotes, quotes, quotes, quotes, quotes, quotes, quotes, quotes, quotes, quotes, quotes, quotes */
var svgWidth = 650;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 95
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("hairData.csv", function (err, hairData) {
  if (err) throw err;

  // Step 1: Parse Data/Cast as numbers
  // ==============================
  hairData.forEach(function (data) {
    data.hair_length = +data.hair_length;
    data.num_hits = +data.num_hits;
    data.abbr = +data.abbr;
    data.poverty = +data.poverty;
    data.age = +data.age;
    data.income = +data.income;
    data.healthcare = +data.healthcare;
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
  });

  // Step 2: Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(hairData, d => d.income)*0.85, d3.max(hairData, d => d.income)*1.05])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(hairData, d => d.healthcare)])
    .range([height, 0]);

  // Step 3: Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  // ==============================
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  // Step 5: Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
    .data(hairData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.income))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "purple")
    .attr("opacity", ".5");

  // Step 6: Initialize tool tip
  // ==============================
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return (`<b>${d.statename}</b><br>Income: ${d.income}<br>No Healthcare: ${d.healthcare}`);
    });

  // Step 7: Create tooltip in the chart
  // ==============================
  chartGroup.call(toolTip);

  // Step 8: Create event listeners to display and hide the tooltip
  // ==============================
  circlesGroup.on("click", function (data) {
      toolTip.show(data);
    })
    // onmouseout event
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });

  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lack of Healthcare (percentage)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Median Income (US Dollars)");
});

/* eslint-disable no-var, no-var, no-var, comma-dangle, no-var, no-var, max-len, no-var, no-undef, quotes, quotes, quotes, quotes, no-var, quotes, quotes, no-undef, quotes, func-names, prefer-arrow-callback, space-before-function-paren, indent, prefer-arrow-callback, func-names, space-before-function-paren, no-param-reassign, no-param-reassign, vars-on-top, no-var, no-undef, no-undef, no-var, vars-on-top, no-undef, no-undef, no-var, vars-on-top, no-undef, no-var, vars-on-top, no-undef, quotes, quotes, quotes, indent, no-var, vars-on-top, quotes, indent, indent, indent, quotes, indent, quotes, indent, quotes, indent, quotes, quotes, indent, quotes, quotes, indent, quotes, quotes, no-var, vars-on-top, no-undef, quotes, quotes, func-names, prefer-arrow-callback, space-before-function-paren, quotes, func-names, prefer-arrow-callback, space-before-function-paren, quotes, func-names, prefer-arrow-callback, space-before-function-paren, no-unused-vars, quotes, quotes, quotes, quotes, quotes, quotes, quotes, quotes, quotes, quotes, quotes, quotes, quotes, quotes, quotes */