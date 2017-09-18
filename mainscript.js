window.onload = function() {

  // create array including all buttons except special characters AC CE and =
  var computeArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+', '/', '-', '*']

  //set up array to hold the calculation that needs to be done
  var currentStatus = [];

  //create callbacks for all buttons in the array. Invoke immediately
  (function createCallbacks(computeArray) {
    for (var i = 0; i < computeArray.length; i++) {
      document.getElementById(computeArray[i]).addEventListener('click', createCall, false);
    }
  }
  (computeArray));

  function createCall(e) {
    console.log('here');
    currentStatus.push(e.srcElement.id);
    document.getElementById('display').innerHTML = e.srcElement.id;
  }


  //create callback for AC button
  document.getElementById('AC').addEventListener('click', ac, false);

  function ac(e) {
    currentStatus = [];
    document.getElementById('display').innerHTML = '0';
  } 

  //create callback for equals button
  var result;
  document.getElementById('=').addEventListener('click', equals, false);

  function equals(e) {
    var sum = currentStatus.join("");
    result = (eval(sum)).toString();
    document.getElementById('display').innerHTML = result;
    currentStatus = [result];
  }

}
