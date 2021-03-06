app.component('module-drag',{
    props: {
        class: String,
        answer: String,
        liner: String,
        design: String,
        connector: String,
        allok: Boolean,
        onlyOk: Boolean,
        onlyError: Boolean,
        dropzone: String,
        inmediate: Boolean,
        clone: Boolean,
        cloneDeletable: Boolean,
        okIsVariable: String,
        deletableIsVariable: String,
        disableOk: Boolean
    },
    setup (props, context) {
        const ODA = inject('ODA')
        const RESULTS = inject('RESULTS')
        const finalized = ref(false)
        const result = ref(null)
        const instance = getCurrentInstance();

        let uid = (Math.random() + 1).toString(36).substring(7);
        const item = ref(null)
        const draggable = ref()
        const dropzones = ref()

        const itemClass = ref(props.class || ' ')
        const itemParent = ref()
        const liner = ref(null)
        const connectorClass = ref('')

        const itemSlot = ref()

        const themeColors = tailwind.config.theme.extend.colors
        const themeColorsArray = Object.keys(themeColors)
        const itemColor = ref(themeColors[themeColorsArray[Math.floor(Math.random()*5)]])


        const hasLiner = (props.liner!=undefined && props.liner!="0" && props.liner!=0)
        const hasConnector = (props.connector!=undefined && props.connector!="0" && props.connector!=0)

        const cloning = (props.clone != undefined && props.clone == true)

        watch(
            ()=>ODA.scene,
            ()=>{
                updateLiner('hide')
            }
        )

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
                    draggable.value[0].enable()
                    itemParent.value.appendChild(item.value)
                    updateLiner('hide')
                    updateFitty()
                    eventReset()
                },
                onDrag: function(e){
                    if(finalized.value){
                        return false
                    }
                    updateLiner('show')
                    updateLiner()
                    scrollNearBottom(e)

                },
                onDragEnd: function(e) {
                    if(finalized.value){
                        return false
                    }
                    let wasDropped = false
                    for(let dropzone of ODA.modules.dropzone){
                        
                        let candrop = dropzone.__vueParentComponent.ctx.candrop(props.dropzone)
                        if (this.hitTest(dropzone, '50%') && candrop ) {

                            if(cloning){
                                dropClone(dropzone)
                            } else {
                                dropAppend(dropzone)
                            }

                            
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
                    emitter.emit('stopModuleAudio')
                 }
            })
            
            

            if(hasLiner){
                let options = {
                    color: itemColor.value
                }
                if(props.liner == 1){
                    options = {
                        ...options,
                        dash: true
                    }
                }
                if(props.liner == 2){
                    options = {
                        ...options,
                        dash: {animation:true}
                    }
                }
                if(props.liner == 3){
                    options = {
                        ...options,
                        path: 'arc'
                    }
                }
                if(props.liner == 4){
                    options = {
                        ...options,
                        path: 'straight'
                    }
                }
                if(props.liner == 5){
                    options = {
                        ...options,
                        path: 'grid'
                    }
                }

                liner.value = new LeaderLine( itemParent.value, item.value, options )
                
                liner.value.setOptions({startSocket: 'auto', endSocket: 'auto'})
                window.addEventListener('scroll', AnimEvent.add(function() {
                    updateLiner()
                }), false);
                liner.value['hide']('none')

            }

        })


        const dropAppend = (dropzone) => {
            dropzone.appendChild(item.value)
            if(props.inmediate){
                inmediateFn(item.value)
            }
        }
        const dropClone = (dropzone) => {
            let clone = item.value.cloneNode(true)
            clone.setAttribute('data-answer', props.answer)
            dropzone.appendChild(clone)
            if(props.cloneDeletable){
                clone.addEventListener('click', ()=>{
                    dropzone.removeChild(clone)
                })
            }
            gsap.to(clone, {
                x:0,y:0, duration: 0
            })

            let cloneDropped = dropzone.__vueParentComponent.ctx.cloneDropped(clone)
            
        }

       

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


        if(props.inmediate){
            if(props.answer!="" && !props.disableOk){
                RESULTS.okstotal += 1
            }
        }


        const inmediateFn = (itemObj) => {
            if(finalizeFn()){
                if(!props.disableOk){
                    RESULTS.oks++
                    result.value = true
                    finalized.value = true
                }
                draggable.value[0].disable()
                
                if(itemObj){
                    itemObj.parentNode.__vueParentComponent.ctx.itemDropped()
                }
                s_ok.play()
                eventOk()
            } else {
                RESULTS.errors++
                s_error.play()
                itemParent.value.appendChild(item.value)
                eventError()
            }
        }


        const eventError = () => {
            if(instance.parent.ctx.eventError){
                instance.parent.ctx.eventError()
            }
        }
        const eventOk = () => {
            const evName = 'eventOk'
            const eOk = instance.parent.ctx[evName] || (instance.parent.exposed ? instance.parent.exposed[evName] || false : false)
            if(eOk){ eOk() }
        }
        const eventReset = () => {
            const evName = 'eventReset'
            const eOk = instance.parent.ctx[evName] || (instance.parent.exposed ? instance.parent.exposed[evName] || false : false)
            if(eOk){ eOk();}

        }


        
        emitter.on('finalize', (e => {
            finalized.value = true
            draggable.value[0].disable()
            finalizeFn()
        }))


        const finalizeFn = () =>{
            let currentParent = item.value.parentNode
            let resultIs = false
            if(props.allok){
                finalizeResult(true)
            } else {
                if(props.answer==""){
                    //EMPTY ANSWER
                    if(currentParent == itemParent.value){
                        finalizeResult(true)
                        resultIs=true
                    } else {
                        finalizeResult(false)
                        resultIs=false
                    }
                } else {
                    //DIDNT MOVE PARENTNODE
                    if(currentParent == itemParent.value){
                        finalizeResult(false)
                        resultIs=false
                    } else {
                        if(currentParent.__vueParentComponent.ctx.answer == props.answer){
                            finalizeResult(true)
                            resultIs=true
                        } else {
                            finalizeResult(false)
                            resultIs=false
                        }
                    }
                }
            }
            return resultIs
        }

        const finalizeResult = (isok) => {
            if(props.inmediate){
                return false
            }
            if(isok){
                if(props.onlyError){
                    return false
                }
                result.value = true
                RESULTS.oks++
            } else {
                if(props.onlyOk){
                    return false
                }
                result.value = false
                RESULTS.errors++
            }
        }

        const scrollNearBottom = (e) => {
            if(Math.round(e.y) > window.innerHeight-100){
                window.scrollBy(0,5)
            }
        }

        return {
            item,
            itemClass,
            connectorClass,
            finalized,
            result,
            hasLiner,
            hasConnector,
            itemSlot
        }
    },
    template: `
        <div :class="['moduleDrag', itemClass]" ref="item">
            <template v-if="finalized">
                <util-result :result="result" v-if="!onlyOk && !onlyError" />
                <util-result :result="result" v-else-if="result===false && onlyError" />
                <util-result :result="result" v-else-if="result===true && onlyOk" />

            </template>
            
            <slot ref="itemSlot"></slot>
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

