<template>
  <div class="inventory_child_wrapper">
    <div class="child_header">
      <div class="project_title">
        <el-button size="mini" type="info" class="btn el-icon-back" style="margin-right: 30px;" @click="goBack">{{$t('editMap.goBack')}}</el-button>
        <span>{{$t('navTop.propertiesDetails')}}</span>
        <span class="project_name">{{projectName}}</span>
      </div>

      <!-- 导航 -->
      <el-menu class="Children_menu" mode="horizontal" :default-active="actinveInde" active-text-color="#409EFF" router>
        <div class="template_nav_div" v-for="(route,index) in routerObj" :key="index">
          <el-menu-item v-if="!route.children && !route.hidden" :index="`/Inventory/inventoryChildren/${route.path}`">{{route.meta.title}}</el-menu-item>

          <el-submenu :index="route.path" v-if="route.children && !route.hidden">
            <template slot="title">{{route.meta.title}}</template>
            <div v-for="(v, key) in route.children" :key="key">
              <el-menu-item v-if="self == 0 && v.path==='CustomSettings'" :index="`/Inventory/inventoryChildren/${route.path}/${v.path}`">{{v.meta.title}}</el-menu-item>
              <el-menu-item v-else-if="v.path!=='CustomSettings'" :index="`/Inventory/inventoryChildren/${route.path}/${v.path}`">{{v.meta.title}}</el-menu-item>
            </div>
          </el-submenu>
        </div>
      </el-menu>
    </div>
    <div class="child_content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import inventoryRouter from '@/router/modules/inventory'
export default {
  data () {
    return {
      projectName: '',
      isToPath: '',
      routerObj: [],
      self: 0
    }
  },
  computed: {
    actinveInde () {
      const route = this.$route
      const { meta, path } = route
      return path
    },
  },
  created () {
    let self = JSON.parse(sessionStorage.getItem('projectDesc') || '{}').self || ''
    this.self = self
    console.log(self)
    console.log(inventoryRouter)
    this.routerObj = JSON.parse(
      JSON.stringify(
        inventoryRouter[0].children.filter(
          (i) => i.path == 'inventoryChildren'
        )[0].children
      )
    )
  },
  mounted () {
    this.projectName = JSON.parse(sessionStorage.getItem('projectDesc')).name
    this.getUnitRoleAccess()
  },
  methods: {
    goBack () {
      this.$router.replace('/inventory/inventoryList')
    },
    getUnitRoleAccess () {
      let projectId = JSON.parse(sessionStorage.getItem('projectDesc') || '{}')
        .id
      let agentId = JSON.parse(sessionStorage.getItem('userInfo') || '{}')
        .agentId
      this.$Post(this.$api.getUnitRoleAccess, {
        projectId: projectId,
        agentId: agentId,
      }).then((res) => {
        if (res.code == 0) {
          sessionStorage.setItem('jurisdiction', JSON.stringify(res.datas))
        }
      })
    },
  },
  beforeRouteLeave (to, from, next) {
    let str = '/Inventory/inventoryChildren'
    if (to.path.indexOf(str) == -1) {
      sessionStorage.removeItem('projectDesc')
      sessionStorage.removeItem('jurisdiction')
      sessionStorage.removeItem('ChildernMun')
    }
    next()
  },
}
</script>

<style lang="less">
.inventory_child_wrapper {
  height: 100%;
  position: relative;
  .child_header {
    position: absolute;
    top: 0;
    width: 100%;
    .Children_menu {
      min-width: 1000px;
    }
    .project_title {
      height: 60px;
      padding: 15px 30px;
      border-bottom: 1px solid #dcdfe6;
      border-top: 1px solid #dcdfe6;
      background-color: #fff;
      .project_name {
        font-weight: 200;
        font-size: 16px;
      }
    }
    .el-menu {
      .template_nav_div {
        display: inline-block;
        width: auto;
        &:first-child {
          padding-left: 30px;
        }
      }
      .el-menu-item,
      .el-submenu {
        width: 100%;
        text-align: center;
        padding-right: 45px;
        padding-left: 0;
      }
      .el-submenu__title,
      .el-menu-item,
      .el-submenu {
        &:hover {
          background: transparent;
        }
      }
      .el-submenu {
        .el-submenu__title {
          padding: 0;
          i {
            color: #909399 !important;
            right: -15px;
          }
        }
        .el-submenu__title .el-menu-item {
          text-align: center;
        }
      }
    }
  }
  .child_content {
    position: absolute;
    top: 130px;
    width: 100%;
    bottom: 0;
    background: #fff;
  }
}
</style>

