let path = '../assets/'


var LoaderVersion = document.querySelector('[data-loader-version]')
if(LoaderVersion){
    LoaderVersion = LoaderVersion.getAttribute('data-loader-version')
}
var isDevLocal = document.querySelector('[data="local"]')
if(isDevLocal){
} else {
    let vrs = ''
    if(LoaderVersion){
        vrs = '@'+LoaderVersion
    }
    path = 'https://cdn.jsdelivr.net/gh/bluemx/blueodasv2'+vrs+'/basicas/assets/'
    
}

let scripts = [
    path+'audios.min.js',
    path+'libs.min.js',
    path+'assets.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/iconify/2.2.1/iconify.min.js'
]


const components = [
    path+'components/OdaTitulo.js',
    path+'components/OdaInstruccion.js',
    path+'components/OdaFinalizar.js',
    path+'components/OdaIcon.js',
    path+'components/Utilities.js',
    path+'components/LayoutBox.js',
    path+'components/LayoutGrid.js',
    path+'components/LayoutImg.js',
    //------- Modules
    path+'components/ModuleCheck.js',
    path+'components/ModuleDrag.js',
    path+'components/ModuleInput.js',
    path+'components/ModuleSelect.js'
]


if(isDevLocal){
    scripts.push(...components)
} else {
    scripts.push(path+'components.js',)
}



let styles = [
    {url: path+'assets.css', rel: 'stylesheet'},
    {url:'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css', rel: 'stylesheet'},
    {url:'https://fonts.googleapis.com', rel:'preconnect'},
    {url:'https://fonts.gstatic.com', rel: 'preconnect', crossorigin:true},
    {url:'https://fonts.googleapis.com/css2?family=Rubik:wght@400;700;800&display=swap', rel:'stylesheet'}
]

//--------------



let currentJS = 0
function nextScript(){
    currentJS++
    if(currentJS<scripts.length){
        loadScript()
    } else {
        app.mount('#app')
    }
}

function loadScript() {
    let nsc = document.createElement('script')
    nsc.setAttribute('src', scripts[currentJS])
    document.body.appendChild(nsc)
    nsc.onload = () => {
        nextScript()
    }
}

loadScript()






//--------------

for(let style of styles){
    let sty = document.createElement('link')
    sty.rel = style.rel
    sty.href= style.url
    document.head.appendChild(sty)
}
