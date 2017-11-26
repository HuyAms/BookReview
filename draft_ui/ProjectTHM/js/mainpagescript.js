function showcontent(action){
 
    var i, book, tab;
    
    book = document.getElementsByClassName("book");
    for (i=0; i<book.length;i++){
        book[i].style.display = "none";
        console.log(book.length);
    }
    
    tab = document.getElementsByClassName("subnavigation")[0].children;
    for (i=0; i<tab.length;i++){
        tab[i].className= tab[i].className.replace("Active","");
    }   
    console.log(action);
    document.getElementsByClassName(action)[0].style.display = "block";
    event.currentTarget.className += "Active";
    event.preventDefault();
//    var action = event.currentTarget.textContent;
//    console.log(action);
  
    
          
}

document.getElementById("defaultOpen").click();
