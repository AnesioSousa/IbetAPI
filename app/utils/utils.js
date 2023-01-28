/**
 * Valida objeto vazio
 * Deve retornar true se o objeto for vazio
 * @param {*} obj 
 * @returns boolen 
 */

exports.isEmptyObject = (obj) => {
    return !Object.keys(obj).length;
}
