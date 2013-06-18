// static objects
function Canvas(id) {
	this.id = id;
	this.canvas = $("#" + id).get(0);
	this.width = $("#" + id).width();
	this.height = $("#" + id).height();
	
	this.context = this.canvas.getContext("2d");
	this.canvasData = this.context.getImageData(0, 0, this.width, this.height);

	this.drawRect = function(x, y, dim, color) {
		if(dim == null) {
			dim = 1;
		}
		
		if(color == null) {
			color = new Color();
		}
		this.context.fillStyle = color.getHex();
		this.context.fillRect(x, y, dim, dim);

	}

	this.drawPixel = function(x, y, r, g, b, a) {
		var index = (x + y * this.width) * 4;

		this.canvasData.data[index + 0] = r;
		this.canvasData.data[index + 1] = g;
		this.canvasData.data[index + 2] = b;
		this.canvasData.data[index + 3] = a;
	}
	
	this.drawCircle = function(x, y, r, color) {
		this.drawEmptyCircle(x, y, r, color);
		this.context.fillStyle = color.getHex();
		this.context.fill();
	}

	this.drawEmptyCircle = function(x, y, r, color, lineWidth) {
		if(lineWidth == null) {
			lineWidth = 5;
		}
		this.context.beginPath();
		this.context.arc(x, y, r, 0, 2 * Math.PI, false);
		this.context.lineWidth = lineWidth;
		this.context.strokeStyle = color.getHex();
		this.context.stroke();
	}

	this.updateCanvas = function() {
		this.context.putImageData(this.canvasData, 0, 0);
	}

	this.clear = function() {
		this.drawRect(0, 0, this.width, "white");
	}
	
}