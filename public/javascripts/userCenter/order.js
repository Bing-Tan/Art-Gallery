const body = document.querySelector('body')
const sidebar = body.querySelector('li')
const toggle = body.querySelector('.toggle')
// const searchBtn = body.querySelector('.search-box')
// const modeSwitch = body.querySelector('.mode')
// const modeText = body.querySelector('.mode-text')

toggle.addEventListener('click', ()=>{
    sidebar.classList.toggle('delete');
    // sidebar.classList.toggle('detail');
    // sidebar.classList.toggle('de');
})

// searchBtn.addEventListener('click', ()=>{
//     sidebar.classList.remove('close')
// })
//
// modeSwitch.addEventListener('click', ()=>{
//     body.classList.toggle('dark');
//     if(body.classList.contains('dark')){
//         modeText.innerText = "Light mode"
//     }else{
//         modeText.innerText = "Dark mode"
//     }
// })