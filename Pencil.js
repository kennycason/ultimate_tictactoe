function Paper(o) {
	
	this.size = 1;
	
	this.id = o.id;
	
	this.canvas = new Canvas(o.id);
	
	if(o.pencil == null) {
		this.pencil = new PencilBasic();
	} else {
		this.pencil = o.pencil;
	}
	
	if(o.color == null) {
		this.color = new Color(128, 0, 0);
	} else {
		this.color = o.color;
	}
	
	this.clear = function() {
		this.canvas.clear();
	}
	
	this.point2f = function(x, y, size) {
		if(size == null) {
			size = 1;
		}
		this.canvas.drawRect(x, y, size, this.color);
	}
	
	this.polygon = function(v) {
		for(var i = 0; i < v.length - 1; i++) {
			this.line2v(v[i], v[i + 1]);
		}
		this.line2v(v[0], v[v.length - 1]);
	}
	
	this.square = function(x, y, dim) {
		this.rectangle(x, y, dim, dim);
	}
	
	this.rectangle = function(x, y, width, height) {
		this.polygon([[x,y], [x + width, y], [x + width, y + height], [x, y + height]]);
	}
	
	// standard line
	this.line4f = function(x0, y0, x1, y1) {
		this.bresenhamLine(x0, y0, x1, y1);
	} 
	
	this.line2v = function(v1, v2) {
		this.line4f(v1[0], v1[1], v2[0], v2[1]);
	}

	// Bresenham's line algorithm
	this.bresenhamLine = function(x0, y0, x1, y1) {
		x0 = parseInt(x0, 10);
		y0 = parseInt(y0, 10);
		x1 = parseInt(x1, 10);
		y1 = parseInt(y1, 10);
		
		var dx = Math.abs(x1 - x0);
		var dy = Math.abs(y1 - y0);
		var sx, sy;
		if(x0 < x1) {
			sx = 1;
		} else {
			sx = -1;
		} 
		if(y0 < y1) {
			sy = 1;
		} else {
			sy = -1;
		}
		var err = dx - dy;
		
		while(true) {
			this.pencil.draw(this, x0, y0, [[x0, y0],[x1, y1]]);
			
			if(x0 == x1 && y0 == y1) {
				return;
			}
			var e2 = 2 * err;
			if(e2 > -dy) {
				err -= dy;
				x0 += sx;
			}
			if(e2 < dx) {
				err += dx;
				y0 += sy
			}
		}
	}
	
	
	this.circle = function(x, y, r, fill) {
		if(fill) {
			this.canvas.drawCircle(x, y, r, this.color);
		} else {
			this.canvas.drawEmptyCircle(x, y, r, this.color)
		}
	}
	
	this.setColor = function(color) {
		this.color = color;
	}
	
	this.getColor = function() {
		return this.color;
	}
	
	this.setPencil = function(pencil) {
		this.pencil = pencil
	}
	
}

function PencilBasic(size) {
	
	this.size = 1;
	if(size != null) {
		this.size = size;
	}
	
	this.draw = function(ref, x0, y0, o) {
		ref.point2f(x0, y0, this.size);
	}
	
}

function PencilCircle(size) {
	
	this.size = 2;
	if(size != null) {
		this.size = size;
	}
	
	this.draw = function(ref, x0, y0, o) {
		ref.circle(x0, y0, this.size, true);
	}
	
}
	
function PencilFuzzy(size, skew) {
	
	this.size = 1;
	if(size != null) {
		this.size = size;
	}
	
	this.skew = 1;
	if(skew != null) {
		this.skew = skew;
	}
	this.draw = function(ref, x0, y0 , o) {
		var dx = 0,dy = 0;
		if(o[0][0] == o[1][0]) {
			dx = (UTIL.dice(this.skew) - this.skew / 2);
		} else {
			dy = (UTIL.dice(this.skew) - this.skew / 2);
		}
		ref.point2f(x0 + dx, y0 + dy, this.size);
	}
	
}

function Color(r, g, b) {
	
	this.rgb = {r : 0, g : 0, b : 0};
	
	this.hex = '#000';
	
	this.rgbToHex = function(r, g, b) {
		// determine the hexadecimal equivalents
		var r16 = r.toString(16);
		var g16 = g.toString(16);
		var b16 = b.toString(16);
		// return the CSS RGB colour value
		return '#'
			+ (r16.length == 2 ? r16 : '0' + r16)
			+ (g16.length == 2 ? g16 : '0' + g16)
			+ (b16.length == 2 ? b16 : '0' + b16);
	}
	
	this.setRGB = function(r, g, b) {
		if(r < 0) {
			r = 0;
		}
		if(r > 255) {
			r = 255;
		}
		if(g < 0) {
			g = 0;
		}
		if(g > 255) {
			g = 255;
		}
		if(b < 0) {
			b = 0;
		}
		if(b > 255) {
			b = 255;
		}
		this.rgb = {r : r, g : g, b : b};
		this.hex = this.rgbToHex(r, g, b);
	}
	
	this.getRGB = function() {
		return this.rgb;
	}
	
	this.getHex = function() {
		return this.hex;
	}
	
	if(r != null && g != null && b != null) {
		this.setRGB(r, g, b);
	}
	
}

