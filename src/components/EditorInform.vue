<template>
  <div style="height: 96%;width: 100%;">
    <div id="toolbar">
    </div>
    <div id="editor">
      <p>Hello World!</p>
    </div>
  </div>
</template>

<script>
  import Quill from 'quill'

  export default {
    name: "EditorInform",
    mounted(){

      const options = {
        debug: 'info',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
          ]
        },
        placeholder: 'Compose an epic...',
        theme: 'snow',
        scrollingContainer: '#scrolling-container',
      };
     new Quill('#editor', options);
    }
  }


</script>

<style >
</style>