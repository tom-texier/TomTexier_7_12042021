const { user } = require('../config/db.config');
const sql = require('./db');

const Post = function(post) {
    this.id_user = post.idUser;
    this.description = post.description;
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
            id: postID,
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
        SELECT
            posts.*,
            users.lastname,
            users.firstname,
            users.avatar_url,
            users.job,
            COUNT(likes.id_post) AS NB_LIKES
        FROM
            posts
        LEFT JOIN likes ON likes.id_post = posts.ID
        LEFT JOIN users ON users.ID = posts.id_user
        GROUP BY
            posts.ID
        ORDER BY
            posts.date_publish 
        DESC `,
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            console.log(res);
            result(null, res);
        })
}

Post.getUserLiked = (userID, postID, result) => {
    sql.query(`
        SELECT COUNT(L.id_post) AS USER_LIKED
        FROM likes L
        WHERE
            L.id_post = ${postID}
            AND L.id_user = ${userID}`,
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        })
}

Post.like = (postID, userID, result) => {
    sql.query(`INSERT INTO likes(id_post, id_user) VALUES(${postID}, ${userID})`,
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        })
}

Post.dislike = (postID, userID, result) => {
    sql.query(`DELETE FROM likes WHERE id_post = ${postID} AND id_user = ${userID}`,
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        })
}

Post.getAllByUserId = (userID, result) => {
    sql.query(`
        SELECT
            posts.*,
            users.lastname,
            users.firstname,
            users.avatar_url,
            users.job,
            COUNT(likes.id_post) AS NB_LIKES
        FROM
            posts
        LEFT JOIN likes ON likes.id_post = posts.ID
        LEFT JOIN users ON users.ID = posts.id_user
        WHERE posts.id_user = ${userID}
        GROUP BY
            posts.ID
        ORDER BY
            posts.date_publish
        DESC`,
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            console.log(res);
            result(null, res);
        })
}

module.exports = Post;