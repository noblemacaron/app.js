let editor;
let currentLevel;

function startGame(level) {
    document.getElementById('level-selection').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    currentLevel = level;

    const codeSamples = {
        beginner: "let x = 10;\nif(x = 10) {\n  console.log('Hello');\n}",
        intermediate: "function greet(name) {\n  return 'Hello, ' + name;\n}\ngreet('John');",
        advanced: "const arr = [1, 2, 3, 4, 5];\nfor(let i in arr) {\n  console.log(arr[i]);\n}"
    };

    editor = ace.edit("code-editor");
    editor.setTheme("ace/theme/monokai"); // テーマを設定
    editor.session.setMode("ace/mode/javascript"); // モードを設定
    editor.setValue(codeSamples[level]);
}

function submitCode() {
    const userCode = editor.getValue();
    const feedback = checkCode(userCode, currentLevel);
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.innerText = feedback;
    if (feedback === '正解です！') {
        feedbackElement.className = 'correct';
        setTimeout(resetGame, 2000); // 2秒待ってから難易度選択画面に戻る
    } else {
        feedbackElement.className = 'incorrect';
    }
    saveProgress(currentLevel, editor.getValue());
}

function checkCode(code, level) {
    if (level === 'beginner') {
        if (code.includes('if(x = 10)')) {
            return 'エラー: if文の条件式が間違っています。';
        }
    } else if (level === 'intermediate') {
        if (!code.includes('greet("John");')) {
            return 'エラー: 関数の呼び出しが間違っています。';
        }
    } else if (level === 'advanced') {
        if (code.includes('for(let i in arr)')) {
            return 'エラー: for...inループの使用が適切ではありません。';
        }
    }
    return '正解です！';
}

function saveProgress(level, code) {
    const progress = { level, code };
    localStorage.setItem('gameProgress', JSON.stringify(progress));
}

function loadProgress() {
    const progress = localStorage.getItem('gameProgress');
    if (progress) {
        const { level, code } = JSON.parse(progress);
        currentLevel = level;
        editor = ace.edit("code-editor");
        editor.setTheme("ace/theme/monokai"); // テーマを設定
        editor.session.setMode("ace/mode/javascript"); // モードを設定
        editor.setValue(code);
        document.getElementById('level-selection').style.display = 'none';
        document.getElementById('game-area').style.display = 'block';
    }
}

function resetGame() {
    document.getElementById('level-selection').style.display = 'block';
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('feedback').innerText = ''; // フィードバックメッセージをクリアする
    editor.setValue('');
}

document.addEventListener('DOMContentLoaded', loadProgress);
document.getElementById('submit-button').addEventListener('click', submitCode);

