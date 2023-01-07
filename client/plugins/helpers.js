import Vue from 'vue'

import logo from 'static/profile.png'
import favicon from 'static/no-user.png'

Vue.mixin({
  data() {
    return {
      logo,
      favicon,
      dashboardFilterMode: false,
      toolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ['bold', 'italic'],
        [
          { align: '' },
          { align: 'center' },
          { align: 'right' },
          { align: 'justify' }
        ],
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ color: [] }, { background: [] }],
        ['link'],
        ['clean']
      ]
    }
  },
  computed: {
    bp() {
      return this.$vuetify.breakpoint
    }
  },
  methods: {
    removeEmptyObjKeys: (obj) => {
      for (const k in obj) {
        if (obj[k] === '' || obj[k] === null || obj[k] === undefined) {
          delete obj[k]
        }
      }
      return obj
    },
    slugify: (str) => {
      if (str.length >= 4) {
        return str
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      }
    }
  }
})
