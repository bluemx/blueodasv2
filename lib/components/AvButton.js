app.component('av-button', {
    props: {
        nextscene: [Boolean, String],
        nexttimeline: [Boolean, String],
        emitCompleted: [Boolean, String],
        emitOk: [Boolean, String],
        emitError: [Boolean, String],
        class: String
    },
    setup (props, context){
        const item = ref()
        const instance = getCurrentInstance();

        const ODA = inject('ODA')
        const itemClass = props.class || ''
        const action = () => {
            if(props.nextscene){
                ODA.scene +=1 
            }
            if(props.nexttimeline){
                ODA.timeline += 1
            }
            if(props.emitCompleted){
                if(instance.parent.ctx.eventCompleted){
                    instance.parent.ctx.eventCompleted()
                }
            }
            if(props.emitOk){
                if(instance.parent.ctx.eventOk){
                    instance.parent.ctx.eventOk()
                }
            }
            if(props.emitError){
                if(instance.parent.ctx.eventError){
                    instance.parent.ctx.eventError()
                }
            }

        }

        return {
            item,
            action,
            itemClass
        }
    },
    template: `
        <button ref="item" :class="[
            'font-extrabold px-6 py-2 bg-accent text-white text-xl rounded-2xl',
            itemClass
        ]" @click="action"><slot></slot></button>
       
    `


})