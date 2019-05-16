<template>
  <div>
    <el-row :gutter="20">
        <el-col :span="24">
          <div class="grid-content-top-heading">
            <span class="headingLabel-top-heading">Shift Code Details - {{shiftItem.shiftCode}}</span>
          </div>
        </el-col>
      </el-row>
    <el-row :span="24" >
      <el-col :span="5">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Copy {{getDay}} Shift to Days</span>
        </div>
      </el-col>
      <el-col :span="5" >
        <div class="grid-content-top-heading-sub">
          <div class="headingLabel-top-heading-sub">
            <el-select v-model="CopyDays" multiple placeholder="Select" size="mini"  @remove-tag="RemoveDisabled"
              @change="AddToDisabled">
            <el-option
              :disabled="(index <= $store.getters.getActiveTab)"
              v-for="(item, index) in Days"
              :key="item.value"
              :label="item.DisplayName"
              :value="item.value"
            ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content-top-heading-sub">
          <div class="headingLabel-top-heading-sub">
            <el-button
            @click="CopyDay"
            size="medium"
            type="primary"
            icon="el-icon-circle-plus"
          >Copy</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="10" style="padding: 5px;">
      </el-col>
      <el-col :span="1" style="margin-right: 1vw;">
        <el-button
            @click="UpdateShiftDaySchedules"
            size="medium"
            type="warning"
            icon="el-icon-circle-plus"
          >Update</el-button>
      </el-col>
    </el-row>
  <el-tabs
    type="card"
    @tab-click="handleClick"
    stretch
    style="background-color:#5D6D7E;"
    v-model="active"
    v-if="ShiftDaySchedules.length > 0"
  >
    <el-tab-pane :label='`Sunday - ${SundaySchedule.shiftTimeSpan}`' :disabled="$store.getters.getDisabledIndexes.includes('0')">
      <shiftDetailItem :active="0" :item="SundaySchedule" :reload.sync="reloadSunday" ></shiftDetailItem>
    </el-tab-pane>
    <el-tab-pane :label='`Monday - ${MondaySchedule.shiftTimeSpan}`' :disabled="$store.getters.getDisabledIndexes.includes('1')">
      <shiftDetailItem :active="1" :item="MondaySchedule" :reload.sync="reloadMonday" ></shiftDetailItem>
    </el-tab-pane>
    <el-tab-pane :label='`Tuesday - ${TuesdaySchedule.shiftTimeSpan}`' :disabled="$store.getters.getDisabledIndexes.includes('2')">
      <shiftDetailItem :active="2" :item="TuesdaySchedule" :reload.sync="reloadTuesday"></shiftDetailItem>
    </el-tab-pane>
    <el-tab-pane :label='`Wednesday - ${WednesdaySchedule.shiftTimeSpan}`' :disabled="$store.getters.getDisabledIndexes.includes('3')">
      <shiftDetailItem :active="3" :item="WednesdaySchedule" :reload.sync="reloadWednesday"></shiftDetailItem>
    </el-tab-pane>
    <el-tab-pane :label='`Thursday - ${ThursdaySchedule.shiftTimeSpan}`' :disabled="$store.getters.getDisabledIndexes.includes('4')">
      <shiftDetailItem :active="4" :item="ThursdaySchedule" :reload.sync="reloadThursday" ></shiftDetailItem>
    </el-tab-pane>
    <el-tab-pane :label='`Friday - ${FridaySchedule.shiftTimeSpan}`' :disabled="$store.getters.getDisabledIndexes.includes('5')">
      <shiftDetailItem :active="5" :item="FridaySchedule" :reload.sync="reloadFriday"></shiftDetailItem>
    </el-tab-pane>
    <el-tab-pane :label='`Saturday - ${SaturdaySchedule.shiftTimeSpan}`' :disabled="$store.getters.getDisabledIndexes.includes('6')">
      <shiftDetailItem :active="6" :item="SaturdaySchedule" :reload.sync="reloadSaturday"></shiftDetailItem>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
