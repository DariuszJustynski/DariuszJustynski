# chat-archive-browser

Prosta aplikacja Electron + Node.js do ręcznego archiwizowania czatów z BrowserView.

## Wymagania

- Node.js 20.x (LTS)
- npm

## Instalacja i uruchomienie

```bash
npm install
npm start
```

## Testy

```bash
npm test
```

## Jak działa

1. Otwórz aplikację i przejdź do `https://chatgpt.com`.
2. Zaloguj się ręcznie w osadzonej przeglądarce (BrowserView).
3. Otwórz konkretny czat.
4. Kliknij **Dodaj bieżący czat do kolejki**.
5. Zaznacz rekordy w checklistcie.
6. Wybierz formaty (HTML/PDF/TXT).
7. Kliknij **Zapisz zaznaczone**.

Każdy czat trafia do własnego folderu:

`YYYY-MM-DD_HH-mm-ss__slug-title`

w katalogu `output_chat_store` (lub innym wybranym przez użytkownika).

## Bezpieczeństwo

- `contextIsolation: true`
- `nodeIntegration: false`
- `sandbox: true`
- dostęp do IPC tylko przez `preload` i whitelist API.

## Przechowywanie danych

- `queue.json` i `settings.json` są zapisywane w `app.getPath('userData')` z atomowym zapisem.
