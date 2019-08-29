<template>
  <div class="uploader-unsupport" v-show="!support">
    <slot>
      <p>
        您的浏览器不支持当前上传功能，推荐使用新版浏览器 <a href="http://www.w3.org/TR/FileAPI/">the HTML5 File API</a> along with <a href="http://www.w3.org/TR/FileAPI/#normalization-of-params">file slicing</a>.
      </p>
    </slot>
  </div>
</template>

<script>
import { uploaderMixin, supportMixin } from '../common/mixins'

const COMPONENT_NAME = 'uploader-unsupport'

export default {
  name: COMPONENT_NAME,
  mixins: [uploaderMixin, supportMixin]
}
</script>

<style>
  .uploader-unsupport {
    position: relative;
    z-index: 10;
    overflow: hidden;
  }
</style>
