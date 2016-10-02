function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, lix) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (data+"_lix" == lix.id) {
      showFlexElem("modal_acertou");
      ev.target.appendChild(document.getElementById(data));
      document.getElementById(data).style.display='none';
    }
    else{
      alert("sorry! lixeira errada :(")
    }
}

function showElem(id){
  var x = document.getElementById(id);
  x.style.display='block';
}
function showFlexElem(id){
  var x = document.getElementById(id);
  x.style.display='flex';
}
function hideElem(id){
  var x = document.getElementById(id);
  x.style.display='none';
}
