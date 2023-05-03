$(function () {

  const CHARTS_TAB_FLAG = 'chartsTabActive';
  $("#charts-tab").click(function () {
    $("#charts-tab").addClass("is-active");
    $("#convert-tab").removeClass("is-active");
    $("#convert-section").addClass('is-hidden');
    $("#chart-section").removeClass('is-hidden');
    
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
  function displaychart(fromCountry,toCountry){
    const currentDate = new Date().toISOString().slice(0, 10);
    let myHeaders = new Headers();
    myHeaders.append("apikey", "ReKdzFAIwiuiMvUgxXgvSlqztSlMlDUc");

    let requestOptions = {
      method: 'GET',
      redirect: 'follow',
        headers: myHeaders
    };
    console.log(currentDate);
    //const url = `https://api.exchangeratesapi.io/v1/timeseries?start_date=2022-09-01&end_date=${currentDate}&base=${fromCountry}&symbols=${toCountry}`;
    fetch(`https://api.apilayer.com/exchangerates_data/timeseries?start_date=2022-09-01&end_date=${currentDate}&base=${fromCountry}&symbols=${toCountry}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
    })
    .catch(error => console.log('error', error));
}

});