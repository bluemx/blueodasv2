app.component('module-dragclone', {
    props: {
        class: String,
        answer: String,
        dropzone: String
    },
    setup (props, context) {
        const ODA = inject('ODA')
        const instance = getCurrentInstance();
        const finalized = ref(false)
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
                onDragEnd: function (e) {
                    if(finalized.value){
                        return false
                    }
                    let wasDropped = false
                    for(let dropzone of ODA.modules.dropzone){
                        let candrop = dropzone.__vueParentComponent.ctx.candrop(props.dropzone)
                        if (this.hitTest(dropzone, '50%') && candrop ) {
                            let clone = item.value.cloneNode(true)
                            clone.setAttribute('data-answer', props.answer)

                            dropzone.appendChild(clone)
                            clone.addEventListener('click', ()=>{
                                dropzone.removeChild(clone)
                            })
                            gsap.to(clone, {
                                x:0,y:0, duration: 0
                            })
                        }
                        
                        gsap.to(item.value, {
                            x:0,y:0,
                            duration:0.5,
                            onComplete:function(e){}
                        })
                    }
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