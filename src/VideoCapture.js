

export class VideoCapture {
  constructor(data) {
    this.listener = data.listener
    this.canvas = data.canvas
    this.mediaStreamDestination = data.mediaStreamDestination

    this.closeBtnSvg = `
<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.50012 1L13.5001 13" stroke="#3A3A3C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M13.5 1L1.5 13" stroke="#3A3A3C" stroke-width="1.5" stroke-linecap="round"/>
</svg>

  `
    this.shareSvg = `
<svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.2864 16C11.678 16 11.157 15.7767 10.7233 15.33C10.2896 14.8833 10.0728 14.3467 10.0728 13.72C10.0728 13.6267 10.0825 13.5167 10.1019 13.39C10.1214 13.2633 10.1505 13.1467 10.1893 13.04L4.30583 9.52C4.11165 9.74667 3.87217 9.93 3.58738 10.07C3.30259 10.21 3.01133 10.28 2.71359 10.28C2.10518 10.28 1.58414 10.0567 1.15049 9.61C0.716829 9.16333 0.5 8.62667 0.5 8C0.5 7.36 0.716829 6.82 1.15049 6.38C1.58414 5.94 2.10518 5.72 2.71359 5.72C3.01133 5.72 3.29612 5.78 3.56796 5.9C3.83981 6.02 4.08576 6.19333 4.30583 6.42L10.1893 2.94C10.1505 2.84667 10.1214 2.74 10.1019 2.62C10.0825 2.5 10.0728 2.38667 10.0728 2.28C10.0728 1.64 10.2896 1.1 10.7233 0.66C11.157 0.22 11.678 0 12.2864 0C12.9078 0 13.432 0.22 13.8592 0.66C14.2864 1.1 14.5 1.64 14.5 2.28C14.5 2.90667 14.2864 3.44333 13.8592 3.89C13.432 4.33667 12.9078 4.56 12.2864 4.56C11.9887 4.56 11.7006 4.51 11.4223 4.41C11.144 4.31 10.9078 4.14667 10.7136 3.92L4.8301 7.28C4.85599 7.38667 4.87864 7.51 4.89806 7.65C4.91748 7.79 4.92718 7.90667 4.92718 8C4.92718 8.09333 4.91748 8.19333 4.89806 8.3C4.87864 8.40667 4.85599 8.51333 4.8301 8.62L10.7136 12.06C10.9078 11.8733 11.1343 11.7233 11.3932 11.61C11.6521 11.4967 11.9498 11.44 12.2864 11.44C12.9078 11.44 13.432 11.66 13.8592 12.1C14.2864 12.54 14.5 13.08 14.5 13.72C14.5 14.3467 14.2864 14.8833 13.8592 15.33C13.432 15.7767 12.9078 16 12.2864 16ZM12.2864 3.36C12.5841 3.36 12.8333 3.25667 13.034 3.05C13.2346 2.84333 13.335 2.58667 13.335 2.28C13.335 1.97333 13.2346 1.71667 13.034 1.51C12.8333 1.30333 12.5841 1.2 12.2864 1.2C11.9887 1.2 11.7395 1.30333 11.5388 1.51C11.3382 1.71667 11.2379 1.97333 11.2379 2.28C11.2379 2.58667 11.3382 2.84333 11.5388 3.05C11.7395 3.25667 11.9887 3.36 12.2864 3.36ZM2.71359 9.08C3.01133 9.08 3.26052 8.97667 3.46117 8.77C3.66181 8.56333 3.76214 8.30667 3.76214 8C3.76214 7.69333 3.66181 7.43667 3.46117 7.23C3.26052 7.02333 3.01133 6.92 2.71359 6.92C2.41586 6.92 2.16667 7.02333 1.96602 7.23C1.76537 7.43667 1.66505 7.69333 1.66505 8C1.66505 8.30667 1.76537 8.56333 1.96602 8.77C2.16667 8.97667 2.41586 9.08 2.71359 9.08ZM12.2864 14.8C12.5841 14.8 12.8333 14.6967 13.034 14.49C13.2346 14.2833 13.335 14.0267 13.335 13.72C13.335 13.4133 13.2346 13.1567 13.034 12.95C12.8333 12.7433 12.5841 12.64 12.2864 12.64C11.9887 12.64 11.7395 12.7433 11.5388 12.95C11.3382 13.1567 11.2379 13.4133 11.2379 13.72C11.2379 14.0267 11.3382 14.2833 11.5388 14.49C11.7395 14.6967 11.9887 14.8 12.2864 14.8Z" fill="white"/>
</svg>
  `

    this.cameraSvg = `
<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.01953 21.8809H21.9629C23.8613 21.8809 24.8633 20.8965 24.8633 19.0156V9.78711C24.8633 7.90625 23.8613 6.92188 21.9629 6.92188H19.5635C18.8779 6.92188 18.6582 6.80762 18.2275 6.35938L17.5332 5.6123C17.0762 5.12891 16.6104 4.8916 15.7139 4.8916H12.2246C11.3281 4.8916 10.8711 5.12891 10.4053 5.6123L9.71094 6.35938C9.28906 6.79883 9.06055 6.92188 8.375 6.92188H6.01953C4.12109 6.92188 3.12793 7.90625 3.12793 9.78711V19.0156C3.12793 20.8965 4.12109 21.8809 6.01953 21.8809ZM6.13379 20.1318C5.33398 20.1318 4.87695 19.71 4.87695 18.8574V9.94531C4.87695 9.10156 5.33398 8.67969 6.13379 8.67969H8.88477C9.67578 8.67969 10.0801 8.53906 10.5283 8.05566L11.1963 7.31738C11.6885 6.78125 11.9521 6.64062 12.7256 6.64062H15.2129C15.9863 6.64062 16.25 6.78125 16.7334 7.30859L17.4102 8.05566C17.8584 8.53906 18.2627 8.67969 19.0537 8.67969H21.8486C22.6572 8.67969 23.1055 9.10156 23.1055 9.94531V18.8574C23.1055 19.71 22.6572 20.1318 21.8486 20.1318H6.13379ZM13.9912 18.9717C16.6279 18.9717 18.7373 16.8623 18.7373 14.2168C18.7373 11.5713 16.6279 9.46191 13.9912 9.46191C11.3633 9.46191 9.25391 11.5713 9.25391 14.2168C9.25391 16.8623 11.3633 18.9717 13.9912 18.9717ZM19.0361 11.0703C19.0361 11.7119 19.5547 12.2129 20.1875 12.2041C20.8027 12.2041 21.3213 11.7031 21.3213 11.0703C21.3213 10.4551 20.7939 9.92773 20.1875 9.92773C19.5547 9.92773 19.0361 10.4551 19.0361 11.0703ZM13.9912 17.3721C12.2598 17.3721 10.8447 15.9658 10.8447 14.2168C10.8447 12.459 12.251 11.0615 13.9912 11.0615C15.7402 11.0615 17.1465 12.459 17.1465 14.2168C17.1465 15.9658 15.7402 17.3721 13.9912 17.3721Z" fill="#F8CD1A"/>
</svg>

  `

    this.photoSvg = `
<svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle id='capture-progress-background' cx="50" cy="50" r="45" fill="white" stroke="#e6e6e6" stroke-width="6"/>
<circle id='captureRingCircle' cx="50" cy="50" r="45" stroke="#459ACB" stroke-linecap="round"  pathLength="100" stroke-width="6"/>
<path id='capture-progress-camera' d="M38.9132 32.32L40.2056 28.4728C40.8521 26.5482 42.6673 25.25 44.7118 25.25H55.5382C57.5827 25.25 59.3979 26.5482 60.0444 28.4728L61.3368 32.32H66.75C71.9967 32.32 76.25 36.5405 76.25 41.7467V62.9567C76.25 68.1629 71.9967 72.3833 66.75 72.3833H33.5C28.2533 72.3833 24 68.1629 24 62.9567V41.7467C24 36.5405 28.2533 32.32 33.5 32.32H38.9132ZM43.4194 33.8105C42.7729 35.7351 40.9577 37.0333 38.9132 37.0333H33.5C30.8766 37.0333 28.75 39.1436 28.75 41.7467V62.9567C28.75 65.5598 30.8766 67.67 33.5 67.67H66.75C69.3734 67.67 71.5 65.5598 71.5 62.9567V41.7467C71.5 39.1436 69.3734 37.0333 66.75 37.0333H61.3368C59.2923 37.0333 57.4771 35.7351 56.8306 33.8105L55.5382 29.9633H44.7118L43.4194 33.8105ZM50.125 62.9567C43.5666 62.9567 38.25 57.6811 38.25 51.1733C38.25 44.6656 43.5666 39.39 50.125 39.39C56.6834 39.39 62 44.6656 62 51.1733C62 57.6811 56.6834 62.9567 50.125 62.9567ZM50.125 58.2433C54.06 58.2433 57.25 55.078 57.25 51.1733C57.25 47.2687 54.06 44.1033 50.125 44.1033C46.19 44.1033 43 47.2687 43 51.1733C43 55.078 46.19 58.2433 50.125 58.2433Z" fill="#459ACB"/>
</svg>
  `


    this.videoURL = null
    this.videoArray = []
    this.chunks = []
    this.videoFile = null

    this.uploadImage = null

    this.captureBtn = document.createElement('div')
    this.captureBtn.id = 'captureBtn'
    this.captureBtn.innerHTML = this.photoSvg

    this.timer = document.createElement('button')
    this.timer.id = 'captureTimmer'
    this.timer.innerHTML = '12'

    this.captureBtn.appendChild(this.timer)

    this.intervelRing = null
    this.videoTime = 300
    this.videoCurrent = 0
    this.videoDuration = 10000
    this.videoInSession = false

    this.isVideoRecording = false
    this.pressTimeout = null

    this.audioStream = null

    this.initaledBtn = false
    this.captureImg = null
    this.previewBlod = null

    this.previewDom = document.createElement('div')
    this.previewDom.id = 'previewDom'

    this.previewImgDom = document.createElement('div')
    this.previewImgDom.id = 'previewImgDom'

    this.previewImg = document.createElement('img')
    this.previewImg.id = 'previewImg'

    this.previewVideo = document.createElement('video')
    this.previewVideo.id = 'previewVideo'
    this.previewVideo.autoplay = true
    this.previewVideo.controls = true
    this.previewVideo.playsInline = true

    this.previewAudio = document.createElement('audio')
    this.previewAudio.controls = true

    // <audio controls></audio>

    this.previewClose = document.createElement('div')
    this.previewClose.id = 'previewClose'


    this.closeText = document.createElement('div')
    this.closeText.id = 'closeText'
    this.closeText.innerHTML = 'Cancel'

    this.previewShare = document.createElement('div')
    this.previewShare.id = 'previewShare'

    this.shareImg = document.createElement('div')
    this.shareImg.id = 'shareImg'
    this.shareImg.innerHTML = this.shareSvg

    this.shareText = document.createElement('div')
    this.shareText.id = 'shareText'
    this.shareText.innerHTML = 'Share'

    this.previewDom.appendChild(this.previewImgDom)
    this.previewImgDom.appendChild(this.previewImg)
    this.previewImgDom.appendChild(this.previewVideo)
    // this.previewImgDom.appendChild(this.previewAudio)

    this.previewShare.appendChild(this.shareImg)
    this.previewShare.appendChild(this.shareText)
    this.previewDom.appendChild(this.previewShare)


    // this.previewClose.appendChild(this.closeImg)
    this.previewClose.appendChild(this.closeText)
    this.previewDom.appendChild(this.previewClose)

    this.downloadLink = document.createElement('a')

    this.onClickFun = null
    this.reviewShowFunc = null
    this.reviewHideFunc = null

    this.shareTitle = data.shareTitle || 'Wow! This is sooo cool!'
    this.shareText = data.shareText || 'Check out the coolest t-shirts in the world. Click the link to see the AR Experience.'
  }

