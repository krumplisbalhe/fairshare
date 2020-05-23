<template>
  <div class="balance">
    <div class="topNav">
      <div @click="setActiveTab('time')" class="tab" :class="active_tab === 'time' ? 'active_tab' : ''">Time</div>
      <div @click="setActiveTab('points')" class="tab" :class="active_tab === 'points' ? 'active_tab' : ''">Points</div>
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
            :colors="['var(--classicBlue)', 'var(--lightBlue)']"
            :dataSets="dynamicData">
      </vue-frappe>
  </div>
</template>

<script>
export default {
  name: 'Balance',
  components: {
  },
  data(){
    return {
      active_tab: 'points'
    }
  },
  computed: {
    dynamicData(){
        return [
        {
          name: "FairShare", chartType: 'pie',
          values: [this.user1, this.user2]
        }
        ]
    },
    user1(){
      if(this.active_tab === 'points'){
        return this.$root.tasks.filter(e => e.is_done === 1 && e.assigned_to === this.$root.usersOfHousehold[0].user_id).map(a => a.point).reduce((a, b) => a + b, 0)
      }
      else return this.$root.tasks.filter(e => e.is_done === 1 && e.assigned_to === this.$root.usersOfHousehold[0].user_id).map(a => a.time_spent).reduce((a, b) => a + b, 0)
    },
    user2(){
      if(this.active_tab === 'points'){
        return this.$root.tasks.filter(e => e.is_done === 1 && e.assigned_to === this.$root.usersOfHousehold[1].user_id).map(a => a.point).reduce((a, b) => a + b, 0)
      }
      else return  this.$root.tasks.filter(e => e.is_done === 1 && e.assigned_to === this.$root.usersOfHousehold[1].user_id).map(a => a.time_spent).reduce((a, b) => a + b, 0)
    }
  },
  methods: {
    setActiveTab(nameOfTab){
      this.active_tab = nameOfTab
    },
  }
}
</script>

<style lang="scss">

.balance {
  height: 100%;
}

.topNav {
  display: flex;
  justify-content: space-around;
  border: 4px solid var(--backgroundColor);
  width: 240px;
  background-color: var(--backgroundColor);
  border-radius: 15px;
  margin: auto;
  margin-bottom: 15px;
  height: 40px;
}

.tab {
  width: 100%;
  height: 70%;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 10px 10px;
  background-color: var(--back-color);
  box-shadow: inset 0px 0px 4px rgba(255, 255, 255, .2), inset 7px 7px 15px rgba(55, 84, 170, 0), inset -7px -7px 20px rgba(255, 255, 255, 0);
  transition: box-shadow .4s ease;
  cursor: pointer;
  color: rgba(68, 68, 68, 0.4);
  text-shadow: 4px 2px 6px var(--shadowColor), -4px -2px 6px #FFFFFF;
}

.tab:first-child {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}

.tab:last-child {
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}

.active_tab {
  box-shadow: inset 3px 3px 7px var(--shadowColor), inset -3px -3px 7px #FFFFFF;
  transition: all 600ms ease;
}

#chart {
  height: calc(100% - 63px);
  display: flex;
  align-items: center;

  .chart-container{

  }
}

</style>
