var classnames = document.getElementsByClassName("submenu");


for (var i = 0; i < classnames.length; i++) {
    classnames[i].addEventListener('click', function() {
        const target = document.getElementsByClassName(this.getAttribute('data-target'));
        target[0].classList.toggle ("open");

    })
}

window.addEventListener('click',function(event){
   
  if(!event.target.hasAttribute('data-target')){
      
    document.getElementsByClassName('nav-dropdown')[0].classList.remove('open');
  }
})



var togglebtn = document.getElementById("nav-toggle");

togglebtn.addEventListener('click', function(){
    togglebtn.classList.toggle("active");
})


// show menu in mobile mode
//var classnames = document.getElementsByClassName("show-hide");
//
//
//for (var i = 0; i < classnames.length; i++) {
//    classnames[i].addEventListener('click', function() {
//        const target = document.getElementsByClassName(this.getAttribute('data-target'));
//        if (target[0].style.display == "none") {
//            target[0].style.display = "block";
//        } else {
//            target[0].style.display = "none";
//        }
//    }, false)
//}

//
//var togglebtn = document.getElementById("nav-toggle");
//
//togglebtn.addEventListener('click', function(){
//    togglebtn.classList.toggle("active");
//})


// document.addEventListener('click', function (e) {
//     e = e || window.event;
//     var target = e.target || e.srcElement;
//
//     e.preventDefault();
//     if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'showmenu') {
//
//       console.log ('hehe');
//         if (target.hasAttribute('data-target')) {
//             let toggle = target.getAttribute('data-target');
//             if(toggle.style.display =="none"){
//               toggle.style.display="block";
//             } else{
//               toggle.style.display="none";
//             }
//         }
//     }
// }, false);


//(function($) { // Begin jQuery
//  $(function() { // DOM ready
//    // If a link has a dropdown, add sub menu toggle.
//    $('nav ul li a:not(:only-child)').click(function(e) {
//      $(this).siblings('.nav-dropdown').toggle();
//      // Close one dropdown when selecting another
//      $('.nav-dropdown').not($(this).siblings()).hide();
//      e.stopPropagation();
//    });
//    // Clicking away from dropdown will remove the dropdown class
//    $('html').click(function() {
//      $('.nav-dropdown').hide();
//    });
//    // Toggle open and close nav styles on click
//    $('#nav-toggle').click(function() {
//      $('nav ul').slideToggle();
//    });
//    // Hamburger to X toggle
//    $('#nav-toggle').on('click', function() {
//      this.classList.toggle('active');
//    });
//  }); // end DOM ready
//})(jQuery); // end jQuery
