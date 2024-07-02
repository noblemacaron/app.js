# app.js
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
    // 初期段階では簡単な文字列検索でエラーをチェック
    if (code.includes('if(x = 10)')) {
        return 'エラー: if文の条件式が間違っています。';
    }
    // 他のエラーチェックを追加
    return '正解です！';
}
