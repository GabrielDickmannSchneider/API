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
    },

    async insert(req, res) {
        const db = require("../db");
         
        const client = await db.connect();

        const obj = {
            codEscola: req.body.cod_escola,
            codResp: req.body.cod_resp,
            codRfid: req.body.cod_rfid,
            nivPermissao: req.body.niv_permissao,
            cpf: req.body.cpf,
            nome: req.body.nome,
            turma: req.body.turma,
            endereco: req.body.endereco,
            email: req.body.email
        }

        const user = await client.query(` INSERT INTO tb_usuario (cod_escola, cod_resp, cod_rfid, niv_permissao, cpf, nome, turma, endereco, senha, email) 
                                    VALUE (${obj.codEscola}, ${obj.codResp}, '${obj.codRfid}', ${obj.nivPermissao}, '${obj.cpf}', '${obj.nome}', '${obj.turma}', '${obj.endereco}', 'teste123', '${obj.email}') `);

        return res.send(obj);
    }
}