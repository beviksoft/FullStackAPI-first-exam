/**
 * 1. Objektumok tömbjéből egy elem kiválasztása az id alapján.
 * @param {Array} list egy objektumokat tartalmazó tömb
 * @param {Number} id az id, ami alapján keresünk a tömbben
 * @returns a tömbnek az az eleme, amelynek az id -je megegyezik a kapottal
 */
const get = (list = [], id = 0) => {
    return list.find(item => item.id === id)
};

/**
 * 2. Új objektum beszúrása a kapott tömbbe.
 * @param {Array} list egy objektumokat tartalmazó tömb
 * @param {*} entity egy objektum, amelyet be szeretnénk szúrni a tömbbe
 * @returns a létrehozott, beszúrt és id -vel ellátott objektum
 */
const create = (list = [], entity = null) => {
    let maxId = -1;
    list.forEach(item => {
        maxId = item.id > maxId ? item.id : maxId
    });
    maxId += 1;
    const newItem = { ...entity, id: maxId };
    list.push(newItem);
    return newItem;
};

/**
 * 3. Egy meglévő objektum frissítése a kapott tömbben.
 * @param {Array} list objektumok tömbje
 * @param {*} entity egy id tulajdonsággal rendelkező objektum
 * @returns a frissített objektum ha sikerült a frissítés, egyébként false
 */
const update = (list = [], entity = {}) => {
    if (list.length < 1 || !entity.id) {
        return false;
    };

    const idx = list.findIndex(item => item.id === entity.id);
    if (idx == -1) {
        return false;
    };

    list[idx] = { ...list[idx], ...entity };
    return list[idx];
};

/**
 * 4. Eltávolít a paraméterként kapott tömbből egy elemet az id alapján.
 * @param {Array} list objektumok tömbje
 * @param {*} entity egy id tulajdonsággal rendelkező objektum
 * @returns true ha sikeres volt a törlés, egyébként false
 */
const remove = (list = [], id = 0) => {
    if (list.length < 1 || !id) {
        return false;
    };

    const i = list.findIndex(item => item.id === id);
    if (i == -1) {
        return false;
    };

    list.splice(i, 1);
    return true;
};

/**
 * 5. Exportáld ki a négy függvényt, hogy más fájlokból is elérhetőek legyenek.
 */
module.exports = {
    get,
    create,
    update,
    remove
};