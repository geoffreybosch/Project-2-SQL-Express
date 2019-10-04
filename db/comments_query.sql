		SELECT comments.id, comments.comment, scores.player_name, scores.score
		FROM comments
			LEFT JOIN scores
			ON comments.comm_id = scores.id; 
