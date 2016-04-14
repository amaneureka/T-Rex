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
    //      NOTHING
    //
    var perceptron = new Architect.Perceptron(3,20,20,2);
    var learningRate = 0.03;

    var keyEvent = {
        JUMP: 38,
        DUCK: 40
    };

    var jumpDragon = function()
    {
        console.log("UP");
        tRexGameRunner.onKeyDown({
            keyCode: keyEvent.JUMP,
            type: 'touchstart'
        });
        tRexGameRunner.onKeyUp({
            keyCode: keyEvent.JUMP,
            type: 'touchend'
        });
    };

    var duckDragon = function()
    {
        console.log("DOWN");
        tRexGameRunner.onKeyDown({
            keyCode: keyEvent.DUCK,
            type: 'touchstart'
        });
        tRexGameRunner.onKeyUp({
            keyCode: keyEvent.DUCK,
            type: 'touchend'
        });
    };

    var LastParams = [0,0,1];
    var LastRealParams = [0,0,1];
    var updateGame = function()
    {
        if (tRexGameRunner.crashed)
        {
            //if (LastParams != null)
            {
                var deltaFactor = ((LastParams[1]/LastParams[2]) * 10);
                var deltaFactor2 = ((LastRealParams[1]/LastRealParams[2]) * 10);

                //if (tRexGameRunner.tRex.xPos < LastParams[0])
                //    deltaFactor *= -1;

                //if (tRexGameRunner.tRex.xPos >= LastRealParams[0])
                //    deltaFactor2 *= -1;

                if (tRexGameRunner.tRex.jumpVelocity > 0 || tRexGameRunner.tRex.jumping)
                {
                    //we hit it on foot :ouch:
                    //if (LastRealParams != null)
                    /*{
                        //try to jump from a little farther
                        LastRealParams[0] = LastRealParams[0] + deltaFactor2;
                        perceptron.activate(LastRealParams);
                        perceptron.propagate(learningRate*2, [0, 1]);
                    }*/

                    perceptron.activate(LastParams);
                    perceptron.propagate(learningRate, [0, 1]);

                    //try to jump from a little nearer
                    LastRealParams[0] = LastRealParams[0] + deltaFactor;
                    perceptron.activate(LastRealParams);
                    perceptron.propagate(learningRate, [1, 0]);

                    console.log(":foot: " + deltaFactor + " " + deltaFactor2);
                }
                else
                {
                    perceptron.activate(LastParams);

                    //umm, we hit it on face :ouch: :ouch:
                    //try to jump from a distance
                    LastParams[0] = LastParams[0] + deltaFactor;
                    perceptron.activate(LastParams);
                    perceptron.propagate(learningRate, [1, 0]);

                    console.log(":face: " + deltaFactor);
                }
            }
            
            // Analytics
            var distance = tRexGameRunner.distanceRan;
            console.log("[GAME]:\tSCORE: " + distance)

            //Restart :D !
            tRexGameRunner.restart();
        }

        if (tRexGameRunner.runningTime > tRexGameRunner.config.CLEAR_TIME)
        {
            //Game is on!
            var obstacle = tRexGameRunner.horizon.obstacles[0];

            var params = [];
            params.push(obstacle.xPos);
            params.push(obstacle.size);
            params.push(Math.round(tRexGameRunner.currentSpeed * 10));
            
            var output = perceptron.activate(params);
            var confidence = output[0] - output[1] - 0.01;

            if (confidence > 0)
            {
                //Jump jump jump :D !
                if (!tRexGameRunner.tRex.jumping)
                {
                    jumpDragon();
                    LastParams = params;
                }
            }
            else
            {
                if (tRexGameRunner.tRex.jumping)
                {
                    duckDragon();
                    LastParams = params;
                }
            }
            LastRealParams = params;
        }
        //well well, our human mind can retain image upto 25ms i.e. 40fps
        //obviously no brain is ideal so :p 20ms :D !
        setTimeout(updateGame, 50);
    };

    //Go go go!
    updateGame();
};
