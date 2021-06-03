var _common = {};

// ajax
_common.ajax = function (url, callback) {
  var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if(callback) {
          callback(this.responseText);
        }
       }
     };

   xhttp.open("GET", '/cgi/' + url, true);
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
  _dash.printProcess(1);
  _dash.printMemory();

}

_dash.printProcess = function (offset) {
  offset = offset || 1;
  let start = offset == 1? 1 : ((offset-1) * 15)+1;
  let end = start == 1? 15 : (start + 14);
  _common.ajax('ps.sh?start='+ start +'&end=' + end, _dash.drawTable);
}

_dash.drawTable = function (text, canceled) {
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

  let tbody = document.getElementById('ps-result');
  tbody.innerHTML = html;
  if(!canceled) {
      _dash._drawPaging(text);
  }
}

_dash._drawPaging = function (text) {
  let firstline = text.split('\n')[1];
  let count = firstline ? firstline.split('=')[1] : 1;
  let max = Math.ceil(count/15);
  let nav = document.getElementById('pagination');
  let ul = document.createElement('ul');
  ul.classList.add('pagination-list');
  for(let i=1; i<=max; i++) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.classList.add('pagination-link');
    a.addEventListener('click', _dash.getProcess, false);
    a.onclik = _dash.printProcess(i);
    if(i===1){
        a.classList.add('is-current');
    }
    a.appendChild(document.createTextNode(i));
    li.appendChild(a);
    ul.appendChild(li);
  }

  nav.appendChild(ul);
}

_dash.getProcess = function(this) {
  console.log(this);
}

_dash.printMemory = function() {
  _common.ajax('free.sh', _dash.drawMemTable);
}

_dash.drawMemTable = function(text) {
  let lines = text.split(',');
  let html = '<tr>';
  for(let i in lines) {
    if(i < 7) {
      continue;
    }
    if(i == 14) {
       html += '</tr><tr>';
    }
    html += '<td>';
    html += lines[i].replace(':', '');
    html += '</td>';
  }
  html += '</tr>';

  let tbody = document.getElementById('free-result');
  tbody.innerHTML = html;
}
