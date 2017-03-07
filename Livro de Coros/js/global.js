var currentScreen = "";
var lastScreen = "";
var currentList = [];
var temp = {}
var vw = window.innerWidth/100;
var vh = window.innerHeight/100;
var songs = new Songs();

function init(){

  // iniciando o armazenamento localStorage
  if (!localStorage.getItem("musicLists")) {
    localStorage.setItem("musicLists","[]");
  }
  updateLists();


  $(".side-nav").ready(function(){
    $(".side-nav").css("width",screen.width-$(".app-bar").outerHeight()+"px");
    var hide = "-"+$(".side-nav").css("width");
    $(".side-nav").css("left", hide);
  });

  setCurrentScreen("book-screen");
  listMusics();
}

function setCurrentScreen(name, bool){
  if(!bool){
    lastScreen = currentScreen;
  }
  currentScreen = "#"+name;
  $(currentScreen).addClass("active");
}

function changeScreens(s, bool){
  $(currentScreen).removeClass("active");
  if(bool){
    setCurrentScreen(s, true);
  }else{
    setCurrentScreen(s);
  }
  $(currentScreen).addClass("active");

  if($(".side-nav .list-item[for='"+s+"']")[0]){
    $(".side-nav .list-item.active").removeClass("active");
    $($(".side-nav .list-item[for='"+s+"']")[0]).addClass("active");
  }
}

function backScreens(){
  $(currentScreen).removeClass("active");
  $(lastScreen).addClass("active");
  currentScreen = lastScreen;
}

function changeTabs(event){
  $(".tab, .container.active .fragment-container").removeClass("active");

  $(parseID(event.target.id)).addClass("active");
  $(".fragment-container[rel="+event.target.id+"]").addClass("active");
	  // * O metodo "index" me retorna um inteiro com base na posicação do elemento clicado
	  var tabreference = $(event.target).index();
	  // Efeito de deslizamento - 160px da largura do elemento x a posição do clique
	  var sliding = parseInt($(".slider").css("width")) * tabreference;
	  // A nova posição do slider será baseada no valor da var anterior
	  $(".slider").css({
	    left: sliding + "px"
	  });
}

function parseID(str){
  return "#"+str;
}

function rippleEffect (event) {
    $(document.querySelector('.ripple-effect')).remove();
    var element = event.target; /* Retorna o evento setado */

    var rect = element.getBoundingClientRect(); /* Retorna o tamanho do elemento e a posição do elemento */
    var ripple = $('.ripple-effect')[0]; /* Evento a ser executado na seleção - Class ".ripple-effect" */

    if (!ripple) { /* Retorna verdadeiro como o operando é falso. */
        ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        element.appendChild(ripple); /* Devolve a referência na nova posição do ripple */
        // $(element).append(ripple); /* Devolve a referência na nova posição do ripple */
    }

    $(ripple).removeClass("show") /* Removendo o ripple show */
    var top = event.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = event.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    // Retorna o height of an element in pixels, including padding, border and scrollbar
    $(ripple).css({"top":top+"px", "left":left+"px"});
    $(ripple).addClass("show") /* Add o ripple show depois de ter capturado as posições */

    // // 3 - Efeito Ripple button
    //    // Remove as ações anteriores do ripple
    //    $(".ripple-effect").remove();
    //  // Configurações
    //  // o metodo offset envia coordenadas dos elementos, neste caso as posições do clique
    //  var posX = $(this).offset().left,
    //      posY = $(this).offset().top,
    //      buttonWidth = $(this).width(),
    //      buttonHeight = $(this).height();
    //  // Add the element
    //  // o metodo prepend funciona como um "before" do CSS3
    //  $(this).prepend("<span class='ripple-effect'></span>");
    //  // Fazendo o efeito ficar dinâmico
    //  if (buttonWidth >= buttonHeight) {
    //    buttonHeight = buttonWidth;
    //  } else {
    //    buttonWidth = buttonHeight;
    //  }
    //  // Capturar o centro do elemento
    //  var x = e.pageX - posX - buttonWidth / 2;
    //  var y = e.pageY - posY - buttonHeight / 2;
    //  // Add os novos atribuidos ao efeito ripple
    //  $(".ripple-effect").css({
    //    width: buttonWidth,
    //    height: buttonHeight,
    //    top: y + 'px',
    //    left: x + 'px'
    //  }).addClass("ripple-effect");

    return false;
}

