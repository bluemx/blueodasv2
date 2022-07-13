app.component('module-audiotext', {
    props: {
        text: String,
        audio: String,
        class: String,
        autoplay: Boolean
    },
    setup (props, context){
        const ODA = inject('ODA')
        const instance = getCurrentInstance();
        const item = ref()
        const itemClass = props.class || ''

        const textRender = ref([])
        const duration = ref(1000)

        const audio = ref()
  
        const separatetxt = () => {
            var words = props.text.split(" ")
            for(var w in words){
                textRender.value.push({txt:words[w], on: false})
            }
        }
        separatetxt()

        

        const playing = computed( () => {
            if(audio.value){
                return audio.value.playing()
            } else {
                return false
            }
            return
        })

        const displayAllWords = (view) => {
            for(w in textRender.value) { textRender.value[w].on = view; }
        }

        const play = ()  => {
            if(playing.value){
                audio.value.stop()
                displayAllWords(true)
                return false
            }

            audio.value.play()
            displayAllWords(false)
            var speedtime = (duration.value*1000) / (textRender.value.length)
            var counted = 0
            var interval = setInterval(function(){
                    if(playing.value){
                        textRender.value[counted].on = true
                        counted++
                        if(counted == textRender.value.length){
                            clearInterval(interval)
                        }
                    }
                }, speedtime/1.5)
            }

        
        
        onMounted(()=>{
            ODA.modules.audiotext.push(item.value)
            audio.value = new Howl({ 
                src: [ props.audio ],
                format: ['mp3'],
                onplay: function () {
                },
                onend: function () {
                    displayAllWords(true)
                    completed()
                },
                onstop: function () {
                    displayAllWords(true)
                    completed()
                },
                onload: function () {
                    duration.value = audio.value.duration()
                    let autoplay = props.autoplay==undefined ? true : props.autoplay
                    if(autoplay){
                        play()
                    } else {
                        displayAllWords(true)
                    }
                }
            })
        })

        
        const completed = () => {
            const evName = 'eventCompleted'
            const eventAction = instance.parent.ctx[evName] || (instance.parent.exposed ? instance.parent.exposed[evName] || false : false)
            if(eventAction){ eventAction() }
        }

        return {
            item,
            itemClass,
            textRender,
            play,
            playing
        }
    },
    template: `
    <div :class="[
        'moduleAudiotext text-center',
        itemClass
    ]" ref="item">

        <button @click="play()" :class="[
            'mx-auto rounded-full aspect-square w-8 shrink-0  flex justify-center items-center ',
            playing?'bg-main':'bg-gray-100'
        ]">
            <div v-show="playing"><span  class="iconify aspect-square animate__animated animate__wobble text-[16px]" data-icon="fxemoji:speaker3soundwaves"></span></div>
            <div v-show="!playing"><span class="iconify aspect-square animate__animated animate__pulse animate__infinite text-[16px]" data-icon="fxemoji:speakeronesoundwave"></span></div>
        </button>

    <div>
        <template v-for="txt in textRender" >
            <div :class="['inline-block',txt.on?'animate__animated animate__bounceIn':'opacity-0']" v-html="txt.txt"></div>&nbsp;
        </template>
    </div>
    <!-- <div :class="(txt.on ? 'on' : 'off') + ' ' + (txt.txt=='<br>' ? 'br' : '') " v-html="txt.txt"></div> -->

    </div>
    `
})