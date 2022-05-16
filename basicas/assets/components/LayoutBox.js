app.component('layout-box', {
    props: {
        class: String,
        design: String
    },
    setup (props, context){
        
        const itemDesign = ref('')
        switch(props.design){
            case 'simple':
                itemDesign.value = 'p-4 border border-gray-200 aspect-square rounded-xl flex justify-center items-center text-center'
                break;
        }
        
        const itemClass = props.class || ''
        return{
            itemClass,
            itemDesign
        }
    },
    template: `
        <div :class="[
            'layoutBox',
            itemDesign,
            itemClass
        ]">
            <slot></slot>
        </div>
        `
})