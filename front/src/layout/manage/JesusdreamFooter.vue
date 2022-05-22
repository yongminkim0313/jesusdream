<template>
  <v-card height="400px">
    <v-footer
      v-bind="localAttrs"
      :padless="padless"
    >

      <v-btn
        depressed
        elevation="2"
        outlined
        raised
        text
        x-large
        >주문하기</v-btn>
        <v-btn
        depressed
        elevation="2"
        outlined
        raised
        text
        x-large
        @click="login()"
        >로그인</v-btn>
        <v-btn
        depressed
        elevation="2"
        outlined
        raised
        text
        x-large
        @click="status()"
        >상태확인</v-btn>
    </v-footer>

  </v-card>
</template>
<script>

export default {
    data: () => ({
      icons: [
        'mdi-home',
        'mdi-email',
        'mdi-calendar',
        'mdi-delete',
      ],
      items: [
        'default',
        'absolute',
        'fixed',
      ],
      padless: true,
      variant: 'fixed',
    }),
    computed: {
      localAttrs () {
        const attrs = {}

        if (this.variant === 'default') {
          attrs.absolute = false
          attrs.fixed = false
        } else {
          attrs[this.variant] = true
        }
        return attrs
      },
    },
  }
</script>




