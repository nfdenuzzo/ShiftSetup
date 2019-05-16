<template>
  <div class="addShiftDisplay">
    <el-row>
      <el-col :span="14">
          <div class="grid-content grid-content-bg">
            Create New Shift
            <el-button :disabled="$store.getters.getAddNewShift" @click="addButtonOnClick" :loading="addLoading" style="margin-left: 15px;" size="medium" type="success" icon="el-icon-circle-plus" circle></el-button>
          </div>
      </el-col>
      <el-col :span="5">
          <div class="grid-content grid-content-bg">
            Export to Excel
            <el-button @click="ExportToExcel" style="margin-left: 15px;" size="medium" type="success" icon="far fa-file-excel" :loading="ExportLoading" circle></el-button>
          </div>
      </el-col>
      <el-col :span="5">
          <div class="grid-content grid-content-bg">
            <el-input style="width: 90%;" placeholder="Filter Input" v-model="filter" :onkeydown="filterArrays()"></el-input>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FileSaver from 'file-saver/dist/FileSaver.js'
export default {
  name: 'addShiftDisplay',
  data () {
    return {
      addLoading: false,
      filter: null,
      ShiftModel: {
        isNew: true,
        UseCompanyRules: true,
        leavePerShift: null,
        noonShift: false,
        nightShift: false,
        description: null,
        onEarlyNoOT: null,
        onLateCutOff: null,
        offEarlyPenalty: null,
        offLateNoOT: null,
        shiftCode: null,
        dateAdded: null,
        deleted: false
      },
      ExportLoading: false
    }
  },
  methods: {
    ExportToExcel () {
      this.ExportLoading = true
      this.$httpClient.exportToExcel().then((resp) => {
        FileSaver.saveAs(resp.data, 'Shifts.xlsx')
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        this.ExportLoading = false
      })
    },
    addButtonOnClick () {
      this.$store.commit('setAddNewShift', true)
    },
    filterArrays () {
      this.$store.commit('setShiftsPagingReset', 1)
      if (this.filter !== null) {
        if (this.filter.length > 0) {
          this.$store.commit('setFilter', this.filter)
          this.$store.commit('setfilterLoading', true)
        }
      }
      if (this.filter === '') {
        this.$store.commit('setFilter', null)
        this.$store.commit('setfilterLoading', true)
      }
      this.$nextTick(() => {
        this.$store.commit('setfilterLoading', false)
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

  .addShiftDisplay {
    margin-top: 3px;
  }

  .grid-content {
    min-height: 60px;
    font-size: 1vw;
    color: #fff;
    line-height: 60px;
    margin-bottom: 1px;
  }

  .grid-content-bg {
    background: #34495E;
  }
</style>
