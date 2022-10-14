// <!--calculation function-->

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

var pipsSlider = document.getElementById("investmentRange");

noUiSlider.create(pipsSlider, {
  start: [10000],
  connect: true,
  step: 10000,
  range: {
    min: 10000,
    max: 300000,
  },
  // pips: {mode: 'count', values: 5}
});

pipsSlider.noUiSlider.on("update", function (values, handle) {
  var investment_value = Math.floor(values[handle]);

  jQuery("#investment-total").html(formatMoney(investment_value, 0));
  jQuery("#label-investment").html(formatMoney(investment_value, 0));
  jQuery("#hd_investment").val(investment_value);
});

pipsSlider.noUiSlider.on("change", function (values, handle) {
  var tenure_value = Math.floor(values[handle]);

  var investmentTerm = jQuery("#hd_investmentTerm").val();

  getReturnVal(investmentTerm);
  $("#graph-chart").highcharts();
  highcharts();
  getReturnValInitial("quarter");
  getReturnValInitial("compounded");
  /* $('.right-sec ').fadeOut()
           $('.right-sec ').fadeIn()*/
  $("#your-investment").fadeOut(100).fadeIn(100);
  $("#term-investment").fadeOut(100).fadeIn(100);
});

//create the noUiSlider
var skipSlider = document.getElementById("yearRange");
noUiSlider.create(skipSlider, {
  range: {
    min: 1,
    "20%": 2,
    "40%": 3,
    "60%": 4,
    "80%": 5,
    max: 10,
  },
  snap: true,
  start: [15],
});

skipSlider.noUiSlider.on("update", function (values, handle) {
  var tenure_value = Math.floor(values[handle]);

  jQuery("#term-total").html(tenure_value + " Years");
  jQuery("#label-year").html(tenure_value + " Years");
  jQuery("#hd_tenure").val(tenure_value);

  loanYear = parseInt(tenure_value);
});

skipSlider.noUiSlider.on("change", function (values, handle) {
  var tenure_value = Math.round(values[handle]);

  var investmentTerm = jQuery("#hd_investmentTerm").val();
  getReturnVal(investmentTerm);
  highcharts();
  getReturnValInitial("quarter");
  getReturnValInitial("compounded");
  $("#your-investment").fadeOut(100).fadeIn(100);
  $("#term-investment").fadeOut(100).fadeIn(100);
});

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}

function getReturnVal(investmentTerm) {
  item = Math.floor(jQuery("#hd_tenure").val());
  slider_invest_amt = Math.floor(jQuery("#hd_investment").val());
  investment_amt = Math.floor(jQuery("#label-investment").val());

  var tenures = [1, 2, 3, 4, 5, 10];
  var quarterly_profit = [1, 2, 3, 4, 5, 10]; // quarterly profit %
  var compounding_profit = [1.1, 1.2, 1.3, 1.4, 1.5, 2]; // compounding profit %
  var slider_invest_amt = jQuery("#hd_investment").val(); // tenure-values
  var investment_amt = jQuery("#label-investment").val();

  var keyPosition = getKeyByValue(tenures, item);

  var quarter_profit = slider_invest_amt * 0.1 * quarterly_profit[keyPosition]; // stores each quarterly tenure profit into array
  var compounding_profit = slider_invest_amt * compounding_profit[keyPosition]; // stores each compounding values to array

  switch (investmentTerm) {
    case "quarter":
      jQuery(".ul-buttons li").removeClass("selected");
      jQuery(".quarter-btn").addClass("selected");

      jQuery("#hd_investmentTerm").val("quarter");
      jQuery("#return-value").html(formatMoney(quarter_profit, 0));

      break;
    case "compounded":
      jQuery(".ul-buttons li").removeClass("selected");
      jQuery(".compounded-btn").addClass("selected");
      jQuery("#hd_investmentTerm").val("compounded");
      jQuery("#return-value").html(formatMoney(compounding_profit, 0));

      break;
    case "":
      jQuery("#return-value").html(formatMoney(quarter_profit, 0));
      break;
  }

  //jQuery('#return-value').html( formatMoney(quarter_profit/1000,2) );
}

