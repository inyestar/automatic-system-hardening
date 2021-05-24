var _common = {};

// ajax
_common.ajax = function (url, elem, callback) {
  var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        elem.innerHTML = makeTbody(this.responseText);
       }
       if(callback) {
         callback(this.responseText);
       }
     };

   xhttp.open("GET", '/cgi-bin/' + url, true);
   xhttp.send();
}

_common.bindEvent = function(id, type, event) {
  let dom = document.getElementById(id);
  if(!dom) {
    return;
  }
  dom.addEventListener(type, event);
}

var _dash = {};

// 페이지 초기화
_dash.init = function() {

  _common.bindEvent('btn-process', 'click', _dash.printProcess);
  _dash.printProcess(1, _dash._drawPaging);

}


_dash.printProcess = function (offset, callback) {
  let start = offset == 1? 1 : ((offset-1) * 15)+1;
  let end = start == 1? 15 : (start + 14)
  let tbody = document.getElementById('ps-result');

  ajax('ps.sh?start='+ start +'&end=' + end, tbody, callback);
}

_dash.drawTable = function (text) {
  let lines = text.split('\n');
  let html = '';
  for(let i=0; i<lines.length; i++) {
    if(i===1 || lines[i].trim().length == 0) {
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

_dash._drawPaging = function (text) {
  let firstline = text.split('\n')[1];
  let count = firstline ? firstline.split('=')[1] : 1;
  let max = Math.ceil(count/15);
  console.log(count)
  console.log(max)
  let nav = document.getElementById('pagination');
  let html = '<ul class="pagination-list">';
  for(let i=1; i<=max; i++) {
    html += '<li>';
    html += '<a class="pagination-link';
    if(i===1) {
       html += ' is-current';
    }
    html += '" aria-label="Goto page ';
    html += i;
    html += '" aria-current="page">';
    html += i;
    html += '</a></li>';
  }

  html += '</ul>';
  nav.innerHTML = html;
}
