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

        const user = await client.query(` SELECT e.nome_escola, r.nome_resp, u.cod_rfid, p.descricao, u.cod_usuario, u.cpf, u.nome, u.turma, u.endereco, u.senha, u.email, u.niv_permissao
                                            FROM tb_usuario u
                                            INNER JOIN tb_escola e ON u.cod_escola = e.cod_escola
                                            INNER JOIN tb_responsavel r ON u.cod_resp = r.cod_resp
                                            INNER JOIN tb_permissao p ON p.niv_permissao = u.niv_permissao
                                            WHERE u.email = "${email}"`);

        if (user[0].length == 0)
            return res.send({});

        return res.send(user[0]);
    },

    async getSituation(req, res) {
        const db = require("../db");

        const client = await db.connect();

        const{email} = req.query;

        const situation = await client.query(`SELECT MAX(IF(checagem_escola = 1 AND checagem_sala = 1, 'Presença', 'Falta')) AS situacao, data_ponto, MAX(hora_ponto) AS hora_ponto
                                                FROM tb_checagem AS checagem 
                                                RIGHT JOIN tb_usuario AS usuario ON checagem.cod_rfid = usuario.cod_rfid 
                                                WHERE usuario.email = '${email}'  AND (checagem_escola = 0 AND checagem_sala = 0) OR (checagem_escola = 1 AND checagem_sala = 0) OR (checagem_escola = 1 AND checagem_sala = 1)
                                                GROUP BY data_ponto
                                                ORDER BY data_ponto DESC, hora_ponto DESC`);

        if (situation[0].length == 0)
            return res.send({});
        
        return res.send(situation[0]);
    },

    async getHour(req, res) {
        const db = require("../db");

        const client = await db.connect();

        const{email} = req.query;

        const situation = await client.query(`SELECT DISTINCT data_ponto, MIN(hora_ponto) AS menor_hora_ponto, MAX(hora_ponto) AS maior_hora_ponto
                                                FROM tb_checagem AS checagem 
                                                RIGHT JOIN tb_usuario AS usuario ON checagem.cod_rfid = usuario.cod_rfid 
                                                WHERE usuario.email = '${email}' 
                                                GROUP BY data_ponto
                                                ORDER BY data_ponto DESC, maior_hora_ponto DESC;`);

        if (situation[0].length == 0)
            return res.send({});
        
        return res.send(situation[0]);
    }
}