<template>
  <div>
    <div style="margin: 20px;">Agency custom project information configuration module</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Project description" name="first">
        <div class="projectDescTitle">
          <span style="margin-right: 20px;">Agency custom project description</span>
          <el-button @click.prevent="updateBrokeProjectSetFn('desc')" style="margin-bottom: 20px;">Update</el-button>
          <div class="detail_content">
            <el-form class="demo-form-inline form" label-width="250px" label-position="top" ref="ruleForm" size="small" :model="detailForm">
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item :label="$t('Description(EN)')">
                    <editor editorId="description" :value="detailForm.description" :setting="editorSetting" @show="editors" @on-upload-success="onEditorUploadComplete"></editor>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Description(CN)')">
                    <editor editorId="descriptionCn" :value="detailForm.descriptionCn" :setting="editorSetting" @show="editors" @on-upload-success="onEditorUploadComplete"></editor>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item :label="$t('Key Points(EN)')">
                    <editor editorId="keyPoints" :value="detailForm.keyPoints" :setting="editorSetting" @show="editors" @on-upload-success="onEditorUploadComplete"></editor>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Key Points(CN)')">
                    <editor editorId="keyPointsCn" :value="detailForm.keyPointsCn" :setting="editorSetting" @show="editors" @on-upload-success="onEditorUploadComplete"></editor>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Unit price label" name="second">
        <div class="projectDescTitle">
          <span style="margin-right: 20px;">Unit price label customize</span>
          <el-button @click.prevent="updateBrokeProjectSetFn('price')" style="margin-bottom: 20px;">Update</el-button>
          <div class="detail_content">
            <el-form class="demo-form-inline form" label-width="250px" label-position="top" ref="priceForm" size="small" :model="priceForm">
              <el-row :gutter="50">
                <el-col :span="6">
                  <el-form-item :label="$t('Price1 Label')">
                    <el-input v-model="priceForm.price1Label" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('Price2 Label')">
                    <el-input v-model="priceForm.price2Label" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="6">
                  <el-form-item :label="$t('Price3 Label')">
                    <el-input v-model="priceForm.price3Label" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('Price4 Label')">
                    <el-input v-model="priceForm.price4Label" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="6">
                  <el-form-item :label="$t('Price5 Label')">
                    <el-input v-model="priceForm.price5Label" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('Price6 Label')">
                    <el-input v-model="priceForm.price6Label" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="6">
                  <el-form-item :label="$t('Price7 Label')">
                    <el-input v-model="priceForm.price7Label" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('Price8 Label')">
                    <el-input v-model="priceForm.price8Label" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="6">
                  <el-form-item :label="$t('Price9 Label')">
                    <el-input v-model="priceForm.price9Label" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('Price10 Label')">
                    <el-input v-model="priceForm.price10Label" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Project field" name="third">
        <div class="CustomSettings">
          <div class="CustomInformationFields">
            <h1 class="text">
              {{$t('edit.customInformationFields')}}
              <el-button class="addBtn" @click="AddFieldsFn">{{$t('AddFields')}}</el-button>
            </h1>
            <div class="CustomInformationFields-Tab">
              <el-table size="mini" border :data="customInformationFieldsTab" style="width: 100%">
                <el-table-column :label="$t('CustomInfoLabel')" prop="label"></el-table-column>
                <el-table-column :label="$t('CustomInfoValue')" prop="value"></el-table-column>
                <el-table-column :label="$t('Edit')">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('Edit')}}</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{$t('Delete')}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog :title="$t('addEditFields')" center :visible.sync="dialogVisible" width="40%">
                <div>
                  <el-form label-position="left" label-width="200px" :model="form">
                    <el-form-item :label="$t('CustomInfoLabel')">
                      <el-input v-model="form.label"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('CustomInfoValue')">
                      <el-input v-model="form.value"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="updataFn">{{$t('update')}}</el-button>
                </span>
              </el-dialog>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Project media display" name="fourth">
        <div class="projectDescTitle">
          <span style="margin-right: 20px;">Do not display developer project media</span>
          <el-switch v-model="onlyMedia" active-color="#13ce66" @change="switchChange">
          </el-switch>
          <div style="font-size: 14px;color: #999;margin-top: 10px;">(After click this featured, this apps wont display any media (image, video, file, vr tour) that uploaded by developer)</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import editor from '@/components/editor'