function getReturnValInitial(investmentTerm) {
  item = Math.floor(jQuery("#hd_tenure").val());
  slider_invest_amt = Math.floor(jQuery("#hd_investment").val());
  investment_amt = Math.floor(jQuery("#label-investment").val());

  var tenures = [1, 2, 3, 4, 5, 10];
  var quarterly_profit = [1, 2, 3, 4, 5, 10]; // quarterly profit %
  var compounding_profit = [1.1, 1.2, 1.3, 1.4, 1.5, 2]; // compounding profit %
  var slider_invest_amt = jQuery("#hd_investment").val(); // tenure-values
  var investment_amt = jQuery("#hd_investment");

  var keyPosition = getKeyByValue(tenures, item);

  var quarter_profit = slider_invest_amt * 0.1 * quarterly_profit[keyPosition]; // stores each quarterly tenure profit into array
  var compounding_profit = slider_invest_amt * compounding_profit[keyPosition]; // stores each compounding values to array

  switch (investmentTerm) {
    case "quarter":
      var moneyformat = formatMoney(quarter_profit, 0) + " AUD$";
      $("#quarterpayment_main").html(moneyformat);
      break;
    case "compounded":
      var moneyformat1 = formatMoney(compounding_profit, 0) + " AUD$";
      $("#compoundpayment_main").html(moneyformat1);
      break;
  }

  //jQuery('#return-value').html( formatMoney(quarter_profit/1000,2) );
}

function getWords(monthCount) {
  function getPlural(number, word) {
    return (number === 1 && word.one) || word.other;
  }

  var Years = {
      one: "Year",
      other: "Years",
    },
    years = {
      one: "Year",
      other: "Years",
    },
    m = monthCount % 12,
    y = Math.floor(monthCount / 12),
    result = [];

  y && result.push(y + " " + getPlural(y, years));
  m && result.push(m + " " + getPlural(m, months));
  return result.join(" and ");
}

$(document).ready(function () {
  pipsSlider.noUiSlider.set(340000);
  skipSlider.noUiSlider.set(24);
  console.log("test");
  $(".quarter-btn").trigger("click");
  getReturnValInitial("quarter");
  getReturnValInitial("compounded");
  highcharts();
});

