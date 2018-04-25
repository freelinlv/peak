<template>
  <div>
    <vuep :template="code"></vuep>
  </div>
</template>
<script>

import search from '@/components/search.js'
export default {
  data () {
    return {
      code: ''
    }
  },
  created () {
    this.code = search
  }
}
</script>
