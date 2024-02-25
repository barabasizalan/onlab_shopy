# 2024 Önálló laboratórium
## Shopy - Online shop webApp
### A feladatról nagyvonalakban
- Authentikáció - JWT token
- Fix kategóriák, amelyekbe a termékek találnak, + "Egyéb" kategória
- Termékeket lehet feltölteni, ahol be lehet írni/állítani a terméknek a következő tulajdonságait:
    - Név, ár, leírás, mennyiség, kategória(pl ha cipő/ruha kategória, akkor esetleg méret beállítás, bár ez lehet komplikált lenne), kép(?), 
- Aki feltöltötte a terméket az le is törölheti.
- A termékeket kosárba lehet tenni.
- Kosár, amely megosztott is lehet. Egy közös kosárba maximum 5 ember csatlakozhat. A kosárból fizetés kezdeményezhető.
- Keresés:
    - Összes termék nevei között
    - Egy adott kategórián belül
- Új ötlet, termékek kedvelése, amelyek majd külön megtekinthetők

### Funkciólista
- Must have 
    - Bejelentkezés, regisztrálás, authentikáció
    - Termékek megjelenítése -> részletes nézet
    - Termék publikálása
    - Termék kosárba tétele
    - Profil szerkesztése
    - Keresés termékek nevei között
    - Külön kategóriaként megtekinteni a termékeket
- Should have
    - Publikált termék törlése
    - Megosztott kosár
- Nice to have
    - Termékek kedvelése

### Technikai rész
- Navigációhoz React router.
- React query a backend kommunikációhoz(aszinkron)
- MsSql + EntityFramework - adatbázis
- ASP.NET Core Identity + JWT

### Adatbázis terv
- kép helye

### Ütemterv
- Feb. 26. - Márc. 10.
    - Login/register felület megvalósítása design szempontból
    - Adatbázis létrehozása Code first megközelítéssel
    - Termékek lekérdezése backendtől és megjelenítés a képernyőn kártyák formájában

- Márc. 11. - Márc  24. 
    - ASP.NET Core Identity
    - backend + frontend haladás

- Márc 25. - Ápr 7.
    - todo

- Ápr. 8. - Ápr. 21.
    - todo

- Ápr. 22. - Máj. 5.
    -todo