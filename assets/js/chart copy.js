$(function () {
  //const CHARTS_TAB_FLAG = 'chartsTabActive';
  $("#charts-tab").click(function () {
    // find out the height of convert section and set height of chart section to be the same
    $('#chart-section').height(800)
    $("#charts-tab").addClass("is-active");
    $("#convert-tab").removeClass("is-active");
    $("#convert-section").addClass('is-hidden');
    $("#chart-section").removeClass('is-hidden');
    //to make same the selection in dropdowns(convert section and chart section)
    let fromCountry = $("#dropdown1").val();
    let toCountry = $("#dropdown2").val();
    addToDropdowns(fromCountry, toCountry)
  });
  //display chart button click event
  $("#chartbtn").click(function () {
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
  //toggle arrow click event
  $("#arrow-icon1").click(function () {
    let fromCountry = $("#dropdown3").val();
    let toCountry = $("#dropdown4").val();
    addToDropdowns(toCountry, fromCountry);
  });
  //bulma loader show and hide functions
  function showLoader() {
    $("#progress1").removeClass('is-hidden');
    $("#progress1").after('<div class="loader-space"></div>');
  }
  function hideLoader() {
    $("#progress1").addClass('is-hidden');
    $(".loader-space").remove(); // Remove the loader space element
  }
  //show and disable functions for convert button while data is retrieved from API.
  function disableConvertButton() {
    $("#convertbtn").prop("disabled", true);
  }
  function activateConvertButton() {
    $("#convertbtn").prop("disabled", false);
  }
  //to display chart
 
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
    disableConvertButton();
    fetch(`https://api.apilayer.com/exchangerates_data/timeseries?start_date=${start_date}&end_date=${currentDate}&base=${fromCountry}&symbols=${toCountry}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        hideLoader();
        activateConvertButton();
        const data = Object.entries(result.rates).map(([date, rates]) => ({ time: date, value: rates[toCountry] }));
        if (chart) {
          // Remove the previously created chart
          chart.remove();
        }
        chart = LightweightCharts.createChart($("#chart-section")[0],{ width: 700, height: 400 });
        const lineSeries = chart.addLineSeries();
        lineSeries.setData(data);
        chart.timeScale().fitContent();
        // Add a space after the chart
        $("#chart-section").after('<div class="chart-space"></div>'); 
      })

      .catch(error => console.log('error', error));
  }
  // Add a media query to rotate the arrow icon
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  function handleMediaQuery(event) {
    if (event.matches) {
      $("#arrow-icon").addClass('rotate');
     $("#chart-section").css({ width: "200px", height: "300px" });
     $("#chart-section").height(300); // Adjust the chart section height for smaller screens
    } else {
      $("#arrow-icon").removeClass('rotate');
      $("#chart-section").css({ width: "800px", height: "400px" });
      $("#chart-section").height(620); // Adjust the chart section height for larger screens

    }
  }

  mediaQuery.addListener(handleMediaQuery);
  handleMediaQuery(mediaQuery);

});


/* monday evening code sam version */
$(function () {
  let chart;
  //const CHARTS_TAB_FLAG = 'chartsTabActive';
  $("#charts-tab").click(function () {
    // find out the height of convert section and set height of chart section to be the same
    $('#chart-section').height(800)
    $("#charts-tab").addClass("is-active");
    $("#convert-tab").removeClass("is-active");
    $("#convert-section").addClass('is-hidden');
    $("#chart-section").removeClass('is-hidden');
    //to make same the selection in dropdowns(convert section and chart section)
    let fromCountry = $("#dropdown1").val();
    let toCountry = $("#dropdown2").val();
    addToDropdowns(fromCountry, toCountry)
  });
  function createChart(){
    const dimension = {
      width: 600,
      height: 400,
    }
    if($(window).width() < 768){
      dimension.width = 250;
      dimension.height = 200;
    }
    return  LightweightCharts.createChart($("#chart_area")[0], dimension);
  }
  //display chart button click event
  $("#chartbtn").click(function () {
    chart = createChart()
    let fromCountry = $("#dropdown3").val();
    let toCountry = $("#dropdown4").val();
    displayChart(fromCountry, toCountry,chart);
  });
  function addToDropdowns(fromCountry, toCountry) {
    $("#dropdown3").val(fromCountry);
    $("#dropdown4").val(toCountry);
    $("#dropdown3").trigger('change');
    $("#dropdown4").trigger('change');
  }
  //toggle arrow click event
  $("#arrow-icon1").click(function () {
    let fromCountry = $("#dropdown3").val();
    let toCountry = $("#dropdown4").val();
    addToDropdowns(toCountry, fromCountry);
  });
  //bulma loader show and hide functions
  function showLoader() {
    $("#progress1").removeClass('is-hidden');
    $("#progress1").after('<div class="loader-space"></div>');
  }
  function hideLoader() {
    $("#progress1").addClass('is-hidden');
    $(".loader-space").remove(); // Remove the loader space element
  }
  //show and disable functions for convert button while data is retrieved from API.
  function disableChartButton() {
    $("#chartbtn").prop("disabled", true);
  }
  function activateChartButton() {
    $("#chartbtn").prop("disabled", false);
  }
  //to display chart
  //let chart = null;
    function displayChart(fromCountry, toCountry,chart) {
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
       /*  if (chart) {
          // Remove the previously created chart
          console.log(chart);
          chart.resetData();
        }else{
          // should create a new chart here
          chart = createChart();
        } */

        if(chart){
          chart.remove();
          $('#chart_area').empty();
        }
        chart = createChart();
        const lineSeries = chart.addLineSeries();
        lineSeries.setData(data);
        chart.timeScale().fitContent();
        // Add a space after the chart
        $("#chart_area").after('<div class="chart-space"></div>');
      })
      .catch(error => console.log('error', error));
  }
  // Add a media query to rotate the arrow icon
  const mediaQuery = window.matchMedia('(max-width: 768px)');
    // Add a media query to handle responsiveness
  function handleMediaQuery(event) {
    if (event.matches) {
      $("#arrow-icon").addClass('rotate');
      $("#chart_area").css({ width: "200px", height: "300px" });
      // Apply responsive styles for smaller screens
      $("#chart_area").height(300); // Adjust the chart section height for smaller screens
      if (chart) {
        // Update the chart dimensions for smaller screens
        chart.resize(200, 300);
      }
    } else {
      $("#arrow-icon").removeClass('rotate');
      $("#chart_area").css({ width: "800px", height: "400px" });
      // Apply default styles for larger screens
      $("#chart_area").height(620); // Adjust the chart section height for larger screens
      if (chart) {
        // Update the chart dimensions for larger screens
        chart.resize(800, 400);
      }
    }
  }
  // mediaQuery.addListener(handleMediaQuery);
  // handleMediaQuery(mediaQuery);
});










