**Описание**

+ Основной фреймворк тестирования Webdriver IO (https://webdriver.io).   
+ В качестве раннера используется Mocha (https://mochajs.org/api/mocha);  
+ Для различных вариаций assert-ов применяется библиотека chai (https://www.chaijs.com);  
+ Для качестве отчетности используются Allure-reporter (https://github.com/allure-framework) и wdiov5testrail-reporter (https://github.com/billylam/wdio-wdiov5testrail-reporter). 

**Архитекрута проекта:**

+ Проект написан с использованием паттерна Page Object.  
+ Описание запуска находится в файле README.md.  
+ Конфигурационные файлы запуска тестовых сценарием находятся в корневом каталоге и имеют названия wdio.**\***.\*\*\*.conf.js. 
+ Директория test/page содержит локаторы и методы конкретных страниц и категорий. 
+ Директория test/specs содержит непосредственно тестовые сценарии. 

**Требования**

+ Для запуска тестов требуется Node.js (12.x, не выше 14.х). 
+ Перед запуском тестов необходимо создать файл с переменным окружением .env, содержащий данные из описания .env_example. 

**E2E регрессионные тесты:**

+ Запуск регресса Е2Е в Google Chrome desktop - `npm run chrome_desktop_regression`. 
+ !!! После окончания регресса в TestRail будет создан TEST-RUN на актуальную дату с результатами тестов !!!  
+ Запуск тестов главной страницы в Google Chrome desktop - `npm run chrome_desktop_main`. 
