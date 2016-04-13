/*
* @Author: Aman Priyadarshi
* @Date:   2016-04-12 22:24:38
* @Last Modified by:   Aman Priyadarshi
* @Last Modified time: 2016-04-13 23:16:30
*/

'use strict';
function startGame(tRexGameRunner)
{
    //
    //      DISTANCE    - xPOS
    //      WIDTH
    //      VELOCITY
    //
    //      UP
    //      DOWN
    //
    var perceptron = new Architect.Perceptron(3,5,3,2);
    var learningRate = 0.4;

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

    var Jumped = false;
    var LastParams = null;
    var updateGame = function()
    {
        if (tRexGameRunner.crashed)
        {
            if (Jumped)//So, we should not jump
            {
                perceptron.propagate(learningRate, [0, 1]);
                if (LastParams != null)
                {
                    LastParams[0] = LastParams[0] - 1;
                    perceptron.activate(LastParams);
                    perceptron.propagate(learningRate, [1, 0]);
                    LastParams = null;
                }
                console.log("DON'T JUMP");
            }
            else
            {
                if (LastParams != null)
                {
                    LastParams[0] = LastParams[0] + 1;
                    perceptron.activate(LastParams);
                    perceptron.propagate(learningRate, [1, 0]);
                    LastParams = null;
                }
                console.log("JUMP");
            }
            tRexGameRunner.restart();
        }

        if (tRexGameRunner.runningTime > tRexGameRunner.config.CLEAR_TIME)
        {
            //Game is on!
            var obstacle = tRexGameRunner.horizon.obstacles[0];

            var params = [];
            params.push(obstacle.xPos);
            params.push(obstacle.size);
            params.push(tRexGameRunner.currentSpeed);

            var output = perceptron.activate(params);
            var maxConfidence = Math.max(...output);
            if (output[0] == maxConfidence)
            {
                jumpDragon();
                Jumped = true;
                console.log("UP");
            }
            else
            {
                Jumped = false;
                console.log("DOWN");
            }
            LastParams = params;
        }
        setTimeout(updateGame, 1000/60);//60fps is perfect
    };

    //Go go go!
    updateGame();
};
