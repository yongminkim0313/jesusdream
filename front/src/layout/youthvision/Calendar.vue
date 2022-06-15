<template>
  <v-layout>
    <v-flex>
      <v-card-title class="text-sm-left text-xs-center">6월</v-card-title>
      <v-sheet height="500">
        <v-calendar :now="today" :value="today" color="primary" >
          <template v-slot:day="{ date }">
            <template v-for="(event, index) in eventsMap[date] ">
              <v-menu v-model="event.open" offset-x :key="index" >
                <template v-slot:activator="{ on }">
                  <v-card v-if="!event.time" v-ripple class="pt-0 " max-height="25px" :class="event.type=='aply'?'lime liten-5':'pink liten-5'" v-on="on" >
                    <v-card-subtitle class="pa-0 text-truncate">{{event.type=='aply'?'캠프-':'포스터-'}}{{event.title}}</v-card-subtitle>
                  </v-card>
                </template>
                <v-card color="grey lighten-4" min-width="350px" flat >
                  <v-toolbar dark :class="event.type=='aply'?'lime liten-5':'pink liten-5'">
                    <v-btn icon>
                      <v-icon>mdi-calendar-edit</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="event.title"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>mdi-more</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <span v-html="event.details"></span>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="secondary" >
                      확인
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      today: '2022-06-01',
      events: []
    }),
    created(){
      this.today = this.$moment().format('YYYY-MM-DD');
      this.loadAplyList();
      this.loadPosterList();

      console.log(this.events);
    },
    computed: {
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
      }
    },
    methods: {
      addEvent(type, title,details,date){
        this.events.push({ type: type, title: title, details: details, date: date, open: false });
      },
      loadAplyList(){
        var _this = this;
        this.axios.get('/admin/aply/all',{})
        .then((result)=>{
          for(var idx in result.data){
            _this.addEvent(
              'aply',
              result.data[idx].church+' ['+result.data[idx].aplyPrgrs+']',
              result.data[idx].aplyName+' ['+result.data[idx].aplyDt+'] '+ result.data[idx].schdlSe,
              result.data[idx].aplyDt
            )
          }
        })
      },
      loadPosterList(){
        var _this = this;
        this.axios.get('/poster/all',{})
        .then((result)=>{
          for(var idx in result.data){
            _this.addEvent(
              'poster',
              result.data[idx].church+' ['+result.data[idx].aplyPrgrs+']',
              result.data[idx].aplyName+' ['+result.data[idx].aplyDt+'] ',
              result.data[idx].aplyDt
            )
          }
       })
      }
    }
  }
</script>