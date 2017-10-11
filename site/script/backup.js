//  <!-- <script>
//         // init controller
//         var controller = new ScrollMagic.Controller();
//     </script>

//     <script>
//         // build scene
//         var scene = new ScrollMagic.Scene({
//                             triggerElement: "#navegador-principal"
//                         })
//                         .setTween("#animate1", 0.5, {backgroundColor: "green", scale: 2.5}) // trigger a TweenMax.to tween
//                         .addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
//                         .addTo(controller);
//     </script> -->

// {globalSceneOptions: {duration: 100}}
// .triggerHook("onLeave");
// init controller

// alert(window.innerHeight);

function addClass(id, classe) {
    var elemento = document.getElementById(id);
    var classes = elemento.className.split(' ');
    var getIndex = classes.indexOf(classe);
  
    if (getIndex === -1) {
      classes.push(classe);
      elemento.className = classes.join(' ');
    }
  }
  
  function delClass(id, classe) {
    var elemento = document.getElementById(id);
    var classes = elemento.className.split(' ');
    var getIndex = classes.indexOf(classe);
  
    if (getIndex > -1) {
      classes.splice(getIndex, 1);
    }
    elemento.className = classes.join(' ');
  }

var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onLeave"}});

// build scenes
$(function () { // wait for document ready
    // build scene
    var scene = new ScrollMagic.Scene({triggerElement: "#navegador-principal", duration: 0})
                    .setPin("#navegador-principal")
                    .addTo(controller);
});

$(function () { // wait for document ready
    // build scene
    
    var scene = new ScrollMagic.Scene({triggerElement: "#navegador-principal"})
                .setClassToggle("#navegador-principal", "fixed")
                .addTo(controller);

});

$(function () { // wait for document ready
    // build scene
    
    var scene = new ScrollMagic.Scene({triggerElement: "#navegador-principal"})
                .addTo(controller)
                .on("enter", function (e) {
                    // $("#scrollDirection").text(e.target.controller().info("scrollDirection"));
                    document.querySelector('#navegador-principal').classList.remove("float");
                })
                // .on("enter leave", function (e) {
                //     $("#state").text(e.type == "enter" ? "inside" : "outside");
                // })
                // .on("start end", function (e) {
                //     $("#lastHit").text(e.type == "start" ? "top" : "bottom");
                // })
                // .on("progress", function (e) {
                //     $("#progress").text(e.progress.toFixed(3));
                // });
    var scene = new ScrollMagic.Scene({triggerElement: "#navegador-principal"})
                .addTo(controller)
                .on("leave", function (e) {
                    // $("#scrollDirection").text(e.target.controller().info("scrollDirection"));
                    document.querySelector('#navegador-principal').classList.add("float");
                })

});

// new ScrollMagic.Scene({triggerElement: "#img-selo-10anos"})
//             .setClassToggle("#navegador-principal", "float") // add class toggle
//             .addIndicators() // add indicators (requires plugin)
//             .addTo(controller)
//             .duration(600);
// new ScrollMagic.Scene({triggerElement: "#navegador-principal"})
//             .setClassToggle("#navegador-principal", "fixed") // add class toggle
//             .addIndicators() // add indicators (requires plugin)
//             .addTo(controller);


// $(function () { // wait for document ready
    //     // init
    //     var controller = new ScrollMagic.Controller({
    //         globalSceneOptions: {
    //             triggerHook: 'onLeave'
    //         }
    //     });

    //     // get all slides
    //     var slides = document.querySelectorAll("div.container");

    //     // create scene for every slide
    //     for (var i=0; i<slides.length; i++) {
    //         new ScrollMagic.Scene({
    //                 triggerElement: slides[i]
    //             })
    //             .setPin(slides[i])
    //             .addIndicators() // add indicators (requires plugin)
    //             .addTo(controller);
    //     }
    // });