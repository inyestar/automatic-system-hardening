
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
  _dash.printProcess(1, true);
  _dash.printMemory();
  _dash.printCpu();
  _dash.printDisk();

}

_dash.printProcess = function (offset, init) {
  offset = offset || 1;
  let start = offset == 1? 1 : ((offset-1) * 15)+1;
  let end = start == 1? 15 : (start + 14);
  _common.ajax('ps.sh?start='+ start +'&end=' + end + (init? '&init=true' : ''), _dash.drawTable);
}

_dash.drawTable = function (text, stop) {
  let lines = text.split('\n');
  let html = '';
  for(let i=0; i<lines.length; i++) {
    if(lines[i].indexOf('count') > -1 || lines[i].trim().length == 0) {
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
  if(stop) {
     return;
  }
  _dash._drawPaging(text);
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
    if(i===1){
        a.classList.add('is-current');
    }
    a.appendChild(document.createTextNode(i));
    li.appendChild(a);
    ul.appendChild(li);
  }

  nav.appendChild(ul);
}

_dash.getProcess = function(event) {
  let target = event.target;
  let offset = target.text;
  target.parentNode.parentNode.querySelector('.is-current').classList.remove('is-current');
  target.classList.add('is-current');
  _dash.printProcess(offset, false);
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

_dash.printCpu = function() {
  _common.ajax('top.sh', _dash.drawCpuTable);
}

_dash.drawCpuTable = function(text) {
  let lines = text.replaceAll('\n','').split(',');
  let html = '<tr>';
  for(let i in lines) {  
    html += '<td>';
    html += lines[i].indexOf('%') > -1 ? lines[i].replace('%','') : lines[i].slice(0, lines[i].length-2);
    html += '</td>';
  }
  html += '</tr>';

  let tbody = document.getElementById('top-result');
  tbody.innerHTML = html;
}

_dash.printDisk = function() {
  _common.ajax('df.sh', _dash.drawDiskTable);
}

_dash.drawDiskTable = function(text) {
  let lines = text.split('\n');
  let html = '';
  for(let i=0; i<lines.length; i++) {
    if(lines[i].trim().length == 0) {
      continue;
    }
    html += '<tr>';
    let columns = lines[i].split(',');
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

  let tbody = document.getElementById('df-result');
  tbody.innerHTML = html;
}

