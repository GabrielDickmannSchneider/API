module.exports = {
    async getUsers(req, res) {
        const db = require("../db");

        const client = await db.connect();

        const users = await client.query(`SELECT email, senha FROM tb_usuario`);

        return res.send(users[0]);
    },

    async getUserByEmail(req, res) {
        const db = require("../db");

        const client = await db.connect();

        const {email} = req.query;

        const user = await client.query(` SELECT e.nome_escola, r.nome_resp, u.cod_rfid, p.descricao, u.cod_usuario, u.cpf, u.nome, u.turma, u.endereco, u.senha, u.email
                                            FROM tb_usuario u
                                            INNER JOIN tb_escola e ON u.cod_escola = e.cod_escola
                                            INNER JOIN tb_responsavel r ON u.cod_resp = r.cod_resp
                                            INNER JOIN tb_permissao p ON p.niv_permissao = u.niv_permissao
                                            WHERE u.email = "${email}"`);

        if (user[0].length == 0)
            return res.send({});

        // const userData = user.rows[0];
        return res.send(user[0]);
    },

    async getSituation(req, res) {
        const db = require("../db");

        const client = await db.connect();

        const{email} = req.query;

        const situation = await client.query(`SELECT checagem_escola, checagem_sala, data_ponto, hora_ponto 
                                              FROM tb_checagem as checagem 
                                               RIGHT JOIN tb_usuario as usuario on checagem.cod_rfid = usuario.cod_rfid 
                                              WHERE usuario.email = "${email}" 
                                              ORDER BY checagem.hora_ponto DESC`);

        if (situation[0].length == 0)
            return res.send({});
        
        return res.send(situation[0]);
    }
}