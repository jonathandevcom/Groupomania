exports.selectCommentsMax = () => {
    return "SELECT * FROM comments LIMIT 0, ?"
};
exports.selectCommentsId = () => {
    return "SELECT * FROM comments WHERE id_comments = ?"
};
exports.selectCommentsJoinUsers = () => {
    return "SELECT * FROM comments LEFT JOIN users ON comments.id_users_comments = users.id_users"
};
exports.insertComment = () => {
    return "INSERT INTO comments (id_users_comments, id_messages_comments, comment) VALUES (?, ?, ?)"
};
exports.deleteComment = () => {
    return "DELETE FROM comments WHERE id_comments = ?"
};