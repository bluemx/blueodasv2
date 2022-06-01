app.component('module-drag',{
    props: {
        class: String,
        answer: String,
        liner: String,
        design: String,
        connector: String,
        allok: Boolean,
        onlyOk: Boolean
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


        const hasLiner = (props.liner!=undefined && props.liner!="0" && props.liner!=0)
        const hasConnector = (props.connector!=undefined && props.connector!="0" && props.connector!=0)


        onMounted(()=>{
            ODA.modules.drag.push(item.value)
            itemParent.value = item.value.parentNode

            itemParent.value.classList.add('z-10')

            draggable.value = Draggable.create(item.value,{
                autoScroll:1,
                onClick: function(e) {
                    if(finalized.value){
                        return false
                    }
                    if(item.value.parentNode == itemParent.value){
                        return false
                    }
                    itemParent.value.appendChild(item.value)
                    updateLiner('hide')

                    updateFitty()
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
                        let candrop = dropzone.__vueParentComponent.ctx.candrop()
                        if (this.hitTest(dropzone, '50%') && candrop ) {


                            dropzone.appendChild(item.value)
                            gsap.to(item.value, {
                                x:0,y:0,
                                duration:0,
                                onComplete:function(e){}
                            })
                            s_select.play()
                            wasDropped = true
                            updateFitty()

                            
                            



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

            

            if(hasLiner){
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
            if(hasLiner){
                if(action){
                    liner.value[action]('draw')
                } else {
                    liner.value.position();
                }
            }
        }

        const updateFitty = () => {
            if(item.value.classList.contains('fitty')){
                setTimeout(()=>{
                    fitty.fitAll()
                }, 250)
            }
        }

        if(props.design==undefined || props.design==0 || props.design=="0"){

        } else if(props.design=="1"){
            itemClass.value += ' bg-white rounded p-2 shadow-oda text-center border-2 border-grey-100 border-solid w-fit min-w-[4rem] max-w-full flex justify-center items-center'
        }


        if(hasConnector){
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

            if(props.allok){
                result.value = true
                RESULTS.oks++
            } else {

                if(props.answer==""){
                    //EMPTY ANSWER
                    if(currentParent == itemParent.value){
                        finalizeResult(true)
                    } else {

                        finalizeResult(false)
                    }
                } else {
                    //DIDNT MOVE PARENTNODE
                    if(currentParent == itemParent.value){
                        finalizeResult(false)
                    } else {
                        if(currentParent.__vueParentComponent.ctx.answer == props.answer){
                            finalizeResult(true)
                        } else {
                            finalizeResult(false)
                        }
                    }
                }
            }
        }))

        const finalizeResult = (isok) => {
            if(isok){
                result.value = true
                RESULTS.oks++
            } else {
                if(props.onlyOk){
                    console.log('onlyok')
                    return false
                }
                result.value = false
                RESULTS.errors++
            }
        }

        return {
            item,
            itemClass,
            connectorClass,
            finalized,
            result,
            hasLiner,
            hasConnector
        }
    },
    template: `
        <div :class="['moduleDrag', itemClass]" ref="item">
            <util-result :result="result" v-if="finalized && !onlyOk" />    
            <slot></slot>
            <div 
                :class="[
                    'module-drag-connector',
                    'w-6 h-6 rounded-full bg-white border-4 shadow-oda',
                    connectorClass,
                ]"
                v-if="hasConnector"></div>
        </div>
        
        `
        
})



app.component('module-drop',{
    props: {
        class: String,
        answer: String,
        design: String,
        limit: String
    },
    setup (props, context) {
        const ODA = inject('ODA')
        
        const itemClass = ref(props.class || ' ')
        
        itemClass.value += ' p-1 flex justify-center items-center flex-col gap-2'
        
        const item = ref(null)
        const dropLimits = ref(0)

        if(props.design=="1"){
            itemClass.value += ' rounded-xl border-dashed border-2 border-accent'
        }

        if(props.limit=="0" || !props.limit){
            dropLimits.value = 0
        } else {
            dropLimits.value = parseInt(props.limit)
        }

        const candrop = () => {
            let result = true
            const children = item.value.children.length - 1
            if(dropLimits.value==0){
                result = true
            } else {
                if(children<dropLimits.value){
                    result = true
                } else {
                    result = false
                }
            }
            return result
        }



        onMounted(()=>{
            ODA.modules.dropzone.push(item.value)
        })

        return{
            item,
            itemClass,
            candrop
        }
    },
    template: `
        <div :class="['moduleDrop relative', itemClass]" ref="item">
            <slot></slot>
            <oda-icon name="uil:arrow-down" class="absolute z-0 text-xl opacity-30" />
        </div>
    `
})