app.component('module-video', {
    props: {
       src: String,
       autoplay: [String, Boolean],
       class: String,
       loop: Boolean,

    },
    setup (props, context){
        const ODA = inject('ODA')
        const item = ref()
        const video = ref()
        const player = ref(null)
        const itemClass = props.class || ''
        const instance = getCurrentInstance();
        const poster = 'data:image/png;base64,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'
        
        



        const completed = () => {
            if(instance.parent.ctx.eventCompleted){
                instance.parent.ctx.eventCompleted()
            }
        }

        onMounted(()=>{
            ODA.modules.video.push(item.value)
            player.value = new Plyr(video.value, {
                controls: ['play', 'progress', 'mute', 'volume', 'fullscreen']
            })
            player.value.loop = props.loop || false
            player.value.speed = parseInt(props.speed) || 1
            //player.value.autoplay = props.autoplay || true
            player.value.poster = poster
            player.value.controls = ['play', 'progress']
            if(props.autoplay == "true" || props.autoplay){
                setTimeout(()=>{
                    player.value.play()
                }, 500) 
            }
            player.value.source = {
                type: 'video',
                sources: [
                    {
                        src: props.src,
                        type: 'video/mp4'
                    }
                ]
            }
            player.value.on('ended', () => {
                completed()
            })
            
        })

        return{
            item,
            itemClass,
            video
        }
    },
    template: `
        
        <div ref="item" :class="['p-3 shadow-oda rounded-xl bg-white', itemClass]">
            <div class="rounded-xl overflow-hidden  bg-white">
                <video ref="video" ></video>
            </div>
        </div>

    `
})