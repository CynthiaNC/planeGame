//创建舞台，默认背景色是黑色的
Laya.init(600, 400);

var Sprite = Laya.Sprite;

var Stage = Laya.Stage;

Laya.stage.alignV = Stage.ALIGN_MIDDLE;
Laya.stage.alignH = Stage.ALIGN_CENTER;

var count = 0;
var plane = new Sprite();
var x = 300, y = 340, val = 10;

plane.loadImage("../img/apps-rocket-satellitell1.png", 150, 150, 120, 120);

plane.pivot(210, 210);

plane.pos(x, y);

Laya.timer.frameLoop(4, this, function () {
    count++;
    if (count < 10)
        plane.rotation += Math.pow(-1, -1);
    else if (count % 40 < 20)
        plane.rotation += Math.pow(-1, 1);
    else
        plane.rotation += Math.pow(-1, 2);
}, false);
Laya.stage.addChild(plane);

var socreTxt = showScore(), 
socre = 0;


var t1 = plane.on(Laya.Event.KEY_DOWN, this, function (e) {
    console.log(e.keyCode)
})
var t2 = plane.on(Laya.Event.MOUSE_OVER, this, function (e) {
    // console.log(e)
    // console.log('34s')
})
var t3 = Laya.stage.on(Laya.Event.CLICK, this, function (e) {
    // console.log(Laya.stage.getMousePoint())
})

plane.on(Laya.Event.FOCUS, this, function (e) {
    var drag = new Laya.Dragging()
    drag.start(plane, { x: 200, y: 200, width: 100, height: 100 }, true, 80, 1000, {}, true, 0.7)
})

plane.on(Laya.Event.DRAG_START, this, function (e) {
    console.log('DRAG_START')
})

plane.on(Laya.Event.DRAG_END, this, function (e) {
    console.log('DRAG_END')
})

plane.on(Laya.Event.DRAG_MOVE, this, function (e) {
    console.log('DRAG_MOVE')
})



laya.events.KeyBoardManager.enabled = true;
var t4 = Laya.stage.on(Laya.Event.KEY_DOWN, this, function (e) {
    go(e.keyCode,20)
})


function go(code,value) {
    switch (code) {
        case 37: { if (x <= 0) break; x = x - value; plane.pos(x, y); break; }
        // case 38: { if (y <= 0) break; y = y - value; plane.pos(x, y); break; }
        case 39: { if (x >= 600) break; x = x + value; plane.pos(x, y); break; }
        // case 40: { if (y >= 400) break; y = y + value; plane.pos(x, y); break; }
    }
}

Laya.stage.on(Laya.Event.KEY_UP, this, function (e) {
    go(e.keyCode,0)
})


start();



var gameOver = null, playAgain = null;
score = 0;
function createApes() {
    // 每只猩猩距离中心点150像素
    var layoutRadius = 150;
    var radianUnit = Math.PI / 2;

    apesCtn = new Sprite();
    Laya.stage.addChild(apesCtn);

    reset();
    addFly(0)

    apesCtn.pos(Laya.stage.width / 2, Laya.stage.height / 2);

}

var MAX_TIMES = 6; /* 偶数，几轮，每轮出现随机数量的碰撞物 */

