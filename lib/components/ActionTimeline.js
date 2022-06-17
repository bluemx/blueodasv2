app.component('action-timeline', {
    props: {
        show: [Number, String],
        hide: [Number, String],
        completed: [Number, String],
        showDelay: [Number, String],

    },
    setup (props, context){
        const ODA = inject('ODA')
        const item = ref()

        
        const maxscenenumber = Math.max(parseInt(props.show)||0, parseInt(props.hide)||0, parseInt(props.completed)||0)
        ODA.timelineTotal = ODA.timeline<maxscenenumber ? maxscenenumber : ODA.timelineTotal
        

        const ready = ref(true)

        const isVisible = computed(()=>{
            var isvis = true
            if(props.show !== ""){
                if(ODA.timeline < parseInt(props.show)){
                    isvis = false
                }
            }
            if(props.hide !== ""){
                if(ODA.timeline >= parseInt(props.hide)){
                    isvis = false
                }
            }
            return isvis
        })

        watch(
            ()=>isVisible.value,
            ()=>{
                if(isVisible.value){
                    if(props.showDelay>0){
                        ready.value = false
                        setTimeout(()=>{
                            ready.value = true
                        }, props.showDelay*1000)
                    } else {
                        //Nothing
                    }
                }
            }
            )


        const eventCompleted = () => {
            if(props.completed !== ""){
                if(ODA.timeline<parseInt(props.completed)){
                    ODA.timeline = parseInt(props.completed)
                }
            }
        }


        onMounted(()=>{

        })
        return{
            item,
            isVisible,
            ready,
            eventCompleted

        }
    },
    template: `
        <template v-if="isVisible && ready">
            <slot></slot>
        </template>
    `
})
