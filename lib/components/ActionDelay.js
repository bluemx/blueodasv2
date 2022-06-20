app.component('action-delay', {
    props: {
        time: [Number, String],
        icon: String,
        class: String
    },
    setup (props, context){
        const instance = getCurrentInstance();
        const finished = ref(false)
        const classItem = props.class || ''
        const completed = () => {
            if(instance.parent.ctx.eventCompleted){
                instance.parent.ctx.eventCompleted()
            }
            finished.value = true
        }
        setTimeout(()=>{
            completed()
        }, props.time*1000)

        return {
            finished
        }
    },
    template: `

        <div :class="['flex gap-2 text-xs', classItem]" v-if="!finished" >
            <oda-icon class="animate__animated animate__infinite animate__delay-1s" :name="icon || 'fxemoji:mediumblackcircle'"></oda-icon>
            <oda-icon class="animate__animated animate__infinite animate__delay-2s" :name="icon || 'fxemoji:mediumblackcircle'"></oda-icon>
            <oda-icon class="animate__animated animate__infinite" :name="icon || 'fxemoji:mediumblackcircle'"></oda-icon>
        </div>
    `


})