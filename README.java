// app.js
let editor;

document.getElementById('submit-button').addEventListener('click', submitCode);

function startGame(level) {
    document.getElementById('level-selection').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    const codeSamples = {
        beginner: "let x = 10\nif(x = 10) {\n  console.log('Hello');\n}",
        intermediate: "function greet(name) {\n  return 'Hello, ' + name;\n}\ngreet(John);",
        advanced: "const arr = [1, 2, 3, 4, 5];\nfor(let i in arr) {\n  console.log(arr[i]);\n}"
    };
    editor = ace.edit("code-editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
    editor.setValue(codeSamples[level]);
}

function submitCode() {
    const userCode = editor.getValue();
    const feedback = checkCode(userCode);
    document.getElementById('feedback').innerText = feedback;
}

function checkCode(code) {
    // ここにコードの検証ロジックを実装
    function checkCode(code, level) {
    if (level === 'beginner') {
        if (code.includes('if(x = 10)')) {
            return 'エラー: if文の条件式が間違っています。';
        }
        // その他の初級レベルのエラーチェックを追加
    } else if (level === 'intermediate') {
        if (!code.includes('greet("John");')) {
            return 'エラー: 関数の呼び出しが間違っています。';
        }
        // その他の中級レベルのエラーチェックを追加
    } else if (level === 'advanced') {
        if (code.includes('for(let i in arr)')) {
            return 'エラー: for...inループの使用が適切ではありません。';
        }
        // その他の上級レベルのエラーチェックを追加
    }
    return '正解です！';
}

    // 初期段階では簡単な文字列検索でエラーをチェック
    if (code.includes('if(x = 10)')) {
        return 'エラー: if文の条件式が間違っています。';
    }
    // 他のエラーチェックを追加
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
        editor.setValue(code);
        document.getElementById('level-selection').style.display = 'none';
        document.getElementById('game-area').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', loadProgress);
document.getElementById('submit-button').addEventListener('click', () => {
    submitCode();
    saveProgress(currentLevel, editor.getValue());
});