import shiftDetailItem from './shiftDetailItem.vue'
export default {
  props: ['ShiftId', 'shiftItem', 'clearCopy'],
  components: {
    shiftDetailItem
  },
  data () {
    return {
      reloadSunday: false,
      reloadMonday: false,
      reloadWednesday: false,
      reloadTuesday: false,
      reloadThursday: false,
      reloadFriday: false,
      reloadSaturday: false,
      SaturdayTime: '',
      FridayTime: '',
      ThursdayTime: '',
      WednesdayTime: '',
      TuesdayTime: '',
      MondayTime: '',
      SundayTime: '',
      SundaySchedule: null,
      MondaySchedule: null,
      TuesdaySchedule: null,
      WednesdaySchedule: null,
      ThursdaySchedule: null,
      FridaySchedule: null,
      SaturdaySchedule: null,
      CopyDays: [],
      Days: [
        {
          value: '0',
          DisplayName: 'Sunday'
        },
        {
          value: '1',
          DisplayName: 'Monday'
        },
        {
          value: '2',
          DisplayName: 'Tuesday'
        },
        {
          value: '3',
          DisplayName: 'Wednesday'
        },
        {
          value: '4',
          DisplayName: 'Thursday'
        },
        {
          value: '5',
          DisplayName: 'Friday'
        },
        {
          value: '6',
          DisplayName: 'Saturday'
        }
      ],
      active: '0',
      activeName: 'first',
      ShiftDaySchedules: [],
      newShiftDaySchedules: [],
      SelectedSchedule: null
    }
  },
  mounted () {
    this.LoadShiftDetails()
    this.$store.commit('setActiveTab', '0')
  },
  watch: {
    getDay () {},
    clearCopy () {
      if (this.clearCopy === true) {
        this.CopyDays = []
        this.SaturdayTime = ''
        this.FridayTime = ''
        this.ThursdayTime = ''
        this.WednesdayTime = ''
        this.TuesdayTime = ''
        this.MondayTime = ''
        this.SundayTime = ''
        this.SundaySchedule = null
        this.MondaySchedule = null
        this.TuesdaySchedule = null
        this.WednesdaySchedule = null
        this.ThursdaySchedule = null
        this.FridaySchedule = null
        this.SaturdaySchedule = null
        this.SelectedSchedule = null
      }
    }
  },
  computed: {
    // eslint-disable-next-line
    getDay () {
      if (this.$store.getters.getActiveTab === '0') {
        // eslint-disable-next-line
        this.reloadSunday = true
        return 'Sunday'
      }
      if (this.$store.getters.getActiveTab === '1') {
        // eslint-disable-next-line
        this.reloadMonday = true
        return 'Monday'
      }
      if (this.$store.getters.getActiveTab === '2') {
        // eslint-disable-next-line
        this.reloadTuesday = true
        return 'Tuesday'
      }
      if (this.$store.getters.getActiveTab === '3') {
        // eslint-disable-next-line
        this.reloadWednesday = true
        return 'Wednesday'
      }
      if (this.$store.getters.getActiveTab === '4') {
        // eslint-disable-next-line
        this.reloadThursday = true
        return 'Thursday'
      }
      if (this.$store.getters.getActiveTab === '5') {
        // eslint-disable-next-line
        this.reloadFriday = true
        return 'Friday'
      }
      if (this.$store.getters.getActiveTab === '6') {
        // eslint-disable-next-line
        this.reloadSaturday = true
        return 'Saturday'
      }
    }
  },
  methods: {
    UpdateShiftDaySchedules () {
      this.newShiftDaySchedules = []
      this.newShiftDaySchedules.push(this.SundaySchedule)
      this.newShiftDaySchedules.push(this.MondaySchedule)
      this.newShiftDaySchedules.push(this.TuesdaySchedule)
      this.newShiftDaySchedules.push(this.WednesdaySchedule)
      this.newShiftDaySchedules.push(this.ThursdaySchedule)
      this.newShiftDaySchedules.push(this.FridaySchedule)
      this.newShiftDaySchedules.push(this.SaturdaySchedule)
      this.$store.dispatch({
        type: 'updateShiftDaySchedules',
        data: this.newShiftDaySchedules,
        id: this.shiftItem.shiftCode
      }).then(() => {
        this.showSuccessNotification('Shift Day Schedules successfully updated.')
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.setGlobalLoading(false)
        this.$emit('CloseDialog', false)
      })
    },
    setGlobalLoading (loading) {
      this.$store.commit({
        type: 'setGlobalLoad',
        load: loading
      })
    },
    AddToDisabled (item) {
      this.$store.commit('setNewDisabledIndex', item)
    },
    RemoveDisabled (item) {
      this.$store.commit('setRemoveDisabledIndex', item)
    },
    CopyDay () {
      let SelectedDay = this.$store.getters.getActiveTab
      if (SelectedDay === '0') {
        this.SelectedSchedule = JSON.parse(JSON.stringify(this.SundaySchedule))
      }
      if (SelectedDay === '1') {
        this.SelectedSchedule = JSON.parse(JSON.stringify(this.MondaySchedule))
      }
      if (SelectedDay === '2') {
        this.SelectedSchedule = JSON.parse(JSON.stringify(this.TuesdaySchedule))
      }
      if (SelectedDay === '3') {
        this.SelectedSchedule = JSON.parse(JSON.stringify(this.WednesdaySchedule))
      }
      if (SelectedDay === '4') {
        this.SelectedSchedule = JSON.parse(JSON.stringify(this.ThursdaySchedule))
      }
      if (SelectedDay === '5') {
        this.SelectedSchedule = JSON.parse(JSON.stringify(this.FridaySchedule))
      }
      if (SelectedDay === '6') {
        this.SelectedSchedule = JSON.parse(JSON.stringify(this.SaturdaySchedule))
      }
      for (var i = 0; i < this.CopyDays.length; i++) {
        if (this.CopyDays[i] === '1') {
          this.MondaySchedule = JSON.parse(JSON.stringify(this.SelectedSchedule))
          this.MondaySchedule.day = 'Monday'
        }
        if (this.CopyDays[i] === '2') {
          this.TuesdaySchedule = JSON.parse(JSON.stringify(this.SelectedSchedule))
          this.TuesdaySchedule.day = 'Tuesday'
        }
        if (this.CopyDays[i] === '3') {
          this.WednesdaySchedule = JSON.parse(JSON.stringify(this.SelectedSchedule))
          this.WednesdaySchedule.day = 'Wednesday'
        }
        if (this.CopyDays[i] === '4') {
          this.ThursdaySchedule = JSON.parse(JSON.stringify(this.SelectedSchedule))
          this.ThursdaySchedule.day = 'Thursday'
        }
        if (this.CopyDays[i] === '5') {
          this.FridaySchedule = JSON.parse(JSON.stringify(this.SelectedSchedule))
          this.FridaySchedule.day = 'Friday'
        }
        if (this.CopyDays[i] === '6') {
          this.SaturdaySchedule = JSON.parse(JSON.stringify(this.SelectedSchedule))
          this.SaturdaySchedule.day = 'Saturday'
        }
      }
      this.showSuccessNotification('Shift was successfully copied.')
      this.CopyDays = []
      this.$store.commit('setClearDisabledIndexes')
    },
    showSuccessNotification (message) {
      this.$message({
        message: message,
        type: 'success'
      })
    },
    LoadShiftDetails () {
      this.ShiftDaySchedules = this.$store.getters.getShiftDaySchedules
      for (var i = 0; i < this.ShiftDaySchedules.length; i++) {
        if (this.ShiftDaySchedules[i].day === 'Sunday') {
          this.SundaySchedule = this.ShiftDaySchedules[i]
          this.SundaySchedule.day = 'Sunday'
        }
        if (this.ShiftDaySchedules[i].day === 'Monday') {
          this.MondaySchedule = this.ShiftDaySchedules[i]
          this.MondaySchedule.day = 'Monday'
        }
        if (this.ShiftDaySchedules[i].day === 'Tuesday') {
          this.TuesdaySchedule = this.ShiftDaySchedules[i]
          this.TuesdaySchedule.day = 'Tuesday'
        }
        if (this.ShiftDaySchedules[i].day === 'Wednesday') {
          this.WednesdaySchedule = this.ShiftDaySchedules[i]
          this.WednesdaySchedule.day = 'Wednesday'
        }
        if (this.ShiftDaySchedules[i].day === 'Thursday') {
          this.ThursdaySchedule = this.ShiftDaySchedules[i]
          this.ThursdaySchedule.day = 'Thursday'
        }
        if (this.ShiftDaySchedules[i].day === 'Friday') {
          this.FridaySchedule = this.ShiftDaySchedules[i]
          this.FridaySchedule.day = 'Friday'
        }
        if (this.ShiftDaySchedules[i].day === 'Saturday') {
          this.SaturdaySchedule = this.ShiftDaySchedules[i]
          this.SaturdaySchedule.day = 'Saturday'
        }
      }
    },
    handleClick (tab, event) {
      this.$store.commit('setActiveTab', this.active)
    }
  }
}
</script>

<style>
.el-tabs__item {
  color: white !important;
}

.el-tabs__item.is-active {
  color: orange !important;
}

.grid-content-top-heading {
  min-height: 55px;
  color: #323232;
  text-align: left;
  margin-left: 5px;
  font-weight: bold;
}

.headingLabel-top-heading {
  line-height: 40px;
  font-size: 1.8vw;
}

.grid-content-top-heading-sub {
  min-height: 55px;
  color: #fff;
  font-weight: bold;
  background: #34495e;
  margin-bottom: 7px;
}

.headingLabel-top-heading-sub {
  line-height: 50px;
  font-size: 0.9vw;
}

.grid-content-sub-heading-bg-center {
    background: #5D6D7E;
    text-align: center;
    vertical-align: middle;
    line-height: 50px;
  }

  .grid-content-top-heading {
  min-height: 55px;
  color: #323232;
  text-align: left;
  margin-left: 5px;
  font-weight: bold;
}

.headingLabel-top-heading  {
  line-height: 20px;
  font-size: 1.8vw;
}
</style>
