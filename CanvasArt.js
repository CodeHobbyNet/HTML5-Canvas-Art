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
		canvasContext.stroke();
	}
}

//Draws a line, taking in the starting and ending x and y coordinates
function drawLineXY( canvasContext, startingX, startingY, endingX, endingY )
{
	var line = {type:lineTypeName, startX:startingX, startY:startingY, endX:endingX, endY:endingY};
	drawLine( canvasContext, line );
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
	canvasContext.clearRect( 0, 0, canvas.width, canvas.height );

	//alert( "Canvas should have been cleared." );
}

function addCloud()
{
	//Get the canvas and context
	var canvas = document.getElementById( canvasElementID );
	var canvasContext = canvas.getContext("2d");

	//Get the starting point
	var startX = document.getElementById('cloudX').value;
	var startY = document.getElementById('cloudY').value;
	//alert( "Cloud at " + startX + " , " + startY );

	//Draw the cloud
	canvasContext.beginPath();
	canvasContext.moveTo(170, 80);
	canvasContext.bezierCurveTo(160, 100, 160, 150, 230, 150);
	canvasContext.bezierCurveTo(250, 160, 320, 160, 340, 150);
	canvasContext.bezierCurveTo(395, 150, 395, 120, 390, 100);
	canvasContext.bezierCurveTo(400, 40, 340, 40, 340, 50);
	canvasContext.bezierCurveTo(320, 5, 250, 20, 250, 50);
	canvasContext.bezierCurveTo(260, 50, 160, 20, 170, 80);
	canvasContext.closePath();
	canvasContext.lineWidth = 5;
	canvasContext.strokeStyle = 'black';
	canvasContext.fillStyle = '#FFFFFF';
	canvasContext.fill();
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
