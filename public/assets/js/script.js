var select1 = $(".select1");
var input = $(".input");
var stocks = $(".stocks");
var continue1 = $(".continue1")
var stockList = [];
var prompt2 = $(".prompt2");
var fromDate = $(".fromDate");
var toDate = $(".toDate");
var resultVar = [];
var resultVar2 = []
var dateSum;
var userChoice = "AAPL";

$(".passwordBtn").on("click", function() {
  if ($(".passwordHere").val() === "spidre") {
    $(".entryPage").hide();
    $(".page1").show();
  }
})

  var getNotes = function() {
    return $.ajax({
      url: "/api/notes",
      method: "GET"
    });
  };
// BASIC MENU INTERACTIONS, APPEND STUFF ON PAGE WHEN IT'S INPUTTED

select1.on("click", function() {
  
  $(stocks).append("<li>" +input.val() + "</li>");
  stockList.push(input.val());
  input.val("");

  

});

// WHEN YOU CLICK CONTINUE MAKE THE STOCK INPUT FIELD GO AWAY
//MAKES THE DATE INPUT FIELD SHOW UP

  continue1.on("click", function(){
      $(".page1").hide();
      $(".page2").show();
      console.log(stockList);
      // if (stockList.length = 1) {
      //   call();
      // }
      // if (stockList.length = 2) {
      //   call();
      //   call2();
      // }
      if(stockList.length < 2) {
          prompt2.append("You have selected" + stockList[0]);
          call()
      }
      else if(stockList.length < 3) {
          prompt2.append("You have selected " + stockList[0] + " and " + stockList[1]);
        call();
        call2()
          // this is causing the problem
      }
      else if(stockList.length < 4) {
          prompt2.append("What data would you like to compare for " + stockList[0] + ", " + stockList[1] + " and " + stockList[2] + "? (Choose 1)");
      }
      else if(stockList.length < 5) {
          prompt2.append("What data would you like to compare for " + stockList[0] + ", " + stockList[1] + ", " + stockList[2] + " and " + stockList[3] + "? (Choose 1)");
      };
      // //run API calls on continue
     
  })

  function call() {
    var api_url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockList[0]}&outputsize=full&apikey=`;
    var key = "YILUS7VUESIJVTGK";
    $.ajax({
      url: api_url + key,
      contentType: "application/json",
      dataType: "json",
      success: function(result) {
        resultVar.push(result);
        console.log(resultVar);
      }
      
    });
};


function call2() {
  var api_url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockList[1]}&outputsize=full&apikey=`;
  var key = "YILUS7VUESIJVTGK";
  $.ajax({
    url: api_url + key,
    contentType: "application/json",
    dataType: "json",
    success: function(result2) {
      resultVar2.push(result2);
      console.log(resultVar2);
    }
    
  });
};



fromDate.on("click", function() {
  fromDate.val("");
});
toDate.on("click", function() {
  toDate.val("");
});

// function printData() {
//   console.log("hello")
// }

var yAxis = []
var xAxis = []

//LOOP THRU ENTIRE API CALL STARTING AT INPUT DATE 

