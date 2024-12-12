document.addEventListener('DOMContentLoaded', function() {
    try {
      new Vue({
        el: '#app',
        data: {
          totalTime: 25 * 60,
          remainingTime: 25 * 60,
          timer: null,
          size: 500,
          strokeWidth: 20,
          backgroundImage: ''
        },
        computed: {
          minutes() {
            return String(Math.floor(this.remainingTime / 60)).padStart(2, '0');
          },
          seconds() {
            return String(this.remainingTime % 60).padStart(2, '0');
          },
          radius() {
            return (this.size / 2) - this.strokeWidth;
          },
          center() {
            return this.size / 2;
          },
          circumference() {
            return 2 * Math.PI * this.radius;
          },
          progress() {
            return ((this.totalTime - this.remainingTime) / this.totalTime);
          },
          dashOffset() {
            return this.circumference * (1 - this.progress);
          }
        },
        methods: {
          startTimer() {
            if (this.timer) return;
            this.timer = setInterval(() => {
              if (this.remainingTime > 0) {
                this.remainingTime--;
              } else {
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000);
          },
          resetTimer() {
            clearInterval(this.timer);
            this.timer = null;
            this.remainingTime = this.totalTime;
          },
          uploadImage(event) {
            const file = event.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                this.backgroundImage = e.target.result;
              };
              reader.readAsDataURL(file);
            }
          }
        }
      });
    } catch (error) {
      console.error('Vue initialization error:', error);
    }
  });