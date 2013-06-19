function TicTacToe() {
	
	// drawing variables
	this.superFatPencil = new PencilFuzzy(12,10);
	this.fatPencil = new PencilFuzzy(8,7);
	this.thinPencil = new PencilFuzzy(4,3);
	this.paper = new Paper({id : 'board', pencil : this.thinPencil });
	this.paper.setColor(new Color(48, 48, 48));
	
	// game variables
	this.turn = 1;
	this.gameOver = false;
	// the next board that the player has to play in, i.e. [0,0] = top left square
	this.nextBoard = null; //[1,1]; 
	
	this.state = 	
	[
		[[[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]]],
		[[[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]]],
		[[[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]]]
	];
	
	this.wins = [[0,0,0],[0,0,0],[0,0,0]];
	
	this.drawBoard = function() {
		var w = $("#board").width();
		var h = $("#board").height();
		
		// main board
		this.paper.pencil = this.fatPencil;
		this.paper.setColor(new Color(48, 48, 48));
		this.paper.line4f(0+2, h/3-3, w-8, h/3-3);
		this.paper.line4f(0+2, 2/3*h-3, w-8, 2/3*h-3);
		this.paper.line4f(w/3-3, 0+2, w/3-3, h-8);
		this.paper.line4f(2/3*w-3, 0+2, 2/3*w-3, h-8);
		
		// sub board
		this.paper.pencil = this.thinPencil;
		this.drawSubBoard(0, 0); this.drawSubBoard(w/3, 0); this.drawSubBoard(2/3*w, 0);
		this.drawSubBoard(0, h/3); this.drawSubBoard(w/3, h/3); this.drawSubBoard(2/3*w, h/3);
		this.drawSubBoard(0, 2/3*h); this.drawSubBoard(w/3, 2/3*h); this.drawSubBoard(2/3*w, 2/3*h);
		
		// border
		this.paper.pencil = this.fatPencil;
		this.paper.setColor(new Color(139, 69, 19));
		this.paper.line4f(-2, -2, w-2, -2);
		this.paper.line4f(w-4, -2, w-4, h-4);
		this.paper.line4f(-2, h-4, w-4, h-4);
		this.paper.line4f(-2, -2, -2, h-4);
		
		this.paper.pencil = this.thinPencil;
	}
	
	this.drawSubBoard = function(x, y) {
		var w = $("#board").width() / 3;
		var h = $("#board").height() / 3
		this.paper.setColor(new Color(60, 60, 60));
		this.paper.line4f(x + 8, y + h/3, x + w-12, y + h/3);
		this.paper.line4f(x + 8, y + 2/3*h, x + w-12, y + 2/3*h);
		this.paper.line4f(x + w/3, y + 8, x + w/3, y + h-12);
		this.paper.line4f(x + 2/3*w, y + 8, x + 2/3*w, y + h-12);
	}
	
	this.getCurrentSubBoard = function() {
		return this.state[this.nextBoard[0]][this.nextBoard[1]];
	}
	
	this.isSubBoardFull = function(board) {
		if(board == null) {
			return false;
		}
		return board[0][0] != 0 && board[1][0] != 0 && board[2][0] != 0
			&& board[0][1] != 0 && board[1][1] != 0 && board[2][1] != 0
			&& board[0][2] != 0 && board[1][2] != 0 && board[2][2] != 0
	}
	
	this.switchTurns = function() {
		if(this.turn == 2) {
			this.turn = 1;
			$("#turn").html("X");
		} else if(this.turn == 1) {
			this.turn = 2;
			$("#turn").html("O");
		}
	}
	
	this.clickedValidBoard = function(x, y) {
		if(this.nextBoard == null) {
			return true;
		}
		var w = $("#board").width();
		var h = $("#board").height();
		
		if(x > this.nextBoard[0]*w/3 
			&& x < (this.nextBoard[0]+1)*w/3
			&& y > this.nextBoard[1]*h/3 
			&& y < (this.nextBoard[1]+1)*h/3) {
			return true;
		}
		return false;
	}

	this.getLocalCoord = function(x, y) {
		var w = $("#board").width() / 3;
		var h = $("#board").height() / 3;
		if(this.nextBoard == null) {
			this.nextBoard = [
				parseInt(x / w),
				parseInt(y / h)
			];
		}

		var x0 = this.nextBoard[0]*w;
		var y0 = this.nextBoard[1]*h;
		var lx = parseInt((x-x0) / w * 3);
		var ly = parseInt((y-y0) / h * 3);
		return [lx, ly];
	}
	
	this.clickedEmptySpace = function(x, y) {
		var lxy = this.getLocalCoord(x, y);
		var lx = lxy[0];
		var ly = lxy[1];
		
		// alert(lx + " " + ly + " " + this.state[this.nextBoard[0]][this.nextBoard[1]][lx][ly]);
		if(this.state[this.nextBoard[0]][this.nextBoard[1]][lx][ly] == 0) {
			return true;
		}
		return false;
	}
	
	this.drawO = function(x, y) {
		var w = $("#board").width() / 3 / 3;
		this.paper.setColor(new Color(128,0, 0));
		this.paper.circle(x + w/2 + 2, y + w/2 + 2, w / 2 - 10, false, 5);
	}
	
	this.drawX = function(x, y) {
		var w = $("#board").width() / 3 / 3;
		var h = $("#board").height() / 3 / 3;
		this.paper.setColor(new Color(0,128,0));
		this.paper.line4f(x+9, y+9, x+w-9, y+h-9);
		this.paper.line4f(x+w-9, y+9, x+9, y+h-9);
	}
	
	this.go = function(x, y) {
		var lxy = this.getLocalCoord(x, y);
		var lx = lxy[0];
		var ly = lxy[1];
		this.state[this.nextBoard[0]][this.nextBoard[1]][lx][ly] = this.turn;
		var w = $("#board").width() / 3;
		var h = $("#board").height() / 3;
		
		var dX = this.nextBoard[0] * w + lx * w / 3;
		var dY = this.nextBoard[1] * h + ly * h / 3;
		if(this.turn == 2) {
			this.drawO(dX, dY);
		} else if(this.turn == 1) {
			this.drawX(dX, dY);
		}
		this.handleWins(this.nextBoard[0], this.nextBoard[1], 1);
		this.handleWins(this.nextBoard[0], this.nextBoard[1], 2);
		this.nextBoard = [lx, ly];
	}
	
	this.highlightBoard = function() {
		var w = $("#board").width() / 3;
		var h = $("#board").height() / 3;
		if(this.nextBoard == null) {
			$("#board").css("background-repeat", "repeat");
			$("#board").css("background-position", "0px 0px");
		} else {
			var pos = (this.nextBoard[0]*w) + "px " + (this.nextBoard[1]*h) + "px";
			$("#board").css("background-repeat", "no-repeat");
			$("#board").css("background-position", pos);
		}
	}
	
	this.handleWins = function(x, y, turn) {
		var w = $("#board").width() / 3;
		var h = $("#board").height() / 3;
		var dX = this.nextBoard[0] * w;
		var dY = this.nextBoard[1] * h;
		
		var board = this.state[x][y];
		if(this.wins[x][y] > 0) {
			return;
		}
		
		// local wins
		// horizontal
		if(turn == 1) {
			this.paper.setColor(new Color(0,128,0));
		} else if(turn == 2) {
			this.paper.setColor(new Color(128,0,0));
		}
		this.paper.pencil = this.fatPencil;
		if(board[0][0] == turn && board[1][0] == turn && board[2][0] == turn) {
			this.paper.line4f(dX+8, dY + h/3/2-4, dX + w-8, dY + h/3/2-4);
			this.wins[x][y] = turn;
		}
		if(board[0][1] == turn && board[1][1] == turn && board[2][1] == turn) {
			this.paper.line4f(dX+8, dY + (h/3/2+h/3)-4, dX + w-8, dY + (h/3/2+h/3)-4);
			this.wins[x][y] = turn;
		}
		if(board[0][2] == turn && board[1][2] == turn && board[2][2] == turn) {
			this.paper.line4f(dX+8, dY + (h/3/2+2/3*h)-4, dX + w-8, dY + (h/3/2+2/3*h)-4);
			this.wins[x][y] = turn;
		}
		// vertical
		if(board[0][0] == turn && board[0][1] == turn && board[0][2] == turn) {
			this.paper.line4f(dX+w/3/2-4, dY+8, dX+w/3/2-4, dY+h-8);
			this.wins[x][y] = turn;
		}
		if(board[1][0] == turn && board[1][1] == turn && board[1][2] == turn) {
			this.paper.line4f(dX+(w/3/2+w/3)-4, dY+8, dX+(w/3/2+w/3)-4, dY+h-8);
			this.wins[x][y] = turn;
		}
		if(board[2][0] == turn && board[2][1] == turn && board[2][2] == turn) {
			this.paper.line4f(dX+(w/3/2+2/3*w)-4, dY+8, dX+(w/3/2+2/3*w)-4, dY+h-8);
			this.wins[x][y] = turn;
		}
		// diagonal
		if(board[0][0] == turn && board[1][1] == turn && board[2][2] == turn) {
			this.paper.line4f(dX+8, dY+8, dX+w-8, dY+h-8);
			this.wins[x][y] = turn;
		}
		if(board[2][0] == turn && board[1][1] == turn && board[0][2] == turn) {
			this.paper.line4f(dX+8, dY+h-8, dX+w-8, dY-8);
			this.wins[x][y] = turn;
		}
		
		if(this.wins[x][y] > 0) {
			$("#score_" + turn).html(parseInt($("#score_" + turn).html()) + 1);
		}
		
		// global wins
		// horizontal
		this.paper.pencil = this.superFatPencil;
		if((this.wins[0][0] == turn && this.wins[1][0] == turn && this.wins[2][0] == turn)
		  || (this.wins[0][1] == turn && this.wins[1][1] == turn && this.wins[2][1] == turn) 
	      || (this.wins[0][2] == turn && this.wins[1][2] == turn && this.wins[2][2] == turn)
		  || (this.wins[0][0] == turn && this.wins[0][1] == turn && this.wins[0][2] == turn)
	      || (this.wins[1][0] == turn && this.wins[1][1] == turn && this.wins[1][2] == turn)
		  || (this.wins[2][0] == turn && this.wins[2][1] == turn && this.wins[2][2] == turn) 
	      || (this.wins[0][0] == turn && this.wins[1][1] == turn && this.wins[2][2] == turn)
		  || (this.wins[2][0] == turn && this.wins[1][1] == turn && this.wins[0][2] == turn)) {
			if(turn == 2) {
				alert("O Wins!");
				$("#msg").html("O Wins!");
				this.gameOver = true;
			} else if(turn == 1) {
				alert("X Wins!");
				$("#msg").html("X Wins!");
				this.gameOver = true;
			}
		}
		this.paper.pencil = this.thinPencil;
	}
	
	this.move = function(x, y) {
		// alert(x + " " + y);
		if(this.clickedValidBoard(x, y)) {
			if(this.clickedEmptySpace(x, y)) {
				this.go(x, y);
				return true;
			} else {
				$("#msg").html("That space is already been played!");
			}
		} else {
			$("#msg").html("Must make a move in board (" + (this.nextBoard[0] + 1) + ", " + (this.nextBoard[1] + 1) + ")");
		}
		return false;
	}

	$("#msg").html("Start by clicking anywhere :)");
	// handle click events
	var board = this;
	$("#board").click(function(e) {
		if(!board.gameOver) {
			var offset = $("#board").offset();
			var x = e.clientX - offset.left;
			var y = e.clientY - offset.top;

			var moved = board.move(x, y);
			if(moved) {
				if(!board.gameOver) {
					$("#msg").html("");
				}
				board.switchTurns();
			}
			
			// account for filled squares
			if(board.nextBoard != null && board.isSubBoardFull(board.getCurrentSubBoard())) {
				board.nextBoard = null;
			}
			board.highlightBoard();
		}
	});
	
}
