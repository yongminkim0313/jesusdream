<template>
  <v-layout wrap>
    <v-flex md12 sm12 xs12 class="d-flex justify-center">
      <v-btn @click="$refs.calendar.prev()" icon class="d-flex justify-center">
        <v-icon right dark dense> mdi-chevron-left </v-icon>
      </v-btn>
      <v-card-title>7월</v-card-title>
      <v-btn @click="$refs.calendar.next()" icon class="d-flex justify-center">
        <v-icon right dark dense> mdi-chevron-right </v-icon>
      </v-btn>
    </v-flex>
    <v-flex md12 sm12 xs12 class="text-xs-center" >
      <v-sheet height="700" width="99%">
        <v-calendar ref="calendar" v-model="start" :events="events" :type="type" :end="end" :event-more="false" color="primary" ></v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      type: 'month',
      start: '2022-06-01',
      end: '2022-06-01',
      events: []
    }),
    created(){
      this.start = this.$moment().format('YYYY-MM-DD');
      this.end = this.$moment().format('YYYY-MM-DD');

      this.loadAplyList();
      this.loadPosterList();
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
      loadAplyList(){
        var _this = this;
        this.axios.get('/admin/aply/all',{})
        .then((result)=>{
          for(var idx in result.data){
            _this.events.push({
              name: result.data[idx].church+' ['+result.data[idx].aplyPrgrs+']',
              start: result.data[idx].aplyDt,
              end: result.data[idx].aplyDt,
              color: 'purple',
              timed: true,
            })
          }
        })
      },
      loadPosterList(){
        var _this = this;
        this.axios.get('/admin/poster/all',{})
        .then((result)=>{
          for(var idx in result.data){
            _this.events.push({
              name: result.data[idx].church+' ['+result.data[idx].aplyPrgrs+']',
              start: result.data[idx].aplyDt,
              end: result.data[idx].aplyDt,
              color: 'grey',
              timed: true,
            })
          }
       })
      }
    }
  }
</script>