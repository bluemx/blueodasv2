app.component("action-timeline", {
  props: {
    show: [Number, String],
    hide: [Number, String],
    completed: [Number, String],
    completedAudio: [String],
    error: [Number, String],
    errorAudio: [String],
    ok: [Number, String],
    okAudio: [String],
    multiok: [Object]
  },
  setup(props, context) {
    const ODA = inject("ODA");
    const item = ref();
    const counter = ref({
      multiok: 0
    })

    
    
    const audiosList = ref([
      ["completed", props.completedAudio],
      ["error", props.errorAudio],
      ["ok", props.okAudio],
    ]);

    const separateMulti = (arry, name) => {
      for(var i in arry){
        //Audios
        if(arry[i][1]){
          audiosList.value.push([name+'-'+(parseInt(i)+1), arry[i][1]])
        }
      }
    }

    if(props.multiok && props.multiok.length>0){
      separateMulti(props.multiok, 'ok')
    }

    const audios = ref({});

    for (var i in audiosList.value) {
        const item = audiosList.value[i]
      if (item[1] != "" && audiosList.value != undefined) {
        let file = item[1]
        if(audiovariables.includes(file)){
            audios.value[item[0]] = eval(file)
        } else {
            audios.value[item[0]] = new Howl({
                src: [file],
                format: ["mp3"],
                autoplay: false,
            })
        }
      }
    }


    

    const maxscenenumber = Math.max(
      parseInt(props.show) || 0,
      parseInt(props.hide) || 0,
      parseInt(props.completed) || 0
    );




    ODA.timelineTotal =
      ODA.timeline < maxscenenumber ? maxscenenumber : ODA.timelineTotal;

    const ready = ref(true);

    const isVisible = computed(() => {
      var isvis = true;
      if (props.show !== "") {
        if (ODA.timeline < parseInt(props.show)) {
          isvis = false;
        }
      }
      if (props.hide !== "") {
        if (ODA.timeline >= parseInt(props.hide)) {
          isvis = false;
        }
      }
      return isvis;
    });

    watch(
      () => isVisible.value,
      () => {
        if (isVisible.value) {
          if (props.showDelay > 0) {
            ready.value = false;
            setTimeout(() => {
              ready.value = true;
            }, props.showDelay * 1000);
          } else {
            //Nothing
          }
        }
      }
    );

    const eventCompleted = () => {
      timelineUp('completed')
    };
    const eventOk = () => {
        if(props.multiok && props.multiok.length>0){
          timelineUpConditional('multiok', 'ok')

        } else {
          timelineUp('ok')
        }
    };
    const eventError = () => {
        timelineUp('error')
    };



    const timelineUpConditional = (type, name) => {
      
      counter.value[type]++
      let propCounter = counter.value[type]-1
      let propArray = props[type]
      let propArrayOkItem = propArray[propCounter]

      let propTimelinePosition = parseInt(propArrayOkItem[0])
      let propAudio = propArrayOkItem[1]

      if(ODA.timeline < propTimelinePosition){
        ODA.timeline = propTimelinePosition

      }

      if(propAudio){
        audios.value[name+'-'+(propCounter+1)].play()

      }

      
    }

    const timelineUp = (event) => {
        if(props[event]!=""){

            if (ODA.timeline < parseInt(props[event])) {
                ODA.timeline = parseInt(props[event]);
            }
        }
        if(event in audios.value){
            audios.value[event].play()
        }
    }

    onMounted(() => {});
    return {
      item,
      isVisible,
      ready,
      eventCompleted,
      eventOk,
      eventError
    };
  },
  template: `
        <template v-if="isVisible && ready">
            <slot></slot>
        </template>
    `,
});
