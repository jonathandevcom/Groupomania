exports.selectTotalLikes = () => {
    return "SELECT *, SUM(likes) AS numberLikes FROM likes GROUP BY id_messages_likes HAVING SUM(id_messages_likes)";
};

exports.selectLikes = () => {
    return "SELECT * FROM likes"
}

exports.selectLikesId = () => {
    return "SELECT * FROM likes WHERE id_users_likes = ? AND id_messages_likes = ?";
};
exports.updateLike1 = () => {
    return "UPDATE likes SET likes = 1 WHERE id_likes = ?";
};
exports.updateLike0 = () => {
    return "UPDATE likes SET likes = 0 WHERE id_likes = ?";
};
exports.insertLike = () => {
    return "INSERT INTO likes (id_users_likes, id_messages_likes, likes) VALUE (?, ?, 1)";
};
