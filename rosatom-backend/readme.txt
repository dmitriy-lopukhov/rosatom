Бэкэнд для мобильного приложения и сайта/дашборда.

Необходимое окружение для запуска:
- python > 3.7
- virtualenv

Порядок установки:

0. Получить доступ к коммандной строке.

1. Создать virtual environment 
	python -m venv env

2. Активировать virtual environment 
	*nix: 		$. venv/bin/activate
	Windows:	>  venv\scripts\activate

3. Установить зависимости
	pip install -r requirements.txt 

4. Создать базу данных и заполнить ее новыми данными
	python manage.py create_all

Запуск:
	python run.py 
