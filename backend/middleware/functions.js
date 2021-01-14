// Format de réponse en cas de succès
exports.success = (result) => {
  return {
    status: "success",
    result: result,
  };
};

// Format de réponse en cas d'erreur
exports.error = (message) => {
  return {
    status: "error",
    message: message,
  };
};
