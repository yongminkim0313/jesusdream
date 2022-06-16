<template>
  <div class="text-center">
    <v-menu offset-x>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon small outlined>
          <v-icon color="grey darken-1">mdi-human</v-icon>
        </v-btn>
      </template>

      <v-list subheader>
      <v-subheader>현재접속 {{users.length}}명</v-subheader>

      <v-list-item
        v-for="chat in users"
        :key="chat.id"
      >
        <v-list-item-avatar>
          <v-img
            :alt="`${chat.userInfo.nick} profileImage`"
            :src="chat.userInfo.profileImage"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="chat.userInfo.nick"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon color="deep-purple accent-4">
            mdi-message-outline
          </v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
    </v-menu>
  </div>
</template>
<script>
    export default {
    data: () => ({
        //users: [ { profileImage: 'https://k.kakaocdn.net/dn/boAP5T/btrEYIsmbED/RCkGo3kEfIUuXkcwRZZGEk/img_640x640.jpg', nick: 'Jason Oner', } ],
    }),
    props:['users'],
  }
</script>