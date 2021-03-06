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
            
            const evName = 'eventCompleted'
            const eventAction = instance.parent.ctx[evName] || (instance.parent.exposed ? instance.parent.exposed[evName] || false : false)
            if(eventAction){ eventAction() }

            finished.value = true
        }
        setTimeout(()=>{
            completed()
        }, props.time*1000)

        return {
            classItem,
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