var rectangleTypeName = "rectangle";
var lineTypeName = "line";

//Canvas Variables
var canvasElementID = "Canvas";

function drawOnCanvas( canvasContext )
{
	var fillColor = "#FF0000";
	var fillColorTwo = "#FFFFFF";
	var lineColor = "#003300";
	var x = 0;
	var y = 0;
	var width = 150;
	var height = 75;

	//Draw the rectangles
	var rectangle1 = {type:rectangleTypeName, x:x, y:y, width:width, height:height, color:fillColor};
	var rectangles = [rectangle1];
	drawRectangles( canvasContext, rectangles );

	//Line 1
	var line1 = {type:lineTypeName, startX:200, startY:100, endX:300, endY:200};

	//Line 2
	var line2 = {type:lineTypeName, startX:200, startY:100, endX:250, endY:100};

	//Line 3
	var line3 = {type:lineTypeName, startX:200, startY:100, endX:200, endY:150};
	
	//Draw the lines
	var lines = [line1, line2, line3];
	drawLines( canvasContext, lines );

	//document.getElementById("testText").innerHTML="width: " + canvasContext.canvas.width;

	//var verticalPositions = [400];
	//drawHorizontalLines( canvasContext, verticalPositions )

	var canvasMidHeight = canvasContext.canvas.height/2;
	var verticalPositions = [];
	verticalPositions.push( canvasMidHeight );
	//verticalPositions2.push( canvasMidHeight/0.6 );
	//verticalPositions2.push( canvasMidHeight/0.7 );
	for( var i = 0.1; i < 1; i+=0.1 )
	{
		verticalPositions.push( canvasMidHeight/Math.pow(i, 1/5) );
	}
	drawHorizontalLines( canvasContext, verticalPositions )

	//Linear Gradient
	// Create the gradient
	x = 0;
	y = 0;
	endX = 200;
	endY = 0;
	// createLinearGradient parameters:
	// 1 and 2: x and y of the starting point of the gradient
	// 3 and 4: x and y of the ending point of the gradient
	var gradient = canvasContext.createLinearGradient(x,y,endX,endY);
	gradient.addColorStop(0, fillColor);
	gradient.addColorStop(1, fillColorTwo);

	// Fill with gradient
	x = 0;
	y = 100;
	canvasContext.fillStyle = gradient;
	canvasContext.fillRect(x,y,width,height);

	//Circle
	canvasContext.beginPath();
	//arc parameters:
	//1 and 2: x and y of the center of the circle
	//3: radius of the circle
	//4 and 5: start and end angle of the circle in radians, 0 being far right (or 3-oclock)
	x = 200;
	y = 50;
	var radius = 40;
	var startAngle = 0;
	var endAngle = 2*Math.PI;
	canvasContext.arc(x,y,radius,startAngle,endAngle);
	canvasContext.closePath();
	canvasContext.stroke();

	//Circle
	x = 300;
	y = 50;
	radius = 40;
	startAngle = 0;
	endAngle = 2*Math.PI;
	var lineWidth = 5;
	canvasContext.beginPath();
	canvasContext.arc(x,y,radius,startAngle,endAngle);
	canvasContext.fillStyle = fillColor;
	canvasContext.fill();
	canvasContext.lineWidth = lineWidth;
	canvasContext.strokeStyle = lineColor;
	canvasContext.closePath();
	canvasContext.stroke();
}

//Draws an array of rectangles with the format:
//{type:rectangleTypeName, x:x, y:y, width:width, height:height, color:fillColor}
function drawRectangles( canvasContext, rectangles )
{
	for( var i = 0; i < rectangles.length; i++ )
	{
		drawRectangle( canvasContext, rectangles[i] );
	}
}

//Draws a rectangle with the format:
//{type:rectangleTypeName, x:x, y:y, width:width, height:height, color:fillColor}
function drawRectangle( canvasContext, rectangle )
{
	if( rectangle.type === rectangleTypeName )
	{
		canvasContext.fillStyle = rectangle.color;
		//fillRect parameters: 
		//1 and 2: x and y coordinate of the upper left corner of the rectangle
		//3: width in pixels, 4: height in pixels
		canvasContext.fillRect( rectangle.x,rectangle.y,rectangle.width,rectangle.height );
	}
}

