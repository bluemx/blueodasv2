app.component('module-lottie', {
    props: {
       src: String,
       autoplay: [String, Boolean],
       speed: String,
       segment: [Array, Object, String],
       class: String,
       debug: [String, Boolean],
       loop: Boolean,
       audios: [Object, Array, String]
    },
    setup (props, context){
        const ODA = inject('ODA')
        const item = ref()
        const itemClass = props.class || ''
        const animation = ref()
        const instance = getCurrentInstance();
        
        const currentFrame = ref(0)
        const totalFrames = ref(0)

        const audioItems = ref([])
        


        const completed = () => {
            const evName = 'eventCompleted'
            const eventAction = instance.parent.ctx[evName] || (instance.parent.exposed ? instance.parent.exposed[evName] || false : false)
            if(eventAction){ eventAction() }
        }

        if(props.audios){
            for(var au of props.audios){
                var file = new Howl({ src: [ au.file ], format: ['mp3'] })
                audioItems.value.push({time: au.time, file: file})
            }
        }
        const audiosFN = () => {
            const audioitem = audioItems.value.find(x=> (x.time>=currentFrame.value && x.time<=currentFrame.value+5))
            if(audioitem && !audioitem.file.playing()){                
                audioitem.file.play()
            }
        }

        onMounted(()=>{
            ODA.modules.lottie.push(item.value)

            item.value.addEventListener('ready', () => {
                animation.value = item.value.getLottie()
                totalFrames.value = animation.value.totalFrames
                //CurrentFrames
                animation.value.addEventListener('enterFrame', () => {
                    currentFrame.value = Math.round(animation.value.currentFrame)
                    audiosFN()
                })
                //SEGMENT
                if(Array.isArray(props.segment)){
                    animation.value.playSegments(props.segment, true)
                }

                animation.value.addEventListener('complete', () => {
                    completed()
                })                

            })

        })

        return{
            item,
            itemClass,
            currentFrame,
            totalFrames
        }
    },
    template: `
        
        <lottie-player id="abc" :class="['h-auto', itemClass]" ref="item" :src="src" :autoplay="autoplay" :loop="loop" :speed="speed" debug></lottie-player>
        <div v-if="debug">{{currentFrame}}/{{totalFrames}}</div>

    `
})
