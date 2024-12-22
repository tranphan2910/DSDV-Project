// Đường dẫn file CSV
const csvPath = "data.csv";

// Lưu trữ dữ liệu
let allData = [];

// Load dữ liệu từ CSV
d3.csv(csvPath).then((data) => {
  data.forEach((d) => {
    d.departure_date = d.departure_date;
    d.total_price = +d.total_price;
  });

  allData = data;

  // Xử lý giá trị duy nhất và thêm "All" lên đầu danh sách
  const uniqueCodeNames = ["All", ...new Set(data.map((d) => d.code_name))];
  const uniqueFrom = ["All", ...new Set(data.map((d) => d.from))];
  const uniqueTo = ["All", ...new Set(data.map((d) => d.to))];

  // Gọi populateFilter với danh sách đã loại bỏ giá trị lặp lại
  populateFilter("#codeName", uniqueCodeNames);
  populateFilter("#from", uniqueFrom);
  populateFilter("#to", uniqueTo);

  updateCharts();

  d3.selectAll("select, input").on("change", updateCharts);
});

// Populate dropdown filters
function populateFilter(selector, values) {
  const dropdown = d3.select(selector);

  // Remove existing options to prevent duplication
  dropdown.selectAll("option").remove();

  // Ensure no duplicates, especially for "All"
  const uniqueValues = [...new Set(values)];

  uniqueValues.forEach((value) =>
    dropdown.append("option").text(value).attr("value", value)
  );
}

// Hàm cập nhật biểu đồ
function updateCharts() {
  const selectedCodeName = d3.select("#codeName").node().value;
  const selectedFrom = d3.select("#from").node().value;
  const selectedTo = d3.select("#to").node().value;
  const selectedDate = d3.select("#departureDate").node().value;

  const filteredData = allData.filter(
    (d) =>
      (selectedCodeName === "All" || d.code_name === selectedCodeName) &&
      (selectedFrom === "All" || d.from === selectedFrom) &&
      (selectedTo === "All" || d.to === selectedTo) &&
      (!selectedDate || d.departure_date === selectedDate)
  );

  drawBarChart(filteredData);
  drawScatterPlot(filteredData);
  updateSummary(filteredData);
  updateFilteredFlightRoutes(mapSvg, filteredData);
  drawHeatmap(filteredData);
}

