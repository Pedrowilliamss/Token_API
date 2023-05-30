use token;

-- VIEW DE ATENDIMENTO: atendimento_view --
DROP VIEW IF EXISTS atendimento_view;
CREATE VIEW atendimento_view AS SELECT atendimento.id_atendimento, `status`.nome AS "status", guiche.descricao AS "guiche", senha.senha, prioridade.prioridade,
CASE WHEN senha.temp_atendido IS NULL THEN TIMESTAMPDIFF(MINUTE, senha.temp_criado, NOW()) ELSE TIMESTAMPDIFF(MINUTE, senha.temp_criado, senha.temp_atendido)END AS "tempo de espera",
CASE WHEN atendimento.temp_fim IS NULL THEN TIMESTAMPDIFF(MINUTE, atendimento.temp_inicio, NOW()) ELSE TIMESTAMPDIFF(MINUTE, atendimento.temp_inicio, temp_fim)END AS "tempo de atendimento" 
FROM atendimento 
LEFT JOIN guiche ON guiche.id_guiche = atendimento.id_guiche
LEFT JOIN `status` ON `status`.id_status = atendimento.id_status
LEFT JOIN senha ON senha.id_senha = atendimento.id_senha
LEFT JOIN prioridade ON prioridade.id_prioridade = senha.id_prioridade
ORDER BY guiche.descricao;

-- VIEW DA SENHA: senha_view --
DROP VIEW IF EXISTS senha_view;
CREATE VIEW senha_view AS SELECT senha.id_senha, senha.senha, prioridade.prioridade, `status`.nome AS "status" 
FROM senha 
INNER JOIN prioridade ON senha.id_prioridade = prioridade.id_prioridade
INNER JOIN `status` ON senha.id_status = `status`.id_status;

-- VIEW DO RELATORIO DIARIO: relatorio_dairio -- 
DROP VIEW IF EXISTS relatorio_diario;
CREATE VIEW relatorio_diario AS SELECT 
	DATE(temp_criado) AS data,
	count(*) AS "total de senhas emitidas",
    count(CASE WHEN id_status = 3  THEN 1 END) AS "total de senhas atendidas",
    count(CASE WHEN id_prioridade = 1 THEN 1 END) AS "total de senhas preferenciais emitidas",
    count(CASE WHEN id_prioridade = 1 AND id_status = 3 THEN 1 END) AS "total de senhas preferenciais atendidas",
    count(CASE WHEN id_prioridade = 2 THEN 1 END) AS "total de senhas gerais emitidas",
	count(CASE WHEN id_prioridade = 2 AND id_status = 3 THEN 1 END) AS "total de senhas gerais atendidas",
    count(CASE WHEN id_prioridade = 3 THEN 1 END) AS "total de senhas de exames emitidas",
    count(CASE WHEN id_prioridade = 3 AND id_status = 3 THEN 1 END) AS "total de senhas de exames atendidas",
    AVG(timestampdiff(second, temp_criado, temp_atendido)) AS "tempo de espera médio(s)"
    FROM senha
WHERE DATE(temp_criado) >= '2023-01-01'
GROUP BY DATE(temp_criado); 

-- VIEW DO RELATORIO MENSAL: relatorio_mensal --
DROP VIEW IF EXISTS relatorio_mensal;
CREATE VIEW relatorio_mensal AS SELECT 
	DATE_FORMAT(temp_criado, '%Y-%m') AS mes,
	count(*) AS "total de senhas emitidas",
    count(CASE WHEN id_status = 3  THEN 1 END) AS "total de senhas atendidas",
    count(CASE WHEN id_prioridade = 1 THEN 1 END) AS "total de senhas preferenciais emitidas",
    count(CASE WHEN id_prioridade = 1 AND id_status = 3 THEN 1 END) AS "total de senhas preferenciais atendidas",
    count(CASE WHEN id_prioridade = 2 THEN 1 END) AS "total de senhas gerais emitidas",
	count(CASE WHEN id_prioridade = 2 AND id_status = 3 THEN 1 END) AS "total de senhas gerais atendidas",
    count(CASE WHEN id_prioridade = 3 THEN 1 END) AS "total de senhas de exames emitidas",
    count(CASE WHEN id_prioridade = 3 AND id_status = 3 THEN 1 END) AS "total de senhas de exames atendidas",
    AVG(timestampdiff(second, temp_criado, temp_atendido)) AS "tempo de espera médio(s)"
    FROM senha
WHERE DATE(temp_criado) >= '2023-01-01'
GROUP BY DATE_FORMAT(temp_criado, '%Y-%m'); 

-- VIEW DO RELATORIO SENHA: relatorio_senha -- 
DROP VIEW IF EXISTS relatorio_senha;
CREATE VIEW relatorio_senha AS SELECT 
	senha.id_senha,
	senha.senha,
    prioridade.prioridade,
    `status`.nome AS "status",
    senha.temp_criado AS "data/hora de criação",
    senha.temp_atendido AS "data/hora de atendimento",
    guiche.descricao AS "guiche",
    AVG(timestampdiff(second, senha.temp_criado, senha.temp_atendido)) AS "tempo de espera médio(s)",
	AVG(timestampdiff(second, atendimento.temp_inicio, atendimento.temp_fim)) AS "tempo de atendimento médio(s)"
    FROM senha
INNER JOIN prioridade ON senha.id_prioridade = prioridade.id_prioridade
INNER JOIN `status` ON senha.id_status = `status`.id_status
LEFT JOIN atendimento ON atendimento.id_senha = senha.id_senha
LEFT JOIN guiche ON atendimento.id_guiche = guiche.id_guiche
GROUP BY senha.id_senha, senha.senha, prioridade.prioridade, `status`.nome, guiche.descricao;