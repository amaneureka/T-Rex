/*
* @Author: Aman Priyadarshi
* @Date:   2016-04-12 22:24:38
* @Last Modified by:   Aman Priyadarshi
* @Last Modified time: 2016-04-12 22:35:39
*/

'use strict';

var perceptron = new Architect.Perceptron(2,3,1);
perceptron.trainer.XOR({
			iterations: 100000,
			error: .0001,
			rate: 1
		});
alert(perceptron.activate([0, 0]) + "\n" + perceptron.activate([1, 0]) + "\n" + perceptron.activate([0, 1]) + "\n" + perceptron.activate([1, 1]));