//Draws an array of lines with the format:
//{type:type name, startX:starting x coordinate, startY:starting y coordinate, endX:ending x coordinate, endY:ending y coordinate}
//example: {type:lineTypeName, startX:200, startY:100, endX:300, endY:200}
function drawLines( canvasContext, lines )
{
	for( var i = 0; i < lines.length; i++ )
	{
		drawLine( canvasContext, lines[i] );
	}
}

//Draws a line with the format:
//{type:type name, startX:starting x coordinate, startY:starting y coordinate, endX:ending x coordinate, endY:ending y coordinate}
//{type:lineTypeName, startX:200, startY:100, endX:300, endY:200}
function drawLine( canvasContext, line )
{
	if( line.type === lineTypeName )
	{
		//moveTo parameters: x and y coordinates to move the cursor to
		//used as the starting point of the line created by stroke()
		canvasContext.moveTo( line.startX, line.startY );
		//lineTo parameters: x and y coordinates of the end of the line
		canvasContext.lineTo( line.endX, line.endY );
		if( "color" in line )
		{
			canvasContext.strokeStyle = line.color;
		}
		canvasContext.stroke();
	}
}

//Draws a line, taking in the starting and ending x and y coordinates
function drawLineXY( canvasContext, startingX, startingY, endingX, endingY )
{
	var line = {type:lineTypeName, startX:startingX, startY:startingY, endX:endingX, endY:endingY};
	drawLine( canvasContext, line );
}

//Draws a line, taking in the starting, ending x and y coordinates, and color from the screen
function drawLineFromScreen()
{
	//Get the canvas and context
	var canvas = document.getElementById( canvasElementID );
	var canvasContext = canvas.getContext("2d");

	//Get the coordinates from the screen
	var startingX = document.getElementById('lineStartX').value;
	var startingY = document.getElementById('lineStartY').value;
	var endingX = document.getElementById('lineEndX').value;
	var endingY = document.getElementById('lineEndY').value;
	var lineColor = document.getElementById('lineColor').value;

	//Draw the line
	/*
	var line = {type:lineTypeName, startX:startingX, startY:startingY, endX:endingX, endY:endingY, color:lineColor};
	drawLine( canvasContext, line );
	*/
	//canvasContext.closePath();
	canvasContext.moveTo( startingX, startingY );
	canvasContext.lineTo( endingX, endingY );
	canvasContext.strokeStyle = lineColor;
	canvasContext.stroke();
}

//Draws an array of horizontal lines that span the canvas at the y values specified in the array verticalPositions:
//{type:lineTypeName, startX:200, startY:100, endX:300, endY:200}
function drawHorizontalLines( canvasContext, verticalPositions )
{
	var lines = [];
	for( var i = 0; i < verticalPositions.length; i++ )
	{
		var line = {type:lineTypeName, startX:0, startY:verticalPositions[i], endX:canvasContext.canvas.width, endY:verticalPositions[i]};
		lines.push(line);
	}
	drawLines( canvasContext, lines );
}

//Initializes the canvas
function initCanvas()
{
	var canvas = document.getElementById( canvasElementID );
	var canvasWidth = 1200;//Eventually I'd like to set these dynamically.
	var canvasHeight = 800;
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	var canvasContext = canvas.getContext("2d");
	
	drawOnCanvas( canvasContext );
	clearCanvas();
	addCloud();
	//addGrid();
	//alert( "Done initing." );
}