function listMusics(){
  // if($(".container.active .fragment-container.active .fab")[0]){
  //   $(".container.active .fragment-container.active").addClass("margin-fab");
  // }
  for(var i in songs.list){

    var node = $('<li id="'+songs.list[i].ID+'" class="list-item"></li>').html("");

    // if (songs.list[i].favorite = true) {
    //   var icon = $('<i class="icon left-ident material-icons active">favorite</i>').html("");
    // } else {
    //   var icon = $('<i class="icon left-ident material-icons">favorite</i>').html("");
    // }

    var icon = $('<i data-reply="false" class="icon left-ident material-icons favorite"></i>').html("favorite");
    var number = $('<strong class="number"></strong>').html(songs.list[i].numero+'.');
    var div = $('<div ></div>').html("");
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
    var check = $('<i data-reply="false" for="'+songs.list[i].ID+'" class="icon right-ident align-right material-icons check-box"></i>').html("check_box_outline_blank");

    $(div).append(title);
    $(div).append(subtitle);
    $(node).append(icon);
    $(node).append(number);
    $(node).append(div);
    $(node).append(check);

    $("#book-screen ul.list").append(node);

  }
}

function openMusic(id){

  // if(event.target.id != ""){
  //   var obj = songs.list[event.target.id];
  // }
  // else {
  //   var temp = $(event.target).closest(".list-item");
  //   var obj = songs.list[temp[0].id];
  // }

  $(".right-nav").css("left", "0");
  $(".right-nav").css("visibility", "visible");

  var obj = songs.list[id];

  $(".right-nav .app-bar strong").html(obj.numero);
  $(".right-nav .app-bar span").html(obj.titulo);
  $(".right-nav .fragment-container p").html(obj.letra);

}

