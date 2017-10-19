window.onload = function() {

  "use strict";

  // create arrays including all buttons except special characters AC CE and =
  let computeArrayNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];
  let computeArrayOperators = ['+', '/', '-', '*'];

  //set up array to hold the calculation that needs to be done
  let currentStatus = [];

  //create callbacks for all buttons in the array. Invoke immediately
  (function createCallbacks(computeArrayNumbers) {
    for (let i = 0; i < computeArrayNumbers.length; i++) {
      document.getElementById(computeArrayNumbers[i]).addEventListener('click', createCall, false);
    }
  }
  (computeArrayNumbers));

  (function createCallbacks(computeArrayOperators) {
    for (let i = 0; i < computeArrayOperators.length; i++) {
      document.getElementById(computeArrayOperators[i]).addEventListener('click', createCall, false);
    }
  }
  (computeArrayOperators));

  //function that adds to the calculation array, and makes the button which was clicked appear on screen
  function createCall(e) {
    currentStatus.push(e.srcElement.id);
    let source = e.srcElement.id;

    if (isNaN(source) === false || source === ".") {

      console.log(numDisplay(currentStatus));
      document.getElementById('display').innerHTML = numDisplay(currentStatus);
    } else if(source === '*') {
      document.getElementById('display').innerHTML = "x";
    } else if(source === '/') {
      document.getElementById('display').innerHTML = String.fromCharCode(247);
    } else {
      document.getElementById('display').innerHTML = e.srcElement.id;
    }


    function numDisplay(currentStatus) {
      let counter = 0;
      for(let i = currentStatus.length - 1; i >= 0; i--) {
        if(isNaN(currentStatus[i]) === true && currentStatus[i] !== '.') {
          counter = i + 1;
          break;
        }
      }
      let result = "";
      for(let i = counter; i < currentStatus.length; i++) {
        result = "" + result + currentStatus[i];
      }

      return result;
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
      for (let i = 0; i < computeArrayOperators.length; i++) {
        if(computeArrayOperators[i] === arr[arr.length - 1]) {
          arr.pop();
          checkLast(arr);
        }
      }
    }



    //function checks for duplicate operators pressed, keeps only the last in each case
    function checkOperatorDuplicates(arr) {
      let types = [];
      for (let i = 0; i < arr.length; i++) {
        let tracker = false;
        for (let j = 0; j < computeArrayOperators.length; j++) {
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

      for (let k = 0; k < types.length; k++) {
        if(types[k] === 'operator') {
          if(types[k+1] === 'operator') {
            delete arr[k];
          }
        }
      }
    }

    checkLast(currentStatus);
    checkOperatorDuplicates(currentStatus);
    let sum = currentStatus.join("");
    result = (eval(sum)).toString();
    if(result === "Infinity") {
      result = "Error";
    }
    document.getElementById('display').innerHTML = result;
    currentStatus = [result];
  }
}
