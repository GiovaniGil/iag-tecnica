CREATE DATABASE iag_tecnica;  

CREATE TABLE indicador(
"id" SERIAL PRIMARY KEY,
"dataIntegracao" TEXT,
"dataUltAlteracao" TEXT,
"formulaCalculo" TEXT,
"idDrgIntegracao" TEXT,
"identDirecaoSeta" TEXT,
"identPeriodicidade" TEXT,
"identReferencial" TEXT,
"informacoesAdicionais" TEXT,
"nome" TEXT,
"numDecimais" TEXT,
"objetivo" TEXT,
"unidade" TEXT,
"usuarioUltAlteracao" TEXT,
"versao" TEXT
);


