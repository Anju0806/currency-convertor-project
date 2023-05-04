$(function () {

    //convert tab click event
    $("#convert-tab").click(function () {
        $("#convert-tab").addClass("is-active");
        $("#charts-tab").removeClass("is-active");
        $("#chart-section").addClass('is-hidden');
        $("#convert-section").removeClass('is-hidden');
    });
<<<<<<< HEAD

=======
    const icon = $('<i>').addClass('fas fa-plus');
    const icon1 = $('<i>').addClass('fas fa-plus');
    icon.addClass('pl-6');
    icon.addClass('pl-6');
    $('.box').append(icon);
    $('.box').append(icon1);
>>>>>>> 2c3ab86405eb36a404af7c354ec40054785ee06a

    //toggle arrow click event
    $("#arrow-icon").click(function () {
        let fromCountry = $("#dropdown1").val();
        let toCountry = $("#dropdown2").val();
        $("#dropdown1").val(toCountry);
        $("#dropdown2").val(fromCountry);
        $("#dropdown1").trigger('change');
        $("#dropdown2").trigger('change');
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
    displayPopularConversions();

    //dispaly the popular conversions with the selected from country
    function displayPopular() {
        $('#menu-popular').empty();
        let fromCountry = $("#dropdown1").val();
        const tc = ["EUR", "USD", "GBP", "AUD", "INR", "NZD", "SEK", "CAD"];
        tc.forEach((toCountry) => {
            if (fromCountry == toCountry) {
                return;
            }
            const link = $('<a>').attr('href', '#').click(() => {
                $("#dropdown1").val(fromCountry);
                $("#dropdown2").val(toCountry);
                $("#dropdown1").trigger('change');
                $("#dropdown2").trigger('change');
                getConvertdata(1, fromCountry, toCountry);
            }).text(`${fromCountry} to ${toCountry} `);
            const icon = $('<span>').addClass('icon').html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');
            link.append(icon);
             const listItem = $('<li>').append($('<div>').addClass('box').append(link));
            $('#menu-popular').prepend(listItem); 
        });
    }
    
    //fetching local storage and adding click event to each search element
    function displaySearches() {
        $("#recent-searches").removeClass("is-hidden");
        const currencyList = JSON.parse(localStorage.getItem("currencyList")) || [];
        $('#menu-recent-searches').empty();
      
        currencyList.forEach(({ from, to }) => {
<<<<<<< HEAD
          const link = $('<a>').attr('href', '#').click(() => {
            // TODO: optimize??
            $("#dropdown1").val(from);
            $("#dropdown2").val(to);
            $("#dropdown1").trigger('change');
            $("#dropdown2").trigger('change');
            getConvertdata(1, from, to);
          }).text(`${from} to ${to}`);
      
          const clearBtn = $('<button>').attr('type', 'button').addClass('delete is-small').click(() => {
            removeLocal(from, to);
            displaySearches();
          }).text('Delete');
      
          const listItem = $('<li>').addClass('is-flex is-hoverable').append(link, clearBtn);
          $('#menu-recent-searches').prepend(listItem);
=======
            const link = $('<a>').attr('href', '#').click(() => {
                // TODO: optimize??
                $("#dropdown1").val(from);
                $("#dropdown2").val(to);
                $("#dropdown1").trigger('change');
                $("#dropdown2").trigger('change');
                getConvertdata(1, from, to);
            }).text(`${from} to ${to}`);
            const icon = $('<span>').addClass('icon').html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');
            link.append(icon);
             /* const clearBtn = $('<button>').attr('type', 'button').addClass('delete is-hidden').click(() => {
                removeLocal(from, to);
                displaySearches();
            }).text('Clear');
            // Add mouseenter and mouseleave event listeners to show/hide the clear button
            link.on('mouseenter', () => {
                clearBtn.removeClass('is-hidden');
            });
            link.on('mouseleave', () => {
                clearBtn.addClass('is-hidden');
            }); */
            //const listItem = $('<li>').append($('<div>').addClass('box').append(clearBtn,link));
            const listItem = $('<li>').append($('<div>').addClass('box').append(link));
            $('#menu-recent-searches').prepend(listItem);
>>>>>>> 2c3ab86405eb36a404af7c354ec40054785ee06a
        });
      }
      
    

    //bulma loader show and hide functions
    function showLoader() {
        $("#progress").removeClass('is-hidden');
    }
    function hideLoader() {
        $("#progress").addClass('is-hidden');
    }

    //adding fromcountry and tocountry to local storage
    function addLocal(fromCountry, toCountry) {
        let currencyList = [];
        const max_list = 7;
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
        myHeaders.append("apikey", "ReKdzFAIwiuiMvUgxXgvSlqztSlMlDUc");
        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };
        const url = `https://api.apilayer.com/exchangerates_data/convert?to=${toCountry}&from=${fromCountry}&amount=${amount}`;
        showLoader();
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                hideLoader();
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
    handleMediaQuery(mediaQuery);

});