function closeMusic(id){
  $(".right-nav").css("left", "100%");
  $(".right-nav").css("visibility", "hidden");
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

function clearCheckedBoxes(){
  $(".container .list-item .check-box").removeClass("selected");
  $(".container .list-item .check-box").html("check_box_outline_blank");
}

function startEditMode(){
  $(".container .list").addClass("edit-mode");
  $(".persitent-footer").addClass("active");
  $(".fragment-container.active .fab").addClass("float-up");
  $(".fragment-container.active").addClass("float-up");
}

function stopEditMode(){
  $(".container .list").removeClass("edit-mode");
  $(".persitent-footer").removeClass("active");
  $(".fragment-container.active .fab").removeClass("float-up");
  $(".fragment-container.active").removeClass("float-up");
  clearCheckedBoxes();
}

function openDialog(id){
  $(".container.active .scrim-dialog").css("visibility","visible");
  $(".container.active .scrim-dialog").css("background-color","rgba(0, 0, 0, 0.3)");
  $(".container.active #"+id+".dialog").addClass("active");
}

function closeDialog(){
  $(".dialog.active").removeClass("active");

  $(".scrim-dialog").css("background-color","rgba(0, 0, 0, 0.0)");
  $(".scrim-dialog").css("visibility","hidden");
}

function createList(){
  var list = $(".container .list-item .check-box.selected");
  if (list.length > 0) {
    currentList = [];
    for (var i = 0; i < list.length; i++) {
      currentList.push(parseInt($(list[i]).attr("for")));
    }
    // função abrir dialogo
    openDialog(0);
  }else {
    alert("No momento não é possivel criar uma lista vazia");
  }
}

function saveList(){

  if ($("#book-screen .fragment-container.active .dialog.active form #list-name").val() != "") {

    var lists = JSON.parse(localStorage.getItem("musicLists"));
    var list = {
      id:null,
      name:$(".dialog.active form #list-name").val(),
      musics:currentList
    }
    if(lists.length > 0){
      list.id = lists[lists.length-1].id + 1;
    }else{
      list.id = 0;
    }
    lists.push(list);
    localStorage.musicLists = JSON.stringify(lists);
    updateLists();

    $(".dialog.active form #list-name").val("");
    closeDialog();
    stopEditMode();

    // showSnackbar();
    alert("Lista "+name+" criada som sucesso! :D");

  }else{
    alert("Voçe precisa dar um nome");
  }
}

function updateLists(){
  // console.log(localStorage);
  $("#cards-screen .fragment-container.active .card").remove();
  var lists = JSON.parse(localStorage.musicLists);
  // console.log(lists);
  for (var i = 0; i < lists.length; i++) {
    var card = $('<div id="'+lists[i].id+'"class="card"><div>').html("");
    var header = $('<div class="primary-title optional-header"><div>').html("");
    var title = $('<span class="title"></span>').html(lists[i].name);
    var subtitle = $('<span class="subtitle">21 de Outubro</span>').html("21 de Outubro");

    var text = $('<div class="supporting-text"><div>').html("");
    var ul = $('<ul></ul>').html("");

    for(var j in lists[i].musics){
      $(ul).append($('<li></li>').html('<strong>'+songs.list[lists[i].musics[j]].numero+'</strong><span>'+songs.list[lists[i].musics[j]].titulo+'</span>'));
    }

    var actions = $('<div class="actions align-right"><div>').html("");
    var expand = $('<i class="align-left icon material-icons expand"></i>').html("keyboard_arrow_down");
    var del = $('<i class="icon material-icons delete"></i>').html("delete");
    var comment = $('<i class="icon material-icons comment"></i>').html("note");
    var share = $('<i class="icon material-icons share"></i>').html("share");

    $(header).append(title);
    $(header).append(subtitle);

    $(text).append(ul);

    $(actions).append(expand);
    $(actions).append(del);
    $(actions).append(comment);
    $(actions).append(share);

    $(card).append(header);
    $(card).append(text);
    $(card).append(actions);

    $("#cards-screen .fragment-container.active").prepend(card);

  }


  // var li = $('<li></li>').html("");
  // var strong = $('<strong></strong>').html("numero");

}

function openList(event) {
  var lists = JSON.parse(localStorage.musicLists);
  var card = event.currentTarget;
  temp["openedList"] = card.id;

  var name = $(card).find(".title").text();
  var date = $(card).find(".subtitle").text();
  var list = $(card).find(".supporting-text ul li");
  var comment = lists[card.id].comment;

  $("#list-screen .nav .title").text(name+" - "+date);

  $("#list-screen .expansion-panel .set-text .text-area").val(comment);
  // $(".expansion-panel .actions .flat-button.save").trigger("tap");
  if ($(".expansion-panel .set-text .text-area").val() != "") {
    $(".expansion-panel .set-text .text-area").text($(".expansion-panel .set-text .text-area").val());///o .val() está apenas dentro do input, já o .text() é um nó de texto real
    $(".expansion-panel .set-text .text-area").attr("readonly","");
    $(".expansion-panel").removeClass("edit-mode");
  }

  $("#list-screen .list.unchecked, #list-screen .list.checked").empty();

  for (var i = 0; i < list.length; i++){
    var number = $(list[i]).find("strong").text();
    var music = $(list[i]).find("span").text();

    var listItem = $('<li class="list-item"></li>').html("");
    var checkBox = $('<i class="icon left-ident material-icons check-box"></i>').html("check_box_outline_blank");
    var number = $('<strong class="number"></strong>').html(""+number);
    var title = $('<span class="title"></span>').html(""+music);
    var comments = $('<i class="icon right-ident align-right material-icons comments"></i>').html("insert_comment");

    $(listItem).append(checkBox);
    $(listItem).append(number);
    $(listItem).append(title);
    $(listItem).append(comments);

    $("#list-screen .list.unchecked").append(listItem);
  }
  changeScreens("list-screen");
}

function deleteList(event){
  var lists = JSON.parse(localStorage.musicLists);
    lists.splice(temp["deleteList"],1);
    for (var i = temp["deleteList"]; i < lists.length; i++) {
      lists[i].id--;
    }
  localStorage.musicLists = JSON.stringify(lists);
  closeDialog();
  updateLists();
}

function checkThis(element){
  $(element).toggleClass("selected");
  if($(element).hasClass("selected")){
      $(element).html("check_box");
  }else{
    $(element).html("check_box_outline_blank");
  }
}

function ajustHeight(element) {
  if ( !$(element).prop('scrollTop') ) {
    // console.log(!$(element).prop('scrollTop'));
    // console.log("scroll: "+$(element).prop('scrollTop'));

    // alert("entrei");
    do {
       var a = $(element).prop('scrollHeight');
      //  console.log("var a = "+a);
       var b = $(element).height();
      //  console.log("var b = "+b);

       $(element).height(b - 5);
      //  console.log("element height = "+ $(element).height());

      //  console.log("var a = "+a);
      //  console.log($(element).prop('scrollHeight'));
      //  console.log("\n");
    }
    while ( a && ( a != $(element).prop('scrollHeight') ) );
  };

  // console.log('saí do laço');
  // Mude o valor + 30 para qualquer um que desejar.
  $(element).height($(element).prop('scrollHeight'));
  // console.log('tamanho do elemento: '+$(element).height());
};

function startSearchMode(type){

  $("#book-screen").addClass("search-mode");
  $("#book-screen.search-mode .search-box .box")[0].focus();
  var list = $("#book-screen .fragment-container .list .list-item");

  $("#book-screen .search-box .box").focus(function(){
    //se o desempenho for ruim, usar .change() para a busca ao inves de .keyup()
    $("#book-screen .search-box .box").keyup(function(event){
      event.preventDefault();
      event.stopPropagation();
      $("#book-screen .search-box .close-search").removeClass("active");
      $("#book-screen .search-box .clear-search").addClass("active");
      $("#book-screen.search-mode.container .list-item").css("display","none");
      if ($(this).val() != ""){
        if (type == "number") {
          searchByNumber(parseInt($(this).val()));
        }else if (type == "title") {
          searchByTitle($(this).val());
        }
      }else{
        $("#book-screen .search-box .clear-search").removeClass("active");
        $("#book-screen .search-box .close-search").addClass("active");
      }
      // console.log(event.isPropagationStopped());
    });
  });

  $("#book-screen.search-mode .search-box .box").blur(function(){
      $("#book-screen.search-mode .search-box .box")[0].focus();
  });

  function searchByNumber(num){
    // console.log(num);
    if(num > 0 && num <= 303){
      // $("#book-screen.search-mode.container #"+(num-1)).css("display","inline-flex");
      for (var i = 0; i < list.length; i++) {
        var str = $(list[i]).find("strong").text();
        if (str.indexOf(num) != -1) {
          $(list[i]).css("display","inline-flex");
        }
      }
    }
  }
  function searchByTitle(title){
    // $("#book-screen.search-mode.container #"+(num-1)).css("display","inline-flex");
    var result = false;
    for (var i = 0; i < list.length; i++) {
      var str = $(list[i]).find(".title").text();
      if (str.indexOf(title) != -1 || str.toLowerCase().indexOf(title) != -1 || str.indexOf(title.toLowerCase()) != -1){
        $(list[i]).css("display","inline-flex");
        result = true;
      }
    }
    if (!result) {
      for (var i = 0; i < list.length; i++) {
        var str = songs.list[i].letra;
        if (str.indexOf(title) != -1 || str.toLowerCase().indexOf(title) != -1 || str.indexOf(title.toLowerCase()) != -1){
          $(list[i]).css("display","inline-flex");
        }
      }
    }
  }
}

function requestFullScreen() {

  var el = document.body;

  // Supports most browsers and their versions.
  var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen
  || el.mozRequestFullScreen || el.msRequestFullScreen;

  if (requestMethod) {

    // Native full screen.
    requestMethod.call(el);

  } else if (typeof window.ActiveXObject !== "undefined") {

    // Older IE.
    var wscript = new ActiveXObject("WScript.Shell");

    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
}

$(document).ready(function(){

  //inicializar
  init();
  // requestFullScreen();

  // ripple effect
  $(".ripple").hammer().on("tap", function(){
    rippleEffect(event);
  })

  //mudar tela
  $(".tab").hammer().on("tap", function(event) {
    changeTabs(event);
    // if ($("#book-screen").hasClass("search-mode")) {
    //   $("#book-screen.search-mode .search-box .icon").trigger("tap");
    // }
  });

  //abrir musica
  // observação importante aprendida aqui - se passar o event na callback dessa forma:  function(event){}
  //  o evento é capturado exatamente no elemento onde foi vinculado, caso use o event global, dessa forma: function(){}
  // o evento passa a ser capturado no exato elemento que foi tocado, filho do elemento onde o evento foi vinculado, bolha até o pai e dispara o evento,
  // no entanto, o event.target diferente do caso anterior continua sendo o exato elemento que foi tocado;
  $("#book-screen .list-item").hammer().on("tap", function(event) {
    // if(event.target.id != ""){
    //   console.log("Eu tenho ID:");
    //   console.log(event.target)
    //   // openMusic();
    //   // changeScreens("music-screen");
    // }else{
    //   console.log("Eu NÃO tenho ID:");
    //   console.log(event.target);
    // }

    // console.log(event.target);
    // console.log(event.gesture.target);

    // if($(event.gesture.target).hasClass("list-item")){
    //
    //   console.log(this);
    //
    //   // openMusic(event.target.id);
    //   // changeScreens("music-screen");
    // }

    // console.log($('span[rel="dnp"]'));
    // console.log(event.gesture.target.className);

    // if(event.gesture.target.className == "icon right-ident align-right material-icons check-box" || event.gesture.target.className == "icon left-ident material-icons favorite"){
    //   event.stopPropagation();
    //   // return false;
    // }else{
    //   openMusic(event.target.id);
    //   // changeScreens("music-screen");
    // }

    if($(event.gesture.target).attr("data-reply") == "false"){
      // event.stopPropagation();
      // return false;
    }else{
      openMusic(event.target.id);
      // changeScreens("music-screen");
      if ($("#book-screen").hasClass("search-mode")) {
        $("#book-screen.search-mode .search-box .icon").trigger("tap");
      }
    }

  });

  $(".right-nav .icon.close-icon").hammer().on("tap", function(event) {
    closeMusic();
  });

  $(".right-nav").hammer().on("swiperight", function(event) {
    closeMusic();
  });

  //realizar busca
  $("#book-screen .action-icons .search-icon").hammer().on("tap", function(event) {
    $("#book-screen .search-box .box").attr({"type":"text","placeholder":"Digite o nome ou um trecho: "});
    startSearchMode("title");
  });

  $("#book-screen .fab.search-number").hammer().on("tap", function(event){
    $("#book-screen .search-box .box").attr({"type":"number","placeholder":"Digite o número: "});
    startSearchMode("number");
  });

  $("#book-screen .search-box .icon.clear-search").hammer().on("tap", function(event){
    $("#book-screen .search-box .box").val("");

    $("#book-screen.search-mode.container .list-item").css("display","none");
    $("#book-screen .search-box .clear-search").removeClass("active");
    $("#book-screen .search-box .close-search").addClass("active");
  });

  $("#book-screen .search-box .icon.close-search").hammer().on("tap", function(event){
    $("#book-screen.search-mode.container .list-item").css("display","inline-flex");
    $("#book-screen .search-box .box").val("");
    $("#book-screen.search-mode").removeClass("search-mode");
  });

  // abrir side-nav
  $(".nav-icon").hammer().on("tap", function(){
    openNav();
  });

  $(".back-icon").hammer().on("tap", function(){
    backScreens(lastScreen);
  });

  $(".container.active").hammer().on("swiperight", function(event) {
    openNav();
  });

  $(".scrim").hammer().on("tap",function(){
    closeNav();
  });

  $(".scrim").hammer().on("swipeleft", function(event) {
    closeNav();
  });

  $(".side-nav .list-item").hammer().on("tap",function(event){
    if($(event.target).attr("for") != ""){
      changeScreens($(event.target).attr("for"));
    }
  });

  // ocutar o fab durante rolagem
  $(".fragment-container.active").scroll(function(){

    // function hideFAB(){
    //   setTimeout(function(){
    //     $(".fragment-container.active .fab").css({"opacity":"1.0","width":"56px","height":"56px","right":"16px","bottom":"16px"});
    //     return true;
    //     // alert("ok");
    //   }, 1000);
    // }
    // $(".fragment-container.active .fab").css({"opacity":"0.0","width":"0px","height":"0px","right":"44px","bottom":"44px"});
    // hideFAB();

    // function hideFAB(){
    //   setTimeout(function(){
    //     $(".fragment-container.active .fab").css("display","flex");
    //     return true;
    //     // alert("ok");
    //   }, 1000);
    // }
    // $(".fragment-container.active .fab").css("display","none");
    // hideFAB();

    function hideFAB(){
      setTimeout(function(){
        $(".fragment-container.active .fab").removeClass("contract");
        return true;
        // alert("ok");
      }, 1000);
    }
    $(".fragment-container.active .fab").addClass("contract");
    hideFAB();

    // console.log(event.timeStamp);
  });

  // adicionar aos favoritos
  $(".container .list-item .favorite").hammer().on("tap", function(event){
    $(this).css("color", "#F44336");
  });

  //Entrar no modo de edição para criar lista
  $(".container .list-item").hammer().on("press", function(event) {
      startEditMode();
  });

  // selecionar um item da lista
  $(".container .list-item .check-box").hammer().on("tap", function(event) {
    // console.log(event.target.id);
    // $(".container .list").addClass("edit-mode");
    // event.stopPropagation();
    // event.preventDefault();
    // alert("selected item");
    // return false;
    // var state = $(this).html();
    //
    // if(state == "check_box"){
    //   $(this).html("check_box_outline_blank");
    // }else{
    //   $(this).html("check_box");
    // }

    checkThis(this);

  });

  //cancelar a criação de uma lista
  $(".persitent-footer .cancel").hammer().on("tap", function(event){
      stopEditMode();
  });

  // criar lista
  $(".persitent-footer .create").hammer().on("tap", function(event){
    if ($("#book-screen").hasClass("search-mode")) {
      $("#book-screen.search-mode .search-box .icon").trigger("tap");
    }
    createList();
  });

  // checando se o form está preenchido
  $('.text-field').blur(function() {

    if ($(this).val()){
      $(this).addClass('fill');
    }
    else{
      $(this).removeClass('fill');
    }
  });

  $('.text-field').focus(function() {

    $('.text-field').on('keyup', function(){
      if($(this).val() != ""){
        $(".drop-arrow").removeClass('visible');
        $(".add-name").addClass('visible');

      }else{
        $(".add-name").removeClass('visible');
        $(".drop-arrow").addClass('visible');
      }

    });

    // $(".drop-arrow").hide();
    // $(".add-name").show(400);
    // // alert("mudei");
  });

  // epandir lista
  $("#cards-screen .fragment-container").hammer({preventDefault: true, domEvents:true}).on("tap", ".card .actions .expand", function(event){
    event.stopPropagation();

    function expandCard(){
      var text = $(card).children(".supporting-text");
      if($(card).hasClass("expanded")){
        $(text).css("max-height",list.length*48+"px");
      }else{
        $(text).css("max-height","144px");
      }
    }

    var card = $(this).closest(".card")[0];
    $(card).toggleClass("expanded");
    var list = $(card).find(".supporting-text ul li");

    expandCard();
  });

  $("#cards-screen .fragment-container").hammer({domEvents:true}).on("tap", ".card .actions .delete", function(event){
    event.stopPropagation();
    temp["deleteList"] = parseInt($(event.target).closest(".card").attr("id"));
    openDialog(1);
  });

  $("#cards-screen .fragment-container").hammer({domEvents:true}).on("tap", ".card .actions .comment", function(event){
    event.stopPropagation();
    temp["commentList"] = parseInt($(event.target).closest(".card").attr("id"));
    var lists = JSON.parse(localStorage.musicLists);
    $("#cards-screen #2.dialog .set-text .text-area").val(lists[temp["commentList"]].comment);
    openDialog(2);
  });

  $("#cards-screen #1.dialog .actions .cancel").hammer().on("tap", function(event){
    closeDialog();
  });

  $("#cards-screen #1.dialog .actions .exclude").hammer().on("tap", function(event){
    deleteList(event);
  });

  $("#cards-screen #2.dialog .actions .cancel").hammer().on("tap", function(event){
    closeDialog();
    $("#cards-screen #2.dialog .set-text .text-area").val("");
  });

  $("#cards-screen #2.dialog .actions .save").hammer().on("tap", function(event){
    // var lists = JSON.parse(localStorage.musicLists);
    // if($("#cards-screen #2.dialog .set-text .text-area").val() != ""){
    //   lists[temp["commentList"]].comment = $("#cards-screen #2.dialog .set-text .text-area").val();
    // }
    // localStorage.musicLists = JSON.stringify(lists);
    $(".expansion-panel .set-text .text-area").val($("#cards-screen #2.dialog .set-text .text-area").val());
    $(".expansion-panel .actions .flat-button.save").trigger("tap");
    closeDialog();
  });

  $("#book-screen #0.dialog .actions .cancel").hammer().on("tap", function(event){

    $("#book-screen .dialog .text-field").val("");
    // $(".dialog").removeClass("active");
    //
    // $(".scrim-dialog").css("background-color","rgba(0, 0, 0, 0.0)");
    // $(".scrim-dialog").css("visibility","hidden");
    closeDialog();
  });

  $("#book-screen #0.dialog .actions .save").hammer().on("tap", function(event){
    saveList();
    // alert("save");
  });

  $(".expansion-panel .header .icon.expand").hammer().on("tap", function(event){
    $(".expansion-panel").toggleClass("expanded");
  });

  $(".expansion-panel .actions .flat-button.clear").hammer().on("tap", function(event){
    var lists = JSON.parse(localStorage.musicLists);
    lists[temp["openedList"]].comment = "";
    localStorage.musicLists = JSON.stringify(lists);
    $(".expansion-panel .set-text .text-area").text("");
    $(".expansion-panel .set-text .text-area").val("");
    $(".expansion-panel").removeClass("expanded");
    $(".expansion-panel .set-text .text-area").removeAttr("readonly");
    $(".expansion-panel").addClass("edit-mode");
    ajustHeight($(".expansion-panel .set-text .text-area")[0]);
  });

  $(".expansion-panel .actions .flat-button.edit").hammer().on("tap", function(event){
    $(".expansion-panel .set-text .text-area").val($(".expansion-panel .set-text .text-area").text());
    $(".expansion-panel .set-text .text-area").removeAttr("readonly");
    $(".expansion-panel").addClass("edit-mode");
  });

  $(".expansion-panel .actions .flat-button.cancel").hammer().on("tap", function(event){
    if($(".expansion-panel .set-text .text-area").text() == ""){
      $(".expansion-panel").removeClass("expanded");
      $(".expansion-panel .set-text .text-area").val("");
    }else{
      $(".expansion-panel .set-text .text-area").val($(".expansion-panel .set-text .text-area").text());
      $(".expansion-panel .set-text .text-area").attr("readonly","");
      $(".expansion-panel").removeClass("edit-mode");
    }
    ajustHeight($(".expansion-panel .set-text .text-area")[0]);
  });

  $(".expansion-panel .actions .flat-button.save").hammer().on("tap", function(event){
    if ($(".expansion-panel .set-text .text-area").val() != "") {
      $(".expansion-panel .set-text .text-area").text($(".expansion-panel .set-text .text-area").val());///o .val() está apenas dentro do input, já o .text() é um nó de texto real
      $(".expansion-panel .set-text .text-area").attr("readonly","");
      $(".expansion-panel").removeClass("edit-mode");
      var lists = JSON.parse(localStorage.musicLists);
      lists[temp["commentList"]].comment = $(".expansion-panel .set-text .text-area").text();
      localStorage.musicLists = JSON.stringify(lists);
    }
  });

  $(".expansion-panel .set-text .text-area").keyup(function() {
    ajustHeight(this);
  });

  $("#cards-screen .fragment-container.active").hammer({preventDefault: true, domEvents:true}).on("tap", ".card", function(event){
    // chamar a função no futuro
    openList(event);
  });

  $("#list-screen .list.unchecked").hammer({domEvents:true}).on("tap", ".icon.check-box", function(event){
    checkThis(this);
    $("#list-screen .list.checked").append($(this).closest("li"));
    $("#list-screen .list.unchecked").remove($(this).closest("li"));
    event.stopPropagation();

    // apenas trocar as classes, em seguida criar uma função para ambos que verifica quais tem a classe.
  });

  $("#list-screen .list.checked").hammer({domEvents:true}).on("tap", ".icon.check-box", function(event){
    checkThis(this);
    $("#list-screen .list.unchecked").append($(this).closest("li"));
    $("#list-screen .list.checked").remove($(this).closest("li"));
    event.stopPropagation();
  });

  $("#list-screen .list.unchecked").hammer({domEvents:true}).on("tap", ".list-item", function(event){
    event.stopPropagation();
    var music = event.currentTarget;

    $("#music-screen .app-bar .title").text($(music).find(".number").text());
    $("#music-screen .fragment-container.active .title").text($(music).find(".title").text());
    $("#music-screen .fragment-container.active .letra").html(songs.list[$(music).find(".number").text()-1].letra);

    changeScreens("music-screen", true);
  });

  $("#music-screen .app-bar .icon.close-icon").hammer().on("tap", function(event){
    changeScreens("list-screen", true);
  });

});
