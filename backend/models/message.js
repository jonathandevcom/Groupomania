exports.selectMessagesMax = () => {
    return "SELECT * FROM messages LIMIT 0, ?"
};
exports.selectMessageId = () => {
    return "SELECT * FROM messages WHERE id_messages = ?"
};
exports.selectMessagesJoinUsers = () => {
    return "SELECT * FROM messages LEFT JOIN users ON messages.id_users_messages = users.id_users";
};
exports.insertMessages = () => {
    return "INSERT INTO messages (id_users_messages, image, text) VALUES (?, ?, ?)";
};
exports.deleteMessageComments = () => {
    return "DELETE messages, comments, likes FROM messages LEFT JOIN comments ON messages.id_messages = comments.id_messages_comments LEFT JOIN likes ON messages.id_messages = likes.id_messages_likes WHERE id_messages = ?"
};
