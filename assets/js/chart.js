$(function() {
  $("#charts-tab").click(function() {
    $('#chart-section').height(620);
    $("#charts-tab").addClass("is-active");
    $("#convert-tab").removeClass("is-active");
    $("#convert-section").addClass('is-hidden');
    $("#chart-section").removeClass('is-hidden');

    let fromCountry = $("#dropdown1").val();
    let toCountry = $("#dropdown2").val();
    addToDropdowns(fromCountry, toCountry);
  });

  $("#chartbtn").click(function() {
    let fromCountry = $("#dropdown3").val();
    let toCountry = $("#dropdown4").val();
    displayChart(fromCountry, toCountry);
  });

  function addToDropdowns(fromCountry, toCountry) {
    $("#dropdown3").val(fromCountry);
    $("#dropdown4").val(toCountry);
    $("#dropdown3").trigger('change');
    $("#dropdown4").trigger('change');
  }

  $("#arrow-icon1").click(function() {
    let fromCountry = $("#dropdown3").val();
    let toCountry = $("#dropdown4").val();
    addToDropdowns(toCountry, fromCountry);
  });

  function showLoader() {
    $("#progress1").removeClass('is-hidden');
    $("#progress1").after('<div class="loader-space"></div>');
  }

  function hideLoader() {
    $("#progress1").addClass('is-hidden');
    $(".loader-space").remove();
  }

  function disableChartButton() {
    $("#chartbtn").prop("disabled", true);
  }

  function activateChartButton() {
    $("#chartbtn").prop("disabled", false);
  }

  let chart = null;
  function displayChart(fromCountry, toCountry) {
    const start_date = "2022-09-01";
    const currentDate = new Date().toISOString().slice(0, 10);
    let myHeaders = new Headers();
    myHeaders.append("apikey", "zHB9VLonMAmAOeTMm2jCrcr9diIfCXH1");
    let requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };
    showLoader();
    disableChartButton();
    fetch(`https://api.apilayer.com/exchangerates_data/timeseries?start_date=${start_date}&end_date=${currentDate}&base=${fromCountry}&symbols=${toCountry}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        hideLoader();
        activateChartButton();
        const data = Object.entries(result.rates).map(([date, rates]) => ({ time: date, value: rates[toCountry] }));

        d3.select("#chart_data")
          .select("svg")
          .remove();

        const margin = { top: 10, right: 10, bottom: 30, left: 30 };
        const width = $("#chart_data").width() - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        const svg = d3.select("#chart_data")
          .append("svg")
          .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3.scaleTime()
          .domain(d3.extent(data, d => new Date(d.time)))
          .range([0, width]);

        const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height, 0]);

      const line = d3.line()
        .x(d => xScale(new Date(d.time)))
        .y(d => yScale(d.value));

      svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

      svg.append("g")
        .call(d3.axisLeft(yScale));

      const mediaQuery = window.matchMedia('(max-width: 320px)');
      function handleMediaQuery(event) {
        if (event.matches) {
          $("#chart-section").height(300);
          svg.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);
        } else {
          $("#chart-section").height(620);
          svg.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);
        }
      }
      mediaQuery.addListener(handleMediaQuery);
      handleMediaQuery(mediaQuery);
    })
    .catch(error => console.log('error', error));
}

const mediaQuery = window.matchMedia('(max-width: 320px)');
function handleMediaQuery(event) {
  if (event.matches) {
    $("#chart-section").height(300);
    if (chart) {
      chart.resize(300, 200);
    }
  } else {
    $("#chart-section").height(620);
    if (chart) {
      chart.resize(600, 400);
    }
  }
}

mediaQuery.addListener(handleMediaQuery);
handleMediaQuery(mediaQuery);
});