export default {
  components: {
    editor
  },
  data () {
    return {
      hostUrl: sessionStorage.getItem('serveUrl') || '',
      customInformationFieldsTab: [],
      id: JSON.parse(sessionStorage.getItem("projectDesc") || "{}").id || "",
      dialogVisible: false,
      form: {
        label: "",
        value: "",
        id: ""
      },
      activeName: 'first',
      detailForm: {
        description: '',
        descriptionCn: '',
        keyPoints: '',
        keyPointsCn: '',
      },
      priceForm: {
        price1Label: '',
        price2Label: '',
        price3Label: '',
        price4Label: '',
        price5Label: '',
        price6Label: '',
        price7Label: '',
        price8Label: '',
        price9Label: '',
        price10Label: '',
      },
      editorSetting: {
        // 配置富文本编辑器高
        height: 120,
        width: 900,
      },
      onlyMedia: 0,
      editorArr: [], //获取数据时富文本编辑器的图片数组
      updateEditorArr: [], //提交时富文本编辑器里面的图片数组
    };
  },
  mounted () {
    this.queryProjectCustom();
    this.queryBrokeProjectSet()
  },
  methods: {
    editors (obj) {
      // editor组件传过来的值赋给content
      this.detailForm[obj.id] = obj.content
    },
    onEditorUploadComplete (json) {
      // 处理上传图片后返回数据，添加img标签到编辑框内
      json[1](this.hostUrl + json[0].filePath)
    },
    queryProjectCustom () {
      this.$Geting(this.$api.queryProjectCustom, { projectId: this.id }).then(
        res => {
          if (res.code == 0) {
            this.customInformationFieldsTab = res.datas;
          }
        }
      );
    },
    queryBrokeProjectSet(){
      this.$Geting(this.$api.queryBrokeProjectSet, { projectId: this.id }).then((res) => {
        if(res.code==='0'){
          this.detailForm.description = res.datas.description
          this.detailForm.descriptionCn = res.datas.descriptionCn
          this.detailForm.keyPoints = res.datas.keyPoints
          this.detailForm.keyPointsCn = res.datas.keyPointsCn

          this.priceForm.price1Label = res.datas.price1Label
          this.priceForm.price2Label = res.datas.price2Label
          this.priceForm.price3Label = res.datas.price3Label
          this.priceForm.price4Label = res.datas.price4Label
          this.priceForm.price5Label = res.datas.price5Label
          this.priceForm.price6Label = res.datas.price6Label
          this.priceForm.price7Label = res.datas.price7Label
          this.priceForm.price8Label = res.datas.price8Label
          this.priceForm.price9Label = res.datas.price9Label
          this.priceForm.price10Label = res.datas.price10Label

          this.onlyMedia = res.datas.onlyMedia===0?false:true

          this.fillDataToForm()
        }
      })
    },
    handleEdit (index, item) {
      this.form = {
        label: item.label,
        value: item.value,
        id: item.id
      };
      this.dialogVisible = true;
    },
    handleDelete (index, item) {
      this.$confirm(
        this.$t("alert.alert_delete"),
        this.$t("alert.alert_command"),
        {
          confirmButtonText: this.$t("alert.sure"),
          cancelButtonText: this.$t("alert.cancel"),
          type: "warning"
        }
      )
        .then(() => {
          this.$Geting(this.$api.deleteProjectCustom, { id: item.id }).then(
            res => {
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: this.$t("alert.alert_success_delete_title")
                });
                this.queryProjectCustom()
              } else {
                this.$notify.error({
                  title: "fail",
                  message: res.msg
                });
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("cancel")
          });
        });
    },
    AddFieldsFn () {
      this.form = {
        label: "",
        value: "",
        id: ""
      };
      this.dialogVisible = true;
    },
    updataFn () {
      if (!this.form.label && !this.form.value) {
        this.$notify.error({
          title: "fail",
          message: "Fill Out the Form"
        });
        return false;
      } else {
        let data = {
          ...this.form,
          projectId: this.id
        };
        this.$Posting(this.$api.saveProjectCustom, data).then(res => {
          if (res.code == 0) {
            this.dialogVisible = false;
            this.$notify({
              title: "success",
              message: res.msg,
              type: "success"
            });
            this.queryProjectCustom();
          }
        });
      }
    },
    handleClick (tab, event) {
      console.log(tab, event);
    },
    switchChange(e){
      console.log(e)
      this.updateBrokeProjectSetFn('media')
    },
    updateBrokeProjectSetFn (type) {
      let _this = this
      let params = {}
      switch (type) {
        case "desc":
          params = {
            type: type,
            description: _this.detailForm.description,
            keyPoints: _this.detailForm.keyPoints,
            keyPointsCn: _this.detailForm.keyPointsCn,
            descriptionCn: _this.detailForm.descriptionCn,
            projectId: _this.id
          }
          params.description = _this.$contentToBase64(params.description)
          params.descriptionCn = _this.$contentToBase64(params.descriptionCn)
          params.keyPoints = _this.$contentToBase64(params.keyPoints)
          params.keyPointsCn = _this.$contentToBase64(params.keyPointsCn)
          console.log(params)
          break

        case "price":
          params = {
            type: type,
            ..._this.priceForm,
            projectId: _this.id
          }
          break

        case "media":
          params = {
            type: type,
            onlyMedia: _this.onlyMedia?1:0,
            projectId: _this.id
          }
      }

      _this.$Posting(_this.$api.updateBrokeProjectSet, params).then((res) => {

        if (res.code == 0) {
          this.beforeSaveCheckImage()
          this.editorArr = []
          this.updateEditorArr = []
          this.$notify({
            title: 'success',
            message: this.$t('alert.operate_success_title'),
            type: 'success',
          })
          this.queryBrokeProjectSet()
          if (window.sessionStorage.getItem('uploadImg')) {
            window.sessionStorage.removeItem('uploadImg')
          }
        } else {
          this.$notify.error({
            title: 'fail',
            message: res.msg,
          })
          return false
        }
      })
    },
    fillDataToForm () {
      //填充数据到表单
      this.detailForm.description = this.$base64ToContent(
        this.detailForm.description
      )
      tinymce.editors[0].setContent(this.detailForm.description)
      this.detailForm.descriptionCn = this.$base64ToContent(
        this.detailForm.descriptionCn
      )
      tinymce.editors[1].setContent(this.detailForm.descriptionCn)
      this.detailForm.keyPoints = this.$base64ToContent(
        this.detailForm.keyPoints
      )
      tinymce.editors[2].setContent(this.detailForm.keyPoints)
      this.detailForm.keyPointsCn = this.$base64ToContent(
        this.detailForm.keyPointsCn
      )
      tinymce.editors[3].setContent(this.detailForm.keyPointsCn)

      this.beforeSaveGetInitEdit(
        this.detailForm.description,
        this.detailForm.keyPoints,
        this.detailForm.descriptionCn,
        this.detailForm.keyPointsCn,
      )

    },
    //保存前先读取服务端返回的富文本编辑器里面的内容，晒选出图片存在缓存中
    beforeSaveGetInitEdit () {
      for (let i = 0; i < arguments.length; i++) {
        this.editorArr = this.editorArr.concat(
          this.$changeHtmlStr(arguments[i])
        )
      }
    },
    //保存前获取编辑后的富文本编辑器的内容
    beforeSaveGetEdit () {
      for (let i = 0; i < arguments.length; i++) {
        this.updateEditorArr = this.updateEditorArr.concat(
          this.$changeHtmlStr(arguments[i])
        )
      }
    },
    //提交之前进行图片的检测
    beforeSaveCheckImage () {
      let editorImg =
        JSON.parse(window.sessionStorage.getItem('editorImg')) || []
      this.beforeSaveGetEdit(
        this.detailForm.description,
        this.detailForm.keyPoints,
        this.detailForm.descriptionCn,
        this.detailForm.keyPointsCn,
      )

      let allEditorArr = [...editorImg, ...this.editorArr] //将缓存里面的图片和获取的富文本编辑器的图片进行整合
      allEditorArr.length &&
        window.sessionStorage.setItem('editorImg', JSON.stringify(allEditorArr)) //点击时将之前富文本编辑器里面的图片进行缓存
      this.$changeSession(this.updateEditorArr)
    },

  }
};
</script>

<style lang="less">
.el-tabs{
  padding: 20px;
}

.el-tabs__item{
  font-weight: 600;
  font-size: 16px;
}
.detail_content {
  width: 100%;
  overflow: auto;
  padding: 15px 0px;
  height: calc(100vh - 370px);
}
.CustomSettings {
  width: 100%;
  height: 100%;
  background: #ffff;
  padding: 10px;
  .CustomInformationFields {
    padding: 10px;
    border: 1px solid #f4f4f4;
    .text {
      height: 50px;
      line-height: 50px;
      background: #f4f4f4;
      padding: 0 10px;
      margin-bottom: 15px;
      .addBtn {
        float: right;
        margin-top: 5px;
      }
    }
    .CustomInformationFields-Tab {
    }
  }
}
</style>