function drawBarChart(data) {
  const counts = d3.rollup(
    data,
    (v) => v.length,
    (d) => d.code_name
  );
  const barData = Array.from(counts, ([code_name, count]) => ({
    code_name,
    count,
  }));

  const svg = d3.select("#bar-chart");
  svg.selectAll("*").remove();

  const width = 700,
    height = 200,
    margin = { top: 20, right: 20, bottom: 60, left: 100 };

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(barData, (d) => d.count)])
    .range([0, width - margin.left - margin.right]);

  const yScale = d3
    .scaleBand()
    .domain(barData.map((d) => d.code_name))
    .range([0, height - margin.top - margin.bottom])
    .padding(0.1);

  const chart = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Define gradients
  const defs = svg.append("defs");
  barData.forEach((d, i) => {
    const gradient = defs
      .append("linearGradient")
      .attr("id", `gradient-${i}`)
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0%")
      .attr("y2", "0%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", d3.schemeCategory10[i % 10])
      .attr("stop-opacity", 0.8);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", d3.interpolateBlues(0.7))
      .attr("stop-opacity", 1);
  });

  // Tooltip
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background", "#fff")
    .style("border", "1px solid #ccc")
    .style("padding", "5px")
    .style("border-radius", "4px");

  const bars = chart.selectAll("rect").data(barData);

  const colorScale = d3.scaleOrdinal([
    "#ffcccb", // Pastel red
    "#add8e6", // Pastel blue
    "#90ee90", // Pastel green
    "#ffd700", // Pastel yellow
    "#dda0dd", // Pastel purple
  ]);

  bars
    .enter()
    .append("rect")
    .attr("y", (d) => yScale(d.code_name))
    .attr("height", yScale.bandwidth())
    .attr("x", 0)
    .attr("width", 0)
    .attr("fill", (d) => colorScale(d.code_name))
    .on("mouseover", function (event, d) {
      tooltip.style("visibility", "visible").text(`${d.code_name}: ${d.count}`);
    })
    .on("mousemove", (event) => {
      tooltip
        .style("top", `${event.pageY + 10}px`)
        .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", () => tooltip.style("visibility", "hidden"))
    .transition()
    .duration(1000)
    .attr("width", (d) => xScale(d.count));

  chart.append("g").call(d3.axisLeft(yScale));
  chart
    .append("g")
    .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
    .call(d3.axisBottom(xScale));

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Total Flight");
}

function drawScatterPlot(data) {
  const processedData = Array.from(
    d3.rollup(
      data,
      (v) => d3.mean(v, (d) => d.total_price),
      (d) => d.departure_date.split(" ")[0],
      (d) => d.code_name
    ),
    ([date, airlines]) => ({
      date: date,
      airlines: Array.from(airlines, ([code_name, avg_price]) => ({
        code_name: code_name,
        avg_price: avg_price,
      })),
    })
  );

  d3.select("#line-chart").selectAll("*").remove();

  const margin = { top: 50, right: 150, bottom: 70, left: 70 },
    width = 770 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

  const svg = d3
    .select("#line-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3
    .scaleTime()
    .domain([new Date("2021-04-01"), new Date("2021-05-04")])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(processedData, (d) => d3.max(d.airlines, (a) => a.avg_price)),
    ])
    .range([height, 0]);

  const colorScale = d3.scaleOrdinal([
    "#ffcccb", // Pastel red
    "#add8e6", // Pastel blue
    "#90ee90", // Pastel green
    "#ffd700", // Pastel yellow
    "#dda0dd", // Pastel purple
  ]);

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background", "#fff")
    .style("border", "1px solid #ccc")
    .style("padding", "5px")
    .style("border-radius", "4px");

  processedData.forEach((day) => {
    day.airlines.forEach((airline) => {
      svg
        .append("circle")
        .attr("cx", xScale(new Date(day.date)))
        .attr("cy", yScale(airline.avg_price))
        .attr("r", 0)
        .attr("fill", colorScale(airline.code_name))
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .on("mouseover", function () {
          d3.select(this).attr("r", 6);
          tooltip
            .style("visibility", "visible")
            .text(`${airline.code_name}: ${airline.avg_price.toFixed(2)} VND`);
        })
        .on("mousemove", (event) => {
          tooltip
            .style("top", `${event.pageY + 10}px`)
            .style("left", `${event.pageX + 10}px`);
        })
        .on("mouseout", function () {
          d3.select(this).attr("r", 4.5);
          tooltip.style("visibility", "hidden");
        })
        .transition()
        .duration(1000)
        .attr("r", 4.5);
    });
  });

  svg.append("g").call(d3.axisLeft(yScale));
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(
      d3
        .axisBottom(xScale)
        .ticks(d3.timeDay.every(2))
        .tickFormat(d3.timeFormat("%d-%b"))
    )
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 20)
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Date");

  svg
    .append("text")
    .attr("transform", "rotate(-92)")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 7)
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Price (VND)");

  const legend = svg
    .selectAll(".legend")
    .data(colorScale.domain())
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(${width + 20}, ${i * 25})`);

  legend
    .append("circle")
    .attr("r", 6)
    .style("fill", (d) => colorScale(d));

  legend
    .append("text")
    .attr("x", 10)
    .attr("y", 5)
    .style("font-size", "12px")
    .text((d) => d);
}

// Function to update Summary with Transition
function updateSummary(data) {
  // Calculate total flights and travelers
  const totalFlight = data.length || 0; // Default to 0 if no data
  const totalTravellers = totalFlight * 150;

  // Update total flights with transition
  d3.select("#total-flight")
    .transition()
    .duration(1000)
    .tween("text", function () {
      const i = d3.interpolateNumber(
        parseInt(this.textContent.replace(/,/g, ""), 10) || 0, // Fallback to 0 if NaN
        totalFlight
      );
      return function (t) {
        d3.select("#total-flight").text(Math.round(i(t)).toLocaleString());
      };
    });

  // Update total travelers with transition
  d3.select("#total-travellers")
    .transition()
    .duration(1000)
    .tween("text", function () {
      const i = d3.interpolateNumber(
        parseInt(this.textContent.replace(/,/g, ""), 10) || 0, // Fallback to 0 if NaN
        totalTravellers
      );
      return function (t) {
        d3.select("#total-travellers").text(Math.round(i(t)).toLocaleString());
      };
    });
}

// Load Vietnam map and flight data
const mapWidth = 600;
const mapHeight = 680;

const projection = d3
  .geoMercator()
  .center([107, 16]) // Center coordinates for Vietnam
  .scale(2000) // Zoom level
  .translate([mapWidth / 2, mapHeight / 2]);

const path = d3.geoPath().projection(projection);

const mapSvg = d3
  .select("#vietnam-map")
  .attr("width", mapWidth)
  .attr("height", mapHeight);

// Hàm tạo biểu tượng đích tùy chỉnh
function createCustomDestinationIcon(mapSvg) {
  const defs = mapSvg.append("defs");

  const destinationIcon = defs
    .append("symbol")
    .attr("id", "destination-icon")
    .attr("viewBox", "-12 -30 24 "); // Định dạng chính xác viewBox

  // Hình pin bên ngoài
  destinationIcon
    .append("path")
    .attr(
      "d",
      "M12 2C8.13 2 5 5.13 5 9c0 3.72 5 11 7 13 2-2 7-9.28 7-13 0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"
    ) // Hình dạng pin đơn giản
    .attr("fill", "yellow")
    .attr("stroke", "blue")
    .attr("stroke-width", 1.5);

  // Vòng tròn rỗng bên trong
  destinationIcon
    .append("circle")
    .attr("cx", 0)
    .attr("cy", -6) // Vị trí trung tâm bên trong pin
    .attr("r", 4)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 2);
}

// Function to draw flight routes
function drawFlightRoutesFromData(mapSvg, flightData) {
  const projection = d3
    .geoMercator()
    .center([107, 16]) // Center the map on Vietnam
    .scale(2000) // Adjust scale
    .translate([mapWidth / 2, mapHeight / 2]); // Map position

  // Clear previous elements
  mapSvg.selectAll("line").remove();
  mapSvg.selectAll("circle").remove();
  mapSvg.selectAll("use").remove();

  // Tooltip for displaying information
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background", "#fff")
    .style("border", "1px solid #ccc")
    .style("padding", "10px")
    .style("box-shadow", "0px 0px 6px rgba(0,0,0,0.1)")
    .style("border-radius", "4px")
    .style("visibility", "hidden");

  flightData.forEach((flight) => {
    const fromCoords = projection([
      +flight.origin_longitude,
      +flight.origin_latitude,
    ]);
    const toCoords = projection([
      +flight.destination_longitude,
      +flight.destination_latitude,
    ]);

    // Draw the flight route line
    mapSvg
      .append("line")
      .attr("x1", fromCoords[0])
      .attr("y1", fromCoords[1])
      .attr("x2", fromCoords[0]) // Start from origin
      .attr("y2", fromCoords[1])
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .on("mouseover", () => {
        tooltip.style("visibility", "visible").html(`
            <strong>Flight Code:</strong> ${flight.code_name}<br>
            <strong>From:</strong> ${flight.airport_from} (${flight.from})<br>
            <strong>To:</strong> ${flight.airport_to} (${flight.to})
          `);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", `${event.pageY + 10}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .transition() // Add transition for the line
      .duration(1000)
      .attr("x2", toCoords[0]) // Transition to destination
      .attr("y2", toCoords[1]);

    // Add "from" marker as red circle
    mapSvg
      .append("circle")
      .attr("cx", fromCoords[0])
      .attr("cy", fromCoords[1])
      .attr("r", 5)
      .attr("fill", "red")
      .on("mouseover", () => {
        tooltip.style("visibility", "visible").html(`
            <strong>City:</strong> ${flight.airport_to}<br>
            <strong>Airport:</strong> ${flight.airport_from}
          `);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", `${event.pageY + 10}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    // Add "to" marker as custom pin icon with transition
    const destinationMarker = mapSvg
      .append("use")
      .attr("xlink:href", "#destination-icon")
      .attr("x", fromCoords[0] - 12) // Start at origin
      .attr("y", fromCoords[1] - 24) // Start at origin
      .attr("width", 24)
      .attr("height", 36);

    // Transition the marker to the destination
    destinationMarker
      .transition()
      .duration(1000)
      .attr("x", toCoords[0] - 12) // Move to destination
      .attr("y", toCoords[1] - 24);

    destinationMarker
      .on("mouseover", () => {
        tooltip.style("visibility", "visible").html(`
          <strong>City:</strong> ${flight.to}<br>
          <strong>Airport:</strong> ${flight.airport_to}
        `);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", `${event.pageY + 10}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });
  });
}

// Hàm cập nhật đường bay với bộ lọc
function updateFilteredFlightRoutes(mapSvg, flightData) {
  const selectedFrom = d3.select("#from").node().value;
  const selectedTo = d3.select("#to").node().value;

  const filteredData = flightData.filter(
    (d) =>
      (selectedFrom === "All" || d.from === selectedFrom) &&
      (selectedTo === "All" || d.to === selectedTo)
  );

  drawFlightRoutesFromData(mapSvg, filteredData);
}

// Thực thi chính
Promise.all([
  d3.json("vn.json"), // Dữ liệu GeoJSON hoặc TopoJSON
  d3.csv("data.csv"), // Dữ liệu đường bay
]).then(([vietnam, flightData]) => {
  // Tạo biểu tượng tùy chỉnh
  createCustomDestinationIcon(mapSvg);

  // Vẽ bản đồ Việt Nam
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background", "#fff")
    .style("border", "1px solid #ccc")
    .style("padding", "10px")
    .style("box-shadow", "0px 0px 6px rgba(0,0,0,0.1)")
    .style("border-radius", "4px")
    .style("visibility", "hidden");

  mapSvg
    .selectAll("path")
    .data(vietnam.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "#ffb733")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .on("mouseover", function (event, d) {
      d3.select(this).transition().duration(200).attr("fill", "#ffd166");
      tooltip
        .style("visibility", "visible")
        .html(`<strong>Province:</strong> ${d.properties.name}`);
    })
    .on("mousemove", (event) => {
      tooltip
        .style("top", `${event.pageY + 10}px`)
        .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).attr("fill", "#ffb733");
      tooltip.style("visibility", "hidden");
    });

  // Vẽ các đường bay ban đầu
  drawFlightRoutesFromData(mapSvg, flightData);

  // Tạo bộ lọc
  const fromDropdown = d3.select("#from");
  const toDropdown = d3.select("#to");
  const cities = [
    ...new Set(
      flightData.map((d) => d.from).concat(flightData.map((d) => d.to))
    ),
  ];
  cities.unshift("All");

  cities.forEach((city) => {
    fromDropdown.append("option").text(city).attr("value", city);
    toDropdown.append("option").text(city).attr("value", city);
  });

  // Thêm sự kiện cho bộ lọc
  d3.selectAll("#from, #to").on("change", () => {
    updateFilteredFlightRoutes(mapSvg, flightData);
  });
});

