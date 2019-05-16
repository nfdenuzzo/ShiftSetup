<template>
  <div class="displayShift">
    <el-row>
      <el-col :span="24">
          <div class="grid-content">
            <el-row :gutter="2">
            <!--Shift Code heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center"  style="overflow-x: scroll;">
                <el-input size="mini" style="width: 90%;" placeholder="Please input" v-model="shifts.shiftCode"></el-input>
              </div>
            </el-col>
            <!-- description heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center"  style="overflow-x: scroll;">
                <el-input size="mini" style="width: 90%;" placeholder="Please input" v-model="shifts.description"></el-input>
              </div>
            </el-col>
            <!-- On Early No OT heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center"  style="overflow-x: scroll;">
                <el-input-number controls-position="right" size="mini" :precision="2" :step="0.1" style="width: 90%;" placeholder="Please input" v-model="shifts.onEarlyNoOT" ></el-input-number>
              </div>
            </el-col>
            <!--  On Late Cut-Off code heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center"  style="overflow-x: scroll;">
                <el-input-number controls-position="right" size="mini" :precision="2" :step="0.1" style="width: 90%;" placeholder="Please input" v-model="shifts.onLateCutOff" ></el-input-number>
              </div>
            </el-col>
            <!-- Off Early Penalty heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center"  style="overflow-x: scroll;">
                <el-input-number controls-position="right" size="mini" :precision="2" :step="0.1" style="width: 90%;" placeholder="Please input" v-model="shifts.offEarlyPenalty" ></el-input-number>
              </div>
            </el-col>
            <!-- Off Late No OT heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading  grid-content-sub-heading-bg-center"  style="overflow-x: scroll;">
                <el-input-number controls-position="right" size="mini" :precision="2" :step="0.1" style="width: 90%;" placeholder="Please input" v-model="shifts.offLateNoOT" ></el-input-number>
              </div>
            </el-col>
            <!-- Day shift heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center"  style="overflow-x: scroll;">
                <el-switch
            active-color="green"
            inactive-color="red" v-model="DayShift" ></el-switch>
              </div>
            </el-col>
            <!-- Night shift heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center"  style="overflow-x: scroll;">
                <el-switch
            active-color="green"
            inactive-color="red" v-model="shifts.nightShift" ></el-switch>
              </div>
            </el-col>
            <!-- Noon shift heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center"  style="overflow-x: scroll;">
                <el-switch
            active-color="green"
            inactive-color="red" v-model="shifts.noonShift" ></el-switch>
              </div>
            </el-col>
            <!-- Leave Shift Per Day heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center"  style="overflow-x: scroll;">
                <el-input-number size="mini" style="width: 90%;" :precision="2" :step="0.1" controls-position="right" placeholder="Please input" v-model="shifts.leavePerShift" ></el-input-number>
              </div>
            </el-col>
            <!-- Use Company Pay Rules -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center"  style="overflow-x: scroll;">
                <el-switch
            active-color="green"
            inactive-color="red" v-model="shifts.useCompanyRules" ></el-switch>
              </div>
            </el-col>
              <!-- operations buttons-->
              <el-col :span="2" style="overflow-x: scroll; background: #34495E;">
                <div class="grid-content-buttons grid-content-bg" style="width 90%;" >
                  <el-tooltip :enterable="false" effect="dark" placement="top" content="Create Shift">
                    <el-button size="mini" type="warning" icon="el-icon-circle-plus" circle @click="CreateShift(shifts)" ></el-button>
                  </el-tooltip>
                  <el-tooltip :enterable="false" effect="dark" placement="top" content="Delete Shift">
                    <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="removeShift()" ></el-button>
                  </el-tooltip>
                </div>
              </el-col>
            </el-row>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'displayShift',
  props: ['model', 'index'],
  components: {
  },
  data () {
    return {
      shifts: {
        isNew: true,
        useCompanyRules: true,
        leavePerShift: null,
        noonShift: false,
        nightShift: false,
        description: null,
        onEarlyNoOT: 0,
        onLateCutOff: 0,
        offEarlyPenalty: 0,
        offLateNoOT: 0,
        shiftCode: null,
        dateAdded: null,
        deleted: false
      },
      DayShift: true
    }
  },
  mounted () {
  },
  watch: {
    DayShift () {
      if (this.DayShift === true) {
        this.shifts.noonShift = false
        this.shifts.nightShift = false
      }
    },
    'shifts.noonShift' () {
      if (this.shifts.noonShift === true) {
        this.DayShift = false
        this.shifts.nightShift = false
      }
    },
    'shifts.nightShift' () {
      if (this.shifts.nightShift === true) {
        this.DayShift = false
        this.shifts.noonShift = false
      }
    }
  },
  methods: {
    setGlobalLoading (loading) {
      this.$store.commit({
        type: 'setGlobalLoad',
        load: loading
      })
    },
    async CreateShift () {
      if ((this.shifts.shiftCode !== null) && (this.shifts.description !== null) && (this.shifts.shiftCode !== '') && (this.shifts.description !== '')) {
        this.setGlobalLoading(true)
        this.$store.dispatch({
          type: 'addorUpdateShiftDataAndReload',
          data: this.shifts
        }).then(() => {
          this.showSuccessNotification('Shift was successfully Added.')
          this.$store.commit('setAddNewShift', false)
          this.$store.commit('setNewShiftCode', this.shifts.shiftCode)
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          this.Edit = false
          this.setGlobalLoading(false)
        })
      } else {
        this.showWarningNotification('Missing Information, Please ensure u provide a Shift code and Description')
      }
    },
    showWarningNotification (message) {
      this.$message({
        message: message,
        type: 'warning'
      })
    },
    removeShift () {
      this.$store.commit('setAddNewShift', false)
    },
    showSuccessNotification (message) {
      this.$message({
        message: message,
        type: 'success'
      })
    }
  },
  computed: {
  }
}
</script>

<style scoped>

  .el-row {
    position: relative;
  }

  .displayJob {
    margin-top: 3px;
  }

  .grid-content {
    min-height: 60px;
    font-size: 1vw;
    color: #fff;
    line-height: 60px;
    margin-bottom: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .grid-content-buttons {
    min-height: 59px;
    font-size: 1vw;
    color: #fff;
    max-height: 60px;
  }

  .grid-content-bg {
    background: #34495E;
  }

  .radioButton {
    color: #fff !important;
    margin: 10px 10px;
  }

  .grid-content-indicator{
    min-height: 10px;
  }

  .grid-content-sub-heading-bg-center {
    background: #34495E;
    text-align: center;
    vertical-align: middle;
    line-height: 60px;
  }

  .grid-content-indicator-unsaved {
    background: #F56C6C !important;
  }

.grid-content-top-heading {
  min-height: 40px;
  color: #323232;
  text-align: left;
  margin-left: 5px;
  font-weight: bold;
}

.headingLabel-top-heading  {
  line-height: 40px;
  font-size: 1.5vw;
}

.grid-content-top-heading-sub {
  min-height: 35px;
  color: #fff;
  font-weight: bold;
  background: #34495E;
  margin-bottom: 7px;
}

.grid-content-top-heading-sub-clear {
  min-height: 35px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 7px;
}

.headingLabel-top-heading-sub  {
  line-height: 35px;
  font-size: 0.9vw;
}

</style>
