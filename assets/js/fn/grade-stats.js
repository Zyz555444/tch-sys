function gradeStatsMain() {
    // 获取页面元素
    const gradeForm = document.getElementById('grade-form');
    // 检查元素是否存在，不存在则等待后重试
    if (!gradeForm) {
        setTimeout(gradeStatsMain, 50);
        return;
    }
    const nameInput = document.getElementById('grade-name');
    const gradeInput = document.getElementById('grade-score');
    const gradeList = document.getElementById('grade-list');
    const statsPanel = document.getElementById('grade-stats');
    const avgDisplay = document.getElementById('grade-avg');
    const maxDisplay = document.getElementById('grade-max');
    const minDisplay = document.getElementById('grade-min');
    
    let grades = [];
    
    // 添加成绩
    function addGrade(name, score) {
        grades.push({name, score: parseFloat(score)});
        renderGrades();
        updateStats();
    }
    
    // 渲染成绩列表
    function renderGrades() {
        gradeList.innerHTML = '';
        
        grades.forEach((grade, index) => {
            const item = document.createElement('li');
            item.innerHTML = `
                <span>${grade.name}</span>
                <span>${grade.score}</span>
                <button class="grade-delete" data-index="${index}">删除</button>
            `;
            gradeList.appendChild(item);
        });
        
        // 绑定删除事件
        document.querySelectorAll('.grade-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                grades.splice(index, 1);
                renderGrades();
                updateStats();
            });
        });
    }
    
    // 更新统计数据
    function updateStats() {
        if (grades.length === 0) {
            avgDisplay.textContent = '0';
            maxDisplay.textContent = '0';
            minDisplay.textContent = '0';
            return;
        }
        
        const total = grades.reduce((sum, grade) => sum + grade.score, 0);
        const avg = (total / grades.length).toFixed(2);
        const max = Math.max(...grades.map(g => g.score));
        const min = Math.min(...grades.map(g => g.score));
        
        avgDisplay.textContent = avg;
        maxDisplay.textContent = max;
        minDisplay.textContent = min;
    }
    
    // 表单提交事件
    gradeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const score = gradeInput.value.trim();
        
        if (name && !isNaN(score) && score >= 0 && score <= 100) {
            addGrade(name, score);
            nameInput.value = '';
            gradeInput.value = '';
        } else {
            alert('请输入有效的姓名和成绩（成绩0-100）');
        }
    });
}

function gradeStatsFn() {
    // 页面加载完成后执行
    if (document.readyState === 'complete') {
        gradeStatsMain();
    } else {
        document.addEventListener('DOMContentLoaded', gradeStatsMain);
    }
}

// 执行初始化
gradeStatsFn()