function drawHeatmap(data) {
  // Filter the data to extract relevant fields for the heatmap
  const processedData = d3.rollups(
    data,
    (v) => v.length,
    (d) => d.code_name, // Airline
    (d) => +d.departure_time.split(":")[0] // Hour of the day
  );

  const heatmapData = processedData.flatMap(([airline, hours]) =>
    Array.from(hours, ([hour, count]) => ({ airline, hour, count }))
  );

  const airlines = [...new Set(data.map((d) => d.code_name))];
  const hours = d3.range(0, 24);

  // Set dimensions
  const margin = { top: 50, right: 30, bottom: 50, left: 100 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select("#heatmap")
    .html("") // Clear previous heatmap
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Scales
  const xScale = d3.scaleBand().domain(hours).range([0, width]).padding(0.05);
  const yScale = d3
    .scaleBand()
    .domain(airlines)
    .range([0, height])
    .padding(0.05);

  const maxCount = d3.max(heatmapData, (d) => d.count);
  const colorScale = d3
    .scaleSequential(d3.interpolateBlues)
    .domain([0, maxCount]);

  // Tooltip
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("opacity", 0)
    .style("background", "#fff")
    .style("border", "1px solid #ccc")
    .style("padding", "10px")
    .style("box-shadow", "0px 0px 6px rgba(0,0,0,0.1)")
    .style("border-radius", "4px");

  // Draw rectangles
  svg
    .selectAll("rect")
    .data(heatmapData)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.hour))
    .attr("y", (d) => yScale(d.airline))
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .style("fill", (d) => colorScale(d.count || 0))
    .style("stroke", "none")
    .on("mouseover", function (event, d) {
      tooltip.transition().duration(200).style("opacity", 1);
      tooltip
        .html(
          `<strong>Airline:</strong> ${d.airline}<br>
          <strong>Hour:</strong> ${d.hour}<br>
          <strong>Flights:</strong> ${d.count}`
        )
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY - 10}px`);
      d3.select(this).style("stroke", "black").style("stroke-width", 2);
    })
    .on("mousemove", (event) => {
      tooltip
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY - 10}px`);
    })
    .on("mouseout", function () {
      tooltip.transition().duration(200).style("opacity", 0);
      d3.select(this).style("stroke", "none");
    });

  // Axes
  svg.append("g").call(d3.axisLeft(yScale));
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).tickFormat((d) => `${d}:00`));
}
