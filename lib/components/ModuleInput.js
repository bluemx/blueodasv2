app.component('module-input', {
    props: {
        answer: String,
        class: String,
        placeholder: String,
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
        const active = ref()
        
        const theanswer = props.answer

        if(props.inmediate){
            RESULTS.okstotal += 1
        }

        const changed = (ev) => {
            if(props.inmediate){
                if(finalizeFN()){
                    finalized.value = true
                    s_ok.play()
                    eventOk()
                } else {
                    eventError()
                }
            }
        }

        emitter.on('finalize', (e => {
            finalized.value = true
            if(finalizeFN()){
                finalized.value = true
                s_ok.play()
            }
        }))

        const eventError = () => {
            if(instance.parent.ctx.eventError){
                instance.parent.ctx.eventError()
            }
        }
        const eventOk = () => {
            const evName = 'eventOk'
            const eOk = instance.parent.ctx[evName] || (instance.parent.exposed ? instance.parent.exposed[evName] || false : false)
            if(eOk){ eOk() }
        }


        const finalizeFN = () => {
            let activeEVAL = active.value ? active.value.toLowerCase() : ''
            activeEVAL = activeEVAL.replace(/\.\s*$/, "")
            let answerEVAL = theanswer.toLowerCase()
            answerEVAL = answerEVAL.replace(/\.\s*$/, "")
            
            if(props.allok){
                result.value = true
                RESULTS.oks++
            } else {
                if(activeEVAL == answerEVAL){
                    result.value = true
                    RESULTS.oks++
                } else {
                    result.value = false
                    RESULTS.errors++
                }
            }
            return result.value
        }



        onMounted(()=>{
            ODA.modules.input.push(item.value)
        })

        return{
            item,
            itemClass,
            active,
            finalized,
            result,
            changed
        }
    },
    template: `
        <div :class="[
                'moduleInput',
                ' inline-block ',
                itemClass
            ]"
            ref="item"
        >
            <util-result :result="result" v-if="finalized" />
            <input v-model="active" @input="changed" :placeholder="placeholder" :readonly="finalized"
                class="text-center w-full rounded border-clear border-2 shadow-oda focus:ring focus:ring-main focus:ring-opacity-50 p-1">
        </div>
        `
})