function addFly(i) {

    var ape = [], posX = [], posY = [];

    ape[i] = [], posX[i] = [];
 
    var length = Math.floor(Math.random() * 5) + 2 ;
    for (var j = 0; j < length; j++) {

        ape[i][j] = new Sprite();
        ape[i][j].loadImage("../img/sss.svg", 0, 0, 20,20);

        posX[i][j] = Math.pow(-1, Math.random() * 10 >> 0) * Math.random() * 300, posY[i] = -200;
        ape[i][j].pos(posX[i][j], posY[i]);

        Laya.timer.frameLoop(6, this, function (o, l) {
            
            if(!ape[o][l].destroyed && posY[o] >= 100 && o == MAX_TIMES){
                Laya.timer.once(2000, this, showGameOver, [socre]);
            }
            
            if(posY[o] > 230) {
                ape[o][l].destroy();
                return;
            }            

            if(posX[o][l] >= 280 && posX[o][l] < 300) posX[o][l] += Math.pow(-1, 1) * Math.random() * 15 >> 0;
            else if(posX[o][l] <= -280 && posX[o][l] >- 300) posX[o][l] += Math.pow(-1, 2) * Math.random() * 15 >> 0;
            else if(posX[o][l] < 280 && posX[o][l] > -280) posX[o][l] += Math.pow(-1, Math.random() * 10 >> 0) * Math.random() * 15 >> 0;

            posY[o] += 3; 
            ape[o][l].pos(posX[o][l], posY[o]);

            if(!ape[o][l].destroyed && Math.abs(posX[o][l] - (x-300))<50 && posY[o]<=150 && posY[o]>=100) {
                /* 碰撞，消失 */
                ape[o][l].destroy();
                addText(posX[o][l],posY[o]);
                socre++;
                updateSocre(socreTxt, socre);
                return;
            }

            if (posY[o] >190 && posY[o] < 195 && o < MAX_TIMES) { i++; addFly(i); }

        }, [i, j], false);
        apesCtn.addChild(ape[i][j]);
    }
    i++;
}


function addText(x, y)
{
    var text = new laya.display.Text();//创建一个 Text 类的实例对象 text 。
    Laya.stage.addChild(text);//将 text 添加到显示列表。    
    text.text = "+1";
    text.color = "#008fff";//设置 text 的文本颜色。
    text.font = "Arial";//设置 text 的文本字体。
    text.bold = true;//设置 text 的文本显示为粗体。
    text.fontSize = 10;//设置 text 的字体大小。
    text.wordWrap = true;//设置 text 的文本自动换行。
    text.x = x+300;//设置 text 对象的属性 x 的值，用于控制 text 对象的显示位置。
    text.y = y+200;//设置 text 对象的属性 y 的值，用于控制 text 对象的显示位置。
    text.width = 20;//设置 text 的宽度。
    text.height = 15;//设置 text 的高度。
    text.italic = true;//设置 text 的文本显示为斜体。
    var count = 0;
    Laya.timer.frameLoop(1, this, function(){
        if(count>50) text.destroy();
        else if(count > 20) {
            text.fontSize -= 1;
            text.y -= 1;
            text.width -= 2;
            text.height -= 1;
        } else {

            text.fontSize += 1;
            text.y -= 1;
            text.width += 2;
            text.height += 1;
        }
        count++;
        
    })
}

function showScore() {
    var text = new laya.display.Text();//创建一个 Text 类的实例对象 text 。
    Laya.stage.addChild(text);//将 text 添加到显示列表。    
    text.color = "#008fff";//设置 text 的文本颜色。
    text.font = "Arial";//设置 text 的文本字体。
    text.bold = true;//设置 text 的文本显示为粗体。
    text.fontSize = 10;//设置 text 的字体大小。
    text.wordWrap = true;//设置 text 的文本自动换行。
    text.x = 30;//设置 text 对象的属性 x 的值，用于控制 text 对象的显示位置。
    text.y = 20;//设置 text 对象的属性 y 的值，用于控制 text 对象的显示位置。
    text.width = 100;//设置 text 的宽度。
    text.height = 30;//设置 text 的高度。
    updateSocre(text, 0);
    return text;
}

function updateSocre (text, score) {
    text.text = `Score： ${score}`;
}


