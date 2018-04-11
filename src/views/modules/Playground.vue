<template>
  <div>
    <vuep :template="code"></vuep>
  </div>
</template>
<script>

import code from '@/components/data'
export default {
  data () {
    return {
      code: ''
    }
  },
  created () {
    this.code = code
  }
}
</script>
