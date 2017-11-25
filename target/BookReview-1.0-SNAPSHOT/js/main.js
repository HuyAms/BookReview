/*function showContent(event,action){
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i=0; i< tabcontent.length; i++){
        tabcontent[i].style.display = "none";
    }
    
    tablinks=document.getElementsByClassName("tablinks");
    for (i=0;i<tablinks.length; i++){
        tablinks[i].className= tablinks[i].className.replace("active","");
    }
    
    document.getElementById(action).style.display ="block";
    event.currentTarget.className += "active";
}*/

function showcontent(action){
 
    var i, tabcontent, tab;
    
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i=0; i<tabcontent.length;i++){
        tabcontent[i].style.display = "none";
        console.log(tabcontent.length);
    }
    
    tab = document.getElementsByClassName("tab-group")[0].children;
    for (i=0; i<tab.length;i++){
        tab[i].className= tab[i].className.replace("Active","");
    }   
    
    document.getElementById(action).style.display = "block";
    event.currentTarget.className += "Active";
    
//    var action = event.currentTarget.textContent;
//    console.log(action);
  
    
          
}




document.getElementById("defaultOpen").click();


/*
$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});*/