var usuario;
var posts;
var ultimoPost = 0;
//classe post
this.Post = function(){
  this.nome = "sicrano de tal";
  this.texto = "tudo blz mesmo";
  this.d = Date();
}

// adicionando um novo post na pagina;
function addPost(n, d, t){
  var postNode = document.createElement("div");
  var nome = document.createElement("span");
  var text_nome = document.createTextNode(n);
  var data = document.createElement("span");
  var text_data = document.createTextNode(d);
  var texto = document.createElement("p");
  var text_texto = document.createTextNode(t);

  postNode.className = "boxPost";
  nome.className = "nome";
  data.className = "data";
  texto.className = "texto";

  nome.appendChild(text_nome);
  data.appendChild(text_data);
  texto.appendChild(text_texto);

  postNode.appendChild(nome);
  postNode.appendChild(data);
  postNode.appendChild(texto);

  if(n == usuario){
    postNode.className += " eu";
  }

  document.getElementsByClassName('conteudo')[0].appendChild(postNode);
}

function preparar(){
  function dataHora(){
      var d = new Date();
      var dia = d.getDate();
      var mes = 1+d.getMonth();
      var hora = d.getHours();
      var min = d.getMinutes()
      if(dia < 10){dia = "0"+dia;}
      if(mes < 10){mes = "0"+mes;}
      if(hora < 10){hora = "0"+hora;}
      if(min < 10){min = "0"+min;}
      var dataHoje = dia+"-"+mes+"-"+d.getFullYear()+" _ "+hora+":"+min;
      return dataHoje;
  }

  var post = new Post;
  post.nome = document.forms['newPost']['nome'].value;
  post.d = dataHora();
  post.texto = document.forms['newPost']['texto'].value;

  if(post.nome == "" || post.nome == null){
    post.nome = "Anonimo"
  }

  if(post.texto == "" || post.texto == null){
    alert("Erro! Por favor digite algo para postar");
  }
  else{
    var postagem = "nome="+post.nome+"&texto="+post.texto+"&data="+post.d;
    postar(postagem);
  }
}

// enviando dados para o servidor
function postar (post){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState==4 && this.status==200){
      // console.log(this.responseText);
      atualizar();
      document.getElementById('modal').style.display = 'none';
      document.forms['newPost']['texto'].value = "";
    }
  }
  xhttp.open("POST","http://rest.learncode.academy/api/LMS/post",true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(post);
}

// recebendo dados para o servidor
function atualizar (){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      // posts = this.response;
      posts = JSON.parse(this.response);
      // console.log('pronto');
      if(ultimoPost != 0 && posts.length > ultimoPost && posts[posts.length-1].nome != usuario){
          document.getElementById('alert').play();
      }
      for(var i = ultimoPost; i<posts.length;i++){
        addPost(posts[i].nome, posts[i].data, posts[i].texto);
        if(i == posts.length-1){
          ultimoPost = i+1;
        }
      }
    }
  };
  xhttp.open("GET", "http://rest.learncode.academy/api/LMS/post", true);
  xhttp.send();
}

document.getElementById('btnClose').onclick = function(){document.getElementById('modal').style.display = 'none'}
document.getElementById('btnPlus').onclick = function(){document.getElementById('modal').style.display = 'flex'}
document.getElementById('btnPostar').onclick = preparar;
document.getElementById('btnAtualizar').onclick = atualizar;
document.getElementById('btnSalvar').onclick = function(){document.getElementById('modalLogin').style.display = 'none';
                                                          usuario = document.forms['formLogin']['nome'].value;
                                                          document.forms['newPost']['nome'].value = usuario;
                                                          atualizar();
                                                          setInterval(function(){console.log('up'); atualizar();}, 5000);}
