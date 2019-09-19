<template>
  <div
    id="container"
    :class="['container', { 'is-grabbing': grabbingIndex }]"
    @mousemove="mousemoveContainer"
    @mouseup="mouseupContainer"
  >
    <div class="main">
      <div ref="preview" class="preview">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="520"
          height="520"
          class="preview-svg"
        >
          <!-- line -->
          <line
            :x1="p[0].x"
            :y1="p[0].y"
            :x2="p[1].x"
            :y2="p[1].y"
            stroke="#e0e0e0"
            stroke-width="4"
          />
          <line
            :x1="p[2].x"
            :y1="p[2].y"
            :x2="p[3].x"
            :y2="p[3].y"
            stroke="#e0e0e0"
            stroke-width="4"
          />

          <!-- bezier -->
          <path
            :d="
              `M${p[0].x} ${p[0].y} C ${p[1].x} ${p[1].y}, ${p[2].x} ${p[2].y}, ${p[3].x} ${p[3].y}`
            "
            stroke="#444"
            stroke-width="4"
            fill="transparent"
          />

          <!-- dot -->
          <circle
            :cx="p[0].x"
            :cy="p[0].y"
            r="10"
            fill="#666666"
            class="oops"
          />
          <circle
            :cx="p[1].x"
            :cy="p[1].y"
            r="10"
            fill="#42b883"
            class="can-grab"
            @mousedown="mousedownPoint(1)"
          />
          <circle
            :cx="p[2].x"
            :cy="p[2].y"
            r="10"
            fill="#35495e"
            class="can-grab"
            @mousedown="mousedownPoint(2)"
          />
          <circle
            :cx="p[3].x"
            :cy="p[3].y"
            r="10"
            fill="#666666"
            class="oops"
          />
        </svg>
        <div class="preview-bg" />
      </div>
      <p class="bezier">
        {{ cubicBezier }}
      </p>
      <img
        src="https://s3-ap-northeast-1.amazonaws.com/noplan1989-demo/bezier/1.png"
        class="tuna"
        alt="tuna"
        :style="{ animationTimingFunction: cubicBezier }"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grabbingIndex: null,
      size: 500,
      min: 10,
      max: 510,
      offset: {
        x: 0,
        y: 0,
      },
      p: [
        { x: 10, y: 510 },
        { x: 460, y: 450 },
        { x: 60, y: 50 },
        { x: 510, y: 10 },
      ],
    };
  },
  computed: {
    cubicBezier() {
      const b = [
        this.normalize(this.p[1].x),
        this.normalize(this.max - this.p[1].y),
        this.normalize(this.p[2].x),
        this.normalize(this.max - this.p[2].y),
      ].join(', ');

      return `cubic-bezier(${b})`;
    },
  },
  mounted() {
    this.setOffset();
    window.addEventListener('resize', () => this.setOffset());
    window.addEventListener('scroll', () => this.setOffset());
  },
  methods: {
    mousemoveContainer(e) {
      if (this.grabbingIndex) {
        const x = e.pageX - this.offset.x;
        const y = e.pageY - this.offset.y;
        console.log(x, y);

        this.setPosition(this.grabbingIndex, x, y);
      }
    },
    mouseupContainer() {
      this.grabbingIndex = null;
    },
    mousedownPoint(index) {
      this.grabbingIndex = index;
    },
    normalize(num) {
      return Math.floor((1000 * (num - this.min)) / this.size) / 1000;
    },
    kimurakaela(num) {
      return Math.min(this.max, Math.max(this.min, num));
    },
    setPosition(index, x, y) {
      this.p.splice(index, 1, {
        x: this.kimurakaela(x),
        y: this.kimurakaela(y),
      });
    },
    setOffset() {
      const rect = this.$refs.preview.getBoundingClientRect();

      this.offset = {
        x: window.pageXOffset + rect.left,
        y: window.pageYOffset + rect.top,
      };
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:300');

body {
  letter-spacing: 0.1em;
  color: #444;
  font-family: 'Lato', sans-serif;
}

.oops {
  cursor: not-allowed;
}

.can-grab {
  cursor: grab;
}

.container {
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &.is-grabbing {
    cursor: grabbing;
    .can-grab {
      cursor: grabbing;
    }
  }
}

.main {
  width: 1000px;
  display: flex;
  padding: 60px;
  justify-content: space-between;
  align-items: center;
}

.preview {
  position: relative;
  z-index: 1;
  &-svg {
    position: relative;
    z-index: 1;
  }
  &-bg {
    width: 500px;
    height: 500px;
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #fafafa;
    &:before,
    &:after {
      content: '';
      position: absolute;
      background-color: #eaeaea;
    }
    &:before {
      width: 100%;
      height: 2px;
      left: 0;
      top: 50%;
      margin-top: -1px;
    }
    &:after {
      width: 2px;
      height: 100%;
      top: 0;
      left: 50%;
      margin-left: -1px;
    }
  }
}

.bezier {
  flex: 1;
  padding-left: 60px;
  font-size: 26px;
  white-space: nowrap;
}

.tuna {
  width: 200px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: 80px;
  animation: 1.5s swim infinite;
}

@keyframes swim {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100vw) translateX(-100%);
  }
}

// 1 column
@media (max-width: 1080px) {
  .main {
    display: block;
    padding: 60px 100px;
  }
  .preview,
  .bezier {
    max-width: 520px;
    margin: 0 auto;
  }
  .bezier {
    margin-top: 30px;
    padding: 0;
  }
  .tuna {
    margin-top: 30px;
  }
}
</style>
