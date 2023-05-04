# Currency-Convertor
Simple tool to check currency exchange rate

//To discuss with Sam

$(function () {
  //const CHARTS_TAB_FLAG = 'chartsTabActive';
  $("#charts-tab").click(function () {

    // find out the height of convert section
    const convertSectionHeight = $("#convert-section").height();
    
    // set height of chart section to be the same
    $('#chart-section').height(convertSectionHeight)


    $("#charts-tab").addClass("is-active");
    $("#convert-tab").removeClass("is-active");
    $("#convert-section").addClass('is-hidden');
    $("#chart-section").removeClass('is-hidden');
    //to make same the selection in dropdowns(convert section and chart section)
    let fromCountry = $("#dropdown1").val();
    let toCountry = $("#dropdown2").val();
    $("#dropdown3").val(fromCountry);
    $("#dropdown4").val(toCountry);
    $("#dropdown3").trigger('change');
    $("#dropdown4").trigger('change');
  });
  //display chart button click event
  $("#chartbtn").click(function () {
    let fromCountry = $("#dropdown3").val();
    let toCountry = $("#dropdown4").val();
    displaychart(fromCountry,toCountry);
  });
  //toggle arrow click event
  $("#arrow-icon1").click(function () {
    let fromCountry = $("#dropdown3").val();
    let toCountry = $("#dropdown4").val();
    $("#dropdown3").val(toCountry);
    $("#dropdown4").val(fromCountry);
    $("#dropdown3").trigger('change');
    $("#dropdown4").trigger('change');
});
//call api and add chart
let chartDisplayed = false;
function displaychart(fromCountry,toCountry){
   // Check if chart has already been displayed
   if (chartDisplayed) {
    return;
  }
  const start_date = "2022-09-01";
  const currentDate = new Date().toISOString().slice(0, 10);
  let myHeaders = new Headers();
  myHeaders.append("apikey", "UhycKQHfsiHc8t8pGS0Sh4U49r0C7Kct");
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
      headers: myHeaders
  };
  
  //get exchange rate change %

  fetch(`https://api.apilayer.com/exchangerates_data/timeseries?start_date=${start_date}&end_date=${currentDate}&base=${fromCountry}&symbols=${toCountry}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    const data = Object.entries(result.rates).map(([date, rates]) => ({ time: date, value: rates[toCountry] }));
    const chart = LightweightCharts.createChart($("#chart-section")[0]);
    const lineSeries = chart.addLineSeries();
    const chartProperties ={
      width:500,
      height:200,
      timescale:{
        timeVisible:true,
        secondVisible:false,
      }
    }
   
    lineSeries.setData([]);
    //lineSeries.setData(ch);
    lineSeries.setData(data);
    chart.timeScale().fitContent();

       // Set chartDisplayed flag to true
    chartDisplayed = true;
  })
  .catch(error => console.log('error', error));
  }
  // Set previousRate to the latest rate
  previousRate = data[data.length - 1].value;
  });
  