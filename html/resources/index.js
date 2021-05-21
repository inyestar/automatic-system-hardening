function ajax(url, elem) {
  var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //elem.innerHTML = this.responseText;
        beuatify(text);
       }
     };

   xhttp.open("GET", '/cgi-bin/' + url, true);
   xhttp.send();
}

function mock(url, elem) {
  let result = ""

  console.log(result)
}

function beuatify(text) {
    console.log(test)
}

function printProcess() {
  let tbody = document.getElementById('ps-result');
  mock('ps.sh', tbody);
}
