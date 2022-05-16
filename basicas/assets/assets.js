const {createApp, ref, provide, inject, onMounted, getCurrentInstance, nextTick} = Vue

const emitter = mitt()

/* AUDIOS */
const audiopath = '../assets/asound/'
const s_end = new Howl({ src: [audiopath+'end.mp3'] });
const s_error = new Howl({ src: [audiopath+'error.mp3'] });
const s_ok = new Howl({ src: [audiopath+'/ok.mp3'] });
const s_select = new Howl({ src: [audiopath+'/select.mp3'] });
const s_win = new Howl({ src: [audiopath+'/win.mp3'] });

const app = createApp({
    setup(props, context){
        const oda = {
            title: null,
            subtitle: null
        }
        app.provide('ODA', oda)
        
        const results = {
            oks: 0,
            errors: 0,
        }

        app.provide('RESULTS', results)


        const finalize = () => {
            
        }
        
        const testing = () => {
            emitter.emit('foo', { a: 'b' })
            emitter.on('finalize', (e => {
                console.log(e)
            }))
            
        }

        return {
            oda
        }
    }
})


app.directive('textfn', {
    mounted: function (el, binding) {
        let txt = el.innerHTML
        //FXEMOJI
        let fxemoji = txt.match(/(\bfxemoji\S+\b)/ig);
        for(var fxe of fxemoji){
            txt = txt.replace(fxe, '<span class="icon iconify inline" data-icon="'+fxe+'"></span>')
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
          notok: '#DB3E34'
        },
        boxShadow: {
            'oda': '4px 4px 0 rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }