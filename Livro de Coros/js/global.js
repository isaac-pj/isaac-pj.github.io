var currentScreen = "";
var vw = window.innerWidth/100;
var vh = window.innerHeight/100;
var songs = new Songs();

function init(){

  $(".side-nav").ready(function(){
    $(".side-nav").css("width",screen.width-$(".app-bar").outerHeight()+"px");
    var hide = "-"+$(".side-nav").css("width");
    $(".side-nav").css("left", hide);
  });

  listMusics();
  setCurrentScreen("start-screen");

}

function setCurrentScreen(name){
  currentScreen = "#"+name;
}

function changeScreens(s){

  $(currentScreen).removeClass("active");
  $("#"+s).addClass("active");
  setCurrentScreen(s);

}

function changeTabs(event){

  $(".tab, .container.active .fragment-container").removeClass("active");

  $(parseID(event.target.id)).addClass("active");
  $(".fragment-container[rel="+event.target.id+"]").addClass("active");
}

function parseID(str){
  return "#"+str;
}

function listMusics(){
  for(var i in songs.list){

    var node = $('<li id="'+songs.list[i].ID+'" class="list-item"></li>').html("");
    var number = $('<div class="number"></div>').html("<strong>"+songs.list[i].numero+"</strong>");
    var div = $('<div></div>').html("");
    var title = $('<span class="title"></span></br>').html(songs.list[i].titulo);

    var tags = function(){
      var str = "";
      var qtd = 0;
      for (var j in songs.list[i].tags) {
        if(qtd < 3){
          str += songs.list[i].tags[j];
          qtd++;
          if(qtd < 3){
            str += ", "
          }
        }else{
          str += "..."
          return str;
        }
      }
      return str;
    }

    var subtitle = $('<span class="subtitle"></span>').html("["+tags()+"]");

    $(div).append(title);
    $(div).append(subtitle);
    $(node).append(number);
    $(node).append(div);

    $("#start-screen ul.list").append(node);

  }
}

function openMusic(){

  if(event.target.id != ""){
    var obj = songs.list[event.target.id];
  }
  else {
    var temp = $(event.target).closest(".list-item");
    var obj = songs.list[temp[0].id];
  }

  $("#music-screen .app-bar strong").html(obj.numero);
  $("#music-screen .app-bar span").html(obj.titulo);
  $("#music-screen .fragment-container p").html(obj.letra);

}

function openNav(){
  $(".scrim").css("visibility","visible");
  $(".side-nav").css("left","0");
  $(".scrim").css("background-color","rgba(0, 0, 0, 0.3)");

}

function closeNav(){
  $(".scrim").css("background-color","rgba(0, 0, 0, 0.0)");
  var hide = "-"+$(".side-nav").css("width");
  $(".side-nav").css("left", hide);
  $(".scrim").css("visibility","hidden");
  // $(".side-nav").css("left","0");
}

$(document).ready(function(){

  //inicializar
  init();

  //mudar tela
  $(".tab").click(function(){
    changeTabs(event);
  });

  //abrir musica
  $("#start-screen .list-item").click(function(){
    openMusic();
    changeScreens("music-screen");
  });

  $(".nav-icon").click(function(){
    openNav();
  });

  $(".scrim").click(function(){
    closeNav();
  });

  $(".side-nav .list-item").click(function(){
    $(".side-nav .list-item").removeClass("active");

    $(event.target).addClass("active");
    // changeScreens("music-screen");
  });

});



// var fotosIDs = new Array;
// var fotoAtual;
// var qtdPasta = {};

// window.location.href = "html/music.html";

// function allowDrop(ev) {
//     ev.preventDefault();
// }
// function drag(ev) {
//     // ev.dataTransfer.setData("text", ev.target.id);
//     ev.dataTransfer.setData("text", ev.target.id);
// }
// function drop(ev, lixeira) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("text");
//     var lixo = document.getElementById(data);
//     var material = lixo.className;
//
//     if (material.indexOf(lixeira.id) > -1) {
//       showFlexElem("modal_acertou");
//       // ev.target.parentElement.appendChild(document.getElementById(data));
//       ev.target.appendChild(document.getElementById(data));
//       document.getElementById(data).style.display='none'
//       if(lixeira.id == "comum"){
//         //window.setTimeout('funcao()', intervalo_em_milisegundos);
//         var moscas = document.getElementById("moscas");
//         moscas.volume = 0.0;
//         moscas.play();
//         var intervalo = setInterval(function(){
//           if(moscas.volume < 1){
//             moscas.volume += 0.2;
//           }
//           else{
//             clearInterval(intervalo);
//           }
//         }, 5000);
//         // $("#lixeiraComum").attr("src","img/moscas.gif");
//         $( "#lixeiraComum" ).unbind("mouseover","mouseout");
//
//         $("#lixeiraComum").hover(
//         function(){
//           $(this).attr("src","img/moscas-hover.gif");
//         },
//         function(){
//           $(this).attr("src","img/moscas.gif");
//         });
//
//         // $("#lixeiraComum").removeClass("vazia");
//         // $("#lixeiraComum").addClass("cheia");
//       }
//     }
//     else{
//       showFlexElem("modal_errou");
//     }
// }
//
// function showElem(id){
//   var x = document.getElementById(id);
//   x.style.display='block';
// }
// function showFlexElem(id){
//   var x = document.getElementById(id);
//   x.style.display='flex';
// }
// function hideElem(id){
//   var x = document.getElementById(id);
//   x.style.display='none';
// }
//
// function fecharModal(id){
//   if(event.target.id == id){
//     hideElem(id);
//   }
// }
//
// function abrirFoto(){
//   var imagem = document.getElementById("imagem");
//   imagem.src = event.target.src;
//   showFlexElem('img_modal');
//   fotoAtual = event.target.id;
// }
// function fotoAnterior(){
//     if(parseInt(fotoAtual) > 0){
//       imagem.src = fotos[parseInt(fotoAtual)-1].src;
//       fotoAtual = parseInt(fotoAtual)-1;
//     }
// }
// function proximaFoto(){
//   if(parseInt(fotoAtual) < fotos.length-1){
//     imagem.src = fotos[parseInt(fotoAtual)+1].src;
//     fotoAtual = parseInt(fotoAtual)+1;
//   }
// }
//
// // reordenar fotos
// function ordenarFotos(){
//   fotosIDs = fotosIDs.reverse();
//   var j = fotos.length-1;
//   var metade = fotos.length;
//   if(metade%2 != 0){
//     metade--;
//   }
//   metade = metade/2;
//   for(var i = 0; i < metade; i++){
//     var temp = fotos[i].src;
//     fotos[i].src = fotos[fotosIDs[i]].src;
//     fotos[j].src = temp;
//     j--;
//   }
//   fotosIDs = fotosIDs.reverse();
// }
//
// function exibirPastas(){
// //   document.getElementById('galeria').className = 'galeria_p';
// //   var fotos = document.getElementsByClassName('imgs');
// //   var pastas = new Array;
// //
// //   function addFotos(qtdImgs, pastaDestino){
// //     // var temp = document.getElementsByName(pastaDestino);
// //     var pasta = document.getElementById('galeria');
// //     // pasta.innerHTML = null;
// //     for(var i = 0; i < qtdImgs.length; i++){
// //       qtdImgs[i].style.display = 'flex';
// //       pasta.appendChild(qtdImgs[i]);
// //     }
// //   }
// //   function contarPastas(){
// //     for(var i = 0; i<fotos.length; i++){
// //       var existe = false;
// //       fotos[i].style.display = 'none';
// //       for(var j = 0; j<pastas.length; j++){
// //         if(fotos[i].name == pastas[j]){
// //             existe = true;
// //             // qtdPasta[fotos[i].name] += 1;
// //         }
// //       }
// //       if(existe == false){
// //         pastas.push(fotos[i].name);
// //         // qtdPasta[fotos[i].name] = 1;
// //         qtdPasta[fotos[i].name] = document.getElementsByName(fotos[i].name);
// //       }
// //     }
// //   }
// //   function printarPastas(){
// //     //printar pastas
// //     // document.getElementById('galeria').innerHTML = null;
// //     for(var i = 0; i < pastas.length; i++){
// //       var pasta = document.createElement("a");
// //       var img = document.createElement("img");
// //       var nome = document.createElement("span");
// //       var text_nome = document.createTextNode(pastas[i]);
// //
// //       pasta.className = "pasta";
// //       pasta.id = pastas[i];
// //       img.src = 'img/folder.png'
// //
// //       pasta.onclick = function(){
// //         var nomePasta = event.target.parentElement.id;
// //         console.log(qtdPasta[nomePasta], nomePasta);
// //         addFotos(qtdPasta[nomePasta], nomePasta);
// //       };
// //
// //       nome.appendChild(text_nome);
// //       pasta.appendChild(img);
// //       pasta.appendChild(nome);
// //
// //       document.getElementById('galeria').appendChild(pasta);
// //     }
// //   }
// //
// //   contarPastas();
// //   printarPastas();
// }
//
// function parallax(){
//
//   var tam_galeria = $("#galeria").outerHeight()-(100*vh);
//   var tam_bg = $("#telaGaleria").css("background-size");
//
//   var offSetY = (300*vh)/tam_galeria;
//
//   $('div.bgParallax').data('speed', offSetY);
//   // $obj.data('speed',$("#galeria").height());
//
//   	$(window).scroll(function() {
//   		// var yPos = -($(window).scrollTop() * $obj.data('speed'));
//
//       //capturando o ponto atual de scrollTop e multiplicando pelo data speed
//       var yPos = -($(window).scrollTop() * $("#telaGaleria").data('speed'));
//       //formatando a variavel que quarda a nova posição
//       var bgpos = '0 '+ yPos + 'px';
//       //setando a posição
//   		$('#telaGaleria').css('background-position', bgpos );
//   	});
// }
//
// function tooltipIn(){
//   var top = parseInt($("#caixa").css("top"));
//   var left = parseInt($("#caixa").css("left"));
//   var img = $('<img class="tooltip" src="img/ballom.png"></img>').html("");
//
//   $("#caixa").after(img);
//   $(".tooltip").css({
//                     top: top-120+"px",
//                     left: left+10+"px"
//                   }).fadeIn();
// }
//
// function tooltipOut(){
//   $(".tooltip").fadeOut().remove(700);
// }
//
// // abir e fechar fotos
// var fotos = document.getElementsByClassName('img');
// for(var i = 0; i < fotos.length;  i++){
//   fotosIDs.push(fotos[i].id);
//   fotos[i].addEventListener("click", abrirFoto);
// }
//
// var img_modal = document.getElementById('img_modal');
// img_modal.onclick = function (){
//     fecharModal('img_modal');
// }
//
// var btnGrid = document.getElementById('btnGrid');
// btnGrid.onclick = function (){
//     hideElem('img_modal');
// }
//
// // foto anterior e proxima
//
// var btnPreview = document.getElementById('btnPreview');
// btnPreview.onclick = fotoAnterior;
//
// var btnNext = document.getElementById('btnNext');
// btnNext.onclick = proximaFoto;
//
// var btnOrdenar = document.getElementById('btnOrdenar');
// btnOrdenar.onclick = ordenarFotos;
//
// var btnFolder= document.getElementById('btnFolder');
// btnFolder.onclick = exibirPastas;
// // Nav Drawer
// $("#navDrawer").click(function(){
//   $("#bgHmenu").fadeIn(100);
//   $("#hmenu").show(300);
// });
//
// $("#bgHmenu, .btn_navDrawer a, .hmenu div a img").click(function(){
//   if(event.target !== this)
//     return;
//   $("#hmenu").hide(300);
//   $("#bgHmenu").fadeOut(100);
// });
// //mudar tela
// $('.btn_navDrawer, .divertilix').click(function(){
//   if(event.target.id == tela)return;
//   $(this.id).css("display","flex");
//   $(this.id).fadeTo(400,1.0);
//   // $(this.id).fadeIn(0, function () {
//   //   $(this).fadeTo(400,1);
//   // });
//   $(tela).hide(0);
//   $(tela).css("opacity","0.0");
//   tela = this.id;
// });
//
// $('.intro').click(function(){
//   document.getElementById("ambient").play();
//   $('.intro').css("animation-play-state","running");
//   setTimeout(function(){
//     $('.intro').css("top","-300vh");
//     $('span.start').css("display","none");
//     $('#navDrawer').fadeIn(500);
//     // modal lipe
//     $("#modal_lipe").fadeIn();
//     $("#modal_lipe").css("display","flex");
//   }, 12850);
//   setTimeout(function(){
//     // $('#passaros').play();
//     document.getElementById("passaros").play();
//   }, 7000);
// });
//
// $("#btn-mudo").click(function(){
//   var muted = document.getElementById("ambient").defaultMuted;
//
//   if(document.getElementById("ambient").muted == true){
//     document.getElementById("ambient").muted = false;
//   }
//   else{
//     document.getElementById("ambient").muted= true;
//   }
//
//   muted = document.getElementById("passaros").defaultMuted;
//
//   if(document.getElementById("passaros").muted == true){
//     document.getElementById("passaros").muted = false;
//   }
//   else{
//     document.getElementById("passaros").muted= true;
//   }
//
// });
//
// $("#btn04").click(function(){
//   $("#modal_lipe").remove();
// });
//
// $(window).resize(function(){
//   parallax();
// });
//
// // mouseOvers
// $("#escola").mouseover(function(){
//   $(this).attr("src","img/escola-hover.png");
// });
// $("#escola").mouseout(function(){
//   $(this).attr("src","img/escola.png");
// });
// $("#desktop").mouseover(function(){
//   $(this).attr("src","img/desktop-hover.png");
// });
// $("#desktop").mouseout(function(){
//   $(this).attr("src","img/desktop.png");
// });
// $("#porta").mouseover(function(){
//   $(this).attr("src","img/porta-escola-open.png");
// });
// $("#porta").mouseout(function(){
//   $(this).attr("src","img/porta-escola.png");
// });
//
// // hovers
// $("#caixa").hover(tooltipIn, tooltipOut);
//
// // $(".vazia").hover(
// // function(){
// //   $(this).attr("src","img/lixeiraComum-aberta.png");
// // },
// // function(){
// //   $(this).attr("src","img/lixeiraComum.png");
// // });
// //
// //
// // $(".cheia").hover(
// // function(){
// //   $(this).attr("src","img/lixeiraComum-aberta.png");
// // },
// // function(){
// //   $(this).attr("src","img/moscas.gif");
// // });
//
// $("#lixeiraComum").hover(
// function(){
//   $(this).attr("src","img/lixeiraComum-aberta.png");
// },
// function(){
//   $(this).attr("src","img/lixeiraComum.png");
// });
//
// //clicks
// $("#lixeiraComum").click(function(){
//   showFlexElem("modal_remover");
// });
// $("#escola").click(function(){
//   $("#telaEscola").css("display","flex");
//   $("#telaEscola").fadeTo(400,1.0);
//   $(tela).hide(0);
//   $(tela).css("opacity","0.0");
//   tela = "#telaEscola";
// });
// $("#desktop").click(function(){
//   $("#telaVideos").css("display","flex");
//   $("#telaVideos").fadeTo(400,1.0);
//   $(tela).hide(0);
//   $(tela).css("opacity","0.0");
//   tela = "#telaVideos";
// });
// $("#atividades, *[rel=telaGaleria]").click(function(){
//   $("#telaGaleria").css("display","flex");
//   $("#telaGaleria").fadeTo(400,1.0);
//   $(tela).hide(0);
//   $(tela).css("opacity","0.0");
//   tela = "#telaGaleria";
//   parallax();
// });
// $("#console").click(function(){
//   $("#telaJogo").css("display","flex");
//   $("#telaJogo").fadeTo(400,1.0);
//   $(tela).hide(0);
//   $(tela).css("opacity","0.0");
//   tela = "#telaJogo";
// });
// $("#porta").click(function(){
//   $("#telaDivertilix").css("display","flex");
//   $("#telaDivertilix").fadeTo(400,1.0);
//   $(tela).hide(0);
//   $(tela).css("opacity","0.0");
//   tela = "#telaDivertilix";
// });
// $(".loja-menu p.op1").click(function(){
//   if($(this).hasClass("select")){
//     $(this).toggleClass("select", false);
//     $(".loja-menu p.op2").toggleClass("select", true);
//   }
//
//   $(".loja-menu p").removeClass("active");
//   $(this).addClass("active");
//
//   $( ".inventario-grade" ).css( "display", "block" );
//   $( ".loja-grade" ).css( "display", "none" );
//
// });
// $(".loja-menu p.op2").click(function(){
//   if($(this).hasClass("select")){
//     $(this).toggleClass("select", false);
//     $(".loja-menu p.op1").toggleClass("select", true);
//   }
//
//   $(".loja-menu p").removeClass("active");
//   $(this).addClass("active");
//
//   $( ".inventario-grade" ).css( "display", "none" );
//   $( ".loja-grade" ).css( "display", "block" );
//
// });
// $("#btn-entrar").click(function(){
//   showFlexElem("modal_entrar");
// });
//
// //clicks btn
// $("#btn01").click(function(){
//   $("#modal_acertou").fadeOut(function(){
//     $("#telaVideos").css("display","flex");
//     $("#telaVideos").fadeTo(400,1.0);
//     $(tela).hide(0);
//     $(tela).css("opacity","0.0");
//     tela = "#telaVideos";
//   });
// });
// $("#btn02").click(function(){
//   $("#modal_acertou").fadeOut(function(){
//   });
// });
// $("#btn03").click(function(){
//   $("#modal_errou").fadeOut(function(){
//   });
// });
