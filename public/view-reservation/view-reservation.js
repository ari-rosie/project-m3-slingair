const inputSearchId = document.querySelector('#searchId');
const searchBtn = document.querySelector("#searchBtn");



searchBtn.addEventListener('click', () => {
    console.log(inputSearchId.value);
    window.location.href = (`/confirmation/${inputSearchId.value}`);
    
});