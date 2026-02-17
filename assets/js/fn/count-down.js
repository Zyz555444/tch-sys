function countDownMain () {
// 获取页面元素
const display = document.getElementById ('countdown-display');
const startBtn = document.getElementById ('countdown-start');
const pauseBtn = document.getElementById ('countdown-pause');
const resetBtn = document.getElementById ('countdown-reset');
const timeInput = document.getElementById ('countdown-time');
let timeLeft = 0;
let timer = null;
let isRunning = false;
// 格式化时间显示
function formatTime (seconds) {
const h = Math.floor (seconds / 3600);
const m = Math.floor ((seconds % 3600) / 60);
const s = seconds % 60;
return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
// 更新显示
function updateDisplay () {
display.textContent = formatTime (timeLeft);
}
// 倒计时函数
function tick () {
if (timeLeft <= 0) {
clearInterval (timer);
isRunning = false;
alert (' 时间到！');
return;
}
timeLeft--;
updateDisplay ();
}
// 开始计时
function startCountdown () {
if (isRunning) return;
// 如果没有设置时间，默认 5 分钟
if (timeLeft === 0) {
const inputTime = timeInput.value || 300;
timeLeft = parseInt (inputTime);
}
isRunning = true;
timer = setInterval (tick, 1000);
}
// 暂停计时
function pauseCountdown () {
if (!isRunning) return;
clearInterval (timer);
isRunning = false;
}
// 重置计时
function resetCountdown () {
clearInterval (timer);
isRunning = false;
timeLeft = 0;
updateDisplay ();
}
// 绑定事件
if (startBtn) startBtn.addEventListener ('click', startCountdown);
if (pauseBtn) pauseBtn.addEventListener ('click', pauseCountdown);
if (resetBtn) resetBtn.addEventListener ('click', resetCountdown);
// 初始化显示
updateDisplay ();
}
function countDownFn () {
// 页面加载完成后执行
if (document.readyState === 'complete') {
countDownMain ();
} else {
document.addEventListener ('DOMContentLoaded', countDownMain);
}
}
// 执行初始化
countDownFn ();
