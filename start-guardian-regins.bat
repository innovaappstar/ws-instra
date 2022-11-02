title REGINS-2033(32)
SET ruta=%~dp0
@echo %ruta:~0,-1% 
cd ruta 
node build/app-guardian.js
pause