function dateGrab () {
  //
  var retrievalObject = (resultVar[0]["Time Series (Daily)"]);
  var pullArray = Object.entries(retrievalObject);
  let dateAverage = Math.floor(dateSum/10);
  pullArray.reverse()
  console.log(dateAverage)
  console.log(pullArray);
  // LOOP THRU ENTIRE API CALL 
  for (let i = 0; i < pullArray.length; i++) {
    // LOOP STARTING AT FIRST DATA INPUT
    if(pullArray[i][0] === fromDate.val()) {
      // IF J LESS THAN THE SUM OF ALL DATES ADD BY THE AVERAGE
console.log(pullArray[i][0])
console.log(dateAverage)
      //if j is less than the sum of all dates, increase by the average (which would be the increment value)
      for (let j = 0; j < dateSum;  j+=dateAverage) {
         i += dateAverage

          //this pushes the opening into an array. can tweak this for any key/value we need
          yAxis.push(pullArray[i-dateAverage][1]["1. open"]);
          xAxis.push(pullArray[i-dateAverage][0]);
          if(yAxis.length > 10) {
          yAxis.pop();
          xAxis.pop()
        }
        //   this is where all of the chart creation goes, along with many other conditionals
      }
      // THIS IS IT ^^^^ DO NOT LOSE THIS
    }
  }

var yAxis2 = [];


  var retrievalObject2 = (resultVar2[0]["Time Series (Daily)"]);
  var pullArray2 = Object.entries(retrievalObject2);
  // let dateAverage = Math.floor(dateSum/10);
  pullArray2.reverse()
  // console.log(dateAverage2)
  console.log(pullArray2);
  // LOOP THRU ENTIRE API CALL 
  for (let i = 0; i < pullArray2.length; i++) {
    // LOOP STARTING AT FIRST DATA INPUT
    if(pullArray2[i][0] === fromDate.val()) {
      // IF J LESS THAN THE SUM OF ALL DATES ADD BY THE AVERAGE
console.log(pullArray2[i][0])
console.log(dateAverage)
      //if j is less than the sum of all dates, increase by the average (which would be the increment value)
      for (let j = 0; j < dateSum;  j+=dateAverage) {
         i += dateAverage

          //this pushes the opening into an array. can tweak this for any key/value we need
          yAxis2.push(pullArray2[i-dateAverage][1]["1. open"]);
          if(yAxis2.length > 10) {
          yAxis2.pop();
        }
        //   this is where all of the chart creation goes, along with many other conditionals
      }
      // THIS IS IT ^^^^ DO NOT LOSE THIS
    }
  }


{  //
  


  console.log(yAxis)
  console.log(xAxis)


  



  // CHART INFO

          var ctx = document.getElementById("myChart").getContext("2d");
          var seriesTest = [];
          var myChart = new Chart(ctx, {
            type: "line",
            data: {
              labels: xAxis,
              datasets: [
                {
                  label: `${stockList[0]} Opening from ${fromDate.val()} to ${toDate.val()}`,
                  data: yAxis,
     
                  borderColor: "purple",
                  borderWidth: 1
                },
                {
                  
                  label: `${stockList[1]} Opening from ${fromDate.val()} to ${toDate.val()}`,
                  data: yAxis2,
                  
                  borderColor: "green",
                  borderWidth: 1
                }
              ]
            },
            options: {
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: false
                    }
                  }
                ]
              }
            }
          });
    

        }
}

      $(".continue2").on("click", () => {
        console.log("hello");
        var fromDateMmnt = moment(fromDate.val(), "YYYY-MM-DD");
        console.log(fromDate.val());
        var toDateMmnt = moment(toDate.val(), "YYYY-MM-DD");
        console.log(toDate.val())
        dateSum = toDateMmnt.diff(fromDateMmnt, "days");
        console.log(dateSum);
        $(".page2").hide();
        $(".chart-container").show();

       dateGrab ()
        // dateGrab2()
      })
        
    // SLIDING ANIMATION IF NECESSARY  
        // (function() {
          
        //   var windowH = $(window).height(),
        //   documElem = $(document),
        //   slideDownPage = $('.slide-down-page'),
        //   content = $('.content'),
        //   btns = $('.btn'),
        //   animSpeed = 500;
          
        //   slideDownPage.css({
        //     height: windowH + 'px',
        //     top: -windowH + 'px'
        //   });
          
        //   btns.on('click', function(e) {
        //     if ( $(this).hasClass('open') ) {
        //       slideDownPage.animate({'top': 0}, animSpeed);
        //       content.animate({'margin-top': windowH + 'px'}, animSpeed);
        //       $('.chart-container').removeClass('hide')
        //     }
        //     else {
        //       slideDownPage.animate({'top': -windowH + 'px'}, animSpeed);
        //       content.animate({'margin-top': 0}, animSpeed);
        //     }
        //     e.preventDefault();
        //   });     
          
          
        // })
      
                 
                    
// THIS IS SCROLLING STUFF IF WE CAN INCORPORATE INTO INPUT FIELDS

        // documElem.on('scroll', function() {
          //     if ( $(this).scrollTop() > slideDownPage.height() && slideDownPage.css('top') === '0px' ) {
            //         slideDownPage.css('top', -windowH + 'px');
            //         content.css('margin-top', 0);
            //         documElem.scrollTop(0);
            //     }
            // });
        
            // $(document).ready(function() {
            //   var api_url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${userChoice}&outputsize=full&apikey=`;
            //   var key = "YILUS7VUESIJVTGK";
            //   $.ajax({
            //     url: api_url + key,
            //     contentType: "application/json",
            //     dataType: "json",
            //     success: function(result) {
            //       console.log(result);
            //     }
            //   });
            // });



              //TAKE DATE INPUTS AND GRAB CORRESPONDING DATA FROM API CALL

  // $(".continue2").on("click", () => {

  // })
    
  
  // API CALL TEST FOR DIGITAL CURRENCY 
  // "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency."
  // $(document).ready(function() {
    //   var api_url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=CNY&apikey=`;
    //   var key = "YILUS7VUESIJVTGK";
    //   $.ajax({
      //     url: api_url + key,
      //     contentType: "application/json",
      //     dataType: "json",
      //     success: function(result) {
        //       let days = [];
        
        //       var searchTearm = [""]
        //       for (key in result["Time Series (Digital Currency Daily)"]) {
          //           console.log(key)
          //         days.push(key);
          //       }
          

