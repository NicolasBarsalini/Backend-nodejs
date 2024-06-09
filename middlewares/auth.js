const jwt = require('jsonwebtoken');
const UserModel = require('../models/user'); // Ajuste o caminho conforme necessário

const auth = async (request, response, next) => {
    const authHeader = request.headers.authorization;
    
    if (!authHeader) {
        return response.status(401).json({ message: "Token é obrigatório!" });
    }

    const [, token] = authHeader.split(" ");

    try {
        const password = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, password);

        // Buscar o usuário pelo ID do token decodificado
        const user = await UserModel.findById(decoded._id);
        console.log(decoded._id, decoded.email)

        if (!user) {
            return response.status(401).json({ message: "Usuário não encontrado" });
        }

        // Adicionar o usuário ao objeto req
        request.user = user;

        next();
    } catch (err) {
        return response.status(401).json({ message: "Token inválido" });
    }
}

module.exports = auth;
