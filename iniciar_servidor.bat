@echo off
echo "Iniciando o servidor de desenvolvimento..."


cd /d "C:\Users\Central\Desktop\Controle-Entregas"

echo "Executando o build..."
call npm run build

echo "Iniciando o servidor..."
start "Servidor Local" serve -s build

echo "Processo concluído!"