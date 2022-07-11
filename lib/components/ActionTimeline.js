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
  },
  setup(props, context) {
    const ODA = inject("ODA");
    const item = ref();

    const audiosList = [
      ["completed", props.completedAudio],
      ["error", props.errorAudio],
      ["ok", props.okAudio],
    ];
    const audios = ref({});

    for (var i in audiosList) {
        const item = audiosList[i]
      if (item[1] != "" && audiosList != undefined) {
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
        timelineUp('ok')
    };
    const eventError = () => {
        timelineUp('error')
    };

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
