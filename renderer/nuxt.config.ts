// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Collage 页面渲染端',
      meta: [
        { name: 'description', content: '基于 Nuxt 的 Collage 页面渲染端，支持 SEO 的静态页面渲染。' }
      ]
    }
  },
  css: ['~/assets/base.css']
});
