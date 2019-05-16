<template>
  <div class="dayView">
    <el-row>
      <el-col :span="24">
        <div class="grid-content-left autoGrow">
          <newShiftDisplay v-if="$store.getters.getAddNewShift"></newShiftDisplay>
          <div v-if="!$store.getters.getfilterLoading" :loading="$store.getters.getGlobalLoad">
            <shiftDisplay :model="item" :index="index" :key="index" v-for="(item, index) in getShiftsPaging"/>
          </div>
          <noDataDisplay v-if="getShiftsLength === 0"/>
          <el-pagination
            style="margin-bottom: 10px;"
            @current-change="setShiftsCurrentPage"
            @prev-click="setShiftsPrePage"
            @next-click="setShiftsNextPage"
            @size-change="setPageSize"
            :current-page='currentPage'
            :page-size="pageSize"
            :page-sizes="[5, 10, 20, 50]"
            :page-count="pageCount()"
            background
            layout="prev, pager, next, sizes"
            :total="results.length">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import shiftDisplay from '@/components/ui/shiftDisplay'
import noDataDisplay from '@/components/ui/noDataDisplay'
import newShiftDisplay from '@/components/ui/newShiftDisplay'

export default {
  name: 'shiftView',
  components: {
    shiftDisplay,
    noDataDisplay,
    newShiftDisplay
  },
  data () {
    return {
      loading: false,
      results: []
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    setShiftsCurrentPage (index) {
      this.$store.commit('setfilterLoading', true)
      this.$store.commit({
        type: 'setShiftsPagingCurrentPage',
        data: index
      })
      this.$nextTick(() => {
        this.$store.commit('setfilterLoading', false)
      })
    },
    setShiftsPrePage (index) {
      this.$store.commit('setfilterLoading', true)
      this.$store.commit({
        type: 'setShiftsPagingCurrentPage',
        data: index
      })
      this.$nextTick(() => {
        this.$store.commit('setfilterLoading', false)
      })
    },
    setShiftsNextPage (index) {
      this.$store.commit('setfilterLoading', true)
      this.$store.commit({
        type: 'setShiftsPagingCurrentPage',
        data: index
      })
      this.$nextTick(() => {
        this.$store.commit('setfilterLoading', false)
      })
    },
    setPageSize (total) {
      this.$store.commit('setfilterLoading', true)
      this.$store.commit({
        type: 'setShiftsPagingSize',
        data: total
      })
      this.$nextTick(() => {
        this.$store.commit('setfilterLoading', false)
      })
    },
    pageCount () {
      return Math.floor(this.getFilterdData.length / this.$store.getters.getShiftsPaging.pageSize)
    }
  },
  computed: {
    // eslint-disable-next-line
    getFilterdData () {
      if ((this.getFilter !== null) && (this.getShiftsLength > 0)) {
        // eslint-disable-next-line
        this.results = []
        // eslint-disable-next-line
        this.results = this.$store.getters.getFilterdShifts
        return this.results
      }
      if (this.$store.getters.getFilter === null) {
        // eslint-disable-next-line
        this.results = []
        // eslint-disable-next-line
        this.results = this.$store.getters.getShifts
        return this.results
      }
    },
    getFilter () {
      return this.$store.getters.getFilter
    },
    getShifts () {
      return this.$store.getters.getShifts
    },
    getShiftsPaging () {
      return this.$store.getters.getShiftsPaging
    },
    getShiftsLength () {
      return this.$store.getters.getShifts.length
    },
    currentPage () {
      return this.$store.getters.getCurrentPage
    },
    pageSize () {
      return this.$store.getters.getPageSize
    }
  }
}
</script>

<style scoped>

  .dayView {
    position: relative;
    margin: 0px 0px;
  }

  .grid-content-left {
    min-height: 36px;
  }

  .grid-content-right {
    min-height: 36px;
  }

  .autoGrow{
    min-height: 500px;
    height: auto;
  }

  .grid-padding {
    padding: 5px;
  }

  .grid-content-sub-heading {
    min-height: 25px;
    line-height: 25px;
    font-size: 1vw;
    color: #fff;
    background: transparent;
  }

  .grid-content-sub-heading-bg {
    background: #5D6D7E  ;
  }

</style>
