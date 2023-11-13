const eventBus = {
    listeners: {},
  
    emit(event, data) {
      if (this.listeners[event]) {
        this.listeners[event].forEach((listener) => {
          listener(data);
        });
      }
    },
  
    on(event, callback) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
    },
  };
  
  export default eventBus;
