function AI() {
	
	this.ttt = null;
	
	this.human = 1;
	
	this.computer = 2
	
	this.solve = function(ttt) {
		//$("#data").html("<br/><br/><br/>");
		this.ttt = ttt;
		var state = {
			player : this.computer
			,nextBoard : ttt.nextBoard
			,board : this.deepCopy(ttt.state)
		};

		var result = this.minmax(5, state); // 2 depth, computer = player 2
		return [result[1], result[2], result[3], result[4]] // 0th index = score, 1,2 = nextBoard position
	}
	
	this.minmax = function(depth, state) {
		var next = this.generateMoves(state);
		var bestScore = (state.player == this.human) ? -100000 :100000;
		var best = [-1, -1, -1, -1];
		var score;
		
		if(next.length == 0 || depth == 0) {
			// gameover or depth reached, evaluate score
			bestScore = this.evaluate(state);
		} else {
			
			for(var i = 0; i < next.length; i++) {
				// try move for current player
				state.board[next[i][0]][next[i][1]][next[i][2]][next[i][3]] = state.player;
				var newState = this.cloneState(state);
				newState.nextBoard = [next[i][2], next[i][3]];
				
				if(state.player == this.human) { //
					newState.player = this.computer;
					score = this.minmax(depth - 1, newState)[0];
					if(score > bestScore) {
						bestScore = score;
						best = [next[i][0], next[i][1], next[i][2], next[i][3]];
					}
					
				} else { // must be computer
					newState.player = this.human;
					score = this.minmax(depth - 1, newState)[0];
					if(score < bestScore) {
						bestScore = score;
						best = [next[i][0], next[i][1], next[i][2], next[i][3]];
					}
				}
				//$("#data").append("d: " + depth +  "  s: " + bestScore + " p: " + newState.player + ", " + [next[i][0], next[i][1], next[i][2], next[i][3]] + " - " + newState.board[next[i][0]][next[i][1]]+  "<br/>");
				state.board[next[i][0]][next[i][1]][next[i][2]][next[i][3]] = 0;
			}
		}
		return [bestScore].concat(best);
	}
	
	this.evaluate = function(state) {
		var score = 0;
		for(var x = 0; x < 3; x++) {
			for(var y = 0; y < 3; y++) {
				if(this.hasWon(x, y, state)) {
					score += 100;
				} else if(this.hasTwo(x, y, state)) {
					score += 10
				}
			}
		}
		if(state.player == this.human) { // does this help me? if so it's bad'
			return -score;
		}
		return score;
	}
	
	this.hasWon = function(x, y, state) {
		var turn = state.player;
		if((state.board[x][y][0][0] == turn && state.board[x][y][1][0] == turn && state.board[x][y][2][0] == turn)
		  || (state.board[x][y][0][1] == turn && state.board[x][y][1][1] == turn && state.board[x][y][2][1] == turn) 
	      || (state.board[x][y][0][2] == turn && state.board[x][y][1][2] == turn && state.board[x][y][2][2] == turn)
		  || (state.board[x][y][0][0] == turn && state.board[x][y][0][1] == turn && state.board[x][y][0][2] == turn)
	      || (state.board[x][y][1][0] == turn && state.board[x][y][1][1] == turn && state.board[x][y][1][2] == turn)
		  || (state.board[x][y][2][0] == turn && state.board[x][y][2][1] == turn && state.board[x][y][2][2] == turn) 
	      || (state.board[x][y][0][0] == turn && state.board[x][y][1][1] == turn && state.board[x][y][2][2] == turn)
		  || (state.board[x][y][2][0] == turn && state.board[x][y][1][1] == turn && state.board[x][y][0][2] == turn)) {
		  return true;
		}
		return false;
	}
	
	/**
	 * TODO: takes into account things like
	 * XX_
	 * X__
	 * ___
	 * 
	 * but not 
	 * X_X
	 * ___
	 * X__
	 */
	this.hasTwo = function(x, y, state) {
		var turn = state.player;

		if((state.board[x][y][0][0] == turn && state.board[x][y][1][0] == turn)
		  || (state.board[x][y][1][0] == turn && state.board[x][y][2][0] == turn) 
	      || (state.board[x][y][0][1] == turn && state.board[x][y][1][1] == turn)
		  || (state.board[x][y][1][1] == turn && state.board[x][y][2][1] == turn) 
	      || (state.board[x][y][0][2] == turn && state.board[x][y][1][2] == turn)
		  || (state.board[x][y][1][2] == turn && state.board[x][y][2][2] == turn) 
	  
		  || (state.board[x][y][0][0] == turn && state.board[x][y][0][1] == turn)
		  || (state.board[x][y][0][1] == turn && state.board[x][y][0][2] == turn) 
		  || (state.board[x][y][1][0] == turn && state.board[x][y][1][1] == turn)
		  || (state.board[x][y][1][1] == turn && state.board[x][y][1][2] == turn) 
		  || (state.board[x][y][2][0] == turn && state.board[x][y][2][1] == turn)
		  || (state.board[x][y][2][1] == turn && state.board[x][y][2][2] == turn) 
	  
		  || (state.board[x][y][1][1] == turn && state.board[x][y][0][0] == turn)
		  || (state.board[x][y][1][1] == turn && state.board[x][y][2][2] == turn) 
		  || (state.board[x][y][1][1] == turn && state.board[x][y][0][2] == turn)
		  || (state.board[x][y][1][1] == turn && state.board[x][y][2][0] == turn) ) {
		  return true;
		}
		return false;
	}
	
	this.generateMoves = function(state) {
		var next = new Array();
		
		
		if(this.ttt.hasWon(this.human) || this.ttt.hasWon(this.computer)) {
			return [];
		}
		var x,y;
		if(state.nextBoard == null) { // free to move anywhere, Ignore for now
			next = this.searchAll(state);
		} else {
			for(x = 0; x < 3; x++) {
				for(y = 0; y < 3; y++) {
					if(state.board[state.nextBoard[0]][state.nextBoard[1]][x][y] == 0) {
						next.push([state.nextBoard[0], state.nextBoard[1], x, y]);
					}
				}	
			}
			if(next.length == 0) {
				next = this.searchAll(state);
			}
		}
		return next;
	}
	
	this.searchAll = function(state) {
		var next = new Array();
		var i,j,x,y;
		for(i = 0; i < 3; i++) {
			for(j = 0; j < 3; j++) {
				for(x = 0; x < 3; x++) {
					for(y = 0; y < 3; y++) {
						if(state.board[i][j][x][y] == 0) {
							next.push([i,j,x,y]);
						}
					}	
				}
			}	
		}
		return next;
	}
	
	// should keep array for local board wins, i.e. wins : [[0,0,0],[0,0,0],[0,0,0]]
	this.cloneState = function(state) {
		var newState = {
			player : state.player
			,board : this.deepCopy(state.board)
			,nextBoard : state.nextBoard
		}
		return newState;
	}
	
	this.deepCopy = function(board) {
		var newBoard = [
					[[[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]]],
					[[[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]]],
					[[[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]]]
				];

		var i,j,x,y;
		for(i = 0; i < 3; i++) {
			for(j = 0; j < 3; j++) {
				for(x = 0; x < 3; x++) {
					for(y = 0; y < 3; y++) {
						newBoard[i][j][x][y] = board[i][j][x][y];
					}	
				}
			}	
		}
		return newBoard;
	}

}
