function boardMain() {
    // 获取画布元素
    const canvas = document.getElementById('board-canvas');
    if (!canvas) {
        setTimeout(boardMain, 50);
        return;
    }
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('board-color');
    const brushSize = document.getElementById('board-brush-size');
    const eraserBtn = document.getElementById('board-eraser');
    const clearBtn = document.getElementById('board-clear');
    
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let currentColor = '#000000';
    let currentSize = 5;
    let isEraser = false;
    
    // 设置画布大小
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    // 开始绘图
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = getMousePos(canvas, e);
    }
    
    // 绘图中
    function draw(e) {
        if (!isDrawing) return;
        
        const [x, y] = getMousePos(canvas, e);
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.lineWidth = isEraser ? 20 : currentSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = isEraser ? '#ffffff' : currentColor;
        ctx.stroke();
        
        [lastX, lastY] = [x, y];
    }
    
    // 停止绘图
    function stopDrawing() {
        isDrawing = false;
    }
    
    // 获取鼠标在画布中的位置
    function getMousePos(canvas, e) {
        const rect = canvas.getBoundingClientRect();
        return [
            e.clientX - rect.left,
            e.clientY - rect.top
        ];
    }
    
    // 切换橡皮擦
    function toggleEraser() {
        isEraser = !isEraser;
        eraserBtn.classList.toggle('active', isEraser);
    }
    
    // 清空画布
    function clearCanvas() {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // 绑定事件
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    colorPicker.addEventListener('input', (e) => {
        currentColor = e.target.value;
        isEraser = false;
        eraserBtn.classList.remove('active');
    });
    
    brushSize.addEventListener('input', (e) => {
        currentSize = e.target.value;
    });
    
    eraserBtn.addEventListener('click', toggleEraser);
    clearBtn.addEventListener('click', clearCanvas);
    
    // 初始化画布
    resizeCanvas();
    clearCanvas();
    
    // 窗口大小改变时调整画布
    window.addEventListener('resize', resizeCanvas);
}

function boardFn() {
    // 页面加载完成后执行
    if (document.readyState === 'complete') {
        boardMain();
    } else {
        document.addEventListener('DOMContentLoaded', boardMain);
    }
}

// 执行初始化
boardFn()