  async init() {
    document.body.append(this.captureBtn)

    this.progressRing = document.getElementById('captureRingCircle')
    this.progressRing.style.strokeDashoffset = 0

    this.progressCamera = document.getElementById('capture-progress-camera')
    this.progressBackground = document.getElementById('capture-progress-background')
    // this.progressRing.style.display = "none"

    // console.log(this.progressRing)

    // const {context} = this.listener

    this.videoStream = this.canvas.captureStream(30)

    this.videoRecorder = new MediaRecorder(this.videoStream)

    this.audioContext = this.listener.context

    const mediaStreamDestination = new MediaStreamAudioDestinationNode(this.audioContext);


    console.log(this.listener)


    if (!this.audioStream) {
      try {
        this.audioStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            autoGainControl: true,
            noiseSuppression: false,
          },
        })
      } catch (err) {
        console.error(err)
        window.dispatchEvent(new Event('mic-permission-denied'))
      }
      if (this.audioStream) {
        const audioTack = this.audioStream.getAudioTracks()[0]
        this.videoStream.addTrack(audioTack)
      }
    }
    console.log(this.canvas)
    console.log(this.videoStream)
    console.log(this.videoRecorder)


    this.videoRecorder.ondataavailable = (e) => {
      this.chunks.push(e.data)
    }

    this.videoRecorder.onstop = (e) => {
      this.blob = new Blob(this.chunks, {'type': 'video/mp4', 'name': 'xr-shirts.mp4', 'lastModifiedDate': new Date()})
      this.chunks = []
      this.videoURL = URL.createObjectURL(this.blob)
      this.videoFile = new File([this.blob], 'xr-shirts.mp4', {
        type: 'video/mp4',
        lastModifiedDate: new Date(),
      })

      console.log({vidoe: this.videoFile})

      console.log(this.videoFile instanceof File)
      // iconsBox.style.display = "block"
      this.previewVideo.src = this.videoURL
      // downloadIcon.href = videoURL;
      this.videoArray.push(this.videoFile)
      // console.error(' this.previewDom.remove() capture vidoe')

      if (this.initaledBtn) {
        document.body.append(this.previewDom)
        if (this.reviewShowFunc) this.reviewShowFunc()
      }
    }

    this.captureBtn.style.opacity = 1

    this.captureBtn.addEventListener('touchstart', (e) => {
      e.preventDefault()
    })

    this.captureBtn.addEventListener('touchmove', (e) => {
      e.preventDefault()
    })

    this.captureBtn.addEventListener('touchend', (e) => {
      e.preventDefault()
    })

    this.captureBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      this.initaledBtn = true

      this.pressTimeout = setTimeout(() => {
        this.captureBtn.classList.add('cameraPop')
        this.progressRing.style.strokeDashoffset = 100
        this.isVideoRecording = true
      }, 1000)
    })
    this.captureBtn.addEventListener('pointerup', (e) => {
      e.preventDefault()

      if (this.isVideoRecording) {
        if (this.videoInSession) {
          this.stopVideoRecording()
          this.progressRing.style.strokeDashoffset = 100
        } else {
          this.startRecordVideo()
        }
      } else {
        this.captureImage()
        clearTimeout(this.pressTimeout)
      }
    })

    this.previewClose.addEventListener('click', () => {
      this.previewDom.remove()
      this.captureBtn.classList.remove('cameraPop')
      this.progressRing.style.strokeDashoffset = 0
      this.isVideoRecording = false
      if (this.onClickFun) this.onClickFun()
      if (this.initaledBtn) {
        if (this.reviewHideFunc) this.reviewHideFunc()
      }
    })

    this.previewShare.addEventListener('click', async () => {
    // this.previewDom.remove()
      // const file = this.dataURLtoFile(this.captureImg, 'xrshirt_webar.png')
      // const file = this.dataURLtoFile([this.blob], 'xrshirt_webar.mp4')

      if (this.isVideoRecording) {
        this.shareVideo()
      } else {
        this.shareImage()
      }

      // const file = new Image()

      // file.src = this.captureImg;

      // const file = new File([this.previewBlod], 'some.png', {type: 'image/png'})

      // const file = new File([this.videoURL], "xrshirt_webar.mp4",{
      //   type: 'video/mp4',
      // })

      // const file = this.videoFile

      // const shareData = {
      //   title: 'Welcome to the XR t-shirts',
      //   text: `WoW!! Come visit the coolest t-shirts in the world. Experience the our t-shirts in Metaverse.${window.location.href}`,
      //   url: window.location.href,
      // }
      // try {
      //   await navigator.share(shareData)
      //   console.log('MDN shared successfully')
      // } catch (err) {
      //   console.log(err)
      // }
    })
  // this.initaledBtn = true
  }

  async shareVideo() {
    // window.open(this.videoFile)

    // const response = await fetch( this.videoFile);

    // const blob = await response.blob();
    // const filesArray = [
    //   new File(
    //     [blob],
    //     'xr-shirts-video-capture.mp4',
    //     {
    //       type: "video/mp4",
    //       lastModified: new Date().getTime()
    //     }
    // )
    // ];

    // console.log(response)

    const isIos = (/iPad|iPhone|iPod/.test(navigator.userAgent) && !self.MSStream) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

    if (isIos) {
      const data = {
        title: this.shareTitle,
        text: ` ${this.shareTitle} ${window.location.href}`,
        files: [this.videoFile],
        // url: window.location.href,

      }

      try {
        await navigator.share(data)
        console.log('Data was shared successfully')
      } catch (err) {
      // this.downloadLink.click()
      // window.location.reload(true);
        console.error(err)

        if (err.message !== 'Share canceled') {
          const link = document.createElement('a')
          link.href = this.videoURL
          link.download = 'xr-shirts-video-capture.mp4'
          link.click()
        }
      }
    } else {
      const link = document.createElement('a')
      link.href = this.videoURL
      link.download = 'xr-shirts-video-capture.mp4'
      link.click()
    }


  }

  async shareImage() {
    const file = this.dataURLtoFile(this.captureImg, 'xrshirt_webar.png')

    const data = {
      title: this.shareTitle,
      text: ` ${this.shareTitle} ${window.location.href}`,
      files: [file],
      // url: window.location.href,

    }
    try {
      await navigator.share(data)
      console.log('Data was shared successfully')
    } catch (err) {
      // this.downloadLink.click()
      // window.location.reload(true);
      console.error(err)

      if (err.message !== 'Share canceled') {
        const link = document.createElement('a')
        link.href = this.captureImg
        link.download = 'xr-shirts-capture.png'
        link.click()
      }
    }

  }

  async startRecordVideo() {
    if (!this.videoInSession) {
      this.videoInSession = true

      console.log('start')
      console.log(this.videoRecorder)
      this.progressRing.style.strokeDashoffset = 100

      this.videoRecorder.start()
      this.progressCamera.style.display = 'none'
      this.timer.style.display = 'block'
      this.progressBackground.style.fill = '#ffb000'
      // this.videoTime = 300
      // this.videoCurrent = 0
      // this.videoDuration = 5000

      this.intervelRing = setInterval(() => {
        this.videoCurrent += this.videoTime

        const currentPrecent = Math.floor((this.videoCurrent / this.videoDuration) * 100)

        const timeleft = Math.floor((this.videoDuration - this.videoCurrent) / 1000)

        if (currentPrecent < 100) {
          this.timer.innerHTML = timeleft

          this.progressRing.style.strokeDashoffset = 100 - currentPrecent
        } else {
          this.stopVideoRecording()
        }
      }, this.videoTime)
    }
  }

  stopVideoRecording() {
    // this.isVideoRecording = false
    this.videoCurrent = 0
    clearInterval(this.intervelRing)
    this.timer.style.display = 'none'
    this.progressCamera.style.display = 'block'
    this.previewImg.style.display = 'none'
    this.previewVideo.style.display = 'block'
    this.captureBtn.classList.remove('cameraPop')
    this.progressBackground.style.fill = 'white'
    console.log('video stop')
    this.videoInSession = false
    this.videoRecorder.stop()
    setTimeout(() => {
      this.progressRing.style.strokeDashoffset = 0
    }, 500)
  }

  captureImage() {

    this.captureImg = this.canvas.toDataURL('image/png')
    this.previewBlod = this.canvas.toBlob((blod) => {
      this.uploadImage = new File([blod], 'xr-shirts.png', {
        type: 'image/png',
        lastModified: new Date(),
      })

      console.log({imageFile: this.uploadImage, blod})
    }, 'image/png')

    this.previewImg.src = this.captureImg

    console.log(' this.previewDom.remove() capture image')
    if (this.initaledBtn)document.body.append(this.previewDom)

    this.previewImg.style.display = 'block'
    this.previewVideo.style.display = 'none'

    this.downloadLink.setAttribute('href', this.captureImg)

    this.downloadLink.setAttribute('download', 'xrshirt_webar.png')
  }

  dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',')
    const mimeType = arr[0].match(/:(.*?);/)[1]
    const decodedData = atob(arr[1])
    let lengthOfDecodedData = decodedData.length
    const u8array = new Uint8Array(lengthOfDecodedData)
    while (lengthOfDecodedData--) {
      u8array[lengthOfDecodedData] = decodedData.charCodeAt(lengthOfDecodedData)
    }
    return new File([u8array], filename, {type: mimeType})
  }

  hide() {
    this.captureBtn.style.display = 'none'
  // mediaRecorder
  }

  show() {
    this.captureBtn.style.display = 'flex'
  }

  onClick(callBack) {
    this.onClickFun = callBack
  }

  onPreviewShow(callBack) {
    this.reviewShowFunc = callBack
  }

  onPreviewHide(callBack) {
    this.reviewHideFunc = callBack
  }

  hidePreview() {
    this.previewDom.remove()
  }
}
