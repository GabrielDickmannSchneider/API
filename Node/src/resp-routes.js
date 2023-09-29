module.exports = {
    async getResp(req, res) {
        const db = require("../db");

        const client = await db.connect();

        const resp = await client.query(`SELECT email_resp, senha_resp FROM tb_responsavel`);

        return res.send(resp[0]);
    },

    async getRespByEmail(req, res) {
        const db = require("../db");

        const client = await db.connect();

        const {email} = req.query;

        const resp = await client.query(` SELECT r.nome_resp, r.email_resp, r.senha_resp, r.endereco_resp, r.telefone_resp, r.cpf_resp, r.niv_permissao, u.nome, u.email
                                          FROM tb_responsavel r
                                            INNER JOIN tb_usuario u ON u.cod_resp = r.cod_resp
                                          WHERE r.email_resp = "${email}" `);

        if (resp[0].length == 0)
            return res.send({});

        // const userData = user.rows[0];
        return res.send(resp[0]);
    }
}