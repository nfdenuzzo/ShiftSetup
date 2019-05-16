<template>
  <div class="dayViewHeading">
    <el-row>
      <el-col :span="24">
        <div class="grid-content-sub-heading">
          <el-row :gutter="2">
            <!--Shift Code heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center">
                Shift Code.
              </div>
            </el-col>
            <!-- Description heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center">
                Description
              </div>
            </el-col>
            <!-- On Early No OT heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center">
                On Early No OT
              </div>
            </el-col>
            <!--  On Late Cut-Off code heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center">
                On Late Cut-Off
              </div>
            </el-col>
            <!-- Off Early Penalty heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center">
                Off Early Penalty
              </div>
            </el-col>
            <!-- Off Late No OT heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading  grid-content-sub-heading-bg-center">
                Off Late No OT
              </div>
            </el-col>
            <!-- Day shift heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center">
                Day Shift
              </div>
            </el-col>
            <!-- Night shift heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center">
                Night Shift
              </div>
            </el-col>
            <!-- Noon shift heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center">
                Noon Shift
              </div>
            </el-col>
            <!-- Leave Shift Per Day heading -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg">
                Leave Shift Per Day
              </div>
            </el-col>
            <!-- Use Company Pay Rules -->
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg">
                Use Company Pay Rules
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center">
                Operations
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
  name: 'dayViewHeading'
}
</script>

<style scoped>

  .dayViewHeading {
    position: relative;
    margin: 0px 0px;
  }

  .grid-content-left {
    min-height: 36px;
  }

  .grid-content-right {
    min-height: 36px;
  }

  .grid-content-left-bg {
    padding-top: 2px;
  }

  .autoGrow{
    min-height: 500px;
    height: auto;
  }

  .grid-padding {
    padding: 5px;
  }

  .grid-content-sub-heading {
    height: 50px;
    min-height: 25px;
    line-height: 25px;
    font-size: 1vw;
    color: #fff;
    background: transparent;
  }

  .grid-content-sub-heading-bg {
    background: #5D6D7E;
  }

  .grid-content-sub-heading-bg-center {
    background: #5D6D7E;
    text-align: center;
    vertical-align: middle;
    line-height: 50px;
  }

</style>
