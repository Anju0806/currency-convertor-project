$(function () {
    $("#convert-tab").click(function () {
        $("#convert-tab").addClass("is-active");
        $("#charts-tab").removeClass("is-active");
    });
    displayCurrencyButtons();
    $("#convertbtn").click(function () {
        let amount = $("#amount-ta").val();
        let fromCountry = $("#dropdown1").val();
        let toCountry = $("#dropdown2").val();
        if (isNaN(amount)) {
            $("#text-error-value").html("<strong>Please enter a valid amount</strong>");
            return;
        }
        else if(!amount){
            amount=1;
        }
        //getConvertdata(amount, fromCountry, toCountry);
        addLocal(fromCountry,toCountry);
    });
    function displayCurrencyButtons() {
        const currencyList = JSON.parse(localStorage.getItem('currencyList')) || [];
        currencyList.forEach(({ from, to }) => {
          const button = $('<button>').text(`${from} to ${to}`).click(() => {
            //$("#dropdown1").val(from);
            //$("#dropdown2").val(to);
            getConvertdata(1,from,to);
          });
          $('#button-container').append(button);
        });
      }      

    function addLocal(fromCountry, toCountry) {
        let currencyList = [];
        if (localStorage.getItem("currencyList")) {
          currencyList = JSON.parse(localStorage.getItem("currencyList"));
        }
        currencyList.push({ from: fromCountry, to: toCountry });
        localStorage.setItem("currencyList", JSON.stringify(currencyList));
      }
      

    function getConvertdata(amount, fromCountry, toCountry) {
        $("#text-error-value").html("");
        let myHeaders = new Headers();
        myHeaders.append("apikey", "ReKdzFAIwiuiMvUgxXgvSlqztSlMlDUc");
        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };
        const url = `https://api.apilayer.com/exchangerates_data/convert?to=${toCountry}&from=${fromCountry}&amount=${amount}`;
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                const convertedAmount = result.result;
                const rate = result.info.rate;
                const currenttimestamp = result.info.timestamp;
                const dateObj = new Date(currenttimestamp * 1000); // Create a new Date object from the Unix timestamp

                /*  $("#outputarea").text(amount+" "+fromCountry+" = "+convertedAmount+" "+toCountry); */
                $("#outputarea").html("<br>" + "<strong>" + amount + " " + fromCountry + " = " + convertedAmount + " " + toCountry + "</strong>");
                $("#outputarea").append("<br>" + " 1 " + fromCountry + " = " + rate + " " + toCountry);
                $("#datehere").html("<br>" + " Last updated on " + dateObj);
            })
            .catch(error => console.log('error', error));
    }
});
