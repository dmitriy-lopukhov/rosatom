# Требования
- Android Studio (Canary 16)
- gradle (v6.7)
- Доступ в интернет
- Телефон с версией Android 8.0 или новее

# Инструкция по сборке
- Скопировать (склонировать) репозиторий:
-- ```git clone $repository```
- Собрать проект gradle'ом (Debug версию):
-- ```gradle assembleDebug``` Или ```#./gralew assembleDebug``` (gradle wrapper)
- Собранное приложение (пакет apk) будет находится по пути:
-- .app/build/outputs/apk/debug
- Данный apk необходимо установить на телефон с ОС Android
