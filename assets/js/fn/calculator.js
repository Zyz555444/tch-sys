function calculatorMain() {
    // 获取页面元素
    const display = document.getElementById('calculator-display');
    const buttons = document.querySelectorAll('.calculator-btn');
    
    let currentValue = '';
    let previousValue = '';
    let operation = null;
    
    // 更新显示
    function updateDisplay() {
        display.textContent = currentValue || '0';
    }
    
    // 处理数字输入
    function handleNumber(number) {
        if (currentValue === '0') {
            currentValue = number;
        } else {
            currentValue += number;
        }
        updateDisplay();
    }
    
    // 处理运算符
    function handleOperator(op) {
        if (operation !== null) {
            calculate();
        }
        previousValue = currentValue;
        currentValue = '';
        operation = op;
    }
    
    // 计算结果
    function calculate() {
        let result;
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        
        currentValue = result.toString();
        operation = null;
        previousValue = '';
        updateDisplay();
    }
    
    // 重置计算器
    function reset() {
        currentValue = '';
        previousValue = '';
        operation = null;
        updateDisplay();
    }
    
    // 绑定按钮事件
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const text = button.textContent;
            
            if (!isNaN(text) || text === '.') {
                handleNumber(text);
            } else if (text === '=') {
                calculate();
            } else if (text === 'C') {
                reset();
            } else {
                handleOperator(text);
            }
        });
    });
    
    // 初始化显示
    updateDisplay();
}

function calculatorFn() {
    // 页面加载完成后执行
    if (document.readyState === 'complete') {
        calculatorMain();
    } else {
        document.addEventListener('DOMContentLoaded', calculatorMain);
    }
}

// 执行初始化
calculatorFn()