$(function () {
    $("#convert-tab").click(function () {
        $("#convert-tab").addClass("is-active");
        $("#charts-tab").removeClass("is-active");
    });
    
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
        getConvertdata(amount, fromCountry, toCountry);
        
    });
    
    function displaySearches() {
        const currencyList = JSON.parse(localStorage.getItem('currencyList')) || [];
      
        currencyList.forEach(({ from, to }) => {
          const link = $('<a>').attr('href', '#').click(() => {
            getConvertdata(1, from, to);
          }).text(`${from} to ${to}`);
      
          const listItem = $('<li>').append(link);
      
          $('#menu-container').append(listItem);
        });
      }
         

    function addLocal(fromCountry, toCountry) {
        let currencyList = [];
        const max_list=8;
        if (localStorage.getItem("currencyList")) {
          currencyList = JSON.parse(localStorage.getItem("currencyList"));
        }
        currencyList.push({ from: fromCountry, to: toCountry });
        if(currencyList.length>max_list){
            currencyList = currencyList.slice(-max_list);
        }
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
                $("#outputarea").html("<br>" + "<strong>" + amount + " " + fromCountry + " = " + convertedAmount + " " + toCountry + "</strong>");
                $("#outputarea").append("<br>" + " 1 " + fromCountry + " = " + rate + " " + toCountry);
                $("#datehere").html("<br>" + " Last updated on " + dateObj.toUTCString());
                addLocal(fromCountry,toCountry);
                displaySearches();
            })
            .catch(error => console.log('error', error));
    }
});
