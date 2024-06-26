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
    - Bejelentkezés, regisztrálás, authentikáció (kész)
    - Termékek megjelenítése -> részletes nézet (kész)
    - Termék publikálása (kész)
    - Termék kosárba tétele (kész)
    - Profil szerkesztése (todo)
    - Keresés termékek nevei között (kész)
    - Külön kategóriaként megtekinteni a termékeket (kész)
- Should have
    - Publikált termék törlése (kész)
    - Admin role, felhasználók kezelése(ha pl. valaki nem megfelelő tartalmat tesz közzé) (ongoing)
    - Termékekhez több részlet amire lehet szűrni (ongoing)
    - Megosztott kosár (todo)
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
    - Rendelés felület UI
    - Payment Method + Address kiegészítés
<hr>

- Ápr. 22. - Máj. 5.
    - Kosárnak külön Context és aszerint kommunikáljon, véglegesíteni a működést
    - Rendelés megvalósítása
    - Leadott rendelés részleteinek megtekintése
    - Szállítási cím létrehozása, módosítása rendeléskor
    - Bug fixek
<hr>

- Máj. 6. - Máj 19. 
    - Admin role bevezetése(hozzátartozó oldal elkészítése, most hardkodolva maga az admin, de hogyan legyen másképp?)
        - Felhasználók letiltása
        - Termékek törlése
        - Rendelések felülvizsgálata
    - User role kezdetleges beállítás?
    - Közös kosár
        - A kosár tulajdonosa megtekintheti, hogy kik vannak a kosárban, valamint ki is teheti őket
        - Kód alapján lehet csatlakozni
        - Létre lehet hozni új kosarat, és kiválasztani, melyik legyen az aktuális
<hr>

- Máj. 20. - Máj.24
    - Dokumentáció készítése
    
