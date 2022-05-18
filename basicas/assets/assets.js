
const {createApp, ref, provide, inject, onMounted, getCurrentInstance, nextTick} = Vue
const emitter = mitt()

/* AUDIOS */
const audiopath = '../assets/asound/'

const s_select = new Howl({ src: [ 'data:audio/mp3;base64,'+audio_select ] });
const s_win = new Howl({ src: [ 'data:audio/mp3;base64,'+audio_win ] });

const app = createApp({
    setup(props, context){
        const oda = {
            title: null,
            subtitle: null,
            modules: {
                check: [],
                drag: [],
                dropzone: [],
                input: [],
                select: [],
            }
        }
        app.provide('ODA', oda)
        
        const results = {
            oks: 0,
            errors: 0,
        }
        app.provide('RESULTS', results)

        return {
            oda
        }
    }
})

app.component('draggable', window.vuedraggable)

//app.component('Container', window.Vue3SmoothDnd.Container)
//app.component('Draggable', window.Vue3SmoothDnd.Draggable)

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
        },
        boxShadow: {
            'oda': '4px 4px 0 rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }