<template>
    <v-card>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-data-table fixed-header dense :headers="headers" :items="youtubeList" item-key="seq" :search="search"
            hide-default-footer :disable-items-per-page="true" :footer-props="{ 'items-per-page-options': [50, -1] }"
            :loading="loading" loading-text="로딩중 기다려주세요~" class="elevation-1" sort-by="type,sn">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>캠프실황, 언론보도</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="800px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                추가
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-select v-model="editedItem.type" :items="type" attach label="게시판">
                                            </v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="editedItem.sn" label="순번"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-text-field v-model="editedItem.title" label="제목"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-text-field v-model="editedItem.subtitle" label="소제목"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-text-field v-model="editedItem.src" label="링크주소"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">
                                    취소
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="save">
                                    저장
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">삭제하시겠습니까?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">취소</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">삭제</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:[`item.thumb`]="{ item }">
                <v-img :src="`https://i1.ytimg.com/vi/${item.src}/default.jpg`" width="120" height="68"></v-img>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                    재조회
                </v-btn>
            </template>
        </v-data-table>
    </v-card>
</template>
<script>
  export default {
    name:'CampLiveEdit',
    data: () => ({
      type:['캠프실황','언론보도'],
      dialog: false,
      search:'',
      loading: false,
      dialogDelete: false,
      headers: [
        { text: '게시판', align: 'start', sortable: false, value: 'type', },
        { text: '제목', value: 'title' },
        { text: '소제목', value: 'subtitle' },
        { text: '주소', value: 'src' },
        { text: '순번', value: 'sn' },
        { text: '수정,삭제', value: 'actions', sortable: false },
        { text: '썸네일', value: 'thumb'},
      ],
      youtubeList: [],
      editedIndex: -1,
      editedItem: { type: '', title: '', subtitle: '', src: '', sn: '', },
      defaultItem: { type: '', title: '', subtitle: '', src: '', sn: '', },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '추가' : '수정'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize();
    },

    methods: {
      initialize () {
        this.loading = true;
        this.axios.get('/guest/youtube')
        .then((result)=>{
            this.youtubeList = result.data;
        }).catch((err)=>{console.log(err);})
        .then(()=>{
            this.loading = false;
        })
      },

      editItem (item) {
        this.editedIndex = this.youtubeList.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.youtubeList.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        var deleteItem = this.youtubeList.splice(this.editedIndex, 1)
        this.axios.delete('/admin/youtube',{data:deleteItem[0]});
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.youtubeList[this.editedIndex], this.editedItem)
          this.axios.put('/admin/youtube',this.editedItem)
          .then((result)=>{
            console.log(result);
          })
        } else {
          this.youtubeList.push(this.editedItem)
          this.axios.post('/admin/youtube',this.editedItem)
          .then((result)=>{
            console.log(result);
          })
        }
        this.close()
      },
    },
  }
</script>
