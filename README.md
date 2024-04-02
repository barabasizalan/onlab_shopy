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
    - Admin role, felhasználók kezelése(ha pl. valaki nem megfelelő tartalmat tesz közzé)
    - Megosztott kosár
- Nice to have
    - Publikáláskor több kép közzététele(adatbázis módosítással jár)
    - Termékek kedvelése

### Technikai rész
- Navigációhoz React router.
- React query a backend kommunikációhoz(aszinkron)
- MsSql + EntityFramework - adatbázis
- ASP.NET Core Identity + Cookie

### Use case diagram
![](/Shopy/assets/useCasek.png)

### Adatbázis terv
![](/Shopy/assets/databasePlan.png)

### Ütemterv
- Feb. 19-25.
    - Use case diagram
    - Adatbázis terv
    - React tanulás + web UI elkezdése
<hr>

- Feb. 26. - Márc. 10.
    - Login/register felület megvalósítása design szempontból (kész)
    - Adatbázis létrehozása Code first megközelítéssel (kész)
    - Termékek lekérdezése backendtől és megjelenítés a képernyőn kártyák formájában (kész)
    - Keresés termékekre, utána megjelenítés egy új oldalon
    - Kategóriák kilistázva, és azok alapján is lehessen megjeleníteni mindegyikhez a termékeket
    - Endpointok összegyűjtése, hogy mire lesz szükség + React query bevezetése
    - Use Case újratervezése adminnal együtt
<hr>

- Márc. 11. - Márc  24. 
    - ASP.NET Core Identity integrálása (kész)
    - Authentikáció, süti (kész)
    - Termék részletes nézete, képek megjelenítése (kész)
    - Új termék felvétele (kész)
    - Adatbázis módosítása a képek formátuma miatt (Kész)
<hr>

- Márc 25. - Ápr 7.
    - Termékre keresni
    - Felhasználó saját termékei:
        - Lekérés -> megjelenítés (kész)
        - Törlés (kész)
        - Módosítás (kész) - todo: részleges módosítás
    
<hr>

- Ápr. 8. - Ápr. 21.
    - Kosár tervezése, elemeket lehessen beletenni
<hr>

- Ápr. 22. - Máj. 5.
    - todo
<hr>

- Máj. 6. - Máj 19. 
    - todo
<hr>

- Máj. 20. - Máj.24
    - todo
    