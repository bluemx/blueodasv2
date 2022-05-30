app.component('layout-box', {
    props: {
        class: String,
        design: [Number, String],
        img: String,
    },
    setup (props, context){
        
        const itemDesign = ref(' rounded-xl ')
        if(props.design!=undefined){
            let boxdesign = ' p-4 border border-gray-200 flex justify-center items-center aspect-square'
            if(props.design=='0'){
                //Same as default
            }
            if(props.design=='1'){
                boxdesign = ' p-2 flex justify-center items-center'
            }
            if(props.design=='2'){
                boxdesign = ' p-2'
            }
            itemDesign.value += boxdesign
        }
        
            
            
        const itemClass = ref(props.class || '')
        
        if(props.img){
            itemClass.value += 'w-full h-full bg-cover bg-no-repeat bg-center relative'
        }
        
        const itemBgImg = props.img ? 'background-image:url('+props.img+')' : ''

        return{
            itemClass,
            itemDesign,
            itemBgImg
        }
    },
    template: `
        <div :class="[
            'layoutBox max-w-full',
            itemDesign,
            itemClass
        ]"
            :style="itemBgImg"
        >
            <slot></slot>
        </div>
        `
})