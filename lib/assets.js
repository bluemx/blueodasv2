
const {createApp, ref, provide, inject, onMounted, computed, getCurrentInstance, nextTick, watch, h} = Vue
const emitter = mitt()

/* AUDIOS */

const s_select = new Howl({ src: [ 'data:audio/mp3;base64,'+audio_select ] });
const s_win = new Howl({ src: [ 'data:audio/mp3;base64,'+audio_win ] });
const s_ok = new Howl({ src: [ 'data:audio/mp3;base64,'+audio_ok ] });
const s_error = new Howl({ src: [ 'data:audio/mp3;base64,'+audio_error ] });
const s_end = new Howl({ src: [ 'data:audio/mp3;base64,'+audio_end ] });
const s_bh_hombre = new Howl({ src: [ 'data:audio/mp3;base64,'+audio_bienHecho_hombre ] });
const s_bh_mujer = new Howl({ src: [ 'data:audio/mp3;base64,'+audio_bienHecho_mujer ] });
const s_bh_nina = new Howl({ src: [ 'data:audio/mp3;base64,'+audio_bienHecho_nina ] });
const s_bh_nino = new Howl({ src: [ 'data:audio/mp3;base64,'+audio_bienHecho_nino ] });
const s_vi_hombre = new Howl({ src: [ 'data:audio/mp3;base64,'+audio_vuelveaintentar_hombre ] });
const s_vi_mujer = new Howl({ src: [ 'data:audio/mp3;base64,'+audio_vuelveaintentar_mujer ] });
const s_vi_nina = new Howl({ src: [ 'data:audio/mp3;base64,'+audio_vuelveaintentar_nina ] });
const s_vi_nino = new Howl({ src: [ 'data:audio/mp3;base64,'+audio_vuelveaintentar_nino ] });

const audiovariables = ['s_select', 's_win', 's_ok', 's_error', 's_end', 's_bh_hombre', 's_bh_mujer', 's_bh_mujer', 's_bh_nina', 's_bh_nino', 's_vi_hombre', 's_vi_mujer', 's_vi_nina', 's_vi_nino']

const app = createApp({
    setup(props, context){
        const oda = ref({
            title: null,
            subtitle: null,
            modules: {
                scenes: [],
                check: [],
                drag: [],
                dragclone: [],
                dropzone: [],
                input: [],
                select: [],
                choice: [],
                customcode: [],
                instructions: [],
                audiotext: [],
                lottie: [],
                video: [],
                audio: [],
                switch: [],
            },
            scene: parseInt(location.hash.replace('#','')) || 0,
            timeline: 0,
            timelineTotal: 0,
        })
        
        
        
        app.provide('ODA', oda.value)
        
        const results = ref({
            score: 100,
            oks: 0,
            errors: 0,
            okstotal: 0,
            screens: []
        })
        app.provide('RESULTS', results.value)


        const splash = () => {
            const e = {clientX:window.innerWidth/2, clientY:window.innerHeight/2}
            if(e) {
                render.play();
                updateCoords(e);
                animateParticules(pointerX, pointerY, 10, 3000, 500, null);
            }
        }

       

        onMounted(()=>{

            customScore()
            loadScreencap()
            documentHeight()

            if(oda.value.modules.scenes.length==0){
                documentHeight()
                resizeObserver.observe(document.getElementById('app'))
            } else {
                documentHeight(800)
            }

            setTimeout(()=>{
                
                documentHeight()
            }, 500)
        })

        const customScore = () => {
            var h = window.location.hash ? parseInt(window.location.hash.replace('#s', '')) : false
            if(h){
                results.value.score = h
            }
        }

        const resizeObserver =  new ResizeObserver(entries => {
            documentHeight()
        })
        


        const loadScreencap = () => {
            var s = document.createElement("script")
            s.type = "text/javascript"
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js"
            document.head.appendChild(s)
        }
        
        
        const screenCapture = async () => {
            return new Promise((resolve, reject) => {
                domtoimage.toPng(document.body).then(function (dataUrl) {
                    results.value.screens.push(dataUrl)
                    resolve()
                }).catch(function (error) { console.error('oops, something went wrong!', error); });

            })
        }

        emitter.on('avanzadaFinalize', (e => {
            setTimeout(()=>{
                finalize()
            },1000)
        }))
        emitter.on('finalize', (e=>{
            setTimeout(()=>{
                finalize()
            }, 900)
        }))

        const finalize = async () => {
            const lastscreen = await screenCapture()
            sendMessage()
        }

        watch(()=>oda.value.scene,()=>{
            if(oda.value.scene>0){
                screenCapture()
            }
            splash()
        }, {immediate:true} )
        

        const sendMessage = () => {
            window.top.postMessage(
                JSON.stringify(
                    {
                        score: results.value.score,
                        scoresum: Math.round( (results.value.score / (results.value.errors+results.value.oks)) * results.value.oks  ),
                        oks: results.value.oks,
                        errors: results.value.errors,
                        answers: (results.value.errors+results.value.oks),
                        screen: results.value.screens
                    }
                ), "*"
            )
            /*
            for(var i in results.value.screens){
                console.log(results.value.screens[i])
            }
            */
        }


        return {
            oda,
            splash
        }
    }
})






