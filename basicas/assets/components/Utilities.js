app.component('util-result', {
    props: {
        result: Boolean
    },
    setup (props, context){
        const result = props.result
        const item = ref(null)
        onMounted(()=>{
            item.value.parentNode.classList.add('relative', 'ring', 'ring-offset-4', 'rounded')
            //item.value.parentNode.classList.add(result?'isok':'notok')
            item.value.parentNode.classList.add(result?'ring-isok':'ring-notok')

        })

        return{
            result,
            item
        }
    },
    template: `
        <div ref="item" :class="[
                'result', 
                result?'isok bg-isok':'notok bg-notok',
                'absolute -top-4 -right-4',
                'w-6 h-6 rounded-full text-white text-lg',
                'flex justify-center items-center'
            ]" >
                <oda-icon name="uil:check" v-if="result" />
                <oda-icon name="uil:times" v-else />
        </div>
        `
})