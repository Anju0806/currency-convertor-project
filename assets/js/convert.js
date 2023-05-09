$(function () {

    //convert tab click event
    $("#convert-tab").click(function () {
        $("#convert-tab").addClass("is-active");
        $("#charts-tab").removeClass("is-active");
        $("#chart-section").addClass('is-hidden');
        $("#convert-section").removeClass('is-hidden');
    });

    //toggle arrow click event
    $("#arrow-icon").click(function () {
        let fromCountry = $("#dropdown1").val();
        let toCountry = $("#dropdown2").val();
        addToDropdowns(toCountry, fromCountry)
    });

    //convert button click event
    $("#convertbtn").click(function () {
        let amount = $("#amount-ta").val();
        let fromCountry = $("#dropdown1").val();
        let toCountry = $("#dropdown2").val();
        if (isNaN(amount)) {
            $("#text-error-value").html("<strong>Please enter a valid amount</strong>");
            return;
        }
        else if (!amount) {
            amount = 1;
        }
        getConvertdata(amount, fromCountry, toCountry);
    });

    //function calls
    displaySearches();
    displayPopular();

    
    //dispaly the popular conversions with the selected from country
    function displayPopular() {
        $('#menu-popular').empty();
        let fromCountry = $("#dropdown1").val();
        const tc = ["GBP", "INR", "NZD", "USD", "EUR", "AUD"];
        let count = 0; // keep track of number of items added
        tc.forEach((toCountry) => {
            if (fromCountry == toCountry || count >= 5) { // break loop when 5 items have been added
                return;
            }
            const link = $('<a>').attr('href', '#').click(() => {
                addToDropdowns(fromCountry, toCountry);
                getConvertdata(1, fromCountry, toCountry);
            }).text(`${fromCountry} to ${toCountry} `);
            const listItem = $('<li>').append($('<div>').addClass('box').append(link));
            $('#menu-popular').prepend(listItem);
            count++; // increment count after adding an item
        });
    }

    function addToDropdowns(fromCountry, toCountry) {
        $("#dropdown1").val(fromCountry);
        $("#dropdown2").val(toCountry);
        $("#dropdown1").trigger('change');
        $("#dropdown2").trigger('change');
    }

    //fetching local storage and adding click event to each search element
    function displaySearches() {
        $("#recent-searches").removeClass('is-hidden');
        const currencyList = JSON.parse(localStorage.getItem('currencyList')) || [];
        $('#menu-recent-searches').empty();

        currencyList.forEach(({ from, to }) => {
            const listItem = $('<li>');
            const link = $('<a>').attr('href', '#').click(() => {
                addToDropdowns(from, to);
                getConvertdata(1, from, to);
            }).text(`${from} to ${to}`);

            const clearBtn = $('<button>').attr('type', 'button').addClass('delete is-hidden').click(() => {
                removeLocal(from, to);
                listItem.remove();
            }).text('Clear');
            link.append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', clearBtn);
            link.on('mouseenter', () => {
                clearBtn.removeClass('is-hidden');
            });
            link.on('mouseleave', () => {
                clearBtn.addClass('is-hidden');
            });
            listItem.append($('<div>').addClass('box').append(link));
            $('#menu-recent-searches').prepend(listItem);
        });
    }

    //bulma loader show and hide functions
    function showLoader() {
        $("#progress").removeClass('is-hidden');
    }
    function hideLoader() {
        $("#progress").addClass('is-hidden');
    }
    //show and disable functions for convert button while data is retrieved from API.
    function disableConvertButton() {
        $("#convertbtn").prop("disabled", true);
    }
    function activateConvertButton() {
        $("#convertbtn").prop("disabled", false);
    }


    //adding fromcountry and tocountry to local storage
    function addLocal(fromCountry, toCountry) {
        let currencyList = [];
        const max_list = 5;
        if (localStorage.getItem("currencyList")) {
            currencyList = JSON.parse(localStorage.getItem("currencyList"));
        }
        // use currencyList.find() to find duplicates
        if (currencyList.find(item => item.from === fromCountry && item.to === toCountry)) {
            return;
        }
        currencyList.push({ from: fromCountry, to: toCountry });
        if (currencyList.length > max_list) {
            currencyList = currencyList.slice(-max_list);
        }
        localStorage.setItem("currencyList", JSON.stringify(currencyList));
    }

    //clear the selected item from local storage
    function removeLocal(fromCountry, toCountry) {
        let currencyList = JSON.parse(localStorage.getItem("currencyList")) || [];
        const index = currencyList.findIndex(item => item.from === fromCountry && item.to === toCountry);
        if (index !== -1) {
            currencyList.splice(index, 1);
            localStorage.setItem("currencyList", JSON.stringify(currencyList));
        }
    }

    //main function: call api and display current rates.
    function getConvertdata(amount, fromCountry, toCountry) {
        $("#text-error-value").html("");
        let myHeaders = new Headers();
        myHeaders.append("apikey", "zHB9VLonMAmAOeTMm2jCrcr9diIfCXH1");
        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };
        const url = `https://api.apilayer.com/exchangerates_data/convert?to=${toCountry}&from=${fromCountry}&amount=${amount}`;
        showLoader();
        disableConvertButton();
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                hideLoader();
                activateConvertButton();
                console.log(result);
                const convertedAmount = result.result;
                const rate = result.info.rate;
                const currenttimestamp = result.info.timestamp;
                const dateObj = new Date(currenttimestamp * 1000);
                $("#outputarea").html("<br>" + "<strong>" + amount + " " + fromCountry + " = " + convertedAmount + " " + toCountry + "</strong>");
                $("#outputarea").append("<br>" + " 1 " + fromCountry + " = " + rate + " " + toCountry);
                $("#datehere").html("<br>" + " Last updated on " + dateObj.toUTCString());
                addLocal(fromCountry, toCountry);
                displaySearches();
                displayPopular();
            })
            .catch(error => console.log('error', error));
    }

    // Add a media query to rotate the arrow icon
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleMediaQuery(event) {
        if (event.matches) {
            $("#arrow-icon").addClass('rotate');
        } else {
            $("#arrow-icon").removeClass('rotate');
        }
    }
    mediaQuery.addListener(handleMediaQuery);
//    handleMediaQuery(mediaQuery);

});