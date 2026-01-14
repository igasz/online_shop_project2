# Online Shop (STORE)
Wprowadzenie do Aplikacji Internetowych

## Authors:
Iga Szaflik

## Użyta technologia i biblioteki
### Frontend
- **React** (Vite)
- **React Router**
- **Context Api**
- **CSS**
### Backend (serwer)
- **Node.js**
- **Express.js**
- **Sequelize**
- **SQLite**
- **JSON Web Token**
### Dane zewnętrzne
- **FakeStoreAPI**

## Opis Funkcjonalności
1. Landing Page (Strona Powitalna)
- układ z podziałem ekranu:
  - lewa sekcja: Grafika "Nowa Kolekcja" przekierowująca do sklepu.
  - prawa sekcja: Interaktywne kafelki zmieniające się w zależności od stanu zalogowania (niezalogowany: Linki do Logowania i Rejestracji, zalogowany: Linki do Koszyka/Historii zamówień oraz przycisk Wyloguj).

2. Sklep i Produkty
- Pobieranie i wyświetlanie produktów z zewnętrznego API.
- Szczegóły produktu: opis, cena, stan magazynowy (symulowany), dodawanie do koszyka.
- Opinie:
  - Wyświetlanie opinii pobieranych z własnego serwera backendowego.
  - Możliwość dodania opinii tylko dla zalogowanych użytkowników.
  - Walidacja: Użytkownik może dodać tylko jedną opinię do danego produktu.
  - Usuwanie opinii: Administrator może usuwać wszystkie, użytkownik tylko swoje.

3. Koszyk i Zamówienia
- Obsługa koszyka: dodawanie, usuwanie, zmiana ilości.
- Koszyk zapamiętywany jest w localStorage przeglądarki.
- Checkout: Składanie zamówienia wysyła dane do bazy backendowej i automatycznie czyści koszyk.
- Historia zamówień dostępna w panelu użytkownika.

4. Bezpieczeństwo i Autoryzacja
- Rejestracja nowych użytkowników z walidacją haseł.
- Logowanie z wykorzystaniem tokena JWT (LocalStorage).
- Hasła w bazie danych są haszowane.

## Konta testowe
**Administrator:**
Email: admin@projekt.pl
Hasło: 123

**Użytkownik 1:**
Email: student@projekt.pl
Hasło: 123
