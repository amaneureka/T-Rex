/*
* @Author: Aman Priyadarshi
* @Date:   2016-04-12 22:24:38
* @Last Modified by:   Aman Priyadarshi
* @Last Modified time: 2016-04-12 23:54:17
*/

'use strict';
function startGame(tRexGameRunner)
{
    /*
    var perceptron = new Architect.Perceptron(2,3,1);
    perceptron.trainer.XOR({
            iterations: 100000,
            error: .0001,
            rate: 1
        });*/
    //alert(tRexGameRunner.config.CLEAR_TIME + "<--");
    //alert(perceptron.activate([0, 0]) + "\n" + perceptron.activate([1, 0]) + "\n" + perceptron.activate([0, 1]) + "\n" + perceptron.activate([1, 1]));
    var keyEvent = {
        JUMP: 38,
        DUCK: 40
    };

    var jumpDragon = function()
    {
        tRexGameRunner.onKeyDown({
            keyCode: keyEvent.JUMP
        });
        tRexGameRunner.onKeyUp({
            keyCode: keyEvent.JUMP
        });
    };

    var duckDragon = function()
    {
        tRexGameRunner.onKeyDown({
            keyCode: keyEvent.DUCK
        });
        tRexGameRunner.onKeyUp({
            keyCode: keyEvent.DUCK
        });
    };

    var updateGame = function()
    {
        var rnd = Math.round(Math.random() * 10);
        if (rnd % 2 == 0)
            duckDragon();
        else
            jumpDragon();
        if (tRexGameRunner.crashed)
            tRexGameRunner.restart();
        setTimeout(updateGame, 10);//100fps is perfect
    };

    //Go go go!
    updateGame();
};
