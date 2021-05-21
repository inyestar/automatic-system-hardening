function ajax(url, elem) {
  var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        elem.innerHTML = beautify(this.responseText);
       }
     };

   xhttp.open("GET", '/cgi-bin/' + url, true);
   xhttp.send();
}

function mock(url, elem) {
  let result = ""

  console.log(result)
}

function beautify(text) {
  let lines = text.split('\n');
  let html = '';
  for(let i=0; i<lines.length; i++) {
    if(lines[i].trim().length == 0) {
      continue;
    }
    html += '<tr>';
    let columns = lines[i].split(' ');
    for(let j=0; j<columns.length; j++) {
      if(j===7) {
         break;
      }
      html += '<td>';
      html += columns[j];
      html += '</td>';
    }
    html += '</tr>';
  }
 return html; 
}

function printProcess(start, end) {
  let tbody = document.getElementById('ps-result');
  ajax('ps.sh?start=' + start + '&end=' + end, tbody);
}
