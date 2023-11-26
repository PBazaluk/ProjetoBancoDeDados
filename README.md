# Introdução:
Para este projeto nós utilizamos o mongodb, e para desenvolver usamos a ferramenta Atlas do próprio site do mongodb

# Inserção das tabelas
Para inserir os valores nas tabelas utilizamos scripts no formato `.json`, que é aceito como entrada pela ferramenta. Dentro do diretorio `Input` temos um script para cada colection.

# Queries
Para as queries, dentro do diretorio `Queries` temos dois arquivos `.js` para cada query, um arquivo com o sufixo `*_Atlas.js`, que é aceito na ferramenta na parte de aggregation das colections (as respectivas colections para o aggregate estão comentado na primeira linha de cada query) e outro com o script equivalente em javascript.