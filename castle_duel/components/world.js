Vue.component("castle", {
  template: `
		<div class="castle" :class="'player-' + index">
			<img class="building" :src="'svg/castle' + index + '.svg'" />
			<img class="ground" :src="'svg/ground' + index + '.svg'" />
			<castle-banners :player="player" />
		</div>`,
  props: ["player", "index"]
});

Vue.component("castle-banners", {
  template: `
		<div class="banners">
			<img class="food-icon" src="svg/food-icon.svg" />
			<bubble
				type="food"
				:value="player.food"
				:ratio="foodRatio"
			/>
			<banner-bar class="food-bar" color="#288339" :ratio="foodRatio" />
			<img class="health-icon" src="svg/health-icon.svg" />
			<bubble
				type="health"
				:value="player.health"
				:ratio="healthRatio"
			/>
			<banner-bar class="health-bar" color="#9b2e2e" :ratio="healthRatio" />
		</div>`,
  props: ["player"],
  computed: {
    foodRatio() {
      return this.player.food / maxFood;
    },
    healthRatio() {
      return this.player.health / maxHealth;
    }
  }
});

Vue.component("bubble", {
  template: `
		<div class="stats-buble"
			:class="type + '-bubble'"
			:style="bubbleStyle">
			<img :src="'svg/' + type + '-bubble.svg'" />
			<div class="counter">{{ value }}</div>
		</div>`,
  props: ["type", "value", "ratio"],
  computed: {
    bubbleStyle() {
      return {
        top: (this.ratio * 200 + 40) * state.worldRatio + "px"
      };
    }
  }
});

Vue.component("banner-bar", {
  template: "#banner",
  props: ["color", "ratio"],
  data() {
    return {
      height: 0
    };
  },
  computed: {
    targetHeight() {
      return 220 * this.ratio + 40;
    }
  },
  created() {
    this.height = this.targetHeight;
  },
  watch: {
    targetHeight(newValue, oldValue) {
      const vm = this;
      new TWEEN.Tween({ value: oldValue })
        .easing(TWEEN.Easing.Cubic.InOut)
        .to({ value: newValue }, 500)
        .onUpdate(function() {
          vm.height = this.value.toFixed(0);
        })
        .start();
    }
  }
});

const cloudAnimationDurations = {
  min: 10000,
  max: 50000
};

Vue.component("cloud", {
  template: `
	<div
		class="cloud"
		:class="'cloud' + type"
		:style="style"
	>
		<img
			:src="'svg/cloud' + type + '.svg'"
			@load="initPosition"
		/>
	</div>`,
  props: ["type"],
  data() {
    return {
      style: {
        transform: "none",
        zIndex: 0
      }
    };
  },
  methods: {
    setPosition(left, top) {
      this.style.transform = `translate(${left}px, ${top}px)`;
    },
    initPosition() {
      const width = this.$el.clientWidth;
      this.setPosition(-width, 0);
    },
    startAnimation(delay = 0) {
      const vm = this;
      // Element width
      const width = this.$el.clientWidth;
      // Random animation duration
      const { min, max } = cloudAnimationDurations;
      const animationDuration = Math.random() * (max - min) + min;
      // Bing faster clouds forward
      this.style.zIndex = Math.round(max - animationDuration);
      // Animation will be there
      // Random position
      const top = Math.random() * (window.innerHeight * 0.3);
      new TWEEN.Tween({ value: -width })
        .to({ value: window.innerWidth }, animationDuration)
        .delay(delay)
        .onUpdate(function() {
          vm.setPosition(this.value, top);
        })
        .onComplete(() => {
          // With a random delay
          this.startAnimation(Math.random() * 10000);
        })
        .start();
    }
  },
  mounted() {
    this.startAnimation(-Math.random() * cloudAnimationDurations.min);
  }
});
