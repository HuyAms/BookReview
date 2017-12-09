/* --------------------------------------------------
  Handle book category navigation
-----------------------------------------------------*/
document.querySelector('#tabNews').addEventListener("click", () => {handleNavigation('news')});
document.querySelector('#tabAll').addEventListener("click", () => {handleNavigation('all')});
document.querySelector('#tabFiction').addEventListener("click", () => {handleNavigation('fiction')});
document.querySelector('#tabNovel').addEventListener("click", () => {handleNavigation('novel')});
document.querySelector('#tabTravel').addEventListener("click", () => {handleNavigation('travel')});
document.querySelector('#tabGuide').addEventListener("click",() => {handleNavigation('guide')});
document.querySelector('#tabHorror').addEventListener("click", () => {handleNavigation('horror')});
document.querySelector('#tabRomance').addEventListener("click", () => {handleNavigation('romance')});
document.querySelector('#tabScience').addEventListener("click", () => {handleNavigation('science')});
document.querySelector('#tabOthers').addEventListener("click",() => {handleNavigation('others')});

const handleNavigation = function(category) {
  hightLightTab(category);
  switch (category) {
    case 'news':
      document.querySelector('.bookList').style.display = 'none';
      document.querySelector('.news').style.display = 'flex';
      document.querySelector('.gallery a.button').style.display = 'none';
      break;
    default:
      document.querySelector('.news').style.display = 'none';
      document.querySelector('.bookList').style.display = 'flex';
      document.querySelector('.gallery a.button').style.display = 'block';

      // loadBook
      //loadBook(category);
  }
}

const hightLightTab = function(tab) {
  const listTab = document.querySelectorAll('.bookNav ul li');
    listTab.forEach((tab, index) => {
    tab.classList.remove('tabActive');
  });

  const currentTab = document.querySelector(`.bookNav ul li[name=${tab}]`);
  currentTab.classList.add('tabActive');
  localStorage.setItem('currentTab', tab);
}

//open home tab by default
document.querySelector('#tabNews').click();

//====================Logout=========================
document.querySelector('#buttonLogout').addEventListener('click', (evt) => {
  evt.preventDefault();
  console.log('log out clicked');
  localStorage.setItem("didLogIn", false); //save login state
  localStorage.removeItem('token'); //remove token

  //TODO: Navigate to main page
  window.location.href = "index.html";
})
