exports.selectUserUserNameOrEmail = () => {
    return "SELECT * FROM users WHERE userName = ? OR email = ?";
};
exports.selectUserId = () => {
    return "SELECT * FROM users WHERE id_users = ?";
};
exports.selectUserUserName = () => {
    return "SELECT * FROM users WHERE userName = ?";
};
exports.selectUserBio = () => {
    return "SELECT * FROM users WHERE bio = ?";
};
exports.selectUserMax = () => {
    return "SELECT * FROM users LIMIT 0, ?";
};
exports.selectAllUsers = () => {
    return "SELECT * FROM users";
};
exports.selectUserUserNameId = () => {
    return "SELECT * FROM users WHERE userName= ? AND id_users != ?";
};
exports.selectUserEmail = () => {
    return "SELECT * FROM users WHERE email = ?";
};
exports.insertUser = () => {
    return `INSERT INTO users (email, userName, password, bio, photo) VALUES (?, ?, ?, ?, ?)`;
};
exports.deleteUser = () => {
    return "DELETE FROM users WHERE id_users = ?";
};
exports.updateUser = () => {
    return "UPDATE users SET email = ?, userName = ?, password = ?, bio = ?, photo = ? WHERE id_users = ?";
};
exports.updateUserUserName = () => {
    return "UPDATE users SET userName = ? WHERE id_users = ?";
};
exports.updateUserEmail = () => {
    return "UPDATE users SET email = ? WHERE id_users = ?";
};
exports.updateUserPhoto = () => {
    return "UPDATE users SET photo = ? WHERE id_users = ?";
};
exports.updateUserBio = () => {
    return "UPDATE users SET bio = ? WHERE id_users = ?";
};
