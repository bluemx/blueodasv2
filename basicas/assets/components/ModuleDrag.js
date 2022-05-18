app.component('module-drag',{
    props: {
        class: String,
        answer: String,
        liner: String,
        design: String,
        connector: String
    },
    setup (props, context) {
        const ODA = inject('ODA')
        const RESULTS = inject('RESULTS')
        const finalized = ref(false)
        const result = ref()

        let uid = (Math.random() + 1).toString(36).substring(7);
        const item = ref(null)
        const draggable = ref()
        const dropzones = ref([])

        const itemClass = ref(props.class || ' ')
        const itemParent = ref()
        const liner = ref(null)
        const connectorClass = ref('')

        const themeColors = tailwind.config.theme.extend.colors
        const themeColorsArray = Object.keys(themeColors)
        const itemColor = ref(themeColors[themeColorsArray[Math.floor(Math.random()*5)]])





        onMounted(()=>{
            ODA.modules.drag.push(item.value)
            itemParent.value = item.value.parentNode
            draggable.value = Draggable.create(item.value,{
                onClick: function(e) {
                    if(finalized.value){
                        return false
                    }
                    if(item.value.parentNode == itemParent.value){
                        return false
                    }
                    itemParent.value.appendChild(item.value)
                    updateLiner('hide')  
                },
                onDrag: function(e){
                    if(finalized.value){
                        return false
                    }
                    updateLiner('show')
                    updateLiner()
                },
                onDragEnd: function(e) {
                    if(finalized.value){
                        return false
                    }
                    let wasDropped = false
                    for(let dropzone of ODA.modules.dropzone){
                    //for(let i in ODA.modules.dropzone){
                        if (this.hitTest(dropzone, '50%')) {
                            dropzone.appendChild(item.value)
                            gsap.to(item.value, {
                                x:0,y:0,
                                duration:0,
                                onComplete:function(e){}
                            })
                            s_select.play()
                            wasDropped = true
                        } else {
                            gsap.to(item.value, {
                                x:0,y:0,
                                duration:0.3,
                                onComplete:function(e){updateLiner()}
                            })                            
                        }
                    }
                    if(!wasDropped){
                        if(item.value.parentNode == itemParent.value){
                            updateLiner('hide')
                        }
                    }

                 }
            })

            

            if(props.liner!=undefined){
                if(props.liner!=""){
                    itemColor.value = themeColors[themeColorsArray[props.liner]]
                }

                liner.value = new LeaderLine(
                    itemParent.value,
                    item.value,
                    {
                        dash: true,
                        color: itemColor.value
                    }
                )
                
                liner.value.setOptions({startSocket: 'auto', endSocket: 'auto'})
                window.addEventListener('scroll', AnimEvent.add(function() {
                    updateLiner()
                }), false);
                liner.value['hide']('none')

            }

        })

        const updateLiner = (action) => {
            if(props.liner!=undefined){
                if(action){
                    liner.value[action]('draw')
                } else {
                    liner.value.position();
                }
            }
        }

        if(props.design!=undefined){
            if(props.design=="" || props.design=="1"){
                itemClass.value += ' bg-white rounded p-2 shadow-oda text-center border-2 border-grey-100 border-solid w-fit min-w-[6rem] flex justify-center items-center'
            }
        }

        if(props.connector!=undefined){
            itemClass.value = ' w-6 h-6'
            let connectorColor = ' border-['+itemColor.value+'] '
            if(props.connector!=""){
                connectorColor = ' border-['+themeColors[themeColorsArray[props.liner]]+'] '
            }
            connectorClass.value += connectorColor
        }


        emitter.on('finalize', (e => {
            finalized.value = true
            draggable.value[0].disable()

            
            let currentParent = item.value.parentNode

            if(props.answer==""){
                //EMPTY ANSWER
                if(currentParent == itemParent.value){
                    result.value = true
                    RESULTS.oks++
                } else {
                    result.value = false
                    RESULTS.errors++
                }
            } else {
                //DIDNT MOVE PARENTNODE
                if(currentParent == itemParent.value){
                    result.value = false
                    RESULTS.errors++
                } else {
                    if(currentParent.__vueParentComponent.ctx.answer == props.answer){
                        result.value = true
                        RESULTS.oks++
                    } else {
                        result.value = false
                        RESULTS.errors++
                    }
                }
            }

         
        }))

        return {
            item,
            itemClass,
            connectorClass,
            finalized,
            result
        }
    },
    template: `
        <div :class="['moduleDrag', itemClass]" ref="item">
            <util-result :result="result" v-if="finalized" />    
            <slot></slot>
            <div 
                :class="[
                    'module-drag-connector',
                    'w-6 h-6 rounded-full bg-white border-4 shadow-oda',
                    connectorClass,
                ]"
                v-if="connector!=undefined"></div>
        </div>
        
        `
        
})



app.component('module-drop',{
    props: {
        class: String,
        answer: String,
        design: String
    },
    setup (props, context) {
        const ODA = inject('ODA')
        
        const itemClass = ref(props.class || ' ')
        
        itemClass.value += ' p-1 flex justify-center items-center flex-col gap-2'
        
        const item = ref(null)

        if(props.design!=undefined){
            itemClass.value += ' rounded-xl border-dashed border-2 border-accent bg-pastel1'
        }

        onMounted(()=>{
            ODA.modules.dropzone.push(item.value)
        })

        return{
            item,
            itemClass
        }
    },
    template: `
        <div :class="['moduleDrop relative', itemClass]" ref="item">
            <slot></slot>
            <oda-icon name="uil:arrow-down" class="absolute z-0 text-xl opacity-30" />
        </div>
    `
})