function highcharts() {
  graphdatavalue1 = [];
  graphdatavalue2 = [];
  graphdatavalue3 = [];
  graphdatavalue4 = [];
  graphlabels = [];
  graphdatavalue1.push(parseFloat(0));
  graphdatavalue2.push(parseFloat(0));
  graphdatavalue3.push(parseFloat(0));
  graphdatavalue4.push(parseFloat(0));
  graphlabels.push("0 Years");
  var tenure = [15, 18, 24, 30, 36, 48]; // tenure-values
  var i = 0;
  tenure.forEach(function (item) {
    i++;

    var tenures = [1, 2, 3, 4, 5, 10];
    var quarterly_profit = [1, 2, 3, 4, 5, 10]; // quarterly profit %
    var compounding_profit = [1.1, 1.2, 1.3, 1.4, 1.5, 2]; // compounding profit %
    var slider_invest_amt = jQuery("#hd_investment").val(); // tenure-values
    var slider_input_tenure = jQuery("#hd_tenure").val(); // tenure-values
    slider_input_tenure = parseInt(slider_input_tenure);
    var investment_amt = jQuery("#label-investment").val();
    var keyPosition = getKeyByValue(tenures, item);
    var quarter_profit =
      slider_invest_amt * 0.1 * quarterly_profit[keyPosition]; // stores each quarterly tenure profit into array
    var compounding_profit =
      slider_invest_amt * compounding_profit[keyPosition]; // stores each compounding values to array
    var keyPosition_tenure = getKeyByValue(tenures, slider_input_tenure);
    var tenuremap = parseInt(keyPosition_tenure) + parseInt(1);
    if (i <= tenuremap) {
      graphdatavalue1.push(parseFloat(quarter_profit));
      graphdatavalue2.push(parseFloat(compounding_profit));
      var monthid = item + " Years";
      graphlabels.push(monthid);
    }
    /*graphdatavalue3.push(parseFloat(quarter_profit)) 
              graphdatavalue4.push(parseFloat(compounding_profit))  */
  });
  $("#graph-chart").highcharts({
    credits: {
      enabled: false,
    },
    chart: {
      type: "area",
      marginLeft: 60,
      marginRight: 0,
      spacingLeft: 0,
      spacingBottom: 20,
      backgroundColor: "#232734",
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      lineColor: "#232734",
      categories: graphlabels,
      labels: {
        style: {
          color: "#999999",
        },
        y: 35,
      },
      tickColor: "#eeeeee",
      tickmarkPlacement: "on",
    },
    yAxis: {
      gridLineColor: "#232734",
      title: {
        text: false,
      },
      min: 0,
      max: 800000,
      tickInterval: 50,
      labels: {
        enabled: false,
        style: {
          color: "#232734",
          fontSize: "9px",
        },
      },
      plotLines: [
        {
          value: 0,
          width: 1,
          color: "#808080",
        },
      ],
    },
    tooltip: {
      backgroundColor: "white",
      borderColor: null,
      borderWidth: null,
    },
    legend: {
      enabled: false,
      layout: "horizontal",
      align: "left",
      verticalAlign: "top",
      symbolHeight: 11,
      symbolWidth: 11,
      symbolPadding: 10,
      borderWidth: 0,
      y: -10,
      x: -15,
      padding: 15,
      itemDistance: 35,
      itemMarginTop: 10,
      itemMarginBottom: 5,
      itemStyle: {
        color: "#2D282A",
        fontSize: 12,
        fontWeight: "normal",
      },
    },
    plotOptions: {
      area: {
        lineWidth: 0.1,
        marker: {
          symbol: "circle",
        },
      },
      series: {
        fillOpacity: 0.5,
        //stickyTracking: false,
        states: {
          hover: {
            halo: {
              size: 8,
            },
          },
        },
      },
    },
    series: [
      {
        name: "QUARTER",
        data: graphdatavalue1,
        color: "#fff",
        marker: {
          height: 10,
          width: 10,
          symbol:
            "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/252775/graph-red.svg)",
        },
      },
      {
        name: "COMPOUNDED",
        data: graphdatavalue2,
        color: "#b3774a",
        marker: {
          height: 10,
          width: 10,
          symbol:
            "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/252775/graph-facebook.svg)",
        },
      },
    ],
  });
}

$(document).ready(function () {
  $(".slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    fade: true,
    asNavFor: ".slider-nav",
    autoplay: true,
    autoplaySpeed: 5000,
    focusOnSelect: false,
    pauseOnHover: false,
  });
});
$(document).ready(function () {
  $(".slider-nav").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    fade: true,
    dots: false,
    centerMode: true,
    focusOnSelect: false,
    pauseOnHover: false,
  });
});

$(document).ready(function () {
  $(".url").text($(location).attr("href"));
  $("#parsley-id-9").css("display", "none");
  $.getJSON("https://api.ipify.org/?format=json", function (e) {
    $(".ip").text(e.ip);
  });
});

function phonenumber_check() {
  console.log("tetsing");
  var str = $("#phone").val();
  console.log("phone value" + str);

  console.log("Is Numeric or not : " + $.isNumeric(str));
  var numvar = $.isNumeric(str);

  if (numvar) {
    console.log("The Value Entered is Numeric");
  } else {
    $("#phone").val("");
    console.log("The Value Entered is Not Numeric");
  }
}

function phonenumber_check_contact() {
  var str = $("#phonenum").val();
  console.log("phone value" + str);

  console.log("Is Numeric or not : " + $.isNumeric(str));
  var numvar = $.isNumeric(str);

  if (numvar) {
    console.log("The Value Entered is Numeric");
  } else {
    $("#phonenum").val("");
    console.log("The Value Entered is Not Numeric");
  }
}

