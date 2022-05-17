app.component('layout-img', {
    props: {
        class: String,
        img: String,
    },
    setup (props, context){
                   
        const itemClass = ref(props.class || '')
        const itemImg = ref(props.img)

        return{
            itemClass,
            itemImg
        }
    },
    template: `
        <img :src="itemImg" :class="itemClass">
        `
})