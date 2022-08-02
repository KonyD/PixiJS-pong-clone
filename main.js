const canvas = document.getElementById('canvas');
const app = new PIXI.Application({
    view: canvas,
    width: 900,
    height: 700,
});

let graphics = new PIXI.Graphics();
app.stage.addChild(graphics);

player1 = {
    x: 50,
    y: 250,
    width: 50,
    height: 200,
    draw: function () {
        graphics.drawRect(player1.x, player1.y, player1.width, player1.height);
    },
};

player2 = {
    x: 800,
    y: 250,
    width: 50,
    height: 200,
    draw: function () {
        graphics.drawRect(player2.x, player2.y, player2.width, player2.height);
    },
};

ball = {
    x: app.renderer.width/2,
    y: app.renderer.height/2,
    x_vel: 4,
    y_vel: 5,
    radius: 30,
    draw: function () {
        graphics.drawCircle(ball.x, ball.y, ball.radius);
    },
};

var plr1_score = 0;
var plr2_score = 0;

let score1 = new PIXI.Text(plr1_score, {fontFamily : 'Arial', fontSize: 72, fill : "#ffffff", align : 'center'});
score1.x = 80;
score1.y = 50;
let score2 = new PIXI.Text(plr2_score, {fontFamily : 'Arial', fontSize: 72, fill : "#ffffff", align : 'center'});
score2.x = 780;
score2.y = 50;

app.stage.addChild(score1);
app.stage.addChild(score2);

app.ticker.add(() => {
    ball.x += ball.x_vel;
    ball.y += ball.y_vel;

    if (ball.x + ball.radius >= canvas.width) {
        plr1_score++;
        score1.text = plr1_score;
        ball.x_vel *= -1
        ball.x = app.renderer.width/2;
        ball.y = app.renderer.height/2;
    }
    if (ball.x - ball.radius <= 0) {
        plr2_score++;
        score2.text = plr2_score;
        ball.x_vel *= -1
        ball.x = app.renderer.width/2;
        ball.y = app.renderer.height/2;
    }

    if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
        ball.y_vel *= -1;
    }

    if (ball.x - ball.radius <= player1.x + player1.width && ball.y + ball.radius > player1.y && ball.y - ball.radius < player1.y + player1.height) {
        ball.x_vel *= -1;
    }
    if (ball.x + ball.radius >= player2.x && ball.y + ball.radius > player2.y && ball.y - ball.radius < player2.y + player2.height) {
        ball.x_vel *= -1;
    }

    graphics.clear();

    graphics.lineStyle(2, 0xFF0000);
    graphics.beginFill(0xFF0000);

    player1.draw();
    player2.draw();
    ball.draw();
});

graphics.closePath();
graphics.endFill();

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            player1.y -= 12;
            break;
        case 's':
            player1.y += 12;
            break;
        case 'ArrowUp':
            player2.y -= 12;
            break;
        case 'ArrowDown':
            player2.y += 12;
            break;
    }
});