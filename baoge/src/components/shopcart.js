let shopcart = {};

let shop = window.localStorage;

let prods = JSON.parse(shop.getItem('prods') || '{}');

shopcart.aou = function (p) {
    if (prods[p.id]) {
        prods[p.id] += p.num;
    } else {
        prods[p.id] = p.num;
    }
    this.save(prods);
}

shopcart.del = function (id) {
    delete prods[id];
    this.save(prods);
}

shopcart.qk=function(){
    prods={};
    this.save(prods);
}

shopcart.getprods = function () {
    return JSON.parse(shop.getItem('prods')||'{}');
}

shopcart.gettc = function () {
    let sum = 0;
    for (let id in prods) {
        sum += prods[id];
    }
    return sum;
}

shopcart.save = function (prods) {
    shop.setItem('prods', JSON.stringify(prods));
}

export default shopcart;