function clearCanvas()
{
	//Get the canvas and context
	var canvas = document.getElementById( canvasElementID );
	var canvasContext = canvas.getContext("2d");

	//Clear the whole context/canvas
	//canvasContext.clearRect( 0, 0, canvas.width, canvas.height );
	//The above seems to mostly work, but there seems to be a bug that (with the above clearRect call) if I call drawLineFromScreen() after addCloud() it always redraws the cloud, even after calling this function.
	//At least it does that on my current version of Firefox on Ubuntu as of November 1 2015, which seems to be Firefox 41.0.2
	canvas.width = canvas.width;//This seems to work better, especially in that it doesn't have the above bug. Apparently it's a lot slower, but it's not noticable to me on this web page on my Ubuntu desktop.

	//alert( "Canvas should have been cleared." );
}

function addCloud()
{
	console.log("In addCloud()");
	//Get the canvas and context
	var canvas = document.getElementById( canvasElementID );
	var canvasContext = canvas.getContext("2d");

	//Get the starting point
	var startX = Number( document.getElementById('cloudX').value );
	var startY = Number( document.getElementById('cloudY').value );

	//Draw the cloud
	canvasContext.beginPath();
	canvasContext.moveTo(startX, startY);
	canvasContext.bezierCurveTo(startX-10, startY+20, startX-10, startY+70, startX+60, startY+70);
	//console.log( "canvasContext.bezierCurveTo(" + (startX-10) + ", " + (startY+20) + ", " + (startX-10) + ", " + (startY+70) + ", " + (startX+60) + ", " + (startY+70) + ");" );
	canvasContext.bezierCurveTo(startX+80, startY+80, startX+150, startY+80, startX+170, startY+70);
	//console.log( "canvasContext.bezierCurveTo(" + (startX+80) + ", " + (startY+80) + ", " + (startX+150) + ", " + (startY+80) + ", " + (startX+170) + ", " + (startY+70) + ");" );
	canvasContext.bezierCurveTo(startX+225, startY+70, startX+225, startY+40, startX+220, startY+20);
	canvasContext.bezierCurveTo(startX+230, startY-40, startX+170, startY-40, startX+170, startY-30);
	canvasContext.bezierCurveTo(startX+150, startY-75, startX+80, startY-60, startX+80, startY-30);
	canvasContext.bezierCurveTo(startX+90, startY-30, startX-10, startY-60, startX, startY);
	/*
	canvasContext.moveTo(170, 80);
	canvasContext.bezierCurveTo(160, 100, 160, 150, 230, 150);
	canvasContext.bezierCurveTo(250, 160, 320, 160, 340, 150);
	canvasContext.bezierCurveTo(395, 150, 395, 120, 390, 100);
	canvasContext.bezierCurveTo(400, 40, 340, 40, 340, 50);
	canvasContext.bezierCurveTo(320, 5, 250, 20, 250, 50);
	canvasContext.bezierCurveTo(260, 50, 160, 20, 170, 80);
	*/
	//canvasContext.closePath();
	canvasContext.lineWidth = 5;
	canvasContext.strokeStyle = 'black';
	canvasContext.fillStyle = '#FFFFFF';
	canvasContext.fill();
	canvasContext.closePath();
	canvasContext.stroke();
	//alert( "Cloud added." );
}

function addGrid()
{
	//Get the canvas and context
	var canvas = document.getElementById( canvasElementID );
	var canvasContext = canvas.getContext("2d");

	//Add the vertical line labels
	canvasContext.font = "10px Arial";
	canvasContext.fillStyle = "black";
	canvasContext.lineWidth = 1;
	canvasContext.strokeStyle = 'black';
	for( var x = 10; x < (canvas.width - 10); x = x + 10 )
	{
		drawLineXY( canvasContext, x, 0, x, canvas.height - 25 );

		if( x % 30 === 0 )
		{
			canvasContext.fillText(x, x-5, canvas.height - 15 );
		}
	}
}

function setBackgroundColor()
{
	//Get the canvas and context
	var canvas = document.getElementById( canvasElementID );
	var canvasContext = canvas.getContext("2d");

	//Get the fill color
	var backgroundColor = document.getElementById('backgroundColor').value;

	//Set the background color.
	canvas.style.background = backgroundColor;

	//alert( "Canvas should have been cleared." );
}

window.onload = initCanvas;
