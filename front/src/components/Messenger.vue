<template>
    <beautiful-chat
      :always-scroll-to-bottom="alwaysScrollToBottom"
      :close="closeChat"
      :colors="colors"
      :is-open="isChatOpen"
      :message-list="messageList"
      :message-styling="true"
      :new-messages-count="newMessagesCount"
      :on-message-was-sent="onMessageWasSent"
      :open="openChat"
      :participants="participants"
      :show-close-button="true"
      :show-launcher="true"
      :show-emoji="true"
      :show-file="false"
      :show-typing-indicator="showTypingIndicator"
      :show-edition="false"
      :show-deletion="false"
      :title-image-url="titleImageUrl"
      :disable-user-list-toggle="false"
      @onType="handleOnType"
      @edit="editMessage"
      @remove="removeMessage"
      style="z-index:99999"
     >
     <template v-slot:header style="height:40px">
        {{participants.map(m=>m.name).join(' & ')}}
    </template>
     <template v-slot:text-message-body="{ message }">
      {{message.data.text}}
    </template>
    </beautiful-chat>
    
</template>
<script>
export default {
  name: 'messenger',
  components: {},
  data() {
    return {
        participants: [ ],
        titleImageUrl: '',//require('../assets/jang.png'),
        messageList: [ ],
        newMessagesCount: 0,
        isChatOpen: false,
        showTypingIndicator: '',
        colors: {
          header: { bg: '#4e8cff', text: '#ffffff' },
          launcher: { bg: '#4e8cff' },
          messageList: { bg: '#ffffff' },
          sentMessage: { bg: '#4e8cff', text: '#ffffff' },
          receivedMessage: { bg: '#eaeaea', text: '#222222' },
          userInput: { bg: '#f4f7f9', text: '#565867' },
          userList: { bg: '#fff', text: '#212121' }
        },
        chosenColor: null,
        alwaysScrollToBottom: true,
        userIsTyping: false

    };
  },
  computed: {
    linkColor() {
      return this.chosenColor === 'dark' ? this.colors.sentMessage.text : this.colors.launcher.bg
    },
    backgroundColor() {
      return this.chosenColor === 'dark' ? this.colors.messageList.bg : '#fff'
    }
  },
  created() {
    var _this = this;

    _this.initMessenger();

    this.$eventBus.$on('messenger open',(msg)=>{
     console.log('messenger open', msg);
     _this.openChat();
    });

    this.axios.get('/msg')
        .then((result)=>{
          _this.messageList = result.data;
        }).catch((e)=>{console.log(e)});

    this.$socket.on('message', (message)=>{
      _this.messageList = [...this.messageList, Object.assign({}, message,{author:'other'})];
      _this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
    })
  },
  methods: {
    initMessenger: function(){
        var _this = this;
        this.$socket.emit('connect users',{},(res)=>{
            console.log(res);
            res.forEach(el => {
              el.imageUrl = el.profileImage;
              _this.participants.push(el);
            });
        })
    },
    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({
          author: 'support',
          type: 'text',
          data: {text}
        });
      }
    },
    handleTyping(text) {
      this.showTypingIndicator =
        text.length > 0 ? this.participants[this.participants.length - 1].id : ''
    },
    onMessageWasSent(message) {
      this.$socket.emit("messenger", Object.assign({}, message),function(msg){
        console.log('msg:::::',msg);
        //this.axios.post('/msg',msg)
      });
      this.messageList = [...this.messageList, Object.assign({}, message, {id: Math.random()})]
    },
    openChat() {
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat() {
      this.isChatOpen = false
    },
    messageStylingToggled(e) {
      this.messageStyling = e.target.checked
    },
    handleOnType() {
      this.$root.$emit('onType')
      this.userIsTyping = true
    },
    editMessage(message) {
      const m = this.messageList.find((m) => m.id === message.id)
      m.isEdited = true
      m.data.text = message.data.text
    },
    removeMessage(message) {
      if (confirm('Delete?')) {
        const m = this.messageList.find((m) => m.id === message.id)
        m.type = 'system'
        m.data.text = 'This message has been removed'
      }
    },
    like(id) {
      const m = this.messageList.findIndex((m) => m.id === id)
      var msg = this.messageList[m]
      msg.liked = !msg.liked
      this.$set(this.messageList, m, msg)
    },
    
  }
   
  
  };
</script>
<style>
.sc-chat-window{
      z-index: 99999;
}
</style>

