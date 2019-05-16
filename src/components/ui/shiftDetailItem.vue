<template>
  <div>
    <el-row>
      <el-col :span="5" style="padding: 5px;"></el-col>
      <el-col :span="5" style="padding: 5px;">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Start Time</span>
        </div>
        <el-input placeholder="Please input" style="width: 90%;" type="tel" ref='startTimeRef' v-model="getStartTime" @blur="CheckStartTime(startTime)"></el-input>
      </el-col>
      <el-col :span="3" style="padding: 5px;"></el-col>
      <el-col :span="5" style="padding: 5px;">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">End Time</span>
        </div>
        <el-input placeholder="Please input" style="width: 90%;" type="tel" v-model="getEndTime" @blur="CheckEndTime(endTime)"></el-input>
      </el-col>
      <el-col :span="5" style="padding: 5px;"></el-col>
    </el-row>
    <br>
    <el-row v-if="item.shiftHours > 0">
      <el-col :span="8" style="padding: 5px;"></el-col>
      <el-col :span="7" style="padding: 5px;">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Total Hours: {{item.shiftHours}}</span>
        </div>
      </el-col>
      <el-col :span="9" style="padding: 5px;"></el-col>
    </el-row>
    <br>
    <br>
    <el-row :span="24">
      <el-col :span="4" style="padding: 5px;">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Morning Break</span>
        </div>
        <el-switch active-color="green" inactive-color="red" v-model="item.break1Enabled"></el-switch>
      </el-col>
      <el-col :span="5" style="padding: 5px;" v-if="item.break1Enabled">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Morning Break Start Time</span>
        </div>
        <el-input placeholder="Please input" style="width: 90%;" type="tel" v-model="getMorningStartTime" @blur="CheckmorningStartTime(morningBreakStartTime)"></el-input>
      </el-col>
      <el-col :span="5" style="padding: 5px;" v-if="item.break1Enabled">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Morning Break End Time</span>
        </div>
        <el-input placeholder="Please input" style="width: 90%;" type="tel" v-model="getMorningEndTime" @blur="CheckmorningEndTime(morningBreakEndTime)"></el-input>
      </el-col>
      <el-col :span="4" style="padding: 5px;" v-if="item.break1Enabled">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Break Payable</span>
        </div>
        <el-switch active-color="green" inactive-color="red" v-model="item.break1Payable"></el-switch>
      </el-col>
      <el-col :span="4" style="padding: 5px;" v-if="item.break1Enabled">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Lunch Break Part of Job</span>
        </div>
        <el-switch active-color="green" inactive-color="red" v-model="item.break1PartOfJob"></el-switch>
      </el-col>
    </el-row>
    <br>
    <br>
    <el-row :span="24">
      <el-col :span="4" style="padding: 5px;">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Lunch Break</span>
        </div>
        <el-switch active-color="green" inactive-color="red" v-model="item.break2Enabled"></el-switch>
      </el-col>
      <el-col :span="5" style="padding: 5px;" v-if="item.break2Enabled">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Lunch Break Start Time</span>
        </div>
        <el-input placeholder="Please input" style="width: 90%;" type="tel" v-model="getLunchStartTime" @blur="ChecklunchStartTime(lunchBreakStartTime)"></el-input>
      </el-col>
      <el-col :span="5" style="padding: 5px;" v-if="item.break2Enabled">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Lunch Break End Time</span>
        </div>
        <el-input placeholder="Please input" style="width: 90%;" type="tel" v-model="getLunchEndTime" @blur="ChecklunchEndTime(lunchBreakEndTime)"></el-input>
      </el-col>
      <el-col :span="4" style="padding: 5px;" v-if="item.break2Enabled">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Break Payable</span>
        </div>
        <el-switch active-color="green" inactive-color="red" v-model="item.break2Payable"></el-switch>
      </el-col>
      <el-col :span="4" style="padding: 5px;" v-if="item.break2Enabled">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Lunch Break Part of Job</span>
        </div>
        <el-switch active-color="green" inactive-color="red" v-model="item.break2PartOfJob"></el-switch>
      </el-col>
    </el-row>
    <br>
    <br>
    <el-row :span="24">
      <el-col :span="4" style="padding: 5px;">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Afternoon Break</span>
        </div>
        <el-switch active-color="green" inactive-color="red" v-model="item.break3Enabled"></el-switch>
      </el-col>
      <el-col :span="5" style="padding: 5px;" v-if="item.break3Enabled">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Afternoon Break Start Time</span>
        </div>
        <el-input placeholder="Please input" style="width: 90%;" type="tel" v-model="getAfternoonStartTime" @blur="CheckafternoonStartTime(afternoonBreakStartTime)"></el-input>
      </el-col>
      <el-col :span="5" style="padding: 5px;" v-if="item.break3Enabled">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Afternoon Break End Time</span>
        </div>
        <el-input placeholder="Please input" style="width: 90%;" type="tel" v-model="getAfternoonEndTime" @blur="CheckafternoonEndTime(afternoonBreakEndTime)"></el-input>
      </el-col>
      <el-col :span="4" style="padding: 5px;" v-if="item.break3Enabled">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Afternoon Break Payable</span>
        </div>
        <el-switch active-color="green" inactive-color="red" v-model="item.break3Payable"></el-switch>
      </el-col>
      <el-col :span="4" style="padding: 5px;" v-if="item.break3Enabled">
        <div class="grid-content-top-heading-sub">
          <span class="headingLabel-top-heading-sub">Afternoon Break Part of Job</span>
        </div>
        <el-switch active-color="green" inactive-color="red" v-model="item.break3PartOfJob"></el-switch>
      </el-col>
    </el-row>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  name: 'shiftDetailItem',
  props: ['active', 'item', 'reload'],
  computed: {
    getStartTime: {
      get () {
        if (this.startTime !== null) {
          return this.startTime
        }
        return ''
      },
      set (value) {
        let timeChecker = this.$timeChecker.validateTime(value)
        this.startTime = timeChecker
      }
    },
    getEndTime: {
      get () {
        if (this.endTime !== null) {
          return this.endTime
        }
        return ''
      },
      set (value) {
        let timeChecker = this.$timeChecker.validateTime(value)
        this.endTime = timeChecker
      }
    },
    getMorningStartTime: {
      get () {
        if (this.morningBreakStartTime !== null) {
          return this.morningBreakStartTime
        }
        return ''
      },
      set (value) {
        let timeChecker = this.$timeChecker.validateTime(value)
        this.morningBreakStartTime = timeChecker
      }
    },
    getMorningEndTime: {
      get () {
        if (this.morningBreakEndTime !== null) {
          return this.morningBreakEndTime
        }
        return ''
      },
      set (value) {
        let timeChecker = this.$timeChecker.validateTime(value)
        this.morningBreakEndTime = timeChecker
      }
    },
    getLunchStartTime: {
      get () {
        if (this.lunchBreakStartTime !== null) {
          return this.lunchBreakStartTime
        }
        return ''
      },
      set (value) {
        let timeChecker = this.$timeChecker.validateTime(value)
        this.lunchBreakStartTime = timeChecker
      }
    },
    getLunchEndTime: {
      get () {
        if (this.lunchBreakEndTime !== null) {
          return this.lunchBreakEndTime
        }
        return ''
      },
      set (value) {
        let timeChecker = this.$timeChecker.validateTime(value)
        this.lunchBreakEndTime = timeChecker
      }
    },
    getAfternoonStartTime: {
      get () {
        if (this.afternoonBreakStartTime !== null) {
          return this.afternoonBreakStartTime
        }
        return ''
      },
      set (value) {
        let timeChecker = this.$timeChecker.validateTime(value)
        this.afternoonBreakStartTime = timeChecker
      }
    },
    getAfternoonEndTime: {
      get () {
        if (this.afternoonBreakEndTime !== null) {
          return this.afternoonBreakEndTime
        }
        return ''
      },
      set (value) {
        let timeChecker = this.$timeChecker.validateTime(value)
        this.afternoonBreakEndTime = timeChecker
      }
    }
  },
  mounted () {
    this.getShiftTimes()
    this.getMorningShiftTimes()
    this.getLunchShiftTimes()
    this.getAfternoonShiftTimes()
  },
  created () {
  },
  watch: {
    reload () {
      if (this.reload === true) {
        this.getShiftTimes()
        this.getMorningShiftTimes()
        this.getLunchShiftTimes()
        this.getAfternoonShiftTimes()
        this.$emit('update:reload', false)
      }
    },
    startTime () {
      this.item.shiftTimeSpan = this.startTime + '-' + this.endTime
    },
    endTime () {
      this.item.shiftTimeSpan = this.startTime + '-' + this.endTime
    },
    morningBreakStartTime () {
      this.item.break1TimeSpan = this.morningBreakStartTime + '-' + this.morningBreakEndTime
    },
    morningBreakEndTime () {
      this.item.break1TimeSpan = this.morningBreakStartTime + '-' + this.morningBreakEndTime
    },
    lunchBreakStartTime () {
      this.item.break2TimeSpan = this.lunchBreakStartTime + '-' + this.lunchBreakEndTime
    },
    lunchBreakEndTime () {
      this.item.break2TimeSpan = this.lunchBreakStartTime + '-' + this.lunchBreakEndTime
    },
    afternoonBreakStartTime () {
      this.item.break3TimeSpan = this.afternoonBreakStartTime + '-' + this.afternoonBreakEndTime
    },
    afternoonBreakEndTime () {
      this.item.break3TimeSpan = this.afternoonBreakStartTime + '-' + this.afternoonBreakEndTime
    },
    'item.break1Enabled' () {
      if (this.item.break1Enabled === false) {
        this.morningBreakStartTime = '00:00'
        this.morningBreakEndTime = '00:00'
        this.break1Payable = false
        this.item.break1PartOfJob = false
      }
    },
    'item.break2Enabled' () {
      if (this.item.break2Enabled === false) {
        this.lunchBreakStartTime = '00:00'
        this.lunchBreakEndTime = '00:00'
        this.break2Payable = false
        this.item.break3PartOfJob = false
      }
    },
    'item.break3Enabled' () {
      if (this.item.break3Enabled === false) {
        this.afternoonBreakStartTime = '00:00'
        this.afternoonBreakEndTime = '00:00'
        this.break3Payable = false
        this.item.break2PartOfJob = false
      }
    }
  },
  data () {
    return {
      startTime: null,
      endTime: null,
      morningBreakStartTime: null,
      morningBreakEndTime: null,
      lunchBreakStartTime: null,
      lunchBreakEndTime: null,
      afternoonBreakStartTime: null,
      afternoonBreakEndTime: null,
      ReloadingTimes: this.reload
    }
  },
  methods: {
    CheckStartTime (item) {
      switch (item.length) {
        case 1: this.startTime = item + '0:00'; break
        case 2: this.startTime = item + ':00'; break
        case 3: this.startTime = item + '00'; break
        case 4: this.startTime = item + '0'; break
      }
    },
    CheckEndTime (item) {
      switch (item.length) {
        case 1: this.endTime = item + '0:00'; break
        case 2: this.endTime = item + ':00'; break
        case 3: this.endTime = item + '00'; break
        case 4: this.endTime = item + '0'; break
      }
    },
    CheckmorningStartTime (item) {
      switch (item.length) {
        case 1: this.morningBreakStartTime = item + '0:00'; break
        case 2: this.morningBreakStartTime = item + ':00'; break
        case 3: this.morningBreakStartTime = item + '00'; break
        case 4: this.morningBreakStartTime = item + '0'; break
      }
    },
    CheckmorningEndTime (item) {
      switch (item.length) {
        case 1: this.morningBreakEndTime = item + '0:00'; break
        case 2: this.morningBreakEndTime = item + ':00'; break
        case 3: this.morningBreakEndTime = item + '00'; break
        case 4: this.morningBreakEndTime = item + '0'; break
      }
    },
    ChecklunchStartTime (item) {
      switch (item.length) {
        case 1: this.lunchBreakStartTime = item + '0:00'; break
        case 2: this.lunchBreakStartTime = item + ':00'; break
        case 3: this.lunchBreakStartTime = item + '00'; break
        case 4: this.lunchBreakStartTime = item + '0'; break
      }
    },
    ChecklunchEndTime (item) {
      switch (item.length) {
        case 1: this.lunchBreakEndTime = item + '0:00'; break
        case 2: this.lunchBreakEndTime = item + ':00'; break
        case 3: this.lunchBreakEndTime = item + '00'; break
        case 4: this.lunchBreakEndTime = item + '0'; break
      }
    },
    CheckafternoonStartTime (item) {
      switch (item.length) {
        case 1: this.afternoonBreakStartTime = item + '0:00'; break
        case 2: this.afternoonBreakStartTime = item + ':00'; break
        case 3: this.afternoonBreakStartTime = item + '00'; break
        case 4: this.afternoonBreakStartTime = item + '0'; break
      }
    },
    CheckafternoonEndTime (item) {
      switch (item.length) {
        case 1: this.afternoonBreakEndTime = item + '0:00'; break
        case 2: this.afternoonBreakEndTime = item + ':00'; break
        case 3: this.afternoonBreakEndTime = item + '00'; break
        case 4: this.afternoonBreakEndTime = item + '0'; break
      }
    },
    getShiftTimes () {
      let Times = this.item.shiftTimeSpan.split('-')
      this.startTime = this.$dateHelper.helperStandardTimeOnlyFormatNoSeconds(this.$dateHelper.helperParseTimeString(Times[0]))
      this.endTime = this.$dateHelper.helperStandardTimeOnlyFormatNoSeconds(this.$dateHelper.helperParseTimeString(Times[1]))
    },
    getMorningShiftTimes () {
      let Times = this.item.break1TimeSpan.split('-')
      this.morningBreakStartTime = this.$dateHelper.helperStandardTimeOnlyFormatNoSeconds(this.$dateHelper.helperParseTimeString(Times[0]))
      this.morningBreakEndTime = this.$dateHelper.helperStandardTimeOnlyFormatNoSeconds(this.$dateHelper.helperParseTimeString(Times[1]))
    },
    getLunchShiftTimes () {
      let Times = this.item.break2TimeSpan.split('-')
      this.lunchBreakStartTime = this.$dateHelper.helperStandardTimeOnlyFormatNoSeconds(this.$dateHelper.helperParseTimeString(Times[0]))
      this.lunchBreakEndTime = this.$dateHelper.helperStandardTimeOnlyFormatNoSeconds(this.$dateHelper.helperParseTimeString(Times[1]))
    },
    getAfternoonShiftTimes () {
      let Times = this.item.break3TimeSpan.split('-')
      this.afternoonBreakStartTime = this.$dateHelper.helperStandardTimeOnlyFormatNoSeconds(this.$dateHelper.helperParseTimeString(Times[0]))
      this.afternoonBreakEndTime = this.$dateHelper.helperStandardTimeOnlyFormatNoSeconds(this.$dateHelper.helperParseTimeString(Times[1]))
    }
  }
}
</script>

<style scoped>
.grid-content-top-heading {
  min-height: 40px;
  color: #323232;
  text-align: left;
  margin-left: 5px;
  font-weight: bold;
}

.headingLabel-top-heading {
  line-height: 40px;
  font-size: 1.5vw;
}

.grid-content-top-heading-sub {
  min-height: 35px;
  color: #fff;
  font-weight: bold;
  background: #34495e;
  margin-bottom: 7px;
}

.headingLabel-top-heading-sub {
  line-height: 35px;
  font-size: 0.9vw;
}

</style>
