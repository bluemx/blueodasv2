app.component('av-scorebox', {
    props: {
        points: Number
    },
    setup (props, context){
        const ODA = inject('ODA')
        const item = ref()

        const counting = ref(0)

        const toggleIcon = ref(false)

        const counterval = setInterval(()=>{
            if(counting.value<props.points){
                if(counting.value<props.points-30){
                    counting.value+=3
                } else {
                    counting.value++
                }
            } else if(counting.valur==props.points){
                clearInterval(counterval)
            }
        }, 50)

        setInterval(()=>{
            toggleIcon.value = !toggleIcon.value
        }, 5000)

        onMounted(()=>{

        })
        return{
            item,
            counting,
            toggleIcon
        }
    },
    template: `
    <div :class="[
        'avScorebox',
        'flex bg-sec text-white text-center rounded-xl  justify-center items-center shadow-oda p-0.5 md:p-2'
        ]">
        
        <oda-icon v-if="toggleIcon" name="fxemoji:star"></oda-icon>
        <oda-icon v-else name="fxemoji:sparkles"></oda-icon>
        <div class="text-xl md:text-2xl font-extrabold ml-1">{{counting}}</div>
    </div>
    `
})
