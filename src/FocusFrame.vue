<template>
  <div class="screen">
    <div class="transmission-container">
      <header>
        <h2 class="pull-right">{{ headerLabel }} {{ headerNumber }}</h2>
      </header>
      <div class="transmission-body">
        <slot></slot>
      </div>
      <footer>
        <h2 v-if="footerLabel">{{ footerLabel }}</h2>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headerLabel: String,
    headerNumber: [String, Number],
    footerLabel: String,
  }
}
</script>

<style scoped>
/* TODO: REFACTOR EVERYTHING - ported from old LCARS repo */
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #f93;
  padding: 0 10px;
  background-color: #090909;
  margin: 0;
  text-transform: uppercase;
  font-weight: normal;
}
h1 {
  font-size: 84px;
  line-height: 0.9em;
}
h2 {
  font-size: 56px;
  height: 40px;
  line-height: 1em;
}
h3 {
  font-size: 42px;
  line-height: 1em;
}
.pull-right {
  text-align: right;
}
.bars,
.transmission-container header,
.transmission-container footer {
  position: relative;
  width: 100%;
  height: 40px;
  background-color: #c9c;
  border-radius: 20px;
  white-space: nowrap;
  padding: 0 40px;
  display: flex;
  flex-direction: row;
}
.bars::before,
.transmission-container header::before,
.transmission-container footer::before {
  position: absolute;
  content: '';
  width: 8px;
  height: 40px;
  background-color: #090909;
}
.bars::after,
.transmission-container header::after,
.transmission-container footer::after {
  position: absolute;
  content: '';
  width: 8px;
  height: 40px;
  background-color: #090909;
  right: 40px;
}
.bars h2,
.transmission-container header h2,
.transmission-container footer h2 {
  display: inline-block;
  white-space: no-wrap;
}
.bars h2.pull-right,
.transmission-container header h2.pull-right,
.transmission-container footer h2.pull-right {
  position: absolute;
  right: 40px;
}
.transmission-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.transmission-container .transmission-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  text-align: center;
  padding: 40px;
}
.button {
  position: relative;
  width: 150px;
  background-color: #9cf;
  text-align: right;
  font-size: 1rem;
  margin: 0 0.2em;
  display: inline-block;
  height: 60px;
}
.button.height2 {
  height: 125px;
}
.button .button-label {
  position: absolute;
  bottom: 0.2em;
  right: 20px;
}
.rounded-left {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.rounded-right {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
.rounded {
  border-radius: 30px;
}
.color:hover {
  background-color: #4775d1;
}
.color1 {
  background-color: #ff9;
}
.color2 {
  background-color: #fc6;
}
.color3 {
  background-color: #f93;
}
.color4 {
  background-color: #646;
}
.color5 {
  background-color: #c9c;
}
.color6 {
  color: #9cf;
}
.color7 {
  background-color: #36c;
}
.color8 {
  background-color: #069;
}
.shift1 {
  animation-name: pulse;
  animation-duration: 6s;
  animation-timing-function: steps(1, start);
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.top-half {
  position: relative;
  height: 33%;
  min-height: 150px;
  flex: 0 0 auto;
}
.top-half .frame {
  border-bottom-left-radius: 100px;
}
.top-half .frame .button {
  top: 0;
  bottom: 120px;
}
.top-half .content {
  top: 0;
  bottom: 16px;
  border-bottom-left-radius: 60px;
}
.bottom-half {
  position: relative;
  min-height: 100px;
  flex: 1 0 auto;
  margin-top: 0.25em;
}
.bottom-half .frame {
  border-top-left-radius: 100px;
}
.bottom-half .frame .button {
  bottom: 0;
}
.bottom-half .content {
  bottom: 0;
  top: 16px;
  border-top-left-radius: 60px;
  padding: 0.5em 0 0 1em;
}
.frame {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #fc6;
}
.frame .button {
  position: absolute;
  background-color: #f93;
  width: 160px;
  height: auto;
  margin: 0;
  border-bottom: 0.25em solid #090909;
}
.content {
  position: absolute;
  left: 160px;
  background-color: #090909;
  top: 0;
  right: 0;
}
.content table {
  float: right;
  color: #ff9;
}
.content .button-area {
  float: right;
  width: 320px;
  margin-left: 1em;
}
@-moz-keyframes pulse {
  0% {
    background-color: #36c;
  }
  33% {
    background-color: #36c;
  }
  66% {
    background-color: #9cf;
  }
  100% {
    background-color: #9cf;
  }
}
@-webkit-keyframes pulse {
  0% {
    background-color: #36c;
  }
  33% {
    background-color: #36c;
  }
  66% {
    background-color: #9cf;
  }
  100% {
    background-color: #9cf;
  }
}
@-o-keyframes pulse {
  0% {
    background-color: #36c;
  }
  33% {
    background-color: #36c;
  }
  66% {
    background-color: #9cf;
  }
  100% {
    background-color: #9cf;
  }
}
@keyframes pulse {
  0% {
    background-color: #36c;
  }
  33% {
    background-color: #36c;
  }
  66% {
    background-color: #9cf;
  }
  100% {
    background-color: #9cf;
  }
}
</style>
