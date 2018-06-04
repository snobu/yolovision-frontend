let PacmanLoader = VueSpinner.PacmanLoader;
let postUrl = '/images';

Vue.component("child", {
  props: {
    noResponse: { type: Boolean }
  },
  data: function data() {
    return {
      renderCache: undefined
    };
  },

  methods: {
    // methods
  },
  template: "#child"
});

new Vue({
  el: "#app",
  components: {
    PacmanLoader
  },
  data: function data() {
    return {
      spinnerColor: '#fff',
      thing: {},
      image: "",
      noResponse: false
    };
  },

  methods: {
    detect: function detect() {
      var _this = this;

      var data = void 0,
          contentType = void 0;
      if (typeof this.image === "string") {
        data = { url: this.image };
        contentType = "application/json";
      } else {
        data = this.image;
        contentType = "application/octet-stream";
      }
      
      axios({
        method: "post",
        url: postUrl,
        data: data,
        timeout: 14000,
        headers: {
          "Content-Type": contentType
        }
      }).then(function (response) {
        if (response.status == 200 | response.status == 201 | response.status == 202) {
          if (response.headers.location) {
            window.location = response.headers.location;
            console.log('New window.location = ', response.headers.location);
          }
        }
        else {
          console.error('Something has gone awfully bad.');
          console.log('response.headers.location = ', response.headers.location);
          console.log('response.status = ', response.status, response.statusText);
        }
      });
    },
    fileUpload: function fileUpload(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.image = files[0];
      this.createImage();
      this.detect();
    },
    useMine: function useMine() {
      this.image = "/elephant.jpg";
      this.createImage();
      this.detect();
    },
    createImage: function createImage() {
      var _this2 = this;

      var image = new Image();
      var reader = new FileReader();

      reader.onload = function (e) {
        _this2.image = e.target.result;
      };
      reader.readAsDataURL(this.image);
    },

    removeImage: function removeImage(e) {
      this.image = "";
      this.noResponse = false;
      this.thing = {};
    }
  }
});