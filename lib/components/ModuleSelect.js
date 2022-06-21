app.component('module-select', {
    props: {
        answer: [Boolean, String],
        class: String,
        allok: Boolean,
        inmediate: Boolean
    },
    setup (props, context){
        const ODA = inject('ODA')
        const RESULTS = inject('RESULTS')
        const finalized = ref(false)
        const result = ref()
        const instance = getCurrentInstance();

        const item = ref(null)
        const itemClass = ref(props.class || '')
        
        const active = ref(false)
        
        //CONVERT TO BOOLEAN
        let theanswer = props.answer
        if(typeof props.answer == 'string'){
           theanswer = (props.answer == 'true')
        }

        //REGISTER OKS
        if(props.inmediate){
            if(theanswer){
                RESULTS.okstotal += 1
            }
        }

        const select = () => {
            if(finalized.value){
                return false
            }
            if(props.inmediate){
                inmediateFn()
            } else {
                active.value = !active.value
            }
            s_select.play()
            
            
        }

        const inmediateFn = () => {
           if(theanswer){
                active.value = true
                result.value = true
                finalized.value = true
                RESULTS.oks++
                s_ok.play()
                eventOk()
           } else {
                s_error.play()
                eventError()
                RESULTS.errors++
           }
            /*
            if(props.allok){
                result.value = true
                finalized.value = true
            } else {
                if(active.value == theanswer){
                    result.value = true
                    finalized.value = true
                } else {
                    s_error.play()
                }
            }
            if(result.value){
                s_ok.play()
            }
           */
        }

        const eventError = () => {
            if(instance.parent.ctx.eventError){
                instance.parent.ctx.eventError()
            }
        }
        const eventOk = () => {
            if(instance.parent.ctx.eventOk){
                instance.parent.ctx.eventOk()
            }
        }
        
        emitter.on('finalize', (e => {
            finalized.value = true
            if(props.allok){
                result.value = true
                RESULTS.oks++
            } else {
                if(active.value == theanswer){
                    result.value = true
                    RESULTS.oks++
                } else {
                    result.value = false
                    RESULTS.errors++
                }
            }
        }))

        onMounted(()=>{
            ODA.modules.select.push(item.value)
        })

        return{
            item,
            itemClass,
            select,
            active,
            finalized,
            result
        }
    },
    template: `
        <div :class="[
                'moduleSelect',
                'min-w-[2rem] min-h-[2rem] cursor-pointer',
                'flex justify-center items-center',
                itemClass
            ]"
            ref="item"
            @click="select"
        >
            <util-result :result="result" v-if="finalized" />
            <div class="relative w-full h-full flex justify-center items-center">
                <div :class="[
                    'module-select-outline w-full h-full',
                    'absolute z-50',
                    (active?'ring-main ring-4 rounded-full':'')
                    ]"></div>
                    <slot></slot>
                </div>
        </div>
        `
})