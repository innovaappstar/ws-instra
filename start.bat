title REGINS-2033
SET ruta=%~dp0
@echo %ruta:~0,-1%
@echo "entrando a la ruta"
cd ruta
node build/server.js
pause