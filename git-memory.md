ключ ssh
. Настройка SSH (чтобы не вводить пароль)

Прежде всего, нужно подружиться с GitHub по SSH. Это стандарт для архитектора.

    Генерация ключа (если его еще нет): ssh-keygen -t ed25519 -C "your_email@example.com"

    Добавление в GitHub:

        Скопируй ключ: cat ~/.ssh/id_ed25519.pub

        Вставь его в настройках GitHub: Settings -> SSH and GPG keys -> New SSH key.

    Проверка: ssh -T git@github.com

Если папка еще не на GitHub, выполни эти команды в терминале внутри папки с проектом
для начала создаем репо на сервере...


echo "# phase-1" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Yuralitv1982/phase-1.git
git push -u origin main
