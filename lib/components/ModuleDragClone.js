app.component('module-dragclone', {
    props: {
        class: String,
        answer: String,
        dropzone: String
    },
    setup (props, context) {
        const ODA = inject('ODA')
        const instance = getCurrentInstance();
        const item = ref(null)
        const draggable = ref()
        const dropzones = ref()
        const itemClass = ref(props || '')
        const itemParent = ref()
        onMounted(() => {
            
            ODA.modules.dragclone.push(item.value)
            itemParent.value = item.value.parentNode
            itemParent.value.classList.add('z-10')
            
            draggable.value = Draggable.create(item.value, {
                autoScroll: 1,
                onDrag: function (e) {

                }
            })
        })
        return {
            item,
            itemClass
        }
    },
    template: `
        <div :class="['moduleDragClone', itemClass]" ref="item">
            <slot></slot>
        </div>
    `
})