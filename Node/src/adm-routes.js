module.exports = {
    async getADM(req, res) {
        const db = require("../db");

        const client = await db.connect();

        const adm = await client.query(`SELECT email_adm, senha_adm FROM tb_adm`);

        return res.send(adm[0]);
    },

    async getAdmByEmail(req, res) {
        const db = require("../db");

        const client = await db.connect();

        const {email} = req.query;

        const adm = await client.query(` SELECT a.nome_adm, a.email_adm, a.senha_adm, a.niv_permissao
                                          FROM tb_adm a
                                          WHERE a.email_adm = "${email}" `);

        if (adm[0].length == 0)
            return res.send({});

        // const userData = user.rows[0];
        return res.send(adm[0]);
    }
}