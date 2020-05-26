<template>
  <div class="balance">
    <div class="topNav">
      <div
        @click="setActiveTab('time')"
        class="tab time"
        :class="active_tab === 'time' ? 'active_tab' : ''"
      >
        Time
      </div>
      <div
        @click="setActiveTab('points')"
        class="tab points"
        :class="active_tab === 'points' ? 'active_tab' : ''"
      >
        Points
      </div>
      <hr />
    </div>
    <vue-frappe
      id="chart"
      :key="active_tab"
      :labels="[
        $root.usersOfHousehold[0].user_name,
        $root.usersOfHousehold[1].user_name
      ]"
      type="pie"
      :height="400"
      :colors="['#0F4C81', '#DF6741']"
      :dataSets="dynamicData"
    >
    </vue-frappe>
  </div>
</template>

<script>
export default {
  name: 'Balance',
  components: {},
  data() {
    return {
      active_tab: 'points'
    }
  },
  mounted() {
    this.$root.getUsersOfHousehold()
    console.log(this.$root.usersOfHousehold)
  },
  computed: {
    dynamicData() {
      return [
        {
          name: 'FairShare',
          chartType: 'pie',
          values: [this.user1, this.user2]
        }
      ]
    },
    user1() {
      if (this.active_tab === 'points') {
        return this.$root.usersOfHousehold[0].point
      } else return this.$root.usersOfHousehold[0].time
    },
    user2() {
      if (this.active_tab === 'points') {
        return this.$root.usersOfHousehold[1].point
      } else return this.$root.usersOfHousehold[1].time
    }
  },
  methods: {
    setActiveTab(nameOfTab) {
      this.active_tab = nameOfTab
    }
  }
}
</script>

<style lang="scss">
.balance {
  height: 100%;
}

.time.active_tab ~ hr {
  margin-left: -25%;
}

.points.active_tab ~ hr {
  margin-left: 25%;
}

#chart {
  height: calc(100% - 63px);
  display: flex;
  align-items: center;
}

.chart-legend {
  transform: translate(100px, 370px) !important;
}
</style>
