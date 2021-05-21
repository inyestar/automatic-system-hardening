function ajax(url, elem, callback) {
  var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        elem.innerHTML = makeTbody(this.responseText);
       }
       if(callback) {
         callback();
       }
     };

   xhttp.open("GET", '/cgi-bin/' + url, true);
   xhttp.send();
}

function makeTbody(text) {
  let lines = text.split('\n');
  let html = '';
  for(let i=0; i<lines.length; i++) {
    if(i===0 || lines[i].trim().length == 0) {
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

function printProcess(offset, callback) {
  let start = offset == 1? 1 : ((offset-1) * 15)+1;
  let end = start == 1? 15 : (start + 14)
  let tbody = document.getElementById('ps-result');

  ajax('ps.sh?start='+ start +'&end=' + end, tbody, callback);
}

function makePaging(text) {
  let count = text.split('\n')[0];
  let max = Math.ceil(count/15);
  let nav = document.getElementById('pagination');
  let html = '<ul class="pagination-list">';
  for(let i=1; i<=max; i++) {
    html += '<li>';
    html += '<a class="pagination-link" aria-label="Goto page ';
    html += i;
    html += '" aria-current="page">';
    html += i;
    html += '</a></li>';
  }

  html += '</ul>';
  nav.innerHTML = html;
}
