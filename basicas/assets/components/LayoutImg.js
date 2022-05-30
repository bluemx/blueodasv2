app.component('layout-img', {
    props: {
        class: String,
        img: String,
        imgVariable: String,
    },
    setup (props, context){
        const itemClass = ref(props.class || '')
        const itemImg = ref(props.img)
        const itemImgVariable = ref(props.imgVariable)
        if(itemImgVariable.value){
            itemImg.value = itemImgVariable.value
        }

        return{
            itemClass,
            itemImg
        }
    },
    template: `
        <img :src="itemImg" :class="itemClass">
        `
})