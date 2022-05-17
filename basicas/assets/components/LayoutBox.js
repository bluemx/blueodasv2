app.component('layout-box', {
    props: {
        class: String,
        design: String,
        img: String,
    },
    setup (props, context){
        
        const itemDesign = ref(' rounded-xl ')
        if(props.design!=undefined){
            let boxdesign = ' p-4 border border-gray-200 aspect-square flex justify-center items-center'
            if(props.design=='box'){
                //Same as default
            }
            if(props.design=='simple'){
                boxdesign = ' p-2 flex justify-center items-center'
            }
            if(props.design=='text'){
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
            'layoutBox',
            itemDesign,
            itemClass
        ]"
            :style="itemBgImg"
        >
            <slot></slot>
        </div>
        `
})