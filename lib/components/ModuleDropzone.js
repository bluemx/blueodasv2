app.component('module-drop',{
    props: {
        class: String,
        answer: String,
        design: String,
        limit: String,
        noArrow: Boolean,
        horizontal: [Boolean],
        name: String,
        emptyIsError: Boolean
    },
    setup (props, context) {
        const ODA = inject('ODA')
        const RESULTS = inject('RESULTS')

        const itemResult = ref(null)
        const finalized = ref(false)


        const item = ref(null)
        const itemClass = ref(props.class || ' ')
        

        const veticalHorizontal = ref('flex-col')
        if(props.horizontal==true){
            veticalHorizontal.value="flex-row"
        }

        itemClass.value += ' p-1 flex justify-center items-center gap-2 ' + veticalHorizontal.value + ' ' 
        
        const dropLimits = ref(0)

        const noArrow = props.noArrow || false

        if(props.design=="1"){
            itemClass.value += ' rounded-xl border-dashed border-2 border-accent'
        }

        if(props.limit=="0" || !props.limit){
            dropLimits.value = 0
        } else {
            dropLimits.value = parseInt(props.limit)
        }

        const cloneDropped = (itemDrag) => {
            let itemAnswer = itemDrag.getAttribute('data-answer')
            if(itemAnswer == props.answer){
                //OK
                RESULTS.oks++
                s_ok.play()
            } else {
                item.value.removeChild(itemDrag)
                s_error.play()
            }

        }

        const candrop = (dropzoneGroup) => {
            if(dropzoneGroup != props.name){
                return false
            }
            let result = true    
            let children = 0        
            if(item.value){
                children = item.value.children.length - 1
                if(dropLimits.value==0){
                    result = true
                } else {
                    if(children<dropLimits.value){
                        result = true
                    } else {
                        result = false
                    }
                }
            } else {
                result = false
            }
            
            
            return result
        }

        emitter.on('finalize', (e => {
            finalized.value = true
            if(props.emptyIsError){
                if( (children = item.value.children.length - 1) == 0 ){
                    itemResult.value = false
                    RESULTS.errors++
                } else {
                    itemResult.value = true
                }

            }
        }))

        onMounted(()=>{
            
            ODA.modules.dropzone.push(item.value)
        })

        return{
            item,
            itemClass,
            candrop,
            noArrow,
            cloneDropped,
            itemResult,
            finalized
        }
    },
    template: `
        <div :class="['moduleDrop relative flex-wrap', itemClass]" ref="item">
            <template v-if="finalized && emptyIsError">
                <util-result :result="itemResult" v-if="itemResult===false" />
            </template>
            <slot></slot>
            <oda-icon :name="noArrow?'':'uil:arrow-down'" class="absolute z-0 text-xl opacity-30" />
        </div>
    `
})