<template>
  <div>
    <p style="padding: 10px 0px">XHORIZON INVESTMENT CONSULTANCY PTE. LTD 佣金文件管理</p>
    <p style="padding: 10px 0px" class="tips">只支持 .csv 格式文件</p>
    <div>
      <uploader fileId="commissionFile" :maxSize="100" :uploadParam="uploadParam" @uploadAfter="uploadAfter" :url="$api.uploadFile" fileType=".csv" :btnText="{select:$t('transactions.SelectFile'),import:$t('transactions.Import')}"></uploader>
      <el-button size="mini" @click="downloadData">{{$t('transactions.Download')}}</el-button>
    </div>

  </div>
</template>
<script>
import md5 from 'js-md5'
import qs from 'qs'
import { baseURL } from '@/InterfaceConfig/env'
import uploader from "@/components/uploader";
export default {
  components: {
    uploader
  },
  data () {
    return {
      uploadParam: [{ name: "type", value: 'commissionFile' }],
    }
  },
  mounted () {

  },
  methods: {
    uploadAfter () {

    },
    downloadData () {
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

      let params = {
        userId: userInfo.userId || '', //登陆用户的ID
        agentId: userInfo.userId || '', //登陆用户的ID
        token: userInfo.token || '',
        brokeId: userInfo.brokeId || '',
        source: 'manager', timestamp: new Date().getTime(),
        filepath: `${baseURL}/upload/broke/${userInfo.brokeId}/commission/commission.csv`
      }
      let str = ''
      for (const key in this.$objKeySort(params)) {
        if (
          this.$objKeySort(params)[key] !== null &&
          typeof this.$objKeySort(params)[key] !== 'undefined'
          && key !== 'file' &&
          key !== 'appVer' &&
          key !== 'mobileMode' &&
          key !== 'appSource' &&
          key !== 'token'
        ) {

          if (Array.isArray(this.$objKeySort(params)[key])) params[key] = JSON.stringify(this.$objKeySort(params)[key]);
          str += this.$objKeySort(params)[key]
        }
      }
      str = md5(str + 'c1d65f3667324592a071ebec5038f38c')
      let reqData = qs.stringify({
        ...params,
        signature: str
      })
      console.log(reqData)
      let newWindow = window.open()
      let urlSite = baseURL + this.$api.downloadMainImg + `?${reqData}`
      newWindow.location.href = urlSite

      // this.$Get(this.$api.downloadMainImg, {filepath: `${baseURL}/upload/broke/${userInfo.brokeId}/commission/commission.csv`}).then((result) => {

      // }).catch((err) => {

      // });
    }
  },
}
</script>
<style lang="less">
.tips {
  color: #666;
}
</style>