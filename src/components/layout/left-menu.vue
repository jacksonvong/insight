<template>
  <div style="">
    <transition name="slide-to-left">
      <div v-if="collapsed" class="leftmenu-box">
        <iw-scrollbar :wrap-style="'height: ' + height +'px;'" >
          <a-menu
            :default-selected-keys="[]"
            :default-open-keys="openKeys"
            class="leftmenu"
            mode="inline"
          >
            <a-sub-menu v-for="group in options.menuTreeNodes" :key="group.menuId">
              <span slot="title"><a-icon type="user" />{{ group.title }}</span>
              <template v-for="item in group.funcs">
                <a-menu-item v-if="item.isMenu" :key="item.menuId" style="padding: 0;">
                  <bi-router-link :item="item" :product="options" />
                </a-menu-item>
              </template>
            </a-sub-menu>
          </a-menu>
        </iw-scrollbar>
      </div>
    </transition>
    <div :style="{left: collapsed? '200px' : '0'}" class="pack" @click="handleMenu">
      <a-icon v-if="collapsed" type="left" />
      <a-icon v-else type="right" />
    </div>
  </div>
</template>
<script>
import { Menu, Icon } from 'ant-design-vue'
import JQuery from 'jquery'

var BiRouterLink = {
  props: ['item', 'product', 'selectedLevelOne'],
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    activeUrl(item) {
      if (this.selectedLevelOne) {
        return !!this.selectedLevelOne[item.id] || (Object.keys(this.selectedLevelOne).length === 0 && this.$route.path.indexOf(item.url) !== -1)
      } else {
        return item.url === this.$route.path
      }
    }
  },
  template: `<dd>
    <router-link v-if="item.url.indexOf('http')>-1" :to="{path:'/frame', query:{url:item.url, product: product.funcUrl}}">
      <i v-if="item.level>3" class="icon-sign iconfont" :class="item.icon"></i>
      <span :title="item.title">{{item.title}}</span>
    </router-link>
    <a v-else-if="item.url.indexOf('javascript')>0" href="javascript:void(0)" class="ban-link">
      <i v-if="item.level>3" class="icon-sign iconfont" :class="item.icon"></i>
      <span :title="item.title">{{item.title}}</span>
    </a>
    <router-link v-else :to="item.url">
      <i v-if="item.level>3" class="icon-sign iconfont" :class="item.icon"></i>
      <span :title="item.title">{{item.title}}</span>
    </router-link>
  </dd>`
}
export default {
  components: {
    AMenu: Menu,
    ASubMenu: Menu.SubMenu,
    AMenuItem: Menu.Item,
    AIcon: Icon,
    BiRouterLink
  },
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      collapsed: true,
      openKeys: [],
      menuList: [],
      scrollOptions: {
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          background: '#c1c1c1',
          opacity: 1,
          size: '4px'
        }
      }
    }
  },
  computed: {
    height() {
      return document.documentElement.clientHeight - 64
    }
  },
  watch: {
    options() {
      for (const i in this.options.menuTreeNodes) {
        this.openKeys.push(this.options.menuTreeNodes[i].menuId)
      }
    }

  },
  mounted() {
    this.menuList = this.options
    for (const i in this.options.menuTreeNodes) {
      this.openKeys.push(this.options.menuTreeNodes[i].menuId)
    }
  },
  updated() {
    const activeMenus = JQuery('.ant-menu-sub a[class*="router-link-exact-active"]')
    if (!activeMenus.length) {
      const url = JQuery('.ant-menu-sub a:first').attr('href') || ''
      this.$router.push({ path: url.replace('#', '') }).catch(e => {})
    }
  },
  methods: {
    handleMenu() {
      this.collapsed = !this.collapsed
      this.$emit('controlParentPanel', this.collapsed)
    }
  }
}
</script>

<style lang="scss" type="text/scss" scope>
@import '~@/assets/style/mixins';
.leftmenu-box{
  position: fixed!important;
  top: 64px;
  bottom: 0;
  left: 0;
  z-index: 990;
  width: 200px!important;
  height: calc(100vh - 64px)!important;
  overflow: hidden;
  @include box-shadow(1px, 1px, 8px, rgba(153, 153, 153, 0.14)!important);
}
.leftmenu{width: 100%!important;border: 0;}
.leftmenu .ant-menu-inline{border: 0;}
.leftmenu .ant-menu-submenu-title{background: #EAF3FC;margin: 0!important;color: #2E5AA6;}
.leftmenu .ant-menu-item{margin: 0!important;}
.leftmenu .ant-menu-item a{color: #181C28; display: block; padding: 0 16px 0 28px;width: 200px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;}
.leftmenu .ant-menu-item a.router-link-exact-active{background: #F4F4F6;}
.leftmenu .ant-menu-item:hover{background: #F4F4F6;}
.leftmenu .ant-menu-item-selected{color: #181C28;}
.leftmenu .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{background: #ffffff;}
.leftmenu .ant-menu:not(.ant-menu-horizontal) a.router-link-active,
.leftmenu .ant-menu:not(.ant-menu-horizontal) a.router-link-exact-active{background: #F4F4F6;}
.leftmenu .ant-menu-inline .ant-menu-selected:after, .ant-menu-inline .ant-menu-item-selected:after{display: none;}
.pack{
  position: fixed;left: 200px;top:calc(50% + 2px);background: #eee;width: 16px;height: 100px;line-height: 100px;
  @include box-shadow(1px, 1px, 8px, rgba(153, 153, 153, 0.14));border-radius: 0 6px 6px 0;cursor: pointer;
  z-index: 2;
}
.slide-to-left-enter-active{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);-webkit-transform-origin:center left;transform-origin:center left}
.slide-to-left-enter{opacity:0;-webkit-transform:scaleX(0);transform:scaleX(0)}
.slide-to-left-leave-active{opacity:0;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);-webkit-transform-origin:center left;transform-origin:center left}
.slide-to-left-leave{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}
</style>
