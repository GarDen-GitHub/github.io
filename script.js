// 簡易ログイン（ハードコード: ユーザー名 'admin', パスワード 'password'。実際は変更）
function loginUser() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const error = document.getElementById('login-error');
  
  if (username === 'admin' && password === 'password') {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('data-container').style.display = 'block';
    fetchData();  // ログイン成功後にデータ取得
  } else {
    error.textContent = 'ユーザー名またはパスワードが間違っています。';
  }
}

// データ取得と表示
function fetchData() {
  const apiUrl = 'https://script.google.com/macros/s/AKfycbxfln5-1zm2IheYiwPDPZBDrFEq4pq6wjCdUI4Hi7lCUWD7ZF-ggFtj6dqqfNBYgQ-uQg/exec';  // Apps ScriptのURLを置き換え
  
  // ローディング表示
  document.getElementById('loading').style.display = 'block';
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(responseData => {
      const data = responseData.data;
      const updateTime = responseData.updateTime;
      
      // 更新日時表示
      document.getElementById('update-time').innerHTML = `更新日時: ${updateTime}`;
      
      if (data.length === 0) {
        document.getElementById('table-body').innerHTML = '<tr><td colspan="100%">データがありません。</td></tr>';
      } else {
        // ヘッダー作成
        const headers = Object.keys(data[0]);
        let headerRow = '<tr>';
        headers.forEach(header => {
          headerRow += `<th>${header}</th>`;
        });
        headerRow += '</tr>';
        document.getElementById('table-head').innerHTML = headerRow;
        
        // ボディ作成
        let bodyRows = '';
        data.forEach(row => {
          bodyRows += '<tr>';
          headers.forEach(header => {
            bodyRows += `<td>${row[header] || ''}</td>`;
          });
          bodyRows += '</tr>';
        });
        document.getElementById('table-body').innerHTML = bodyRows;
      }
      
      // ローディング非表示
      document.getElementById('loading').style.display = 'none';
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('table-body').innerHTML = '<tr><td colspan="100%">データの取得に失敗しました。</td></tr>';
      // ローディング非表示
      document.getElementById('loading').style.display = 'none';
    });
}
