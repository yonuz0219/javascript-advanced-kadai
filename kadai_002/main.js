//空白の関数
//ランダムテキストを表示する
//1-2配列に文字を格納する
const textLists=[
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

//初期化
let untyped='';
let typed='';
let score=0;
//HTML要素の取得
const typedfiled=document.getElementById("typed");
const untypedfield=document.getElementById("untyped");
//score表示用
const scoreview=document.getElementById("scoreView");
//スタートボタン
const start=document.getElementById("start");

//1-3ランダムに入れる関数
const createText=()=>{
    //typedをリセットする、untypedはすでに０
    typed='';
    typedfiled.textContent=typed;
    //ランダムな数を繰り返しいれる
    let random=Math.floor(Math.random()*textLists.length);
    untyped=textLists[random];
    //1-3配列に格納された文字列を画面に表示する
    untypedfield.textContent=untyped;
};
//スタート時へ移動createText();

//キーの入力判定

//イベントオブジェクトeのkeyプロパティが渡される
const keyPress=e=>{
    //誤のタイプ
    if(e.key!==untyped.substring(0,1)){
      //入力文字の１文字目がちがうとき、classの属性mistypedに変更
        wrap.classList.add('mistyped');
        //100ms後に背景色に戻す
        setTimeout(()=>{
            wrap.classList.remove('mistyped');
        },100);

        return;//まちがったらすぐもどる
    }
    //正のタイプ
    //console.log(e.key);
    score++;
    typed+=untyped.substring(0,1);//文字1字ずつ追加、開始インデックスから終了インデックス1個前
    untyped=untyped.substring(1);//[1]番目以降を先頭にする
    typedfiled.textContent=typed;//DOM操作
    untypedfield.textContent=untyped;//DOM操作
    //scoreを表示する
    scoreview.textContent=score;//DOM操作

    //テキストがなくなったら次
    if(untyped===''){
        createText();
    }

};
//キーボードを押したときにイベント発生をスタート時に移動
//document.addEventListener('keypress',keyPress);

//タイミングスキルランクの判定
const rankCheck=score=>{
    let text='';
    //スコアに応じて異なるメッセージを変数textに格納
    console.log(score);
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;    
  }
    return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;

};

//ゲームを終了する
const gameOver=id=>{
    clearInterval(id);
    //テキストを空にしてDOM操作する
    typedfiled.textContent='';//DOM操作
    untypedfield.textContent='';//DOM操作
    //タイムアップ表示
    document.getElementById('timeup').textContent='タイムアップ！';

    //10ms後にrankCheck発動

    setTimeout(()=>{
    const result=confirm(rankCheck(score));
      //OKぼたんをくりっくしたらリロード
      if(result==true){
        window.location.reload();
      }
    },10);

};

//カウントタイマー機能
const timer=()=>{
    let time=count.textContent;
    const id =setInterval(()=>{
        //カウントダウン
        time--;
        count.textContent=time;
        //０になったらタイマー停止
        if(time<=0){
           gameOver(id);
        }

    },1000);
};


//ゲームスタートボタンを押したときのイベント処理
start.addEventListener('click',()=>{
    //カウントダウンタイマー
    timer();
    //ランダムなテキスト表示
    createText();

    //スタートボタンを非表示
    start.style.display='none';

    //キーボードイベント処理
    document.addEventListener('keypress',keyPress);
});

untypedfield.textContent='スタートボタンで開始';