<template>
  <div class="scanner-container">
    <div class="scanner">
      <div>
        <div class="select-left">
          <div class="select-bracket"></div>
        </div>
        <div class="select-right">
          <div class="select-bracket"></div>
        </div>
      </div>
    </div>
    <div class="scanner">
      <div>
        <div class="select-left">
          <div class="select-bracket"></div>
        </div>
        <div class="select-right">
          <div class="select-bracket"></div>
        </div>
      </div>
    </div>
    <div class="scanner">
      <div>
        <div class="select-left">
          <div class="select-bracket"></div>
        </div>
        <div class="select-right">
          <div class="select-bracket"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scanner-container,
.scanner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.scanner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.scanner > div:first-child {
  position: relative;
  animation-duration: 6s;
  animation-name: embiggen;
  animation-iteration-count: infinite;
  /* ease-out but with less easing, close to linear without being linear */
  animation-timing-function: cubic-bezier(0, 0, 0.9, 1.0);
  opacity: 0;
  border-radius: 8px;
}

.scanner:nth-child(1) > div:first-child {
  animation-delay: 2s;
}

.scanner:nth-child(2) > div:first-child {
  animation-delay: 4s;
}

.select-left {
  position: absolute;
  left: 0;
  top: -5px;
  height: calc(100% + 10px);
  width: 28px;
  overflow: hidden;
}

.select-right {
  position: absolute;
  right: 0;
  top: -5px;
  height: calc(100% + 10px);
  width: 28px;
  overflow: hidden;
}

.select-bracket {
  position: absolute;
  height: 100%;
  width: 60px;
  border: 12px solid var(--lcars-color-a5);
  border-top-width: 10px;
  border-bottom-width: 10px;
  border-radius: 24px / 16px;
}

.select-left .select-bracket {
  left: 0;
}

.select-right .select-bracket {
  right: 0;
}

@keyframes embiggen {
  from {
    width: 10%;
    height: 10%;
    background-color: rgba(255, 255, 255, 0.075);
    opacity: 1;
  }

  to {
    width: 95%;
    height: 95%;
    background-color: rgba(255, 255, 255, 0.05);
    opacity: 1;
  }
}
</style>