function showGameOver () {
    gameOver = new laya.display.Text();//创建一个 Text 类的实例对象 text 。
    Laya.stage.addChild(gameOver);//将 text 添加到显示列表。    
    gameOver.text = `Game Over ! \n Score： ${socre}`;
    gameOver.color = "#fed100";//设置 text 的文本颜色。
    gameOver.font = "Arial";//设置 text 的文本字体。
    gameOver.bold = true;//设置 text 的文本显示为粗体。
    gameOver.fontSize = 20;//设置 text 的字体大小。
    gameOver.wordWrap = true;//设置 text 的文本自动换行。
    gameOver.x = 300-65;//设置 text 对象的属性 x 的值，用于控制 text 对象的显示位置。
    gameOver.y = 200-40-80;//设置 text 对象的属性 y 的值，用于控制 text 对象的显示位置。
    gameOver.width = 130;//设置 text 的宽度。
    gameOver.height = 80;//设置 text 的高度。
    gameOver.italic = true;//设置 text 的文本显示为斜体。

    playAgain = new laya.display.Text();//创建一个 Text 类的实例对象 text 。
    Laya.stage.addChild(playAgain);//将 playAgain 添加到显示列表。    
    playAgain.text = `Play again`;
    playAgain.color = '#fff';//设置 playAgain 的文本颜色。
    playAgain.font = "Arial";//设置 playAgain 的文本字体。
    playAgain.bold = true;//设置 playAgain 的文本显示为粗体。
    playAgain.fontSize = 20;//设置 playAgain 的字体大小。
    playAgain.x = 300 - 100;//设置 playAgain 对象的属性 x 的值，用于控制 playAgain 对象的显示位置。
    playAgain.y = 200 - 25;//设置 playAgain 对象的属性 y 的值，用于控制 playAgain 对象的显示位置。
    playAgain.width = 200;//设置 playAgain 的宽度。
    playAgain.height = 50;//设置 playAgain 的高度。
    playAgain.bgColor = '#fed100';
    playAgain.align = 'center';
    playAgain.valign = 'middle';
    playAgain.on('click', this, createApes);
    playAgain.on(Laya.Event.MOUSE_MOVE, this, function() {
        playAgain.bgColor = '#fff';
        playAgain.color = '#fed100';//设置 playAgain 的文本颜色。
    });
    playAgain.on(Laya.Event.MOUSE_OUT, this, function() {
        playAgain.bgColor = '#fed100';
        playAgain.color = '#fff';//设置 playAgain 的文本颜色。
    });
}

function reset() {
    if(gameOver != null)
        gameOver.destroy();
    if(playAgain != null)
        playAgain.destroy();
    socre = 0;
    updateSocre(socreTxt, 0)
}
function start () {
    var startGame = new laya.display.Text();//创建一个 Text 类的实例对象 text 。
    Laya.stage.addChild(startGame);//将 startGame 添加到显示列表。    
    startGame.text = `Start`;
    startGame.color = '#fff';//设置 startGame 的文本颜色。
    startGame.font = "Arial";//设置 startGame 的文本字体。
    startGame.bold = true;//设置 startGame 的文本显示为粗体。
    startGame.fontSize = 20;//设置 startGame 的字体大小。
    startGame.x = 300 - 100;//设置 startGame 对象的属性 x 的值，用于控制 startGame 对象的显示位置。
    startGame.y = 200 - 50 ;//设置 startGame 对象的属性 y 的值，用于控制 startGame 对象的显示位置。
    startGame.width = 200;//设置 startGame 的宽度。
    startGame.height = 50;//设置 startGame 的高度。
    startGame.bgColor = '#fed100';
    startGame.align = 'center';
    startGame.valign = 'middle';

    var gameTip = new laya.display.Text();//创建一个 Text 类的实例对象 text 。
    Laya.stage.addChild(gameTip);//将 gameTip 添加到显示列表。    
    gameTip.text = `Start`;
    gameTip.color = '#fff';//设置 gameTip 的文本颜色。
    gameTip.font = "Arial";//设置 gameTip 的文本字体。
    gameTip.fontSize = 14;//设置 gameTip 的字体大小。
    gameTip.x = 0;//设置 gameTip 对象的属性 x 的值，用于控制 gameTip 对象的显示位置。
    gameTip.y = 200 ;//设置 gameTip 对象的属性 y 的值，用于控制 gameTip 对象的显示位置。
    gameTip.width = 600;//设置 gameTip 的宽度。
    gameTip.height = 50;//设置 gameTip 的高度。
    gameTip.align = 'center';
    gameTip.valign = 'middle';
    gameTip.text = `Use ' ← ' and ' → ' to control the plane move to left or right.`;
    startGame.on('click', this, function(){
        startGame.destroy();
        gameTip.destroy();
        createApes();
    });
    startGame.on(Laya.Event.MOUSE_MOVE, this, function() {
        startGame.bgColor = '#fff';
        startGame.color = '#fed100';//设置 startGame 的文本颜色。
    });
    startGame.on(Laya.Event.MOUSE_OUT, this, function() {
        startGame.bgColor = '#fed100';
        startGame.color = '#fff';//设置 startGame 的文本颜色。
    });
}