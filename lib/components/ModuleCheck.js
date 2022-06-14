app.component('module-check', {
    props: {
        answer: Number,
        class: String,
        options: Array,
        float: String,
        allok: Boolean,
        useclass: Boolean
    },
    setup (props, context){
        const ODA = inject('ODA')
        const RESULTS = inject('RESULTS')
        const finalized = ref(false)
        const result = ref()

        const options = ['', ...props.options]

        const item = ref(null)
        const itemClass = ref(props.class || '')
        const itemCheckClass = ref('')

        const useclass = ref(props.useclass || false)

        if(props.float==undefined || props.float==""){

        } else {
            itemCheckClass.value += "absolute z-10 "
            let pos = 'top-2 left-2'
            if(props.float=='topleft'){pos=' top-2 left-2 '}
            if(props.float=='topright'){pos=' top-2 right-2 '}
            if(props.float=='bottomleft'){pos=' bottom-2 left-2 '}
            if(props.float=='bottomright'){pos=' bottom-2 right-2 '}
            itemCheckClass.value += pos 
        }



        
        
        const active = ref(0)

        const clicked = () => {
            if(finalized.value){
                return false
            }
            active.value += 1
            s_select.play()
            if(active.value>options.length-1){
                active.value = 0
            }
        }

        emitter.on('finalize', (e => {
            finalized.value = true
            
            if(props.allok){
                result.value = true
                RESULTS.oks++
            } else {

                if(props.answer == active.value){
                    result.value = true
                    RESULTS.oks++
                } else {
                    result.value = false
                    RESULTS.errors++
                }
            }
        }))

        onMounted(()=>{
            ODA.modules.check.push(item.value)
        })

        return{
            item,
            itemClass,
            itemCheckClass,
            options,
            clicked,
            active,
            finalized,
            result,
            useclass
        }
    },
    template: `
        <div :class="[
                'moduleCheck',
                'flex cursor-pointer items-center relative rounded',
                itemClass,
                useclass?options[active]:''
            ]"
            @click="clicked"
            ref="item"
        >
            <util-result :result="result" v-if="finalized" />
            <div :class="[
                'module-check-box',
                'w-9 h-9 flex items-center justify-center mr-2 rounded-full',
                'border-2 border-solid border-clear',
                'bg-white shadow-oda',
                itemCheckClass
            ]" v-if="!useclass">
                <template v-for="(icon, index) in options">
                    <template v-if="index==active ">
                        <oda-icon :name="icon" v-if="icon"  />
                    </template>
                </template>
            </div>
            <slot></slot>
        </div>
        `
})