(function ($) {
  $(function () {
    jQuery.ajax({
      url: "https://freegeoip.live/json/",
      type: "POST",
      dataType: "jsonp",
      success: function (location) {
        //console.log(location.country_code);
        $(".wpcf7-countrytext").countrySelect({
          defaultCountry: location.country_code.toLowerCase(),
        });
        $(".wpcf7-phonetext").intlTelInput({
          autoHideDialCode: false,
          autoPlaceholder: "off",
          nationalMode: false,
          separateDialCode: false,
          hiddenInput: "full_number",
          initialCountry: location.country_code.toLowerCase(),
        });
      },
    });
  });
})(jQuery);

var CaptchaCallback = function () {
  grecaptcha.render("logincaptchadiv", {
    sitekey: "6LdMVw8aAAAAALjuXZsIIo2mZvvkYTcODK42LSeO",
  });
  grecaptcha.render("signupcaptchadiv", {
    sitekey: "6LdMVw8aAAAAALjuXZsIIo2mZvvkYTcODK42LSeO",
  });
};

function contactform(formId) {
  if (
    $("#" + formId)
      .parsley()
      .validate()
  ) {
    var a = $("#" + formId).serialize();
    var gCaptchaResponse = grecaptcha.getResponse(0);
    var gCaptchaResponse2 = grecaptcha.getResponse(1);
    //leadsGEdata(a);
    console.log(a);
    if (formId == "banner_form") {
      if (gCaptchaResponse.length == 0) {
        alert("Please validate google recaptcha");
      } else {
        $.ajax({
          url: "ajax-mail.php",
          type: "POST",
          data: a,
          dataType: "text",
          success: function (data) {
            console.log("Top Form Bannaer" + data);
            //  $("#exampleModalCenter").modal('show');
            //  location.reload();
            window.location = "thankyou.php";
          },
        });
      }
    } else {
      if (gCaptchaResponse2.length == 0) {
        alert("Please validate google recaptcha");
      } else {
        $.ajax({
          url: "contact-form.php",
          type: "POST",
          data: a,
          dataType: "text",
          success: function (data) {
            console.log("Top Form Bannaer" + data);
            //  $("#exampleModalCenter").modal('show');
            //  location.reload();
            window.location = "thankyou.php";
          },
        });
      }
    }
  }
}

$(window).on("scroll", function () {
  var scroll = $(window).scrollTop();

  if (scroll >= 100) {
    $(".logo_div").addClass("darkHeader");
  } else {
    $(".logo_div").removeClass("darkHeader");
  }
});

setTimeout(function () {
  var ab = $(".country_field").val();
  $("#country_code").val(ab);
  $("#exampleModalCenter3").modal("show");
}, 6000);

var counted = 0;
$(window).scroll(function () {
  var oTop = $(".number_div").offset().top - window.innerHeight;
  if (counted == 0 && $(window).scrollTop() > oTop) {
    $(".stat-number").each(function () {
      var size = $(this).text().split(".")[1]
        ? $(this).text().split(".")[1].length
        : 0;
      $(this)
        .prop("Counter", 0)
        .animate(
          {
            Counter: $(this).text(),
          },
          {
            duration: 5000,
            step: function (func) {
              $(this).text(parseFloat(func).toFixed(size));
            },
          }
        );
    });
    counted = 1;
  }
});

$(document).ready(function () {
  $(".hamberger_menu").click(function () {
    $(".desk_nav").addClass("show");
  });
  $(".remove_menu, .desk_nav ul li a").click(function () {
    $(".desk_nav").removeClass("show");
  });
  $(".disc").click(function () {
    $("#exampleModalCenter2").modal("show");
  });
});

$(".owl-carousel").owlCarousel({
  loop: true,
  responsiveClass: true,
  autoHeight: true,
  autoplay: true,
  autoplayTimeout: 5000,
  responsive: {
    0: {
      items: 1,
      nav: true,
    },
    600: {
      items: 1,
      nav: false,
    },
    1000: {
      items: 1,
      nav: true,
    },
  },
});

$("a").click(function () {
  $("html, body").animate(
    {
      scrollTop: $($(this).attr("href")).offset().top - 80,
    },
    1000
  );
  return false;
});
