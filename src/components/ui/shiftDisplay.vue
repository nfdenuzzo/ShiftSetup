<template>
  <div class="displayShift">
    <el-row>
      <el-col :span="24">
          <div class="grid-content">
            <el-row :gutter="2">
            <!--Shift Code heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center" @dblclick="MakeRowEditable()" style="overflow-x: scroll;">
                <div>{{shifts.shiftCode}}</div>
                <!-- <div v-if="(!Edit)">{{shifts.shiftCode}}</div>
                <el-input size="mini" style="width: 90%;" placeholder="Please input" v-model="shifts.shiftCode" v-if="(Edit)"></el-input> -->
              </div>
            </el-col>
            <!-- description heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center" @dblclick="MakeRowEditable()" style="overflow-x: scroll;">
                <div v-if="(!Edit)" style="width 90%; padding: 0 10px 0 10px;">{{shifts.description}}</div>
                <el-input size="mini" style="width: 90%;" placeholder="Please input" v-model="shifts.description" v-if="(Edit)"></el-input>
              </div>
            </el-col>
            <!-- On Early No OT heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center" @dblclick="MakeRowEditable()" style="overflow-x: scroll;">
                <div v-if="(!Edit)">{{shifts.onEarlyNoOT}}</div>
                <el-input-number controls-position="right" size="mini" :precision="2" :step="0.1" style="width: 90%;" placeholder="Please input" v-model="shifts.onEarlyNoOT" v-if="(Edit)"></el-input-number>
              </div>
            </el-col>
            <!--  On Late Cut-Off code heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center" @dblclick="MakeRowEditable()" style="overflow-x: scroll;">
                <div v-if="(!Edit)">{{shifts.onLateCutOff}}</div>
                <el-input-number controls-position="right" size="mini" :precision="2" :step="0.1" style="width: 90%;" placeholder="Please input" v-model="shifts.onLateCutOff" v-if="(Edit)"></el-input-number>
              </div>
            </el-col>
            <!-- Off Early Penalty heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center" @dblclick="MakeRowEditable()" style="overflow-x: scroll;">
                <div v-if="(!Edit)">{{shifts.offEarlyPenalty}}</div>
                <el-input-number controls-position="right" size="mini" :precision="2" :step="0.1" style="width: 90%;" placeholder="Please input" v-model="shifts.offEarlyPenalty" v-if="(Edit)"></el-input-number>
              </div>
            </el-col>
            <!-- Off Late No OT heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading  grid-content-sub-heading-bg-center" @dblclick="MakeRowEditable()" style="overflow-x: scroll;">
                <div v-if="(!Edit)">{{shifts.offLateNoOT}}</div>
                <el-input-number controls-position="right" size="mini" :precision="2" :step="0.1" style="width: 90%;" placeholder="Please input" v-model="shifts.offLateNoOT" v-if="(Edit)"></el-input-number>
              </div>
            </el-col>
            <!-- Day shift heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center" @dblclick="MakeRowEditable()" style="overflow-x: scroll;">
                <div v-if="(!Edit)">{{DayShift}}</div>
                <el-switch
            active-color="green"
            inactive-color="red" v-model="DayShift" v-if="(Edit)"></el-switch>
              </div>
            </el-col>
            <!-- Night shift heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center" @dblclick="MakeRowEditable()" style="overflow-x: scroll;">
                <div v-if="(!Edit)">{{shifts.nightShift}}</div>
                <el-switch
            active-color="green"
            inactive-color="red" v-model="shifts.nightShift" v-if="(Edit)"></el-switch>
              </div>
            </el-col>
            <!-- Noon shift heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center" @dblclick="MakeRowEditable()" style="overflow-x: scroll;">
                <div v-if="(!Edit)">{{shifts.noonShift}}</div>
                <el-switch
            active-color="green"
            inactive-color="red" v-model="shifts.noonShift" v-if="(Edit)"></el-switch>
              </div>
            </el-col>
            <!-- Leave Shift Per Day heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center" @dblclick="MakeRowEditable()" style="overflow-x: scroll;">
                <div v-if="(!Edit)">{{shifts.leavePerShift}}</div>
                <el-input-number size="mini" style="width: 90%;" :precision="2" :step="0.1" controls-position="right" placeholder="Please input" v-model="shifts.leavePerShift" v-if="(Edit)"></el-input-number>
              </div>
            </el-col>
            <!-- Use Company Pay Rules -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center" @dblclick="MakeRowEditable()" style="overflow-x: scroll;">
                <div v-if="(!Edit)">{{shifts.useCompanyRules}}</div>
                <el-switch
            active-color="green"
            inactive-color="red" v-model="shifts.useCompanyRules" v-if="(Edit)"></el-switch>
              </div>
            </el-col>
              <!-- operations buttons-->
              <el-col :span="2" style="overflow-x: scroll; background: #34495E;">
                <div class="grid-content-buttons grid-content-bg" style="width 90%;" >
                  <el-tooltip :enterable="false" v-if="((model.deleted === false))" effect="dark" placement="top" content="View Record Details">
                    <el-button v-if="((model.deleted === false))" size="mini" type="primary" icon="el-icon-search" circle @click="ViewShiftDetails(shifts.shiftCode)" :loading="ShiftDayScheduleLoading"></el-button>
                  </el-tooltip>
                  <!-- cancel edit -->
                  <el-tooltip :enterable="false" v-if="((!Edit) && (model.deleted === false))" placement="top" content="Edit Record" >
                    <el-button v-if="((!Edit) && (model.deleted === false))" size="mini" type="warning" icon="el-icon-edit" circle @click="MakeRowEditable()"></el-button>
                  </el-tooltip>
                  <!-- make row editable -->
                  <el-tooltip :enterable="false" v-if="((Edit) && (model.deleted === false))" placement="top" content="Cancel Edit" >
                    <el-button v-if="((Edit) && (model.deleted === false))" size="mini" type="danger" icon="far fa-window-close" circle @click="CancelRowEditable()"></el-button>
                  </el-tooltip>
                  <el-tooltip :enterable="false" effect="dark" v-if="(Edit)" placement="top" content="Save Changes" >
                    <el-button v-if="(Edit)" size="mini" type="success" icon="fas fa-save" circle @click="UpdateShift(shifts)"></el-button>
                  </el-tooltip>
                  <el-tooltip :enterable="false" effect="dark" placement="top" content="Delete Shift" v-if="((model.deleted === false) | (shifts.isNew === true))">
                    <el-button v-if="(model.deleted === false)" size="mini" type="danger" icon="el-icon-delete" circle @click="removeShift(shifts, index)" ></el-button>
                  </el-tooltip>
                  <el-tooltip :enterable="false" effect="dark" placement="top" content="Reactivate Shift" v-if="model.deleted === true">
                    <el-button v-if="model.deleted === true" size="mini" type="success" icon="fas fa-trash-restore" circle @click="reactivateShift(shifts, index)" ></el-button>
                  </el-tooltip>
                </div>
              </el-col>
            </el-row>
          </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogShiftDetails" fullscreen @closed="CloseShiftDetailsDialog()">
    <!-- heading -->
      <shiftDetailsView :ShiftId="shifts.isNew" :shiftItem="shifts" :clearCopy="clearCopy" v-if="dialogShiftDetails" @CloseDialog="CloseDialog"></shiftDetailsView>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="CloseShiftDetailsDialog()">Close</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import shiftDetailsView from './shiftDetailsView.vue'
