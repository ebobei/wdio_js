**Требования**

Для запуска тестов требуется Node.js (12.x)

Перед запуском тестов необходимо создать файл с переменным окружением .env, содержащий данные из описания .env_example

**E2E регрессионные тесты:**

Запуск регресса Е2Е в Google Chrome desktop - `npm run chrome_desktop_regression`

!!! После окончания регресса в TestRail  будет создан TEST-RUN на актуальную дату с результатами тестов !!!

Запуск тестов главной страницы в Google Chrome desktop - `npm run chrome_desktop_main`
