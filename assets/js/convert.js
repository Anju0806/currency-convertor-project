$(function () {
    $("#convert-tab").click(function () {
        $("#convert-tab").addClass("is-active");
        $("#charts-tab").removeClass("is-active");
    });
    $("#convertbtn").click(function () {
        let amount = $("#amount-ta").val();
        let fromCountry = $("#dropdown1").val();
        let toCountry = $("#dropdown2").val();
        /* $("#outputarea").html("<strong>New text goes here</strong>");  */
        if (!amount || isNaN(amount)) {
            $("#text-error-value").html("<strong>Please enter a valid amount</strong>");
            return;
        }
        getConvertdata(amount, fromCountry, toCountry);
    });

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