export default {
  name: 'displayShift',
  props: ['model', 'index', 'NewShiftCode'],
  components: {
    shiftDetailsView
  },
  data () {
    return {
      ShiftDayScheduleLoading: false,
      clearCopy: false,
      Edit: false,
      dialogShiftDetails: false,
      shifts: {
        isNew: this.model.isNew,
        useCompanyRules: this.model.useCompanyRules === false ? 'No' : 'Yes',
        leavePerShift: (this.model.leavePerShift === null ? 0 : this.model.leavePerShift),
        noonShift: this.model.noonShift === false ? 'No' : 'Yes',
        nightShift: this.model.nightShift === false ? 'No' : 'Yes',
        description: this.model.description,
        onEarlyNoOT: (this.model.onEarlyNoOT === null ? 0 : this.model.onEarlyNoOT),
        onLateCutOff: (this.model.onLateCutOff === null ? 0 : this.model.onLateCutOff),
        offEarlyPenalty: (this.model.offEarlyPenalty === null ? 0 : this.model.offEarlyPenalty),
        offLateNoOT: (this.model.offLateNoOT === null ? 0 : this.model.offLateNoOT),
        shiftCode: this.model.shiftCode,
        dateAdded: this.model.dateAdded,
        deleted: this.model.deleted
      },
      DayShift: false
    }
  },
  mounted () {
    this.getDayShift()
  },
  watch: {
    DisplayNewShiftSchedule () {},
    Edit () {
      if (this.Edit === true) {
        this.shifts.noonShift = this.model.noonShift
        this.shifts.nightShift = this.model.nightShift
        this.shifts.useCompanyRules = this.model.useCompanyRules
        this.getDayShift()
      } else {
        this.shifts.noonShift = this.model.noonShift === false ? 'No' : 'Yes'
        this.shifts.nightShift = this.model.nightShift === false ? 'No' : 'Yes'
        this.shifts.useCompanyRules = this.model.useCompanyRules === false ? 'No' : 'Yes'
        this.getDayShift()
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
    },
    DayShift () {
      if (this.DayShift === true) {
        this.shifts.noonShift = false
        this.shifts.nightShift = false
      }
      if (this.DayShift === 'Yes') {
        this.shifts.noonShift = 'No'
        this.shifts.nightShift = 'No'
      }
    }
  },
  methods: {
    CloseDialog () {
      this.dialogShiftDetails = false
    },
    getDayShift () {
      if (this.Edit === true) {
        if ((this.shifts.noonShift) || (this.shifts.nightShift)) {
          this.DayShift = false
        }
        if ((this.shifts.noonShift === false) && (this.shifts.nightShift === false)) {
          this.DayShift = true
        }
      } else {
        if ((this.shifts.noonShift === 'Yes') || (this.shifts.nightShift === 'Yes')) {
          this.DayShift = 'No'
        }
        if ((this.shifts.noonShift === 'No') && (this.shifts.nightShift === 'No')) {
          this.DayShift = 'Yes'
        }
      }
      if (this.$store.getters.getNewShiftCode !== null) {
        if (this.$store.getters.getNewShiftCode.toLowerCase() === this.shifts.shiftCode.toLowerCase()) {
          this.ViewShiftDetails(this.$store.getters.getNewShiftCode)
        }
      }
    },
    CloseShiftDetailsDialog () {
      this.clearCopy = true
      this.dialogShiftDetails = false
      this.$store.commit('setNewShiftCode', null)
      this.$store.commit('setClearDisabledIndexes')
    },
    ViewShiftDetails (shiftCode) {
      this.ShiftDayScheduleLoading = true
      this.$store.dispatch({
        type: 'getShiftDaySchedules',
        Id: shiftCode
      }).then(() => {
        this.clearCopy = false
        this.dialogShiftDetails = true
        this.ShiftDayScheduleLoading = false
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.setGlobalLoading(false)
        this.ShiftDayScheduleLoading = false
      })
    },
    CancelRowEditable () {
      this.Edit = false
    },
    MakeRowEditable () {
      this.Edit = true
    },
    UpdateShift (item) {
      this.CreateShift(item)
    },
    CreateShift (item) {
      if ((this.shifts.shiftCode !== null) && (this.shifts.description !== null) && (this.shifts.shiftCode !== '') && (this.shifts.description !== '')) {
        this.setGlobalLoading(true)
        this.$store.dispatch({
          type: 'addorUpdateShiftDataAndReload',
          data: item
        }).then(() => {
          this.showSuccessNotification('Shift was successfully Added.')
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
    removeShift (item, index) {
      this.$confirm('Do you want to disable this?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'error'
      }).then(() => {
        this.$store.commit('setfilterLoading', true)
        this.setGlobalLoading(true)
        this.$store.dispatch({
          type: 'DisableOrEnableShiftDataAndReload',
          Id: item.shiftCode
        }).then(() => {
          this.showSuccessNotification('Shift was successfully disabled.')
          this.$nextTick(() => {
            this.$store.commit('setfilterLoading', false)
          })
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          this.setGlobalLoading(false)
        })
      })
    },
    reactivateShift (item, index) {
      this.$confirm('Do you want to reactivate this?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'error'
      }).then(() => {
        this.setGlobalLoading(true)
        this.$store.dispatch({
          type: 'DisableOrEnableShiftDataAndReload',
          Id: item.shiftCode
        }).then(() => {
          this.showSuccessNotification('Shift was successfully reactivated.')
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          this.setGlobalLoading(false)
        })
      }).catch(() => {
        this.setGlobalLoading(false)
      })
    },
    setGlobalLoading (loading) {
      this.$store.commit({
        type: 'setGlobalLoad',
        load: loading
      })
    },
    showSuccessNotification (message) {
      this.$message({
        message: message,
        type: 'success'
      })
    }
  },
  computed: {
    DisplayNewShiftSchedule () {
      if (this.$store.getters.getNewShiftCode !== null) {
        if (this.$store.getters.getNewShiftCode.toLowerCase() === this.shifts.shiftCode.toLowerCase()) {
          this.ViewShiftDetails(this.$store.getters.getNewShiftCode)
        }
      }
      return true
    }
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