const documentHeight = (forceheight) => {
    let height = document.getElementById('app').getBoundingClientRect().height + 100
    if(forceheight){
        height = forceheight
    }
    window.top.postMessage({height: height}, "*")
    
}

app.component('draggable', window.vuedraggable)


app.directive('textfn', {
    mounted: function (el, binding) {
        let txt = el.innerHTML
        //FXEMOJI
        let fxemoji = txt.match(/(\bfxemoji\S+\b)/ig);
        if(fxemoji){
            for(var fxe of fxemoji){
                txt = txt.replace(fxe, '<span class="icon iconify inline" data-icon="'+fxe+'"></span>')
            }
        }
        
        // end text processing
        el.innerHTML = txt
    }
})



app.config.compilerOptions.isCustomElement = (tag) => tag.includes('lottie-player')



function outlineDataModuleIdFN (outlineDataModuleId) {
    if(outlineDataModuleId){
        let outlinedItems = document.querySelectorAll('[data-module-id="'+outlineDataModuleId+'"]')
        for(var item of outlinedItems){
            let currentOut = item.style.outline
            item.style.outline = "6px double red";
            setTimeout(()=>{
                item.style.outline = "2px double red";
            }, 200)
            setTimeout(()=>{
                item.style.outline = "6px double red";
            }, 400)
            setTimeout(()=>{
                item.style.outline = currentOut;
            }, 800)
        }
    }
}
window.addEventListener("message", (event) => {
    if(event.data.activeDataId){
        outlineDataModuleIdFN(event.data.activeDataId)
    }
})





tailwind.config = {
    theme: {
      extend: {
        colors: {
            main: '#ED1846',
            sec: '#005093',
            clear: '#5AAEDA',
            accent: '#EB8B2E',
            isok: '#5EB246',
            notok: '#DB3E34',
            pastel1: '#FDEDE2',
            pastel2: '#D5EDF6',
            pastel3: '#EAF5E5',
            pastel4: '#F3E5EF',
            pastel5: '#EEEAE3',
            pastel6: '#FFF6D8',
            beige: '#FDF4CE'
        },
        boxShadow: {
            'oda': '4px 4px 0 rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }


let platform = document.body.getAttribute('data')

if(platform == 'ASOMATE-MAT' || platform == 'ASOMATE-ESP'){
    tailwind.config = {
        theme: {
        extend: {
            colors: {
                main: '#49a2a2',
                sec: '#904f80',
                clear: '#f3cb62',
                accent: '#d47773',
                isok: '#5EB246',
                notok: '#DB3E34',
                pastel1: '#FDEDE2',
                pastel2: '#D5EDF6',
                pastel3: '#EAF5E5',
                pastel4: '#F3E5EF',
                pastel5: '#EEEAE3',
                pastel6: '#FFF6D8',
                beige: '#faeac3'
            },
            boxShadow: {
                'oda': '4px 4px 0 rgba(0, 0, 0, 0.1)'
            }
        }
        }
    }

}

if(platform == 'RAP-MAT' || platform == 'RAP-ESP'){
    tailwind.config = {
        theme: {
        extend: {
            colors: {
                main: '#804a95',
                sec: '#009941',
                clear: '#faba00',
                accent: '#cc00cb',
                isok: '#3cb5b4',
                notok: '#d600c4',
                pastel1: '#FDEDE2',
                pastel2: '#D5EDF6',
                pastel3: '#EAF5E5',
                pastel4: '#F3E5EF',
                pastel5: '#EEEAE3',
                pastel6: '#FFF6D8',
                beige: '#fde4a4'
            },
            boxShadow: {
                'oda': '4px 4px 0 rgba(0, 0, 0, 0.1)'
            }
        }
        }
    }

}


