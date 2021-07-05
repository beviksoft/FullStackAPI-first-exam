/**
 * 1. A fájlok kezeléséhez az fs modul promise alapú verzióját használd.
 */
const fsp = require('fs').promises;
const { join } = require('path');
/**
 * 2. Állítsd be az azonos mappában található .json fájl elérési útját a path 
 * modul join metódusának segítségével.
 */
const jsonPath = join(__dirname, 'db', 'products.json');

/**
 * 3. A jsonPath útvonalon található fájl tartalmát beolvassa és értelmezi, 
 * majd visszaadja a kapott tömböt.
 * @returns objektumok tömbje
 */
const getList = async () => {
    const jsonContent = await fsp.readFile(jsonPath, 'utf8');
    return JSON.parse(jsonContent);
};

/**
 * 4. A kapott tömböt json formátumra alakítja és beleírja a jsonPath útvonalon 
 * található fájlba.
 * @param {Array} list objektumok tömbje
 * @returns true ha sikerült a frissítés, egyébként false (mod. by beviksoft !!!)
 */
const saveList = async (list = []) => {
    return await fsp.writeFile(jsonPath, JSON.stringify(list, null, 4), 'utf8')
    .then( () => true)
    .catch( () => false);
    //return true;
};

/**
 * 5. Frissíti az id alapján kiválasztott entitást és visszaírja a .json fájlba.
 * A .json állomány írásához a saveList segédfüggvényt használd.
 * @param {Array} list objektumok tömbje
 * @param {*} entity egy id tulajdonsággal rendelkező objektum
 * @returns a frissített objektum ha sikerült a frissítés, egyébként false
 */
const update = async (entity = {}) => {
    const list = await getList();

    const idx = list.findIndex(item => item.id === entity.id);
    if (idx == -1) {
        return false;
    };
    
    list[idx] = { ...list[idx], ...entity };

    return await saveList(list) ? list[idx] : false;

    //return list[idx];
};

module.exports = {
    update,
};
