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
                'flex justify-center items-center z-10'
            ]" >
                <oda-icon name="uil:check" v-if="result" />
                <oda-icon name="uil:times" v-else />
        </div>
        `
})


app.component('util-text', {
    props:{
        class:String,
        design: String
    },
    setup(props, context){
        
        const itemClass = ref(props.class || '')
        const itemDesign = ref(props.design || 1)

        if(itemDesign.value == 1){
            itemClass.value += '  [text-shadow:1px_1px_0px_rgba(255,255,255,1),3px_3px_2px_rgba(0,0,0,0.15)]'
        }
        if(itemDesign.value == 2){
            itemClass.value += '  relative before:content-[attr(data)] [text-shadow:0px_2px_0px_rgba(255,255,255,.8)]  before:absolute before:left-0 before:top-1  before:z-0 before:opacity-50 after:content-[attr(data)] after:absolute after:left-0 after:top-1.5  after:z-0 after:opacity-30  before:-z-10 after:-z-10  '
        }
        if(itemDesign.value == 3){
            itemClass.value += '  bg-gradient-to-b from-main to-accent bg-clip-text [-webkit-text-fill-color:transparent]'
        }
        if(itemDesign.value == 4){
            itemClass.value += '  bg-gradient-to-b from-sec to-clear bg-clip-text [-webkit-text-fill-color:transparent]'
        }
        if(itemDesign.value == 5){
            itemClass.value += '  bg-gradient-to-b from-isok to-lime-400 bg-clip-text [-webkit-text-fill-color:transparent]'
        }
        if(itemDesign.value == 6){
            itemClass.value += '  bg-gradient-to-b from-notok to-pink-400 bg-clip-text [-webkit-text-fill-color:transparent]'
        }



        const item = ref(null)
        const itemContent = ref("")
        onMounted(()=>{
            itemContent.value = item.value.innerHTML
        })
        return {
            itemClass,
            item,
            itemContent
        }
    },
    template: `
        <div class="util-text" :class="itemClass" :data="itemContent" ref="item">
            <slot></slot>
        </div>
    `
})