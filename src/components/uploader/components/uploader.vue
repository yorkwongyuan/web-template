<template>
  <div class="uploader">
    <slot :files="files"
          :file-list="fileList"
          :started="started">
      <uploader-unsupport></uploader-unsupport>
      <div class="upload-area">
        <span class="xing">*</span>
        <span class="item-title">文件：</span>
        <uploader-btn class="upload-area-span"
                      :attrs="attrs"
                      id="browseButton">上传课程文件</uploader-btn>
        <div class="upload-area-tip">说明：一次仅上传一个视频文件，支持MP4视频格式，大小不能超过100M</div>
      </div>
      <!--<p>Drop files here to upload or</p>-->
      <!--<uploader-btn>select files</uploader-btn>-->
      <!--<uploader-btn :directory="true">select folder</uploader-btn>-->
      <uploader-list></uploader-list>
    </slot>
  </div>
</template>

<script>
import Uploader from 'simple-uploader.js'
import { kebabCase } from '../common/utils'
import UploaderBtn from './btn.vue'
import UploaderUnsupport from './unsupport.vue'
import UploaderList from './list.vue'


const COMPONENT_NAME = 'uploader'
const FILE_ADDED_EVENT = 'fileAdded'
const FILES_ADDED_EVENT = 'filesAdded'
const UPLOAD_START_EVENT = 'uploadStart'

export default {
  name: COMPONENT_NAME,
  provide () {
    return {
      uploader: this
    }
  },
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    autoStart: {
      type: Boolean,
      default: true
    },
    fileStatusText: {
      type: [Object, Function],
      default () {
        return {
          success: 'success',
          error: 'error',
          uploading: 'uploading',
          paused: 'paused',
          waiting: 'waiting'
        }
      }
    }
  },
  data () {
    return {
      started: false,
      files: [],
      fileList: [],
      attrs: {
        accept: 'video/mp4'
        // accept: 'video/*, video/x-matroska'
      }
    }
  },
  methods: {
    uploadStart () {
      this.started = true
    },
    fileAdded (file) {
      console.log(file)
      let typeList = file.name.split('.')
      let type = typeList[typeList.length - 1]
      let needType = ['avi', 'mp4', 'wmv', 'mkv', 'rmvb']
      if (needType.indexOf(type) < 0) {
        this.$message.warning('请选择所支持的视频格式')
        return false
      }
      if (100 * 1024 * 1024 < file.size) {
        this.$message.warning('附件大小不能大于100M')
        return false
      }
      this.$emit(kebabCase(FILE_ADDED_EVENT), file)
      if (file.ignored) {
        // is ignored, filter it
        return false
      }
    },
    filesAdded (files, fileList) {
      this.$emit(kebabCase(FILES_ADDED_EVENT), files, fileList)
      if (files.ignored || fileList.ignored) {
        // is ignored, filter it
        return false
      }
    },
    fileRemoved () {
      this.files = this.uploader.files
      this.fileList = this.uploader.fileList
    },
    filesSubmitted () {
      this.files = this.uploader.files
      this.fileList = this.uploader.fileList
      if (this.autoStart) {
        this.uploader.upload()
      }
    },
    allEvent (...args) {
      const name = args[0]
      const EVENTSMAP = {
        [FILE_ADDED_EVENT]: true,
        [FILES_ADDED_EVENT]: true,
        [UPLOAD_START_EVENT]: 'uploadStart'
      }
      const handler = EVENTSMAP[name]
      if (handler) {
        if (handler === true) {
          return
        }
        this[handler].apply(this, args.slice(1))
      }
      args[0] = kebabCase(name)
      this.$emit.apply(this, args)
    }
  },
  created () {
    this.options.initialPaused = !this.autoStart
    const uploader = new Uploader(this.options)
    this.uploader = uploader
    this.uploader.fileStatusText = this.fileStatusText
    uploader.on('catchAll', this.allEvent)
    uploader.on(FILE_ADDED_EVENT, this.fileAdded)
    uploader.on(FILES_ADDED_EVENT, this.filesAdded)
    uploader.on('fileRemoved', this.fileRemoved)
    uploader.on('filesSubmitted', this.filesSubmitted)
  },
  destroyed () {
    const uploader = this.uploader
    uploader.off('catchAll', this.allEvent)
    uploader.off(FILE_ADDED_EVENT, this.fileAdded)
    uploader.off(FILES_ADDED_EVENT, this.filesAdded)
    uploader.off('fileRemoved', this.fileRemoved)
    uploader.off('filesSubmitted', this.filesSubmitted)
    this.uploader = null
  },
  components: {
    UploaderBtn,
    UploaderUnsupport,
    UploaderList,

  }
}
</script>

<style lang="scss">
.upload-area {
  .xing {
    color: red;
  }
  .item-title {
    color: #555555;
    font-size: 14px;
  }
  .upload-area-span {
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: #597ef7;
    line-height: 22px;
  }
  .upload-area-tip {
    margin-left: 58px;
    font-size: 14px;
    color: #888888;
    line-height: 22px;
  }
}
.uploader {
  position: relative;
}
</style>
