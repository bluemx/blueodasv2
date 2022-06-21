
const {createApp, ref, provide, inject, onMounted, computed, getCurrentInstance, nextTick, watch} = Vue
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
                dropzone: [],
                input: [],
                select: [],
                choice: [],
                customcode: [],
                instructions: [],
                audiotext: [],
                lottie: []
            },
            scene: parseInt(location.hash.replace('#','')) || 0,
            timeline: 0,
            timelineTotal: 0
        })

        
    
        app.provide('ODA', oda.value)
        
        const results = ref({
            oks: 0,
            errors: 0,
            okstotal: 0
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

        watch(()=>oda.value.scene,()=>{splash()})
        

        onMounted(()=>{
            //console.log(oda.value.modules.scenes)
        })

        return {
            oda,
            splash
        }
    }
})

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