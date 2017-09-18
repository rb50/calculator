window.onload = function() {

  // create arrays including all buttons except special characters AC CE and =
  var computeArrayNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];
  var computeArrayOperators = ['+', '/', '-', '*'];

  //set up array to hold the calculation that needs to be done
  var currentStatus = [];

  //create callbacks for all buttons in the array. Invoke immediately
  (function createCallbacks(computeArrayNumbers) {
    for (var i = 0; i < computeArrayNumbers.length; i++) {
      document.getElementById(computeArrayNumbers[i]).addEventListener('click', createCall, false);
    }
  }
  (computeArrayNumbers));

  (function createCallbacks(computeArrayOperators) {
    for (var i = 0; i < computeArrayOperators.length; i++) {
      document.getElementById(computeArrayOperators[i]).addEventListener('click', createCall, false);
    }
  }
  (computeArrayOperators));

  //function that adds to the calculation array, and makes the button which was clicked appear on screen
  function createCall(e) {
    currentStatus.push(e.srcElement.id);
    var source = e.srcElement.id;
    if(source === '*') {
      document.getElementById('display').innerHTML = "x";
    } else if(source === '/') {
      document.getElementById('display').innerHTML = String.fromCharCode(247);
    } else {
      document.getElementById('display').innerHTML = e.srcElement.id;
    }
  }


  //create callback for AC button
  document.getElementById('AC').addEventListener('click', ac, false);

  function ac(e) {
    currentStatus = [];
    document.getElementById('display').innerHTML = '0';
  }

  //create callback for CE button
  document.getElementById('CE').addEventListener('click', ce, false);

  function ce(e) {
    currentStatus.pop();
    document.getElementById('display').innerHTML = '0';
  }

  //create callback for equals button
  var result;
  document.getElementById('=').addEventListener('click', equals, false);

  function equals(e) {
    function checkLast(arr) {
      for (var i = 0; i < computeArrayOperators.length; i++) {
        if(computeArrayOperators[i] === arr[arr.length - 1]) {
          arr.pop();
          checkLast(arr);
        }
      }
    }

    //function checks for duplicate operators pressed, keeps only the last in each case
    function checkOperatorDuplicates(arr) {
      var types = [];
      for (var i = 0; i < arr.length; i++) {
        var tracker = false;
        for (var j = 0; j < computeArrayOperators.length; j++) {
          if(arr[i] === computeArrayOperators[j]){
            tracker = true;
          }
        }
        if (tracker === true) {
            types.push('operator');
        } else {
          types.push('number');
        }
      }

      for (var k = 0; k < types.length; k++) {
        if(types[k] === 'operator') {
          if(types[k+1] === 'operator') {
            delete arr[k];
          }
        }
      }
    }

    checkLast(currentStatus);
    checkOperatorDuplicates(currentStatus);
    var sum = currentStatus.join("");
    result = (eval(sum)).toString();
    document.getElementById('display').innerHTML = result;
    currentStatus = [result];
  }
}
