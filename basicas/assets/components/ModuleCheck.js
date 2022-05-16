app.component('module-check', {
    props: {
        answer: Number,
        class: String,
        iconsList: Array
    },
    setup (props, context){
        const RESULTS = inject('RESULTS')
        const finalized = ref(false)
        const result = ref()

        const options = ['', ...props.iconsList]

        const itemClass = props.class || ''
        
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
            if(props.answer == active.value){
                result.value = true
                RESULTS.oks++
            } else {
                result.value = false
                RESULTS.errors++
            }
        }))

        return{
            itemClass,
            options,
            clicked,
            active,
            finalized,
            result
        }
    },
    template: `
        <div :class="[
                'moduleCheck',
                'flex cursor-pointer items-center',
                itemClass
            ]"
            @click="clicked"
        >
            <util-result :result="result" v-if="finalized" />
            <div class="
                module-check-box
                w-9 h-9 flex items-center justify-center mr-2 rounded-full
                bg-white
                border-2 border-solid border-clear
                shadow-oda
                ">
                <template v-for="(icon, index) in options">
                    <template v-if="index==active ">
                        <oda-icon :name="icon" v-if="icon"  />
                    </template>
                </template>
            </div>
            <slot></slot>
            {{active}}
        </div>
        `
})