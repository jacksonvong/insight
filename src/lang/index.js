import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import antDesignZhLocale from 'ant-design-vue/lib/locale-provider/zh_CN'// ant-design-vue lang
import antDesignEnLocale from 'ant-design-vue/lib/locale-provider/en_US'// ant-design-vue lang
import zhLocale from './zh'
import enLocale from './en'

Vue.use(VueI18n)

const messages = {
  zh: {
    ...zhLocale,
    ...antDesignZhLocale
  },
  en: {
    ...enLocale,
    ...antDesignEnLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: Cookies.get('language') || 'zh',
  // set locale messages
  messages
})

export default i18n
