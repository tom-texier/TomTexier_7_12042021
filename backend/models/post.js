const sql = require('./db');

const Post = function(post) {
    this.id_user = post.idUser;
    this.description = nl2br(post.description);
    this.image = post.image;
}

Post.create = (newPost, result) => {
    sql.query('INSERT INTO posts SET ?', newPost, (err, res) => {
        if (err) {
            console.log('error :', err);
            result(err, null);
            return;
        }

        console.log('Post créé: ', {
            id: res.insertId,
            ...newPost,
        });
        result(null, {
            id: res.insertId,
            id_user: newPost.id_user,
            datePublish: newPost.date_publish,
            image: newPost.image,
            description: newPost.description
        })
    })
}

Post.update = (postID, userID, updatePost, result) => {
    sql.query(`UPDATE posts SET ? WHERE ID = ${postID}`, updatePost, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log('Post mis à jour', {
            ...updatePost
        });
        result(null, {
            ...updatePost
        })
    })
}

Post.delete = (postID, result) => {
    sql.query(`DELETE FROM posts WHERE ID = ${postID}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log(`La publication n°${postID} a bien été supprimée.`);
        result(null, postID);
    })
}

Post.getAll = (result) => {
    sql.query(`
                            SELECT posts.*,
                            users.lastname,
                            users.firstname,
                            users.avatar_url,
                            users.job,
                            COUNT(likes.id_post) AS NB_LIKES,
                            COUNT(comments.id_post) AS NB_COMMENTS,
                            COUNT(shares.id_post) AS NB_SHARES FROM posts LEFT JOIN likes ON likes.id_post = posts.ID LEFT JOIN comments ON comments.id_post = posts.ID LEFT JOIN shares ON shares.id_post = posts.ID LEFT JOIN users ON users.ID = posts.id_user GROUP BY posts.ID ORDER BY posts.date_publish DESC `,
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        })
}

module.exports = Post;