#terser mitt.js howler.js dom-to-image.js vue.prod.js anim-event.min.js anim-event.min.js leader-line.js gsap.min.js Draggable.min.js tailwind.js --compress --timings -o ../libs.js &&
cd jslibs/ &&
terser mitt.js howler.js dom-to-image.js vue.prod.js anim-event.min.js anim-event.min.js leader-line.js gsap.min.js Draggable.min.js tailwind.js fitty.js lottie-player.js plyr.js --timings -o ../libs.js &&
cd ../ &&
cd components/ &&
terser OdaTitulo.js OdaInstruccion.js OdaIcon.js OdaFinalizar.js Utilities.js LayoutGrid.js LayoutBox.js LayoutImg.js ModuleCheck.js ModuleDrag.js ModuleInput.js ModuleSelect.js ModuleChoice.js ModuleCustomCode.js ActionRepeater.js   --compress --timings -o ../components.js &&
echo 'End'
