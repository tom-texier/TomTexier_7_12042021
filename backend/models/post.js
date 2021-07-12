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

        console.log('created publication: ', {
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

Post.getAll = () => {
    sql.query(
        `SELECT `
    )
}

module.exports = Post;