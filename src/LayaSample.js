(function () {

    return;
    var Sprite = Laya.Sprite;
    var Stage = Laya.Stage;
    var Event = Laya.Event;
    var Browser = Laya.Browser;
    var WebGL = Laya.WebGL;

    // 该容器用于装载4张猩猩图片
    var apesCtn,img,flag =true;

    (function () {
        // 不支持WebGL时自动切换至Canvas
        Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;

        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#232628";

        createApes();

        // createImg();

        // drawSomething();
    })();

    function createApes() {
        // 每只猩猩距离中心点150像素
        var layoutRadius = 150;
        var radianUnit = Math.PI / 2;

        apesCtn = new Sprite();
        Laya.stage.addChild(apesCtn);
        
        var ape = [];

        // 添加4张猩猩图片
        for (var i = 0; i < 4; i++) {
            
            ape[i] = new Sprite();

            ape[i].loadImage("../img/sss.svg", 50, 50, 10, 10);

            ape[i].pivot(55, 72);

            // 以圆周排列猩猩
            ape[i].pos(
                Math.cos(radianUnit * i) * layoutRadius,
                Math.sin(radianUnit * i) * layoutRadius);
            Laya.timer.frameLoop(1, this, function (e) {
                ape[e].rotation += Math.pow(-1,i)*i;
            },[i],false);
            apesCtn.addChild(ape[i]);
        }

        apesCtn.pos(Laya.stage.width / 2, Laya.stage.height / 2);

        Laya.timer.frameLoop(1, this, animate);
    }

    function animate(e) {
        apesCtn.rotation += 1;
    }
    function createImg () {
        img = new Sprite();

        switchImg();
        img.on('click', this, switchImg);
        Laya.stage.addChild(img)
    }
    function switchImg () {
        img.graphics.clear();
        flag && img.loadImage('../img/loc.png',300,150,50,50);
        !flag && img.loadImage('../img/map.png',300,150,50,50);
        flag = !flag;        
    }
    function drawSomething()
    {
        var sp = new Sprite();
        Laya.stage.addChild(sp);
        //画直线
        sp.graphics.drawLine(10, 58, 167, 58, "#ff0000", 5);
        sp.graphics.drawLines(20, 88, [0, 0, 39, -50, 78, 0, 120, -50],  "#ff0000", 5);
         sp.graphics.drawCurves(10, 58, [0, 0, 19, -100, 39, 0], "#ff0000", 3);
         sp.graphics.drawCurves(10, 58, [0, 0, 19, -100, 39, 0, 58, 100, 78, 0], "#ff0000", 3);
         sp.graphics.drawPoly(30, 28, [0, 100, 50, 0, 100, 100], "#ffff00");
         sp.graphics.drawPoly(30, 28, [0, 100, 50, 0, 100, 100, 75, 150, 25, 150], "#ffff00");

         
        var path = [];
        path.push(0, -130);//五角星A点
        path.push(33, -33);//五角星B点
        path.push(137, -30);//五角星C点
        path.push(55, 32);//五角星D点
        path.push(85, 130);//五角星E点
        path.push(0, 73);//五角星F点
        path.push(-85, 130);//五角星G点
        path.push(-55, 32);//五角星H点
        path.push(-137, -30);//五角星I点
        path.push(-33, -33);//五角星J点
 
        sp.graphics.drawPoly(Laya.stage.width / 2, Laya.stage.height / 2, path, "#FF7F50");  
    }

})();