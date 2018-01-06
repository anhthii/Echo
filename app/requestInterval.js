const requestInterval = function (fn, delay) {
  if (!window.requestAnimationFrame &&
    !window.webkitRequestAnimationFrame &&
    !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) &&
    !window.oRequestAnimationFrame &&
    !window.msRequestAnimationFrame)

    return window.setInterval(fn, delay);

  let start = new Date().getTime();
  const handle = new Object();

  function loop() {
    const current = new Date().getTime();
    const delta = current - start;

    if (delta >= delay) {
      fn.call();
      start = new Date().getTime();
    }

    handle.value = requestAnimationFrame(loop);
  };

  handle.value = requestAnimationFrame(loop);
  return handle;
}

const clearRequestInterval = function (handle) {
  window.cancelAnimationFrame ?
    window.cancelAnimationFrame(handle.value) :
    window.webkitCancelAnimationFrame ?
    window.webkitCancelAnimationFrame(handle.value) :
    window.webkitCancelRequestAnimationFrame ?
    window.webkitCancelRequestAnimationFrame(handle.value) :
    /* Support for legacy API */
    window.mozCancelRequestAnimationFrame ?
    window.mozCancelRequestAnimationFrame(handle.value) :
    window.oCancelRequestAnimationFrame ?
    window.oCancelRequestAnimationFrame(handle.value) :
    window.msCancelRequestAnimationFrame ?
    window.msCancelRequestAnimationFrame(handle.value) :
    clearInterval(handle);
};

export {
  requestInterval,
  clearRequestInterval,
};
