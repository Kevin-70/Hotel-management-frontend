<template>
  <div>
<!--    <keep-alive>-->
      <!-- Video player -->
      <video ref="videoPlayer" controls></video>

      <!-- Upload button -->
      <input type="file" ref="uploadInput" @change="uploadVideo"/>

      <!-- Video playlist -->
      <ul>
        <li v-for="video in videos" @click="playVideo(video)">{{ video.name }}</li>
      </ul>
<!--    </keep-alive>-->

  </div>
</template>

<script>
export default {
  name: 'Player',
  data() {
    return {
      videos: [] // list of uploaded videos
    }
  },
  methods: {

    created() {
      // this.videos = localStorage.getItem('videos');
    },

    // Called when a video is uploaded

    async uploadVideo(event) {
      // Get the uploaded file
      const file = event.target.files[0]

      // Create a new FileReader to read the file
      const reader = new FileReader()


      // Add the uploaded video to the playlist when it's done reading
      reader.addEventListener('load', () => {
        this.videos.push({
          name: file.name,
          url: reader.result
        })
        // alert(reader.result);
      })
      // Start reading the file
      reader.readAsDataURL(file)



      // Create a new file in the assets directory and write the video data to it

    },
    // Called when a video in the playlist is clicked
    playVideo(video) {
      // Set the video player's source to the selected video
      this.$refs.videoPlayer.src = video.url
      // Play the video
      this.$refs.videoPlayer.play()
    }
  }
}
</script>
