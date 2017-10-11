

var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onLeave"}});

// build scenes
$(function () { // wait for document ready
    // build scene

    //fixa a barra de navegação
    var scene = new ScrollMagic.Scene({triggerElement: "#navegador-principal", duration: 0})
                    .setPin("#navegador-principal")
                    .addTo(controller);
    
    //removendo bruscamente a barra
    var scene = new ScrollMagic.Scene({triggerElement: "#navegador-principal", duration: 100})
                    .addTo(controller)
                    .on("enter", function (e) {
                        document.querySelector('#navegador-principal').classList.add("hideen");
                    });
    var scene = new ScrollMagic.Scene({triggerElement: "#navegador-principal", duration: 100})
                    .addTo(controller)
                    .on("leave", function (e) {
                        document.querySelector('#navegador-principal').classList.remove("hideen");
                    });

    //altera o estilo da barra
    var scene = new ScrollMagic.Scene({triggerElement: "#navegador-principal"})
                    .setClassToggle("#navegador-principal", "fixed")
                    .addTo(controller);
    //remove a class "float"
    var scene = new ScrollMagic.Scene({triggerElement: "#navegador-principal"})
                    .addTo(controller)
                    .on("enter", function (e) {
                        document.querySelector('#navegador-principal').classList.remove("float");
                    });
    //adiciona a class "float"
    var scene = new ScrollMagic.Scene({triggerElement: "#navegador-principal"})
                    .addTo(controller)
                    .on("leave", function (e) {
                        document.querySelector('#navegador-principal').classList.add("float");
                    });
    //oculta ou revela a barra
    var scene = new ScrollMagic.Scene({triggerElement: "#navegador-principal"})
                    .addTo(controller)
                    .on("update", function (e) {
                        if(e.target.controller().info("scrollDirection") == "FORWARD"){
                            document.querySelector('#navegador-principal').classList.add("hide");
                        }else{
                            document.querySelector('#navegador-principal').classList.remove("hide");                            
                        }
                    });


                    run("nav-videos","click", function(){window.scrollTo(1200)});
                    // document.getElementById("nav-videos").addEventListener("click", function(){
                    //     alert(document.getElementById("videos").position);
                    // });

    });

    function run(elem,evento,func){
        document.getElementById(elem).addEventListener(evento, func);
    }

    // run("#videos","click", function(){ alert(document.getElementById("#videos").position)});
                