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
}

function parseID(str){
  return "#"+str;
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

function closeDialog(){
  $(".dialog.active").removeClass("active");

  $(".scrim-dialog").css("background-color","rgba(0, 0, 0, 0.0)");
  $(".scrim-dialog").css("visibility","hidden");
}

function createList(){
  // alert();
  var list = $(".container .list-item .check-box.selected");
  if (list.length > 0) {
    currentList = [];
    for (var i = 0; i < list.length; i++) {
      currentList.push(parseInt($(list[i]).attr("for")));
    }
    // função abrir dialogo
    $(".scrim-dialog").css("visibility","visible");
    $(".scrim-dialog").css("background-color","rgba(0, 0, 0, 0.3)");
    $(".dialog").addClass("active");
  }else {
    alert("No momento não é possivel criar uma lista vazia");
  }
  // console.log(currentList);

  // var listReady = [];
  // for (var i = 0; i < list.length; i++) {
  //   // console.log($(list[i]).attr("for"));
  //   listReady.push($(list[i]).attr("for"));
  // }
  // if(listReady.length > 0){
  //   // função abrir dialogo
  //   $(".scrim-dialog").css("visibility","visible");
  //   $(".scrim-dialog").css("background-color","rgba(0, 0, 0, 0.3)");
  //
  //   $(".dialog").addClass("active");
  //
  // }else {
  //   alert("No momento não é possivel criar uma lista vazia");
  // }

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
  $("#cards-screen .fragment-container.active").empty();
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
      $(ul).append($('<li></li>').html('<strong>'+songs.list[lists[i].musics[j]].numero+'</strong>'+songs.list[lists[i].musics[j]].titulo));
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
  var card = event.currentTarget;

  var name = $(card).find(".title").text();
  var date = $(card).find(".subtitle").text();
  var list = $(card).find(".supporting-text ul li");

  $("#list-screen .nav .title").text(name+" - "+date);

  $("#list-screen .list.unchecked, #list-screen .list.checked").empty();

  for (var i = 0; i < list.length; i++){
    var number = $(list[i]).find("strong").text();
    var music = $(list[i]).text();

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
    $("#book-screen .search-box .box").keyup(function(){
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
    for (var i = 0; i < list.length; i++) {
      var str = $(list[i]).find(".title").text();
      if (str.indexOf(title) != -1 || str.toLowerCase().indexOf(title) != -1 || str.indexOf(title.toLowerCase()) != -1){
        $(list[i]).css("display","inline-flex");
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

  $("#book-screen .action-icons .search-icon").hammer().on("tap", function(event) {
    $("#book-screen .search-box .box").attr("type","text");
    startSearchMode("title");
  });

  $("#book-screen .fab.search-number").hammer().on("tap", function(event){
    // console.log($("#book-screen .search-box .box").attr("type","number"));
    // console.log($("#book-screen .search-box .box").attr("maxlength","3"));
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
  // $(".container").hammer().on("tap", ".card .actions .expand", function(event){
  // $(".fragment-container.active").hammer({domEvents:true}).on("tap", ".card .actions .expand", function(event){

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

    $("#cards-screen .scrim-dialog").css("visibility","visible");
    $("#cards-screen .scrim-dialog").css("background-color","rgba(0, 0, 0, 0.3)");
    $("#cards-screen .dialog").addClass("active");

    temp["deleteList"] = parseInt($(event.target).closest(".card").attr("id"));
    // alert("yhuuu");
  });

  $("#cards-screen .dialog .actions .exclude").hammer().on("tap", function(event){
    deleteList(event);
  });

  $("#cards-screen .dialog .actions .cancel").hammer().on("tap", function(event){
    closeDialog();
    // $(".dialog").removeClass("active");
    //
    // $(".scrim-dialog").css("background-color","rgba(0, 0, 0, 0.0)");
    // $(".scrim-dialog").css("visibility","hidden");
  });

  // $(".card .actions .expand").hammer().on("tap", function(event){
  //   // event.stopPropagation();
  //   // event.preventDefault();
  //
  //   function expandCard(){
  //     var text = $(card).children(".supporting-text");
  //     if($(card).hasClass("expanded")){
  //       $(text).css("max-height",list.length*48+"px");
  //     }else{
  //       $(text).css("max-height","144px");
  //     }
  //   }
  //
  //   var card = $(this).closest(".card")[0];
  //   $(card).toggleClass("expanded");
  //   var list = $(card).find(".supporting-text ul li");
  //
  //   expandCard();
  // });

  $("#book-screen .dialog .actions .cancel").hammer().on("tap", function(event){

    $("#book-screen .dialog .text-field").val("");
    $(".dialog").removeClass("active");

    $(".scrim-dialog").css("background-color","rgba(0, 0, 0, 0.0)");
    $(".scrim-dialog").css("visibility","hidden");

  });

  $("#book-screen .dialog .actions .save").hammer().on("tap", function(event){
    saveList();
    // alert("save");
  });

  $(".expansion-panel .header .icon.expand").hammer().on("tap", function(event){
    $(".expansion-panel").toggleClass("expanded");
  });

  $(".expansion-panel .actions .flat-button.clear").hammer().on("tap", function(event){
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
      $(".expansion-panel .set-text .text-area").text($(".expansion-panel .set-text .text-area").val());
      $(".expansion-panel .set-text .text-area").attr("readonly","");
      $(".expansion-panel").removeClass("edit-mode");
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
