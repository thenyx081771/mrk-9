<template>
  <div>
    XHORIZON INVESTMENT CONSULTANCY PTE. LTD 佣金文件管理
    <p class="tips">只支持 .csv 格式文件</p>
    <div>
      <uploader fileId="commissionFile" :maxSize="100" :uploadParam="uploadParam" @uploadAfter="uploadAfter" :url="$api.uploadFile" fileType=".csv" :btnText="{select:$t('transactions.SelectFile'),import:$t('transactions.Import')}"></uploader>
      <el-button size="mini" @click="exportData">{{$t('transactions.Export')}}</el-button>
    </div>

  </div>
</template>
<script>
import md5 from 'js-md5'
import { baseURL } from '@/InterfaceConfig/env'
import uploader from "@/components/uploader";
export default {
  components: {
    uploader
  },
  data () {
    return {
      uploadParam: [{name: "type", value: 'commissionFile'}],
    }
  },
  mounted() {
    
  },
  methods: {
    uploadAfter(){

    }
  },
}
</script>
<style lang="less">
.tips {
  color: #666;
}
</style>